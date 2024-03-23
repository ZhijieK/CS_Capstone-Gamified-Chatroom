import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inventory: [],
    wallet: 0,
    currentExp: 0,
    currentLevel,
};

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        earnedMoney: (state, action) => {
            state.wallet += action.payload
        },
        decreaseAmount: (state, action) => {
            state,wallet -= action.payload
        },
        increaseExp: (state, action) => {
            state.currentExp += action.payload
        }
    }
})