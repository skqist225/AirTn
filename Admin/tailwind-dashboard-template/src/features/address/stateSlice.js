import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../../axios";

export const fetchStatesByCountry = createAsyncThunk(
    "state/fetchStatesByCountry",
    async ({ countryId }, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/states/country/${countryId}`);
            return { data };
        } catch (error) {}
    }
);

const initialState = {
    states: [],
    loading: true,
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchStatesByCountry.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.states = payload?.data;
            })
            .addMatcher(isAnyOf(fetchStatesByCountry.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(fetchStatesByCountry.rejected), (state, { payload }) => {
                state.loading = false;
            });
    },
});

export default stateSlice.reducer;
