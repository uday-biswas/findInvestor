import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
import profileSlice from "./profileReducer";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;