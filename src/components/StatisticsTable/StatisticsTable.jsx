import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransactions,
  transactionSummary,
} from "../../redux/transactions/operations";
import styles from "./StatisticsTable.module.css";

const StatisticsTable = ({ month, year }) => {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.transactions.summary);
  const isLoading = useSelector((state) => state.transactions.isLoading);
  const error = useSelector((state) => state.transactions.error);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(transactionSummary({ month, year }));
  }, [dispatch, month, year]);

  const categoriesSummary = Array.isArray(summary?.categoriesSummary)
    ? summary.categoriesSummary
    : [];

  const totalExpense = categoriesSummary.reduce(
    (acc, item) => acc + (item.total || 0),
    0
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <h3>Kategorilere Göre Harcama</h3>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.cell}>Kategori</th>
            <th className={styles.cell}>Toplam</th>
          </tr>
        </thead>
        <tbody>
          {categoriesSummary.length > 0 ? (
            categoriesSummary.map((item) => (
              <tr key={item.name} className={styles.row}>
                <td className={styles.cell}>{item.name}</td>
                <td className={styles.cell}>{item.total.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={styles.cell} colSpan={2}>
                Kategori verisi bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className={styles.cell}>
              <strong>Toplam Gider</strong>
            </td>
            <td className={styles.cell}>
              <strong>{totalExpense.toLocaleString()}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default StatisticsTable;
