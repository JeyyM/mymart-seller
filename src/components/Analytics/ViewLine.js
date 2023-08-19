import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';

function ViewLine({ views, dateBy }) {
  const daysAgo = moment().subtract(dateBy, 'days');
  const filteredViews = views.filter((view) => moment(view.key).isAfter(daysAgo));

  const aggregatedData = {}; 
  
  filteredViews.forEach((view) => {
    const viewDate = moment(view.key).format('YYYY-MM-DD');
    const viewTotal = parseInt(view.count);
    
    if (aggregatedData[viewDate]) {
      aggregatedData[viewDate] += viewTotal;
    } else {
      aggregatedData[viewDate] = viewTotal;
    }
  });

  const viewData = Object.keys(aggregatedData).map((date) => ({
    x: moment(date),
    y: aggregatedData[date],
  }));

  const chartData = {
    labels: viewData.map((data) => data.x),
    datasets: [
      {
        label: 'Views per day',
        data: viewData,
        fill: false,
        borderColor: 'navy',
        borderWidth: 5,
        yAxisID: 'views',
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
      views: {
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Views',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default ViewLine;
