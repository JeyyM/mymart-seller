import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';

function LineChart({ finishedOrders }) {
  const chartData = {
    labels: finishedOrders.map((order) => moment(order.finishedOn)),
    datasets: [
      {
        label: 'Cumulative Profit',
        data: finishedOrders.map((order) => ({
          x: moment(order.finishedOn),
          y: parseInt(order.totals.order),
        })),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        adapters: {
          date: {
            locale: moment.locale('en'),
          },
        },
        time: {
          unit: 'day',
          tooltipFormat: 'DD MMM YYYY',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default LineChart;
