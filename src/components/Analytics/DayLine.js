import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';

function DayLine({ finishedOrders, profitColor, cartValueColor, dateBy }) {
  const thirtyDaysAgo = moment().subtract(dateBy, 'days');
  const filteredOrders = finishedOrders.filter((order) => moment(order.finishedOn).isAfter(thirtyDaysAgo));

  const profitData = filteredOrders.map((order) => ({
    x: moment(order.finishedOn),
    y: parseInt(order.totals.order),
  }));

  const cartValueData = filteredOrders.map((order) => ({
    x: moment(order.finishedOn),
    y: order.order.reduce((total, item) => total + item.cartValue, 0),
  }));

  const chartData = {
    labels: filteredOrders.map((order) => moment(order.finishedOn)),
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
        label: 'Orders per day',
        data: cartValueData,
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
          text: 'Ordered Items',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default DayLine;