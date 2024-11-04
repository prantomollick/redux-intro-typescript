import type { TRootState } from "../../store/store";

import { ThunkAction } from "redux-thunk";

type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    TRootState,
    unknown,
    TDepositAction | { type: EActionTypes.CONVERT_CURRENCY }
>;

enum EActionTypes {
    DEPOSIT = "account/deposit",
    WITHDRAW = "account/withdraw",
    REQUEST_LOAN = "account/requestLoan",
    PAY_LOAN = "account/payLoan",
    CONVERT_CURRENCY = "account/convertCurrency",
}

interface IInitialState {
    balance: number;
    loan: number;
    currency: string;
    loanPurpose: string;
    isLoading: boolean;
}
const initialState: IInitialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    currency: "USD",
    isLoading: false,
};

type TDepositAction = {
    type: EActionTypes.DEPOSIT;
    payload: { amount: number; currency: string };
};
export const deposit = (
    amount: number,
    currency: string
): TDepositAction | AppThunk => {
    if (currency === "USD")
        return {
            type: EActionTypes.DEPOSIT,
            payload: { amount, currency },
        };

    return async function (dispatch) {
        dispatch({ type: EActionTypes.CONVERT_CURRENCY });

        //API call
        const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        );
        const data = await res.json();
        const converted: number = data.rates.USD;
        dispatch({
            type: EActionTypes.DEPOSIT,
            payload: { amount: converted, currency: "USD" },
        });
    };
};
type TWithdraw = {
    type: EActionTypes.WITHDRAW;
    payload: number;
};
export const withdraw = (amount: number): TWithdraw => ({
    type: EActionTypes.WITHDRAW,
    payload: amount,
});

type TRequestLoanAction = {
    type: EActionTypes.REQUEST_LOAN;
    payload: { amount: number; purpose: string };
};
export const requestLoan = (
    amount: number,
    purpose: string
): TRequestLoanAction => ({
    type: EActionTypes.REQUEST_LOAN,
    payload: { amount, purpose },
});

type TAccountAction = {
    type: EActionTypes.PAY_LOAN;
};
export const payLoan = (): TAccountAction => ({ type: EActionTypes.PAY_LOAN });

type TAccountActions =
    | TDepositAction
    | TWithdraw
    | TRequestLoanAction
    | TAccountAction
    | { type: EActionTypes.CONVERT_CURRENCY };

function accountReducer(
    state: IInitialState = initialState,
    action: TAccountActions
): IInitialState {
    switch (action.type) {
        case EActionTypes.DEPOSIT:
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                isLoading: false,
            };

        case EActionTypes.WITHDRAW:
            return {
                ...state,
                balance:
                    state.balance >= action.payload
                        ? state.balance - action.payload
                        : state.balance,
            };

        case EActionTypes.REQUEST_LOAN:
            return {
                ...state,
                loan: state.loan + action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };

        case EActionTypes.PAY_LOAN:
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            };

        case EActionTypes.CONVERT_CURRENCY:
            return { ...state, isLoading: true };

        default:
            return state;
    }
}

export default accountReducer;
