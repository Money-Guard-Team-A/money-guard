import React from "react";
import styles from './StatisticsDashboard.module.css';

const StatisticsDashboard = ({ month, year, onChangeMonth, onChangeYear }) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div className={styles.dashboard}>
            <div className={styles.field}>
                <label className={styles.label}>Ay</label>
                <select 
                    value={month}
                    onChange={e => onChangeMonth(Number(e.target.value))}
                    className={styles.select}
                >
                    {months.map(m => (
                        <option key={m} value={m}>{m}. Ay</option>
                    ))}
                </select>
            </div>
            
            <div className={styles.field}>
                <label className={styles.label}>Yıl</label>
                <select
                    value={year}
                    onChange={e => onChangeYear(Number(e.target.value))}
                    className={styles.select}
                >
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default StatisticsDashboard;
