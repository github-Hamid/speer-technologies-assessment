import {configureStore} from "@reduxjs/toolkit";
import callReducer from "../features/activityFeed/activityFeedSlice.js"
export const store = configureStore({
    reducer : {
        calls : callReducer
    }
})