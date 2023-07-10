import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';

function GenderChart({ data, colors }) {
  const chartData = {
    labels: data.map(data => data.gender),
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

export default GenderChart;
