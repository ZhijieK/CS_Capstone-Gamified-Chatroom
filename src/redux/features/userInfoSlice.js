import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inventory: [],
    wallet: 0,
    currentExp: 0,
    currentLevel: 1,
    displayName: "",
};

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        earnedMoney: (state, action) => {
            state.wallet += action.payload;
        },
        decreaseAmount: (state, action) => {
            state.wallet -= action.payload;
        },
        increaseExp: (state, action) => {
            state.currentExp += action.payload;
        },
        levelUp: (state) => {
            state.currentLevel += 1;
        },
        updateInventory: (state, action) => {
            state.inventory = [...state.inventory, action.payload];
        },
        setDisplayName: (state, action) =>{
            state.displayName = action.payload
        },
        reset: () => initialState,
    }
});

export const { earnedMoney, decreaseAmount, increaseExp, levelUp, updateInventory, setDisplayName, reset} = userInfoSlice.actions;
export default userInfoSlice.reducer;
