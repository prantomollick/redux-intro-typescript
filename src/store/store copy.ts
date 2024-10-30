import { combineReducers, createStore } from "redux";

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

enum EActionTypes {
    DEPOSIT = "account/deposit",
    WITHDRAW = "account/withdraw",
    REQUEST_LOAN = "account/requestLoan",
    PAY_LOAN = "account/payLoan",
}

type TDepositAction = {
    type: EActionTypes.DEPOSIT;
    payload: number;
};

const deposit = (amount: number): TDepositAction => ({
    type: EActionTypes.DEPOSIT,
    payload: amount,
});

type TWithdraw = {
    type: EActionTypes.WITHDRAW;
    payload: number;
};

const withdraw = (amount: number): TWithdraw => ({
    type: EActionTypes.WITHDRAW,
    payload: amount,
});

type TRequestLoanAction = {
    type: EActionTypes.REQUEST_LOAN;
    payload: { amount: number; purpose: string };
};

const requestLoan = (amount: number, purpose: string): TRequestLoanAction => ({
    type: EActionTypes.REQUEST_LOAN,
    payload: { amount, purpose },
});

type TAccountAction = {
    type: EActionTypes.PAY_LOAN;
};

const payLoan = (): TAccountAction => ({ type: EActionTypes.PAY_LOAN });

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

enum ECustomerActionTypes {
    CREATE_CUSTOMER = "customer/createCustomer",
    UPDATE_NAME = "account/updateName",
}

interface IInitialStateCustomer {
    fullName: string;
    nationalID: string;
    createdAt: string;
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

type TCreateCustomerAction = {
    type: ECustomerActionTypes.CREATE_CUSTOMER;
    payload: {
        fullName: string;
        nationalID: string;
        createdAt: Date;
    };
};

const createCustomer = (
    fullName: string,
    nationalID: string
): TCreateCustomerAction => ({
    type: ECustomerActionTypes.CREATE_CUSTOMER,
    payload: { fullName, nationalID, createdAt: new Date() },
});

type TUpdateNameAction = {
    type: ECustomerActionTypes.UPDATE_NAME;
    payload: string;
};

const updateName = (fullName: string): TUpdateNameAction => ({
    type: ECustomerActionTypes.UPDATE_NAME,
    payload: fullName,
});

type TCustomerActions = TCreateCustomerAction | TUpdateNameAction;

const customerReducer = (
    state: IInitialStateCustomer = initialStateCustomer,
    action: TCustomerActions
): IInitialStateCustomer => {
    switch (action.type) {
        case ECustomerActionTypes.CREATE_CUSTOMER:
            return {
                ...state, // Spread operator to copy the existing state
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt.toISOString(),
            };

        case ECustomerActionTypes.UPDATE_NAME:
            return { ...state, fullName: action.payload };

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

store.subscribe(() => {
    console.log(store.getState());
});

// store.dispatch({ type: EActionTypes.DEPOSIT, payload: 500 }); // Initial deposit of 100
// store.dispatch({ type: EActionTypes.WITHDRAW, payload: 50 }); // Withdraw 50
// store.dispatch({
//     type: EActionTypes.REQUEST_LOAN,
//     payload: { amount: 500, purpose: "Business" },
// }); // Request a loan

// store.dispatch({ type: EActionTypes.PAY_LOAN }); // Pay the loan

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Buy a car"));

store.dispatch(createCustomer("Pranto Mollick", "553254664"));
