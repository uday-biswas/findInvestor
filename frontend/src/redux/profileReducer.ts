import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProfileInitialState {
    user: any
    loading: boolean
}

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null,
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export default profileSlice.reducer;
export const { setUser, setLoading } = profileSlice.actions;