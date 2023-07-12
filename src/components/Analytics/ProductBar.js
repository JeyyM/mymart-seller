import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

function ProductBarChart({ data, colors, chosen }) {
  const chartData1 = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: 'Profit',
        data: data.map((product) => product.profit),
        backgroundColor: colors,
      },
    ],
  };

  const chartData2 = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: 'Profit',
        data: data.map((product) => product.orders),
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'white',
      },
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Profit',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Product Name',
        },
      },
    },
  };

  const [Used, setUsed] = useState(chartData1)
  useEffect(() => {
    chosen === 1 ? setUsed(chartData1) : setUsed(chartData2)
  }, [chosen, data])

  return <Bar data={Used} options={options} />;
}

export default ProductBarChart;
