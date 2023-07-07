import { Fragment, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Import Chart and registerables

import { getServerSideProps } from "../categories";

Chart.register(...registerables); // Register the necessary scale adapters

function Analytics(martID) {
  const finishedOrders = martID.shopID.shopData.shopSales.finishedOrders;
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: finishedOrders.map((order) => order.finishedOn),
      datasets: [
        {
          label: "Cumulative Profit",
          data: calculateCumulativeProfit(finishedOrders),
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });
  }, [finishedOrders]);

  const calculateCumulativeProfit = (orders) => {
    let cumulativeProfit = 0;
    return orders.map((order) => {
      cumulativeProfit += parseInt(order.totals.order);
      return cumulativeProfit;
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Mart Analytics</title>
      </Head>
      <div className="analytics-container">
        <span className="page-heading">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-insights svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-primary no-margin">&nbsp;Mart Analytics</h1>
        </span>
        <canvas ref={chartRef} />
      </div>
    </Fragment>
  );
}

export default Analytics;

export { getServerSideProps };
