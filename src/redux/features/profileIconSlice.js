import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skin: null,
    hair: null,
    eyes: null,
    mouth: null,
    clothes: null,
  };

export const profileIconSlice = createSlice({
    name: 'profileIcon',
    initialState,
    reducers: {
      setSkin: (state, action) => {
        state.skin = action.payload;
      },
      setHair: (state, action) => {
        state.hair = action.payload;
      },
      setEyes: (state, action) => {
        state.eyes = action.payload;
      },
      setMouth: (state, action) => {
        state.mouth = action.payload;
      },
      setClothes: (state, action) => {
        state.clothes = action.payload;
      },
    },
})

export const {setSkin, setHair, setEyes, setMouth, setClothes} = profileIconSlice.actions
export default profileIconSlice.reducer

