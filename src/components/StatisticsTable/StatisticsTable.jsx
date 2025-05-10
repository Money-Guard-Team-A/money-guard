import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransactions,
  transactionSummary,
} from "../../redux/transactions/operations";
import styles from "./StatisticsTable.module.css";

const COLORS = [
  "#FD9498", // Car
  "#C5BAFF", // Self care
  "#4A56E2", // Child care
  "#24CCA7", // Household products
  "#81E1FF", // Education
  "#00AD84", // Leisure
  "#FED057", // Other expenses
];

const StatisticsTable = ({ month, year }) => {
  const dispatch = useDispatch();
  const summary = useSelector((s) => s.transactions.summary) || {};
  const isLoading = useSelector((s) => s.transactions.isLoading);
  const error = useSelector((s) => s.transactions.error);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(transactionSummary({ month, year }));
  }, [dispatch, month, year]);

  const allCategories = Array.isArray(summary.categoriesSummary)
    ? summary.categoriesSummary
    : [];

  
  const expenseCategories = allCategories.filter((c) => c.type === "EXPENSE");
  const incomeCategories = allCategories.filter((c) => c.type === "INCOME");

  
  const totalExpense = expenseCategories.reduce(
    (sum, c) => sum + (c.total || 0),
    0
  );

  
  const totalIncome =
    summary.totalIncome ??
    incomeCategories.reduce((sum, c) => sum + (c.total || 0), 0);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.headerRow}>
          <span className={styles.headerLabel}>Category</span>
          <span className={styles.headerValue}>Sum</span>
        </div>
        {expenseCategories.map((item, idx) => (
          <div key={item.name} className={styles.row}>
            <span
              className={styles.colorBox}
              style={{ backgroundColor: COLORS[idx] || "#888" }}
            />
            <span className={styles.label}>{item.name}</span>
            <span className={styles.value}>{item.total.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Expenses:</span>
          <span className={styles.expenses}>
            {totalExpense.toLocaleString()}
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span>Income:</span>
          <span className={styles.income}>{totalIncome.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
