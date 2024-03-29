import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ data, colors, type }) {
  const chartData = {
    labels: data.map(data => data[type]),
    datasets: [
      {
        data: data.map(data => data.count),
        backgroundColor: colors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <>
    <Pie data={chartData} options={chartOptions} />
  </>
}

export default PieChart;
