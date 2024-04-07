import { createSlice, PayloadAction } from "@reduxjs/toolkit"

console.log("token from local storage", localStorage.getItem("token"));

export interface ListInitialState {
    investorLists: any,
}

const initialState: ListInitialState = {
    investorLists: [],
};

const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        setInvestorLists: (state, action: PayloadAction<any>) => {
            state.investorLists = action.payload
        },
        addList: (state, action: PayloadAction<any>) => {
            state.investorLists = [...state.investorLists, action.payload]
        },
    },
});

export default listSlice.reducer;
export const { setInvestorLists, addList } = listSlice.actions;