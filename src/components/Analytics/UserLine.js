import { Line } from 'react-chartjs-2';
import moment from 'moment';

function UserLine({ users, dateBy }) {
  const daysAgo = moment().subtract(dateBy, 'days');
  const filteredUsers = users.filter((user) => moment(user.creationDate).isAfter(daysAgo));

  const userData = filteredUsers.reduce((data, user) => {
    const creationDate = moment(user.creationDate).startOf('day').format('YYYY-MM-DD');
    const existingData = data.find((item) => item.x === creationDate);
    if (existingData) {
      existingData.y += 1;
    } else {
      data.push({
        x: creationDate,
        y: 1,
      });
    }
    return data;
  }, []);

  const chartData = {
    labels: filteredUsers.map((user) => moment(user.creationDate)),
    datasets: [
      {
        label: 'New Users per Day',
        data: userData,
        fill: false,
        borderColor: 'blueviolet',
        borderWidth: 5,
        yAxisID: 'newUsers',
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
      newUsers: {
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'New Users',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default UserLine;
