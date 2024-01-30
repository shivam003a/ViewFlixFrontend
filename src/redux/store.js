import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";
import searchSlice from './slices/searchSlice'
import playVideoSlice from "./slices/playVideoSlice";

export const store = configureStore({
    reducer:{
        "user": userSlice,
        "video": videoSlice,
        "search": searchSlice,
        "single": playVideoSlice
    }
})