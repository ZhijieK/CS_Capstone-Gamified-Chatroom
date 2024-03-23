import { configureStore } from "@reduxjs/toolkit";
import profileIconReducer from "./features/profileIconSlice";
import userUidReducer from "./features/userUidSlice"
import userInfoReducer from "./features/userInfoSlice";

export const store = configureStore({
    reducer: {
        userUid: userUidReducer,
        profileIcon: profileIconReducer,
        userInfo: userInfoReducer,
    },
})

