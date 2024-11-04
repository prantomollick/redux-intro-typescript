import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialStateCustomer {
    fullName: string;
    nationalID: string;
    createdAt: Date | string;
}
const initialStateCustomer: IInitialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState: initialStateCustomer,
    reducers: {
        createCustomer: {
            prepare(fullName: string, nationalID: string) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                    },
                };
            },

            reducer(
                state,
                action: PayloadAction<{ fullName: string; nationalID: string }>
            ) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = new Date().toISOString();
            },
        },

        updateName(state, action: PayloadAction<string>) {
            state.fullName = action.payload;
        },
    },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
