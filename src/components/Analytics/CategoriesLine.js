import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';
import { useState, useEffect } from 'react';

function CategoriesLine({ finishedOrders, colors, dateBy, chosen }) {
    const daysAgo = moment().subtract(dateBy, 'days');
    const filteredOrders = finishedOrders.filter((order) => moment(order.finishedOn).isAfter(daysAgo));

    function nameSetup(name, maxLength) {
        if (name.length <= maxLength) {
          return name;
        } else {
          const firstPart = name.substring(0, 9);
          const lastPart = name.substring(name.length - 5);
          return `${firstPart}...${lastPart}`;
        }
      }

    const profitByCategory = filteredOrders.reduce((accumulator, order) => {
        const finishedOn = moment(order.finishedOn).format('YYYY-MM-DD');

        order.order.forEach((item) => {
            const category = item.category;
            const profit = parseFloat(item.profit) * parseFloat(item.cartValue);

            if (!accumulator[category]) {
                accumulator[category] = {};
            }

            if (accumulator[category][finishedOn]) {
                accumulator[category][finishedOn] += profit;
            } else {
                accumulator[category][finishedOn] = profit;
            }
        });

        return accumulator;
    }, {});

    const boughtByCategory = filteredOrders.reduce((accumulator, order) => {
        const finishedOn = moment(order.finishedOn).format('YYYY-MM-DD');

        order.order.forEach((item) => {
            const category = item.category;

            const bought = parseFloat(item.cartValue);

            if (!accumulator[category]) {
                accumulator[category] = {};
            }

            if (accumulator[category][finishedOn]) {
                accumulator[category][finishedOn] += bought;
            } else {
                accumulator[category][finishedOn] = bought;
            }
        });

        return accumulator;
    }, {});

    const averageByCategory = filteredOrders.reduce((accumulator, order) => {
        const finishedOn = moment(order.finishedOn).format('YYYY-MM-DD');

        order.order.forEach((item) => {
            const category = item.category;

            const average = ((parseFloat(item.profit) * parseFloat(item.cartValue)) + parseFloat(item.cartValue)/2);

            if (!accumulator[category]) {
                accumulator[category] = {};
            }

            if (accumulator[category][finishedOn]) {
                accumulator[category][finishedOn] += average;
            } else {
                accumulator[category][finishedOn] = average;
            }
        });

        return accumulator;
    }, {});

    const profitData = [];

    Object.entries(profitByCategory).forEach(([category, data]) => {
        Object.entries(data).forEach(([finishedOn, profit]) => {
            profitData.push({
                x: moment(finishedOn),
                y: parseInt(profit),
                category: category,
            });
        });
    });

    const boughtData = [];

    Object.entries(boughtByCategory).forEach(([category, data]) => {
        Object.entries(data).forEach(([finishedOn, bought]) => {
            boughtData.push({
                x: moment(finishedOn),
                y: parseInt(bought),
                category: category,
            });
        });
    });

    const averageData = [];

    Object.entries(averageByCategory).forEach(([category, data]) => {
        Object.entries(data).forEach(([finishedOn, average]) => {
            averageData.push({
                x: moment(finishedOn),
                y: parseInt(average),
                category: category,
            });
        });
    });

    const chartData1 = {
        datasets: Object.entries(profitByCategory).map(([category, data], index) => ({
            label: nameSetup(category, 15),
            data: Object.entries(data).map(([finishedOn, profit]) => ({
                x: moment(finishedOn),
                y: parseInt(profit),
            })),
            fill: false,
            borderColor: colors[index],
            borderWidth: 5,
            yAxisID: 'profits',
        })),
    };

    const chartData2 = {
        datasets: Object.entries(boughtByCategory).map(([category, data], index) => ({
            label: nameSetup(category, 15),
            data: Object.entries(data).map(([finishedOn, bought]) => ({
                x: moment(finishedOn),
                y: parseInt(bought),
            })),
            fill: false,
            borderColor: colors[index],
            borderWidth: 5,
            yAxisID: 'bought',
        })),
    };

    const chartData3 = {
        datasets: Object.entries(averageByCategory).map(([category, data], index) => ({
            label: nameSetup(category, 15),
            data: Object.entries(data).map(([finishedOn, average]) => ({
                x: moment(finishedOn),
                y: parseInt(average),
            })),
            fill: false,
            borderColor: colors[index],
            borderWidth: 5,
            yAxisID: 'average',
        })),
    };

    const [Used, setUsed] = useState(chartData1)
    useEffect(() => {
      chosen === 1 ? setUsed(chartData1) : chosen === 2 ? setUsed(chartData2) : setUsed(chartData3)
    }, [chosen, finishedOrders])

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
                    text: chosen === 1 ? "Profits" : chosen === 2 ? "Bought" : "Average",
                },
            },
        },
        plugins: {
            legend: {
                position: 'left'
            }
        }
    }

        return <Line data = { Used } options = { chartOptions } />;
}

export default CategoriesLine;
