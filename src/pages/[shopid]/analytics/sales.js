import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getServerSideProps } from '../categories';
import Link from 'next/link';
import { Fragment, useState, useMemo, useEffect } from 'react';
import CategoryPerformance from '@/components/Analytics/CategoryPerformance';
import PieChart from '@/components/Analytics/PieChart';
import seedrandom from 'seedrandom';
import ShowUser from '@/components/Analytics/ShowUser';
import RankPie from '@/components/Analytics/RankPie';
import ProductBar from '@/components/Analytics/ProductBar';
import FulfillmentLine from '@/components/Analytics/FulfillmentLine';
import FulfillmentPie from '@/components/Analytics/FulfillmentPie';
// import ModalCategory from '@/components/Analytics/ModalCategory';
import { CSVLink, CSVDownload } from 'react-csv';

const DynamicLineChart = dynamic(() => import('../../../components/Analytics/DayLine'), {
  ssr: false,
});

const DynamicCategoriesLine = dynamic(() => import('../../../components/Analytics/CategoriesLine'), {
  ssr: false,
});

const DynamicUserMap = dynamic(() => import('../../../components/Analytics/UserMap'), {
  ssr: false,
});

function Sales(martID) {
  const router = useRouter()
  const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;
  const shopCurrency = martID.shopID.shopData.shopDetails.paymentData.checkoutInfo.currency

  const filteredOrders = martID.shopID.shopData.shopSales.finishedOrders.filter((order) => order.status === 'finished');

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const formattedDate = dateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).replace(/\//g, '-');

    const formattedDateTime = `${formattedDate}`;

    return formattedDateTime;
}
    
  const csvData = martID.shopID.shopData.shopSales.finishedOrders.flatMap(item =>
    item.order.map(orderItem => ({
      "Order ID": "'" + item.id,
      "Start Date": item.currentTime,
      "Finish Date": item.finishedOn,
      "Email": item.user.email,
      "Name": item.user.profile.first + " " + item.user.profile.last,
      "Phone #": item.user.profile.pnum,
      "Company": item.user.profile.company,
      "Mode": item.mode,
      "Status": item.status,
      "Category": orderItem.category,
      "Product Name": orderItem.name,
      "Price": orderItem.price,
      "Profit": orderItem.profit,
      "Amount": orderItem.cartValue,
      "Link": orderItem.url
    }))
  );

    const convertToCSV = (data) => {
      const headers = Object.keys(data[0]);
      const rows = data.map(obj => headers.map(header => obj[header]));
      const csvArray = [headers, ...rows];
      return csvArray.map(row => row.join(',')).join('\n');
    };
    
    const csvContent = convertToCSV(csvData);
    
    const handleDownload = () => {
      const csvLink = document.createElement('a');
      const csvContentEncoded = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
      csvLink.setAttribute('href', csvContentEncoded);
      csvLink.setAttribute('download', 'data.csv');
      csvLink.click();
    };
    

  const [selectedUser, setSelectedUser] = useState(null);
  const [SetUser, setUserModal] = useState(false);
  const handleSetUser = (user) => {
    setSelectedUser(user);
    setUserModal(!SetUser)
  };

  const [SelectDate, setSelectDate] = useState("30");
  const handleSelectDate = (event, index) => {
    setSelectDate(event.target.value);
  };

  const finishedOrders = filteredOrders.filter(item => {
    const finishedOnDate = new Date(item.finishedOn);
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - finishedOnDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference <= SelectDate
  });

  const products = [];

  // useEffect(() => {
  //   finishedOrders.forEach((order) => {
  //     order.order.forEach((item) => {
  //       const existingProduct = products.find((product) => product.name === item.name && product.category === item.category);

  //       if (existingProduct) {
  //         existingProduct.orders += parseFloat(item.cartValue);
  //         existingProduct.profit += parseFloat(item.profit * item.cartValue);
  //       } else {
  //         products.push({
  //           name: item.name,
  //           category: item.category,
  //           orders: parseFloat(item.cartValue),
  //           profit: parseFloat(item.profit),
  //           url: item.url,
  //         });
  //       }
  //     });
  //   });

  // }, [SelectDate])

  finishedOrders.forEach((order) => {
    order.order.forEach((item) => {
      const existingProduct = products.find((product) => product.name === item.name && product.category === item.category);

      if (existingProduct) {
        existingProduct.orders += parseFloat(item.cartValue);
        existingProduct.profit += parseFloat(item.profit) * parseFloat(item.cartValue);
      } else {
        products.push({
          name: item.name,
          category: item.category,
          orders: parseFloat(item.cartValue),
          profit: parseFloat(item.profit) * parseFloat(item.cartValue),
          url: item.url,
          unit: item.unit,
          price: item.price,
          image: item.image,
          profitper: item.profit,
        });
      }
    });
  });

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

  const startIndex1 = boughtSymbol ? 0 : mostBought.length - 50;
  const startIndex2 = profitSymbol ? 0 : mostProfit.length - 50;

  const profitColor = "red"
  const cartValueColor = "blue"

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
        profitTotal: item.profit,
      });
    }

    return result;
  }, []);

  const categoryColors = () => {
    return categories.map(({ name }) => {
      const rng = seedrandom(name.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  }

  const categoryColorsArray = categoryColors()

  const ageList = [];

  let weightedSum = 0;
  let ageCountTotal = 0;

  for (const entry of ageList) {
    weightedSum += entry.age * entry.count;
    ageCountTotal += entry.count;
  }

  const profitArray = finishedOrders.map((order) => order.order.reduce((total, item) => total + (item.profit * item.cartValue), 0));
  const boughtArray = finishedOrders.map((order) => order.order.reduce((total, item) => total + item.cartValue, 0));

  const totalProfit = profitArray.reduce((acc, curr) => acc + curr, 0);
  const totalUnits = boughtArray.reduce((acc, curr) => acc + curr, 0);

  const [rank, setRank] = useState(1)
  const handleRank = () => {
    if (rank < 2) {
      setRank(rank + 1);
    } else {
      setRank(1);
    }
  };

  const [rank2, setRank2] = useState(1)
  const handleRank2 = () => {
    if (rank2 < 2) {
      setRank2(rank2 + 1);
    } else {
      setRank2(1);
    }
  };

  const [rank3, setRank3] = useState(1)
  const handleRank3 = () => {
    if (rank3 < 2) {
      setRank3(rank3 + 1);
    } else {
      setRank3(1);
    }
  };

  const [rank4, setRank4] = useState(1)
  const handleRank4 = () => {
    if (rank4 < 3) {
      setRank4(rank4 + 1);
    } else {
      setRank4(1);
    }
  };

  const [rank5, setRank5] = useState(1)
  const handleRank5 = () => {
    if (rank5 < 2) {
      setRank5(rank5 + 1);
    } else {
      setRank5(1);
    }
  };

  const categorizedData = finishedOrders.flatMap((order) => {
    return order.order.map((item) => ({
      name: item.name,
      category: item.category,
      profit: parseFloat(item.profit) * parseFloat(item.cartValue),
      cartValue: parseFloat(item.cartValue),
      time: order.finishedOn
    }));
  });

  const categoriesList = Array.from(
    new Set(categorizedData.map((item) => item.category))
  );
  
  const [selectedCategory, setSelectedCategory] = useState(categoriesList[0])
  useEffect(() => {
    setSelectedCategory(categoriesList[0])
  },[SelectDate])

  const [categoryBar, setCategoryBar] = useState(categorizedData.filter((item) => item.category === selectedCategory))
  useEffect(() => {
    setCategoryBar(categorizedData.filter((item) => item.category === selectedCategory))
  }, [selectedCategory, SelectDate])

  const combinedProducts = Object.values(categoryBar).reduce((accumulator, item) => {
    const existingProduct = accumulator.find((product) => product.name === item.name);
  
    if (existingProduct) {
      existingProduct.profit += item.profit;
      existingProduct.orders += item.cartValue;
    } else {
      accumulator.push({
        name: item.name,
        profit: item.profit,
        orders: item.cartValue,
      });
    }
  
    return accumulator;
  }, []);

  let deliveryCount = 0;
  let deliverySum = 0;
  let pickupCount = 0;
  let pickupSum = 0;

  for (const item of finishedOrders) {
    if (item.mode === "pickup") {
      pickupCount++;
      pickupSum += item.totals.fees;
    } else if (item.mode === "delivery") {
      deliveryCount++;
      deliverySum += item.totals.fees;
    }
  }

  const [modalCategory, setModalCategory] = useState(false)
  function handleModalCategory(){
    setModalCategory(!modalCategory)
  }

  // const [categoryData, setCategoryData] = useState(null)
  // function showModal(name){
  //   setCategoryData(products.filter((item) => item.category === name))
  //   handleModalCategory()
  // }

  return (
    <Fragment>
      <Head>
        <title>Sales & Profits</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>
      {/* <ModalCategory modalStatus={modalCategory} data={categoryData} disable={handleModalCategory} currency={shopCurrency}></ModalCategory> */}

      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-sales svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">&nbsp;Sales & Profits</h1>
        <select
          value={SelectDate}
          className="text-options text-black"
          style={{ width: "20rem", marginLeft: "1rem" }}
          onChange={(event) => handleSelectDate(event)}
        >
          <option value="1">Today</option>
          <option value="30">Past 30 Days</option>
          <option value="9999">All Time</option>
          <option value="-6">Neg</option>
        </select>
        <button onClick={handleDownload} className="add-categ-init" style={{ width: "17rem", marginLeft:"auto", marginRight:"1rem" }}><h2 className='margin-side heading-tertiary'>Download CSV</h2></button>
      </span>

      <div className='analytics-sales-container'>
        <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-cube svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Total Buys: {totalUnits} unit/s</h2>
            </div>
            <div className="flex-row" style={{ paddingBottom: '1rem', marginRight:"1rem" }}>
              <div className="text-sec-profit svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Total Profits: {shopCurrency} {totalProfit}</h2>
            </div>
          </div>
          <div className='analytics-sales-cell'>
            <DynamicLineChart finishedOrders={finishedOrders} profitColor={profitColor} cartValueColor={cartValueColor} dateBy={SelectDate} />
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent: "space-between", margin: "0.5rem" }}>
            <div className="flex-row" style={{ paddingBottom: '0rem' }}>
              <div className="text-sec-rank svg-tertiary">&nbsp;</div>
              <h2 className="heading-secondary">Categories by {rank === 1 ? "Profits" : rank === 2 ? "Buys" : "Both"}</h2>
            </div>

            <div className="heading-icon-tune svg-secondary" onClick={handleRank}>&nbsp;</div>
          </div>
          <div className='analytics-sales-cell'>
            <RankPie data={categories} colors={categoryColors} chosen={rank}/>
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent: "space-between", margin: "0.5rem" }}>
            <div className="flex-row" style={{ paddingBottom: '0rem' }}>
              {rank2 === 1 ? <><div className="text-sec-profit svg-tertiary">&nbsp;</div></> : rank2 === 2 ? <><div className="text-sec-cube svg-tertiary">&nbsp;</div></> : <div className="text-sec-average svg-tertiary">&nbsp;</div>}
              <h2 className="heading-secondary">Categories by {rank2 === 1 ? <>Profits</> : rank2 === 2 ? <>Buys</> : "Both"}</h2>
            </div>

            <div className="heading-icon-tune svg-secondary" onClick={handleRank2}>&nbsp;</div>
          </div>
          <div className='analytics-sales-cell'>
            <DynamicCategoriesLine finishedOrders={finishedOrders} colors={categoryColorsArray} dateBy={SelectDate} chosen={rank2} />
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent: "space-between" }}>
            <div className="flex-row-spaceless" style={{ paddingBottom: '0rem' }}>
            <div className="text-sec-category svg-tertiary">&nbsp;</div>
              <select
                value={selectedCategory}
                className="text-options text-black"
                style={{ width: "32rem", transform:"translateY(-1rem) scale(90%)" }}
                onChange={(event, index) => setSelectedCategory(event.target.value)}
              >
              {categoriesList.map((item, index) => {
                return <option value={item} key={index}>{item}</option>
              })

              }
              </select>
              <h2 className='heading-secondary'>Products By {rank3 === 1 ? <>Profits</> : rank3 === 2 ? <>Buys</> : "Both"}</h2>
            </div>

            <div className='flex-row' style={{marginRight:"1rem"}}>
            <div className="heading-icon-average svg-secondary" onClick={handleRank4}>&nbsp;</div>
              <div className="heading-icon-tune svg-secondary" onClick={handleRank3}>&nbsp;</div>
            </div>
          </div>
          <div className='analytics-sales-cell' style={{transform:"translateY(-1rem)"}}>
              <ProductBar data={combinedProducts} chosen={rank3} sort={rank4}></ProductBar>
          </div>
        </div>
        
        <div className="analytics-rank-main round-borderer round-borderer-extra">
              <div className="flex-row" style={{ paddingBottom: '1rem' }}>
                <div className="text-sec-popular svg-secondary">&nbsp;</div>
                <h2 className="heading-secondary">Most Bought</h2>
                <div className="heading-icon-tune svg-secondary" style={{ marginLeft: 'auto' }} onClick={handleBought}>
                  &nbsp;
                </div>
              </div>
              {mostBought.slice(startIndex1, startIndex1 + 50).map((item, index) => {
                const position = boughtSymbol ? index + 1 : mostBought.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <Link href={`/${item.url}`} className="heading-tertiary" style={{ textDecoration: 'none' }}>
                      {position}. {item.name.length > 30 ? item.name.substring(0, 27) + '...' : item.name} -{' '}
                      {item.category.length > 30 ? item.category.substring(0, 27) + '...' : item.category}
                    </Link>
                    <h3 className='heading-tertiary' style={{fontWeight:"900", marginLeft:"auto"}}>{item.orders} order/s</h3>
                  </div>
                );
              })}
            </div>

            <div className="analytics-rank-main round-borderer round-borderer-extra">
              <div className="flex-row" style={{ paddingBottom: '1rem' }}>
                <div className="text-sec-profitable svg-secondary">&nbsp;</div>
                <h2 className="heading-secondary">Top Grossing</h2>
                <div className="heading-icon-tune svg-secondary" style={{ marginLeft: 'auto' }} onClick={handleProfit}>
                  &nbsp;
                </div>
              </div>
              {mostProfit.slice(startIndex2, startIndex2 + 50).map((item, index) => {
                const position = profitSymbol ? index + 1 : mostProfit.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <Link href={`/${item.url}`} className="heading-tertiary" style={{ textDecoration: 'none' }}>
                      {position}. {item.name.length > 30 ? item.name.substring(0, 27) + '...' : item.name} -{' '}
                      {item.category.length > 30 ? item.category.substring(0, 27) + '...' : item.category}
                    </Link>
                    <h3 className='heading-tertiary' style={{fontWeight:"900", marginLeft:"auto"}}>Profit: {shopCurrency} {item.profit}</h3>
                  </div>
                );
              })}
            </div>

            <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-fulfillment svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">&nbsp;Fulfillment Method</h1>
      </span>
      <div></div>

      <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-shipping svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">{deliveryCount} Deliveries for {shopCurrency} {deliverySum}</h2>
            </div>
          </div>
          <div className='analytics-sales-cell'>
            <FulfillmentLine finishedOrders={finishedOrders} profitColor={profitColor} cartValueColor={cartValueColor} dateBy={SelectDate} />
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-basket svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">{pickupCount} Orders Picked Up for {shopCurrency} {pickupSum}</h2>
            </div>
            <div className="heading-icon-tune svg-secondary" onClick={handleRank5} style={{marginRight:"1rem"}}>&nbsp;</div>

          </div>
          <div className='analytics-sales-cell'>
              <FulfillmentPie ds={deliverySum} dc={deliveryCount} ps={pickupSum} pc={pickupCount} chosen={rank5}></FulfillmentPie>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default Sales;

export { getServerSideProps };
