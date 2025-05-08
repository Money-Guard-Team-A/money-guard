import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";

const Balance = () => {
  const transactions = useSelector(selectTransactions);

  const totalBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === "income" ? transaction.amount : transaction.amount);
  }, 0);

  return (
    <div>
      <h2>Balance</h2>
      <div>
        <div>Your Balance</div>
        <div> ☼ {totalBalance.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Balance;
