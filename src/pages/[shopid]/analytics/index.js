import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getServerSideProps } from '../categories';
import Link from 'next/link';
import { Fragment, useState, useMemo, useEffect } from 'react';
import PieChart from '@/components/Analytics/PieChart';

const DynamicLineChart = dynamic(() => import('../../../components/Analytics/DayLine'), {
  ssr: false,
});

function Analytics(martID) {
  const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;

  const filteredItems = martID.shopID.shopData.shopSales.finishedOrders.filter((order) => order.status === 'finished');
  
  const [SelectDate, setSelectDate] = useState("30");
  const handleSelectDate = (event, index) => {
    setSelectDate(event.target.value);
  };

  const [SelectDate2, setSelectDate2] = useState("30");
  const handleSelectDate2 = (event, index) => {
    setSelectDate2(event.target.value);
  };

  const finishedOrders = filteredItems.filter(item => {
    const finishedOnDate = new Date(item.finishedOn);
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - finishedOnDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference <= SelectDate
  });

  const products = [];

  useEffect(() => {
    finishedOrders.forEach((order) => {
      order.order.forEach((item) => {
        const existingProduct = products.find((product) => product.name === item.name && product.category === item.category);
  
        if (existingProduct) {
          existingProduct.orders += parseFloat(item.cartValue);
          existingProduct.profit += parseFloat(item.profit * item.cartValue);
        } else {
          products.push({
            name: item.name,
            category: item.category,
            orders: parseFloat(item.cartValue),
            profit: parseFloat(item.profit),
            url: item.url,
          });
        }
      });
    });

    console.log("test")
  }, [SelectDate])

  finishedOrders.forEach((order) => {
    order.order.forEach((item) => {
      const existingProduct = products.find((product) => product.name === item.name && product.category === item.category);

      if (existingProduct) {
        existingProduct.orders += parseFloat(item.cartValue);
        existingProduct.profit += parseFloat(item.profit * item.cartValue);
      } else {
        products.push({
          name: item.name,
          category: item.category,
          orders: parseFloat(item.cartValue),
          profit: parseFloat(item.profit),
          url: item.url,
        });
      }
    });
  });

  console.log(products)

  const [profitSymbol, setProfitSymbol] = useState(true);
  function handleProfit() {
    setProfitSymbol(!profitSymbol);
  }
  const [boughtSymbol, setBoughtSymbol] = useState(true);
  function handleBought() {
    setBoughtSymbol(!boughtSymbol);
  }

  const mostProfit = [...products].sort((a, b) => {
    if (profitSymbol === true) {
      return b.profit - a.profit;
    } else {
      return a.profit - b.profit;
    }
  });

  const mostBought = [...products].sort((a, b) => {
    if (boughtSymbol === true) {
      return b.orders - a.orders;
    } else {
      return a.orders - b.orders;
    }
  });

  const [profitColor, cartValueColor] = useMemo(() => {
    const generateColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
    return [generateColor(), generateColor()];
  }, []);

  const categories = products.reduce((result, item) => {
    const existingCategory = result.find(category => category.name === item.category);

    if (existingCategory) {
      existingCategory.products.push({
        name: item.name,
        orders: item.orders,
        profit: item.profit
      });
      existingCategory.orderTotal += item.orders;
      existingCategory.profitTotal += item.profit;
    } else {
      result.push({
        name: item.category,
        products: [{
          name: item.name,
          orders: item.orders,
          profit: item.profit
        }],
        orderTotal: item.orders,
        profitTotal: item.profit
      });
    }

    return result;
  }, []);

  const pieColors = useMemo(() => {
    return categories.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16));
  }, []);
  
  return (
    <Fragment>
      <Head>
        <title>Mart Analytics</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>

      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-insights svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">&nbsp;Mart Analytics</h1>
      </span>
      <div className="analytics-container">
        <div className="analytics-row round-borderer round-borderer-extra">
          <span className="page-heading">
            <div className="heading-icon-profit svg-color">&nbsp;</div>
            <h1 className="heading-secondary no-margin">&nbsp;Sales & Profits</h1>
            <select
              value={SelectDate}
              className="text-options text-black"
              style={{ width: "20rem", marginLeft:"1rem", transform:"translateY(-0.4rem)"}}
              onChange={(event) => handleSelectDate(event)}
            >
              <option value="1">Today</option>
              <option value="30">Past 30 Days</option>
              <option value="9999">All Time</option>
              <option value="-5">Neg</option>
            </select>

            <Link href={`#`} className="product-action-2 flex-row-align" style={{ width: "18rem", margin: "0rem 1rem", marginLeft:"auto", height:"3.5rem", textDecoration:"none"}}><h3 className="heading-tertiary margin-side solid-text-color" style={{transform:"translateY(0rem)"}}>See More</h3></Link>
          </span>
          
          <div className="analytics-grid">
            <div className="analytics-preview">
              <DynamicLineChart finishedOrders={finishedOrders} profitColor={profitColor} cartValueColor={cartValueColor} dateBy={SelectDate}/>
            </div>

            <div className="analytics-rank-prev round-borderer round-borderer-extra">
              <div className="flex-row" style={{ paddingBottom: '1rem' }}>
                <div className="text-sec-popular svg-secondary">&nbsp;</div>
                <h2 className="heading-secondary">Most Bought</h2>
                <div className="heading-icon-tune svg-secondary" style={{ marginLeft: 'auto' }} onClick={handleBought}>
                  &nbsp;
                </div>
              </div>
              {mostBought.slice(0, 10).map((item, index) => {
                return (
                  <div className="flex-row" key={index}>
                    <Link href={`/${item.url}`} className="heading-tertiary" style={{ textDecoration: 'none' }}>
                      {index + 1}. {item.name.length > 10 ? item.name.substring(0, 7) + '...' : item.name} -{' '}
                      {item.category.length > 8 ? item.category.substring(0, 5) + '...' : item.category}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="analytics-rank-prev round-borderer round-borderer-extra">
              <div className="flex-row" style={{ paddingBottom: '1rem' }}>
                <div className="text-sec-profitable svg-secondary">&nbsp;</div>
                <h2 className="heading-secondary">Top Grossing</h2>
                <div className="heading-icon-tune svg-secondary" style={{ marginLeft: 'auto' }} onClick={handleProfit}>
                  &nbsp;
                </div>
              </div>
              {mostProfit.slice(0, 10).map((item, index) => {
                return (
                  <div className="flex-row" key={index}>
                    <Link href={`/${item.url}`} className="heading-tertiary" style={{ textDecoration: 'none' }}>
                      {index + 1}. {item.name.length > 10 ? item.name.substring(0, 7) + '...' : item.name} -{' '}
                      {item.category.length > 8 ? item.category.substring(0, 5) + '...' : item.category}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="analytics-categ-prev">
              <PieChart data={categories} colors={pieColors} />
            </div>
          </div>
        </div>

        <div className="analytics-row round-borderer round-borderer-extra">
        <span className="page-heading">
            <div className="heading-icon-profile svg-color">&nbsp;</div>
            <h1 className="heading-secondary no-margin">&nbsp;User Data</h1>
            <select
              value={SelectDate2}
              className="text-options text-black"
              style={{ width: "20rem", marginLeft:"1rem", transform:"translateY(-0.4rem)"}}
              onChange={(event) => handleSelectDate2(event)}
            >
              <option value="1">Today</option>
              <option value="30">Past 30 Days</option>
              <option value="9999">All Time</option>
              <option value="-5">Neg</option>
            </select>

            <Link href={`#`} className="product-action-2 flex-row-align" style={{ width: "18rem", margin: "0rem 1rem", marginLeft:"auto", height:"3.5rem", textDecoration:"none"}}><h3 className="heading-tertiary margin-side solid-text-color" style={{transform:"translateY(0rem)"}}>See More</h3></Link>
          </span>
        </div>
      </div>
      <button className="design-modal-button round-borderer">
          <div className="heading-icon-preview svg-color" style={{margin:"0"}}>&nbsp;</div>
        </button>
    </Fragment>
  );
}

export default Analytics;

export { getServerSideProps };
