import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';

function FulfillmentLine({ finishedOrders, dateBy }) {
  const daysAgo = moment().subtract(dateBy, 'days');
  const filteredOrders = finishedOrders.filter((order) => moment(order.finishedOn).isAfter(daysAgo));
  console.log(finishedOrders)
  const deliveryData = filteredOrders.reduce((result, order) => {
    const existingItem = result.find(item => moment(item.x).isSame(moment(order.finishedOn), 'day'));
    if (existingItem) {
      if (order.mode === "delivery") {
        existingItem.deliveryTotal += 1;
        existingItem.deliveryFees += order.totals.fees;
      } else if (order.mode === "pickup") {
        existingItem.pickupTotal += 1;
        existingItem.pickupFees += order.totals.fees;
      }
    } else {
      const deliveryTotal = order.mode === "delivery" ? 1 : 0;
      const deliveryFees = order.mode === "delivery" ? order.totals.fees : 0;
      const pickupTotal = order.mode === "pickup" ? 1 : 0;
      const pickupFees = order.mode === "pickup" ? order.totals.fees : 0;
      result.push({
        x: moment(order.finishedOn),
        deliveryTotal: deliveryTotal,
        deliveryFees: deliveryFees,
        pickupTotal: pickupTotal,
        pickupFees: pickupFees,
      });
    }
    return result;
  }, []);
  
  const chartData = {
    labels: filteredOrders.map((order) => moment(order.finishedOn)),
    datasets: [
      {
        label: 'Delivery Fees',
        data: deliveryData.map(item => item.deliveryFees),
        fill: false,
        borderColor: "orangered",
        borderWidth: 5,
        yAxisID: 'fees',
      },
      {
        label: 'Delivery Count',
        data: deliveryData.map(item => item.deliveryTotal),
        fill: false,
        borderColor: "orange",
        borderWidth: 5,
        yAxisID: 'count',
      },
      {
        label: 'Pickup Fees',
        data: deliveryData.map(item => item.pickupFees),
        fill: false,
        borderColor: "green",
        borderWidth: 5,
        yAxisID: 'fees',
      },
      {
        label: 'Pickup Count',
        data: deliveryData.map(item => item.pickupTotal),
        fill: false,
        borderColor: "blue",
        borderWidth: 5,
        yAxisID: 'count',
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
      fees: {
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Fees',
        },
      },
      count: {
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default FulfillmentLine;