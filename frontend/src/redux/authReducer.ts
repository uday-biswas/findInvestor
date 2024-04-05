import { createSlice, PayloadAction } from "@reduxjs/toolkit"

console.log("token from local storage", localStorage.getItem("token"));

export interface AuthInitialState {
    token: string | null
    loading: boolean
    signupData: any
}

const initialState: AuthInitialState = {
    token: localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token") as string)
        : null,
    loading: false,
    signupData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setSignupData(state, action: PayloadAction<any>) {
            state.signupData = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { setToken, setLoading, setSignupData } = authSlice.actions;