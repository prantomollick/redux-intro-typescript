import { FC, useState } from "react";

const AccountOperations: FC = () => {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [loanPurpose, setLoanPurpose] = useState<string>("");
    const [currency, setCurrency] = useState("USD");

    function handleDeposit() {}

    function handleWithdrawal() {}

    function handleRequestLoan() {}

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
                        Deposit {depositAmount}
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

                <div>
                    <span>Pay back $X</span>
                    <button onClick={handlePayLoan}>Pay loan</button>
                </div>
            </div>
        </div>
    );
};

export default AccountOperations;
