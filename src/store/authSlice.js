import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        userLogout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const {userLogin, userLogout} = authSlice.actions;
export default authSlice.reducer;