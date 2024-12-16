import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"

const store = configureStore({
    reducer: {     //? here we add our reducer from authSlice
        auth: authSlice,

    }
})

export default store