// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk"; // Correct import for thunk

// import accountReducer from "../features/accounts/accountSlice";
// import customerReducer from "../features/customers/customerSlice";

// const rootReducer = combineReducers({
//     account: accountReducer,
//     customer: customerReducer,
// });

// //ignore-ts
// const store = createStore(rootReducer, applyMiddleware(thunk));

// store.subscribe(() => {
//     console.log(store.getState());
// });

// export type TRootSate = ReturnType<typeof store.getState>;
// export type TAppDispatch = typeof store.dispatch;

// export default store;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountReducer from "../features/accounts/accountSlice";
import customerReducer from "../features/customers/customerSlice";

// const rootReducer = combineReducers({
//     account: accountReducer,
//     customer: customerReducer,
// });

const store = configureStore({
    // reducer: rootReducer,
    // No need to manually configure thunk middleware, Redux Toolkit includes it by default

    reducer: {
        account: accountReducer,
        customer: customerReducer,
    },
});

store.subscribe(() => {
    console.log(store.getState());
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
