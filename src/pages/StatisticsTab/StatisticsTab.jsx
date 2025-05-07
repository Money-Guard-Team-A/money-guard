import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import Chart from '../../components/Chart/Chart';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import styles from './StatisticsTab.module.css';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

function StatisticsTab() {
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
};
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/transactions");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export default StatisticsTab;
