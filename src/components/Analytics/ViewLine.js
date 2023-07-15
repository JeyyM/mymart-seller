import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';

function ViewLine({ views, dateBy }) {
  const daysAgo = moment().subtract(dateBy, 'days');
  const filteredViews = views.filter((view) => moment(view.key).isAfter(daysAgo));

  const viewData = filteredViews.map((view) => {
    const viewTotal = parseInt(view.count);
    return {
      x: moment(view.key),
      y: viewTotal,
    };
  });

  const chartData = {
    labels: filteredViews.map((view) => moment(view.key)),
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
