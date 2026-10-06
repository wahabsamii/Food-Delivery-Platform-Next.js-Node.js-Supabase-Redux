import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuth = true;
            state.error = null;
            state.loading = false
        },
        updateUser:(state, action) => {
            state.currentUser = action.payload;
        },
        signOutSuccess:(state) => {
            state.currentUser = null;
            state.error = null;
            state.isAuth = false;
            state.loading = false
        }
    }
});


export const { signInSuccess, updateUser, signOutSuccess } = userSlice.actions;
export default userSlice.reducer;