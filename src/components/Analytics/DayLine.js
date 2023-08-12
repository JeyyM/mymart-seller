import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';

function DayLine({ finishedOrders, profitColor, cartValueColor, dateBy }) {
  const daysAgo = moment().subtract(dateBy, 'days');
  const filteredOrders = finishedOrders.filter((order) => moment(order.finishedOn).isAfter(daysAgo));

  // const profitData = filteredOrders.map((order) => {
  //   const profitTotal = order.order.reduce((total, item) => total + (item.profit * item.cartValue), 0);
  //   return {
  //     x: moment(order.finishedOn),
  //     y: profitTotal,
  //   };
  // });
  
  // const boughtTotal = filteredOrders.map((order) => ({
  //   x: moment(order.finishedOn),
  //   y: order.order.reduce((total, item) => total + item.cartValue, 0),
  // }));

  const aggregatedData = {};

  filteredOrders.forEach((order) => {
    const day = moment(order.finishedOn).format('YYYY-MM-DD');
    if (!aggregatedData[day]) {
      aggregatedData[day] = {
        profitTotal: 0,
        cartValueTotal: 0,
      };
    }
    const orderProfit = order.order.reduce(
      (total, item) => total + item.profit * item.cartValue,
      0
    );
    const orderCartValue = order.order.reduce(
      (total, item) => total + item.cartValue,
      0
    );
    aggregatedData[day].profitTotal += orderProfit;
    aggregatedData[day].cartValueTotal += orderCartValue;
  });  

  // console.log(aggregatedData)

  const profitData = Object.entries(aggregatedData).map(([day, data]) => ({
    x: moment(day),
    y: data.profitTotal,
  }));
  
  const boughtTotal = Object.entries(aggregatedData).map(([day, data]) => ({
    x: moment(day),
    y: data.cartValueTotal,
  }));

  const chartData = {
    labels: profitData.map((order) => moment(order.x)),
    datasets: [
      {
        label: 'Profits per day',
        data: profitData,
        fill: false,
        borderColor: profitColor,
        borderWidth: 5,
        yAxisID: 'profits',
      },
      {
        label: 'Units sold',
        data: boughtTotal,
        fill: false,
        borderColor: cartValueColor,
        borderWidth: 5,
        yAxisID: 'cartValue',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        adapters: {
          date: {
            locale: moment.locale('en'),
          },
        },
        time: {
          unit: 'day',
          tooltipFormat: 'DD MMM YYYY',
        },
      },
      profits: {
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Profits',
        },
      },
      cartValue: {
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Units Sold',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default DayLine;