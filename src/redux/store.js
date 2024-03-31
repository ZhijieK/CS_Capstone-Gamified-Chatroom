import { configureStore } from "@reduxjs/toolkit";
import profileIconReducer from "./features/profileIconSlice";
import userUIDReducer from "./features/userUidSlice"
import userInfoReducer from "./features/userInfoSlice";
import shopCartReducer from "./features/shopCartSlice";

export const store = configureStore({
    reducer: {
        userUID: userUIDReducer,
        profileIcon: profileIconReducer,
        userInfo: userInfoReducer,
        shopCart: shopCartReducer
    },
})

