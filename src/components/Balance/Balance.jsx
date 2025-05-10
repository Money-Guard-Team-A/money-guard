import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import css from "./Balance.module.css";

const Balance = () => {
  const transactions = useSelector(selectTransactions);

  const totalBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === "income" ? transaction.amount : transaction.amount);
  }, 0);

  return (
    <>
      <div className={css.container}>
        <div className={css.title}>Your Balance</div>
        <div className={css.content}> ☼ {totalBalance.toFixed(2)}</div>
      </div>
    </>
  );
};

export default Balance;
