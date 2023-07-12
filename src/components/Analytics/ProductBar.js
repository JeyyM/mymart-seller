import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';

function ProductBarChart({ data, colors, chosen, sort }) {
  let sortedData = [...data];

  if (sort === 2) {
    sortedData.sort((a, b) => a.profit - b.profit);
  } else if (sort === 3) {
    sortedData.sort((a, b) => b.profit - a.profit);
  }

  let productColorsFn = () => {
    return sortedData.map(({ name }) => {
      const rng = seedrandom(name.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  };  

  const productColors = productColorsFn()

    let sortedData2 = [...data];

  if (sort === 2) {
    sortedData2.sort((a, b) => a.orders - b.orders);
  } else if (sort === 3) {
    sortedData2.sort((a, b) => b.orders - a.orders);
  }

  let productColorsFn2 = () => {
    return sortedData2.map(({ name }) => {
      const rng = seedrandom(name.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  };  

  const productColors2 = productColorsFn()

  const chartData1 = {
    labels: sortedData.map((product) => product.name),
    datasets: [
      {
        label: `Profit${sort === 1 ? "" : sort === 2 ? " (Ascending)" : " (Descending)"}`,
        data: sortedData.map((product) => product.profit),
        backgroundColor: productColors,
      },
    ],
  };

  const chartData2 = {
    labels: sortedData2.map((product) => product.name),
    datasets: [
      {
        label: `Orders${sort === 1 ? "" : sort === 2 ? " (Ascending)" : " (Descending)"}`,
        data: sortedData2.map((product) => product.orders),
        backgroundColor: productColors2,
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
