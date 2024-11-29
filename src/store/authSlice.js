import { createSlice } from "@reduxjs/toolkit";

//* All the reducers are declared here

// Define your initial state here.
const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.status = false;
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
//? here we have called reducer while above in the code we have initialized reducers because this is the syntax mentioned in the documentation