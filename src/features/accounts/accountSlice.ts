enum EActionTypes {
    DEPOSIT = "account/deposit",
    WITHDRAW = "account/withdraw",
    REQUEST_LOAN = "account/requestLoan",
    PAY_LOAN = "account/payLoan",
}

interface IInitialState {
    balance: number;
    loan: number;
    loanPurpose: string;
}
const initialState: IInitialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

type TDepositAction = {
    type: EActionTypes.DEPOSIT;
    payload: number;
};
export const deposit = (amount: number): TDepositAction => ({
    type: EActionTypes.DEPOSIT,
    payload: amount,
});

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
    | TAccountAction;

function accountReducer(
    state: IInitialState = initialState,
    action: TAccountActions
): IInitialState {
    switch (action.type) {
        case EActionTypes.DEPOSIT:
            return { ...state, balance: state.balance + action.payload };

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

        default:
            return state;
    }
}

export default accountReducer;
