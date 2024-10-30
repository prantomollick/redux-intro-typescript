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
export const createCustomer = (
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
export const updateName = (fullName: string): TUpdateNameAction => ({
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

export default customerReducer;
