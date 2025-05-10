import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { transactionSummary } from "../../redux/transactions/operations";
import { selectTransactions } from "../../redux/transactions/selectors";
import "chart.js/auto";

const Chart = ({ month, year }) => {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.transactions.summary);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(transactionSummary({ month, year }));
  }, [dispatch, month, year]);

  const totalBalance = transactions.reduce((acc, transaction) => {
    return (
      acc +
      (transaction.type === "income" ? transaction.amount : -transaction.amount)
    );
  }, 0);

  // Sadece "Income" olmayanları filtrele
  const categoriesSummary = Array.isArray(summary?.categoriesSummary)
    ? summary.categoriesSummary.filter((item) => item.name !== "Income")
    : [];

  const data = {
    labels: categoriesSummary.map((item) => item.name),
    datasets: [
      {
        label: "Expenses",
        data: categoriesSummary.map((item) => item.total),
        backgroundColor: [
          "rgba(253, 148, 152, 1)",
          "rgba(74, 86, 226, 1)",
          "rgba(129, 225, 255, 1)",
          "rgba(254, 208, 87, 1)",
          "rgba(0, 173, 132, 1)",
          "rgba(36, 204, 167, 1)",
          "rgba(110, 120, 232, 1)",
          "rgba(197, 186, 255, 1)",
          "rgba(255, 216, 208, 1)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;

      ctx.save();

      const fontSize = 22;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const text = `☼ ${totalBalance.toFixed(2)}`;
      const x = width / 2;
      const y = height / 2;

      ctx.fillText(text, x, y);
      ctx.restore();
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
      width={288}
      height={288}
      plugins={[centerTextPlugin]}
    />
  );
};

export default Chart;
