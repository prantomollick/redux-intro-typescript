import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import { TRootSate } from "./store/store";

function App() {
    const fullName = useSelector((state: TRootSate) => state.customer.fullName);

    return (
        <>
            <div>
                <h1>🏦 The React-Redux Bank ⚛️</h1>
                {fullName === "" ? (
                    <CreateCustomer />
                ) : (
                    <>
                        <Customer />
                        <AccountOperations />
                        <BalanceDisplay />
                    </>
                )}
            </div>
        </>
    );
}

export default App;
