import { useState } from "react";
import { useDispatch } from "react-redux";
import { TAppDispatch } from "../../store/store";
import { createCustomer } from "./customerSlice";
import Swal from "sweetalert2";

function CreateCustomer(): React.ReactElement {
    const [fullName, setFullName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const dispatch = useDispatch<TAppDispatch>();

    function handleClick() {
        if (!fullName || !nationalId) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill in all fields",
            });
            return;
        }
        dispatch(createCustomer(fullName, nationalId));

        setFullName("");
        setNationalId("");
    }

    return (
        <div>
            <h2>Create new customer</h2>
            <div className="inputs">
                <div>
                    <label>Customer full name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>National ID</label>
                    <input
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>
                <button onClick={handleClick}>Create new customer</button>
            </div>
        </div>
    );
}

export default CreateCustomer;
