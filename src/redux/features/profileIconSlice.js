import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skin: "",
    skinLink: "",
    hair: "",
    hairLink: "",
    eyes: "",
    eyesLink: "",
    mouth: "",
    mouthLink: "",
    clothes: "",
    clothesLink: "",
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
      setSkinLink: (state, action) => {
        state.skinLink = action.payload;
      },
      setHairLink: (state, action) => {
        state.hairLink = action.payload;
      },
      setEyesLink: (state, action) => {
        state.eyesLink = action.payload;
      },
      setMouthLink: (state, action) => {
        state.mouthLink = action.payload;
      },
      setClothesLink: (state, action) => {
        state.clothesLink = action.payload;
      },
      setProfileIcon: (state, action) => {
        const { skin, skinLink, hair, hairLink, eyes, eyesLink, mouth, mouthLink, clothes, clothesLink } = action.payload;
        state.skin = skin || state.skin;
        state.skinLink = skinLink || state.skinLink;
        state.hair = hair || state.hair;
        state.hairLink = hairLink || state.hairLink;
        state.eyes = eyes || state.eyes;
        state.eyesLink = eyesLink || state.eyesLink;
        state.mouth = mouth || state.mouth;
        state.mouthLink = mouthLink || state.mouthLink;
        state.clothes = clothes || state.clothes;
        state.clothesLink = clothesLink || state.clothesLink;
      },
    },
})

export const {setSkin, setHair, setEyes, setMouth, setClothes, setSkinLink, setHairLink, setEyesLink, setMouthLink, setClothesLink, setProfileIcon} = profileIconSlice.actions
export default profileIconSlice.reducer

