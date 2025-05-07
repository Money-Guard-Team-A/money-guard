import { useSelector, useDispatch  } from "react-redux";
import styles from "./StatisticsTable.module.css";

const StatisticsTable = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.statistics?.data ?? []);

  const categories = stats?.categories ?? [];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={`${styles.cell} ${styles.category}`}>Kategori</th>
            <th className={`${styles.cell} ${styles.amount}`}>Tutar</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.name} className={styles.row}>
                <td className={`${styles.cell} ${styles.category}`}>
                  {cat.name}
                </td>
                <td className={`${styles.cell} ${styles.amount}`}>
                  {cat.total.toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={styles.cell} colSpan={2}>
                Veri yok
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
