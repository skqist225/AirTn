import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    // countrySlice,
    categorySlice,
    roomSlice,
    userSlice,
    // stateSlice,
    // citySlice,
    // amenitySlice,
    bookingSlice,
    // reviewSlice,
    // earningSlice,
    // inboxSlice,
    // authSlice,
} from "./features";

const rootReducer = combineReducers({
    room: roomSlice,
    category: categorySlice,
    // country: countrySlice,
    // state: stateSlice,
    // city: citySlice,
    user: userSlice,
    // amenity: amenitySlice,
    booking: bookingSlice,
    // review: reviewSlice,
    // earning: earningSlice,
    // inbox: inboxSlice,
    // auth: authSlice,
});

const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {
        user: {
            user: localUser,
            loading: true,
            successMessage: null,
            errorMessage: null,
            wishlistsIDs: [],
            wishlists: [],
            bookedRooms: [],
            update: {
                loading: true,
                successMessage: null,
                errorMessage: null,
            },
            wishlistsIDsFetching: true,
            listing: {
                users: [],
                loading: true,
                totalElements: 0,
                totalPages: 0,
            },
        },
    },
});

export default store;
