import { useMemo, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

function RankPie({ data, colors, chosen }) {
    const chartData1 = {
    labels: data.map(category => category.name.substring(0, 10)),
    datasets: [
      {
        data: data.map(category => category.profitTotal),
        backgroundColor: colors,
      },
    ],
  };

  const chartData2 = {
    labels: data.map(category => category.name.substring(0, 10)),
    datasets: [
      {
        data: data.map(category => category.orderTotal),
        backgroundColor: colors,
      },
    ],
  };

  const chartData3 = {
    labels: data.map(category => category.name.substring(0, 10)),
    datasets: [
      {
        data: data.map(category => category.performanceTotal),
        backgroundColor: colors,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left'
      }
    }
  };

    const [Used, setUsed] = useState(chartData1)
  useEffect(() => {
    chosen === 1 ? setUsed(chartData1) : setUsed(chartData2)
  }, [chosen, data])

  return <>
    <Pie data={Used} options={chartOptions} />
  </>
}

export default RankPie;