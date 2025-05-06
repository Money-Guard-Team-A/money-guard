import React, { useState } from 'react';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import Chart from '../../components/Chart/Chart';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import styles from './StatisticsTab.module.css';

export default function StatisticsTab() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  return (
    <div className={styles.tabContainer}>
      <section>
        <h2>Statistics Dashboard</h2>
        <StatisticsDashboard
          month={month}
          year={year}
          onChangeMonth={setMonth}
          onChangeYear={setYear}
        />
      </section>

      <section>
        <h2>Chart</h2>
        <Chart month={month} year={year} />
      </section>

      <section>
        <h2>Statistics Table</h2>
        <StatisticsTable />
      </section>
    </div>
  );
}
