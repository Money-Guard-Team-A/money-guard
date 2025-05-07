import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { transactionSummary } from "../../redux/transactions/operations";
import "chart.js/auto";

const Chart = ({ month, year }) => {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.transactions.summary);

  useEffect(() => {
    dispatch(transactionSummary({ month, year }));
  }, [dispatch, month, year]);

  const categoriesSummary = Array.isArray(summary?.categoriesSummary)
    ? summary.categoriesSummary
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

  return <Doughnut data={data} />;
};

export default Chart;
