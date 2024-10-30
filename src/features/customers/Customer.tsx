import { useSelector } from "react-redux";
import type { TRootSate } from "../../store/store";

function Customer(): React.ReactElement {
    const customer = useSelector((store: TRootSate) => store.customer);
    console.log(customer);

    return <h2>👋 Welcome, {customer.fullName}</h2>;
}

export default Customer;
