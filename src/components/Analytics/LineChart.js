import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { adapterFactory } from "chartjs-adapter-date-fns";

Chart.register(...registerables);
// Chart.register(adapterFactory);
// useEffect(() => {
//     Chart.register(adapterFactory);
//   }, []);

console.log(adapterFactory)

function LineChart({ finishedOrders }) {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chartData = {
//       labels: finishedOrders.map((order) => order.finishedOn),
//       datasets: [
//         {
//           label: "Cumulative Profit",
//           data: calculateCumulativeProfit(finishedOrders),
//           fill: false,
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//         },
//       ],
//     };

//     const chartOptions = {
//       responsive: true,
//       scales: {
//         x: {
//           type: "time",
//           time: {
//             unit: "day",
//           },
//         },
//         y: {
//           beginAtZero: true,
//         },
//       },
//     };

//     const ctx = chartRef.current.getContext("2d");
//     new Chart(ctx, {
//       type: "line",
//       data: chartData,
//       options: chartOptions,
//     });
//   }, [finishedOrders]);

//   const calculateCumulativeProfit = (orders) => {
//     let cumulativeProfit = 0;
//     return orders.map((order) => {
//       cumulativeProfit += parseInt(order.totals.order);
//       return cumulativeProfit;
//     });
//   };

//   return <canvas ref={chartRef} />;
return <h1>TEst</h1>
}

export default LineChart;
