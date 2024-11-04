import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the initial state
interface IInitialState {
    balance: number;
    loan: number;
    currency: string;
    loanPurpose: string;
    isLoading: boolean;
}

// Initialize the state with default values
const initialState: IInitialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    currency: "USD",
    isLoading: false,
};

//Async thunk for currency conversion
export const convertCurrency = createAsyncThunk(
    "account/convertCurrency",
    async (
        { amount, currency }: { amount: number; currency: string },
        { dispatch }
    ) => {
        if (currency === "USD") {
            dispatch(deposit({ amount, currency: "USD" }));
            return;
        }

        const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        );
        const data = await res.json();
        const converted: number = data.rates.USD;
        dispatch(deposit({ amount: converted, currency: "USD" }));
    }
);

// Create the account slice
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        // Reducer for depositing money into the account
        deposit(
            state,
            action: PayloadAction<{ amount: number; currency: string }>
        ) {
            state.balance += action.payload.amount;
            state.isLoading = false;
        },

        // Reducer for withdrawing money from the account
        withdraw(state, action: PayloadAction<number>) {
            if (state.balance >= action.payload) {
                state.balance -= action.payload;
            }
        },

        // requestLoan: {
        //     // Prepare to sate send to the reducer
        //     prepare(amount: number, purpose: string) {
        //         return {
        //             payload: { amount, purpose },
        //         };
        //     },

        //     reducer(
        //         state,
        //         action: PayloadAction<{ amount: number; purpose: string }>
        //     ) {
        //         if (state.loan > 0) {
        //             return;
        //         }

        //         state.loan = action.payload.amount;
        //         state.loanPurpose = action.payload.purpose;
        //         state.balance = state.balance + action.payload.amount;
        //     },
        // },

        // Reducer for requesting a loan
        requestLoan: (
            state,
            action: PayloadAction<{ amount: number; purpose: string }>
        ) => {
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance += action.payload.amount;
        },

        // Reducer for paying off the loan
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
    },

    extraReducers: (builder) => {
        builder.addCase(convertCurrency.pending, (state) => {
            state.isLoading = true;
        });
    },
});

// Export actions and reducer
export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
