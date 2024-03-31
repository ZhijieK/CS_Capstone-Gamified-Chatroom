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
            const item = action.payload;
            const itemExists = state.shopCart.some(cartItem => cartItem.itemName === item.itemName);
      
            if (!itemExists) {
                state.shopCart.push(item);
            }
        },
        removeItemFromCart: (state, action) => {
            state.shopCart = state.shopCart.filter(item => item.itemName !== action.payload.itemName);
        },
        resetCartItems: (state) => {
            state.shopCart = []
        },
        addToTotal: (state, action) => {
            state.cartTotal += action.payload
        },
        subtractFromTotal: (state, action) => {
            state.cartTotal -= action.payload
        },
        updateTotalCost: (state, action) => {
            state.cartTotal = action.payload
        },
        resetTotal: (state) => {
            state.cartTotal = 0
        }
    }
})  

export const {addItemsToCart, removeItemFromCart, resetCartItems, addToTotal, subtractFromTotal,updateTotalCost, resetTotal} = shopCartSlice.actions
export default shopCartSlice.reducer