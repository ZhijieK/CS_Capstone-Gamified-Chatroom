import { configureStore } from "@reduxjs/toolkit";
import profileIconReducer from "./features/profileIconSlice";

export const store = configureStore({
    reducer: {
        profileIcon: profileIconReducer
    },
})

