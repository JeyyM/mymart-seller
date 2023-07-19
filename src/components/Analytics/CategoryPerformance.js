import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';

function CategoryPerformance({ data, colors }) {
  const chartData = {
    labels: data.map(category => category.name.substring(0, 10)),
    datasets: [
      {
        data: data.map(category => category.profitTotal),
        backgroundColor: colors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
      },
    }
  };

  return <>
    <Pie data={chartData} options={chartOptions} />
  </>
}

export default CategoryPerformance;
