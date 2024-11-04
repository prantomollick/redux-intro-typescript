import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TAppDispatch, TRootState } from "../../store/store";
import Swal from "sweetalert2";
import { deposit, requestLoan, withdraw } from "./accountSlice";

const AccountOperations: FC = () => {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [loanPurpose, setLoanPurpose] = useState<string>("");
    const [currency, setCurrency] = useState("USD");

    const dispatch = useDispatch<TAppDispatch>();
    const {
        isLoading,
        loan: currentLoan,
        loanPurpose: currentLoanPurpose,
    } = useSelector((state: TRootState) => state.account);

    function handleDeposit() {
        if (!depositAmount) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please enter a valid deposit amount",
            });
            return; // Exit the function if depositAmount is empty
        }

        dispatch(deposit(depositAmount, currency));
        setDepositAmount(0);
        setCurrency("");
    }

    function handleWithdrawal() {
        if (!withdrawalAmount) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please enter a valid withdrawal amount", // Changed text here
            });

            return;
        }

        dispatch(withdraw(withdrawalAmount));
        setWithdrawalAmount(0);
    }

    function handleRequestLoan() {
        if (!loanAmount || !loanPurpose) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please enter a valid loan amount and purpose", // Changed text here
            });

            return;
        }

        dispatch(requestLoan(loanAmount, loanPurpose));
        setLoanAmount(0);
        setLoanPurpose("");
    }

    function handlePayLoan() {}

    return (
        <div>
            <h2>Your account operations</h2>
            <div className="inputs">
                <div>
                    <label>Deposit</label>
                    <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) =>
                            setDepositAmount(Number(e.target.value))
                        }
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                    </select>

                    <button onClick={handleDeposit}>
                        {isLoading
                            ? "Converting..."
                            : `Deposit ${depositAmount}`}
                    </button>
                </div>

                <div>
                    <label>Withdraw</label>
                    <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) =>
                            setWithdrawalAmount(Number(e.target.value))
                        }
                    />
                    <button onClick={handleWithdrawal}>
                        Withdraw {withdrawalAmount}
                    </button>
                </div>

                <div>
                    <label>Request loan</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(+e.target.value)}
                        placeholder="Loan amount"
                    />
                    <input
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        placeholder="Loan purpose"
                    />
                    <button onClick={handleRequestLoan}>Request loan</button>
                </div>

                {currentLoan > 0 && (
                    <div>
                        <span>
                            Pay back ${currentLoan} {currentLoanPurpose}
                        </span>
                        <button onClick={handlePayLoan}>Pay loan</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountOperations;
