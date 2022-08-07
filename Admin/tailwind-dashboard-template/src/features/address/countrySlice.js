import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../../axios";

export const fetchCountries = createAsyncThunk(
    "country/fetchCountries",
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/countries`);
            return { data };
        } catch (error) {}
    }
);

const initialState = {
    countries: [],
    loading: true,
};

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCountries.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.countries = payload?.data;
            })
            .addMatcher(isAnyOf(fetchCountries.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(fetchCountries.rejected), (state, { payload }) => {
                state.loading = false;
            });
    },
});

export const countryState = state => state.country;
export default countrySlice.reducer;
