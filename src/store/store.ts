import { combineReducers, createStore } from "redux";

import accountReducer from "../features/accounts/accountSlice";
import customerReducer from "../features/customers/customerSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log(store.getState());
});

export type TRootSate = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
