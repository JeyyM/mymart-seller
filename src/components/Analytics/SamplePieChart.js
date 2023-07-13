import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const SamplePieChart = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const data = {
      labels: ['Category 1', 'Category 2', 'Category 3'],
      datasets: [
        {
          data: [30, 50, 20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: '#fff',
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
        //   setSelectedCategory(data.labels[index]);
        console.log(data.labels[index])
        }
      },
    };
  
    return (
      <div>
        <Pie data={data} options={options} />
        {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
      </div>
    );
  };
  
  export default SamplePieChart;
  