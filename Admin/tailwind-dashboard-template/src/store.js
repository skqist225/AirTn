import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    amenitySlice,
    authSlice,
    bookingSlice,
    categorySlice,
    // citySlice,
    // countrySlice,
    privacySlice,
    ruleSlice,
    roomSlice,
    userSlice,
    // stateSlice,
    // reviewSlice,
    // earningSlice,
    // inboxSlice,
} from "./features";

const rootReducer = combineReducers({
    amenity: amenitySlice,
    auth: authSlice,
    booking: bookingSlice,
    category: categorySlice,
    // city: citySlice,
    // country: countrySlice,
    // earning: earningSlice,
    // inbox: inboxSlice,
    privacy: privacySlice,
    rule: ruleSlice,
    room: roomSlice,
    // review: reviewSlice,
    user: userSlice,
    // state: stateSlice,
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
            get: {
                loading: true,
                user: {},
            },
            addUserAction: {
                loading: true,
                successMessage: "",
                errorMessage: "",
            },
            deleteUserAction: {
                loading: true,
                successMessage: null,
                errorMessage: null,
            },
        },
    },
});

export default store;
