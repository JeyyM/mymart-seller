import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';

function CategoryPerformance({ data, colors }) {
  function nameSetup(name, maxLength) {
    if (name.length <= maxLength) {
      return name;
    } else {
      const firstPart = name.substring(0, 9);
      const lastPart = name.substring(name.length - 5);
      return `${firstPart}...${lastPart}`;
    }
  }

  const chartData = {
    labels: data.map(category => nameSetup(category.name, 15)),
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
