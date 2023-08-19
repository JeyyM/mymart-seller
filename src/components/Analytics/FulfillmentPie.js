import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

function FulfillmentPie({ ds, dc, ps, pc, chosen }) {
  const chartData = {
    labels: ["Delivery Sum", "Pickup Sum"],
    datasets: [
      {
        data: [ds, ps],
        backgroundColor: ["orange", "teal"],
      },
    ],
  };

  const chartData2 = {
    labels: ["Delivery Count", "Pickup Count"],
    datasets: [
      {
        data: [dc, pc],
        backgroundColor: ["orange", "teal"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const [Used, setUsed] = useState(chartData)
  useEffect(() => {
    chosen === 1 ? setUsed(chartData) : setUsed(chartData2)
  }, [chosen, ds, dc, ps, pc])

  return <>
    <Pie data={Used} options={chartOptions} />
  </>
}

export default FulfillmentPie;
