import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../../axios";
import { setUserToLocalStorage } from "../common";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (page, { dispatch, getState, rejectWithValue }) => {
        try {
            const {
                data: { users, totalElements, totalPages },
            } = await api.get(`/admin/users?page=${page}`);

            return { users, totalElements, totalPages };
        } catch (error) {}
    }
);

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (id, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/admin/users/${id}`);
            console.log(data);

            return { data };
        } catch (error) {}
    }
);

export const fetchWishlistsIDsOfCurrentUser = createAsyncThunk(
    "user/fetchWishlistsIDsOfCurrentUser",
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/user/wishlists/ids`);
            return { data };
        } catch (error) {}
    }
);

export const fetchWishlistsOfCurrentUser = createAsyncThunk(
    "user/fetchWishlistsOfCurrentUser",
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/user/wishlists`);
            return { data };
        } catch (error) {}
    }
);

export const updateUserInfo = createAsyncThunk(
    "user/updateUserInfo",
    async (updatedInfo, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.post(`/user/update-personal-info`, updatedInfo);
            //update local user info
            if (data) setUserToLocalStorage(data);

            return { data };
        } catch (error) {}
    }
);

export const updateUserAvatar = createAsyncThunk(
    "user/updateUserAvatar",
    async (formData, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.put(`/user/update-avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (data) {
                console.log(data);
                setUserToLocalStorage(data);
            }

            return { data };
        } catch (error) {}
    }
);

export const fetchBookedRooms = createAsyncThunk(
    "user/fetchBookedRooms",
    async ({ query }, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/user/booked-rooms?query=${query}`);

            return { data };
        } catch (error) {}
    }
);

const initialState = {
    user: null,
    loading: true,
    wishlistsIDsFetching: true,
    errorMessage: null,
    successMessage: "",
    update: {
        loading: true,
        errorMessage: null,
        successMessage: null,
    },
    wishlistsIDs: [],
    wishlists: [],
    bookedRooms: [],
    listing: {
        users: [],
        loading: true,
        totalElements: 0,
        totalPages: 0,
    },
    get: {
        loading: true,
        user: {},
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.listing.loading = false;
                state.listing.users = payload.users;
                state.listing.totalElements = payload.totalElements;
                state.listing.totalPages = payload.totalPages;
            })
            .addCase(fetchUser.fulfilled, (state, { payload }) => {
                state.get.loading = false;
                state.get.user = payload.data;
            })
            .addCase(fetchWishlistsIDsOfCurrentUser.pending, (state, { payload }) => {
                state.wishlistsIDsFetching = true;
            })
            .addCase(fetchWishlistsIDsOfCurrentUser.fulfilled, (state, { payload }) => {
                state.wishlistsIDsFetching = false;
                state.wishlistsIDs = payload?.data;
            })
            .addCase(fetchWishlistsOfCurrentUser.fulfilled, (state, { payload }) => {
                state.wishlists = payload?.data;
            })
            .addCase(fetchWishlistsOfCurrentUser.pending, (state, _) => {
                state.wishlistsIDsFetching = true;
            })
            .addCase(fetchBookedRooms.fulfilled, (state, { payload }) => {
                state.bookedRooms = payload?.data;
            })
            .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
                state.update.loading = false;
                state.user = payload?.data;
            })
            .addCase(updateUserInfo.pending, (state, _) => {
                state.update.loading = true;
            })
            .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
                state.user = payload?.data;
                state.update.loading = false;
            })
            .addMatcher(isAnyOf(fetchWishlistsOfCurrentUser.rejected), (state, { payload }) => {
                state.loading = false;
                if (payload) state.errorMessage = payload;
            });
    },
});

export const { setUser } = userSlice.actions;
export const userState = state => state.user;
export default userSlice.reducer;
