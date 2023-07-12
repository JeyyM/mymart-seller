import { Bar } from 'react-chartjs-2';

function ProductBarChart({ data, colors }) {
  console.log(data)
  const chartData = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: 'Profit',
        data: data.map((product) => product.profit),
        backgroundColor: colors,
      },
    ],
  };

  const options = {
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

  return <Bar data={chartData} options={options} />;
}

export default ProductBarChart;
