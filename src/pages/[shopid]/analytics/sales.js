import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getServerSideProps } from '../categories';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import RankPie from '@/components/Analytics/RankPie';
import ProductBar from '@/components/Analytics/ProductBar';
import FulfillmentLine from '@/components/Analytics/FulfillmentLine';
import FulfillmentPie from '@/components/Analytics/FulfillmentPie';
import pako from "pako";

const DynamicLineChart = dynamic(() => import('../../../components/Analytics/DayLine'), {
  ssr: false,
});

const DynamicCategoriesLine = dynamic(() => import('../../../components/Analytics/CategoriesLine'), {
  ssr: false,
});

function Sales({ shopID, screenWidth }) {
  const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
  const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
  const final = JSON.parse(decompressedBytes);

  const favicon = final.shopData.shopDetails.imageData.icons.icon;
  const shopCurrency = final.shopData.shopDetails.paymentData.checkoutInfo.currency
  const currentTime = new Date();
  const filteredOrders = final.shopData.shopSales.finishedOrders.filter((order) => order.status === 'finished');

  function nameSetup(name, maxLength) {
    if (name.length <= maxLength) {
      return name;
    } else {
      const firstPart = name.substring(0, 9);
      const lastPart = name.substring(name.length - 5);
      return `${firstPart}...${lastPart}`;
    }
  }

function removeSpecialCharacters(inputString) {
  const specialCharactersRegex = /[^\p{L}\p{N}\s]/gu;

  return inputString.replace(specialCharactersRegex, '');
}
    
  const csvData = final.shopData.shopSales.finishedOrders.flatMap(item =>
    item.order.map(orderItem => ({
      "Order ID": "'" + item.id,
      "Start Date": item.currentTime,
      "Finish Date": item.finishedOn,
      "Email": item.user.email,
      "Name": item.user.profile.first + " " + item.user.profile.last,
      "Phone #": item.user.profile.pnum,
      "Company": item.user.profile.company,
      "Gender": item.user.profile.gender,
      "Age": Math.floor((currentTime - new Date(item.user.profile.birth)) / (1000 * 3600 * 24 * 365.25)),
      "Mode": item.mode,
      "Status": item.status,
      "Category": removeSpecialCharacters(orderItem.category),
      "Product Name": removeSpecialCharacters(orderItem.name),
      "Price": orderItem.price,
      "Profit": orderItem.profit,
      "Amount": orderItem.cartValue,
      "Link": orderItem.url
    }))
  );

    const convertToCSV = (data) => {
      if (data.length > 0){
      const headers = Object.keys(data[0]);
      const rows = data.map(obj => headers.map(header => obj[header]));
      const csvArray = [headers, ...rows];
      return csvArray.map(row => row.join(',')).join('\n');
      } else {
        return
      }
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

  const startIndex1 = boughtSymbol ? 0 : Math.max(mostBought.length - 10, 0);
  const startIndex2 = profitSymbol ? 0 : Math.max(mostProfit.length - 10, 0);

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

  return (
    <Fragment>
      <Head>
        <title>Sales & Profits</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>

      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-sales svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin"  style={{ fontSize: `${screenWidth > 425 ? "3.5rem" : screenWidth > 360 ? "3rem" : "2.5rem"}`}}>&nbsp;Sales & Profits</h1>
        <select
          value={SelectDate}
          className="text-options text-black"
          style={{ width: `${screenWidth > 480 ? "20rem" : screenWidth > 400 ? "16rem" : "13rem"}`, marginLeft: "1rem" }}
          onChange={(event) => handleSelectDate(event)}
        >
          <option value="1">Today</option>
          <option value="30">Past 30 Days</option>
          <option value="9999">All Time</option>
        </select>
        <button onClick={handleDownload} className="add-categ-init" style={{ width: `${screenWidth > 580 ? "max-content" : screenWidth > 425 ? "14rem" : "11rem"}`, marginLeft:"auto", marginRight:"1rem", height: `${screenWidth > 580 ? "4rem" : "7rem"}` }}><h2 className='margin-side heading-tertiary'>Download CSV</h2></button>
      </span>

      <div className='analytics-sales-container'>
        <div className='analytics-sales-1'>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-cube svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Total Buys: {totalUnits} unit/s</h2>
            </div>
            {screenWidth > 500 && <div className="flex-row" style={{ paddingBottom: '1rem', marginRight:"1rem" }}>
              <div className="text-sec-profit svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Total Profits: {shopCurrency} {totalProfit}</h2>
            </div>}
          </div>

          {screenWidth <= 500 && <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-profit svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Total Profits: {shopCurrency} {totalProfit}</h2>
            </div>
          </div>}

          <div className='analytics-sales-cell'>
            <DynamicLineChart finishedOrders={finishedOrders} profitColor={profitColor} cartValueColor={cartValueColor} dateBy={SelectDate} />
          </div>
        </div>

        <div className='analytics-sales-1'>
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

        <div className='analytics-sales-1'>
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

        <div className='analytics-sales-1'>
          <div className='flex-row' style={{ justifyContent: "space-between" }}>
            <div className="flex-row-spaceless" style={{ paddingBottom: '0rem' }}>
            <div className="text-sec-category svg-tertiary">&nbsp;</div>
              <select
                value={selectedCategory}
                className="text-options text-black"

                style={{ width: `${screenWidth > 500 ? "32rem" : screenWidth > 450 ? "25rem" : screenWidth > 410 ? "20rem" : "15rem"}`, transform:"translateY(-1rem) scale(90%)" }}
                onChange={(event, index) => setSelectedCategory(event.target.value)}
              >
              {categoriesList.map((item, index) => {
                return <option value={item} key={index}>{item}</option>
              })

              }
              </select>
              <h1 className="heading-secondary no-margin"  style={{ fontSize: `${screenWidth > 425 ? "3rem" : screenWidth > 340 ? "2.5rem" : "2rem"}`}}>Products By {rank3 === 1 ? <>Profits</> : rank3 === 2 ? <>Buys</> : "Both"}</h1>
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
                      {position}. {nameSetup(item.name, 15)} -{' '}
                      {nameSetup(item.category)}
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
                      {position}. {nameSetup(item.name)} - {' '}
                      {nameSetup(item.category)}
                    </Link>
                    <h3 className='heading-tertiary' style={{fontWeight:"900", marginLeft:"auto"}}>Profit: {shopCurrency} {item.profit}</h3>
                  </div>
                );
              })}
            </div>

            <span className="page-heading" style={{gridColumn:"span 2"}}>
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-fulfillment svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">&nbsp;Fulfillment Method</h1>
      </span>

      <div className='analytics-sales-2'>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-shipping svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">{deliveryCount} Deliveries for {shopCurrency} {deliverySum}</h2>
            </div>
          </div>
          <div className='analytics-sales-cell-2'>
            <FulfillmentLine finishedOrders={finishedOrders} profitColor={profitColor} cartValueColor={cartValueColor} dateBy={SelectDate} />
          </div>
        </div>

        <div className='analytics-sales-2'>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-basket svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">{pickupCount} Orders Picked Up for {shopCurrency} {pickupSum}</h2>
            </div>
            <div className="heading-icon-tune svg-secondary" onClick={handleRank5} style={{marginRight:"1rem"}}>&nbsp;</div>

          </div>
          <div className='analytics-sales-cell-2'>
              <FulfillmentPie ds={deliverySum} dc={deliveryCount} ps={pickupSum} pc={pickupCount} chosen={rank5}></FulfillmentPie>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default Sales;

export { getServerSideProps };
