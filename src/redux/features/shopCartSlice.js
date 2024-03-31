import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopCart: [],
    cartTotal: 0
}

export const shopCartSlice = createSlice({
    name: 'shopCart',
    initialState,
    reducers: {
        addItemsToCart: (state, action) => {
            state.shopCart = [...state.shopCart, action.payload]
        },
        removeItemFromCart: (state, action) => {
            state.shopCart = state.shopCart.filter(item => item !== action.payload);
        },
        addToTotal: (state, action) => {
            state.cartTotal += action.payload
        },
        subtractFromTotal: (state, action) => {
            state.cartTotal -= action.payload
        },
        resetTotal: (state) => {
            state.cartTotal = 0
        }
    }
})  

export const {addItemsToCart, removeItemFromCart, addToTotal, subtractFromTotal, resetTotal} = shopCartSlice.actions
export default shopCartSlice.reducer