import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../../axios";
import { setUserToLocalStorage } from "../common";
import { setUser } from "../user/userSlice";

export const login = createAsyncThunk(
    "auth/login",
    async (loginInfo, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await api.post("/auth/login", loginInfo);
            if (data) {
                setUserToLocalStorage(data);
                dispatch(setUser(data));
            }

            return { data };
        } catch ({ data: { error } }) {
            return rejectWithValue(error);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (resetPasswordData, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`/auth/reset-password`, resetPasswordData);

            return { data };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (forgotPassword, { rejectWithValue }) => {
        try {
            const {
                data: { message, resetPasswordCode, email },
            } = await api.post("/auth/forgot-password", forgotPassword);
            return { message, resetPasswordCode, email };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const register = createAsyncThunk("auth/register", async (user, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/auth/register", user);
        return { data };
    } catch ({ data: { errorMessage } }) {
        return rejectWithValue(errorMessage);
    }
});

const initialState = {
    user: null,
    loading: true,
    errorMessage: null,
    successMessage: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        clearErrorMessage(state, _) {
            state.errorMessage = null;
        },
        clearSuccessMessage(state, _) {
            state.successMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.data;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(
                forgotPassword.fulfilled,
                (state, { payload: { message, resetPasswordCode, email } }) => {
                    state.successMessage = message;
                    localStorage.setItem("email", email);
                    localStorage.setItem("resetPasswordCode", resetPasswordCode);
                }
            )
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.successMessage = payload.data;
            })

            .addMatcher(
                isAnyOf(
                    login.pending,
                    // logout.pending,
                    forgotPassword.pending,
                    resetPassword.pending
                    // addUser.pending
                ),
                (state, _) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    login.rejected,
                    // logout.rejected,
                    forgotPassword.rejected,
                    resetPassword.rejected
                    // addUser.rejected
                ),
                (state, { payload }) => {
                    state.loading = false;
                    if (payload) state.errorMessage = payload;
                }
            );
    },
});

export const { clearErrorMessage, clearSuccessMessage } = authSlice.actions;
export const authState = state => state.auth;
export default authSlice.reducer;
