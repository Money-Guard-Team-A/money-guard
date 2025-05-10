import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencyRates } from "../../redux/currency/operations";
import { selectCurrencyRates } from "../../redux/currency/selectors";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from "chart.js";
import css from "./Currency.module.css";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

const Currency = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectCurrencyRates);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const formatRate = (rate) => {
    return rate?.toFixed(2) || "N/A";
  };

  const usdRate = rates?.find((rate) => rate.currencyCodeA === 840) || {};
  const eurRate = rates?.find((rate) => rate.currencyCodeA === 978) || {};

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "USD Rate",
        data: [27.55, 27.6, 27.5, 27.65, 27.7],
        borderColor: "#FF8A65",
        backgroundColor: function (context) {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "#ffffff");
          gradient.addColorStop(1, "#39009620");
          return gradient;
        },
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "USD Rate - 2 units",
        data: [27.55, 27.6, 27.5, 27.65, 27.7].map((val) => val - 0.05),
        borderColor: "#9E9E9E10",
        backgroundColor: function (context) {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "#ffffff");
          gradient.addColorStop(1, "#39009620");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        fill: "start",
      },
    ],
  };
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
        border: { display: false },
      },
      y: {
        display: false,
        grid: { display: false },
        border: { display: false },
        min: 27.2, 
      },
    },
  };

  if (!rates || rates.length === 0) {
    return <p>Loading exchange rates...</p>;
  }

  return (
    <div className={css.container}>
      <table className={css.table}>
        <thead className={css.tableHeader}>
          <tr className={css.tableRow}>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody className={css.tableBody}>
          <tr>
            <td>USD</td>
            <td>{formatRate(usdRate.rateBuy)}</td>
            <td>{formatRate(usdRate.rateSell)}</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>{formatRate(eurRate.rateBuy)}</td>
            <td>{formatRate(eurRate.rateSell)}</td>
          </tr>
        </tbody>
      </table>

      <div className={css.chartContainer}>
        <div className={css.chartWrapper}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Currency;
