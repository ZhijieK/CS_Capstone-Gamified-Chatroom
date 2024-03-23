import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: null,
}

export const userUidSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUid: (state, action) => {
            state.uid = action,payload;
        },
    }
})

export const {setUid} = userUidSlice.actions
export default userUidSlice.reducer