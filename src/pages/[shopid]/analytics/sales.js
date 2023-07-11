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

const DynamicLineChart = dynamic(() => import('../../../components/Analytics/DayLine'), {
  ssr: false,
});

const DynamicCategoriesLine = dynamic(() => import('../../../components/Analytics/CategoriesLine'), {
  ssr: false,
});

const DynamicUserMap = dynamic(() => import('../../../components/Analytics/UserMap'), {
  ssr: false,
});

function Analytics(martID) {
  const router = useRouter()
  const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;
  const shopCurrency = martID.shopID.shopData.shopDetails.paymentData.checkoutInfo.currency
  const shopAccounts = martID.shopID.shopData.shopAccounts
  const shopCenter = martID.shopID.shopData.shopDetails.footerData.shopCoords
  const shopViews = martID.shopID.shopData.shopViews

  const filteredOrders = martID.shopID.shopData.shopSales.finishedOrders.filter((order) => order.status === 'finished');

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

  const [SelectDate2, setSelectDate2] = useState("30");
  const handleSelectDate2 = (event, index) => {
    setSelectDate2(event.target.value);
  };

  const finishedOrders = filteredOrders.filter(item => {
    const finishedOnDate = new Date(item.finishedOn);
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - finishedOnDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference <= SelectDate
  });

  const finishedOrders2 = filteredOrders.filter(item => {
    const finishedOnDate = new Date(item.finishedOn);
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - finishedOnDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference <= SelectDate2
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

  const startIndex1 = boughtSymbol ? 0 : mostBought.length - 10;
  const startIndex2 = profitSymbol ? 0 : mostProfit.length - 10;

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
        performanceTotal: (item.orders + item.profit) / 2
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

  const currentTime = new Date("2023-07-09T10:39:40.050Z");
  const withinView = new Date();
  withinView.setDate(withinView.getDate() - SelectDate2);

  const filteredCount = shopViews.filter(item => {
    const keyDate = new Date(item.key);
    return keyDate >= withinView && keyDate <= currentTime;
  });

  const timeCount = filteredCount.reduce((total, item) => total + parseInt(item.count), 0);
  const totalCount = shopViews.reduce((total, item) => total + parseInt(item.count), 0);

  const filteredNewAccounts = shopAccounts.filter((account) => {
    const creationDate = new Date(account.creationDate);
    const timeDifference = currentTime.getTime() - creationDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference <= SelectDate2;
  });

  const ageList = [];
  const genderList = [];

  for (const user of filteredNewAccounts) {
    const birthDate = new Date(user.profile.birth);
    const age = Math.floor((currentTime - birthDate) / (1000 * 3600 * 24 * 365.25));

    const ageEntry = ageList.find(entry => entry.age === age);

    if (ageEntry) {
      ageEntry.count++;
    } else {
      ageList.push({ age: age, count: 1 });
    }

    const gender = user.profile.gender;

    const genderEntry = genderList.find(entry => entry.gender === gender);

    if (genderEntry) {
      genderEntry.count++;
    } else {
      genderList.push({ gender: gender, count: 1 });
    }
  }

  const repeatTotal = shopAccounts.filter((acc) => acc.pastOrders.length > 1)
  const userPerformance = [];
  for (const order of finishedOrders2) {
    const userEmail = order.user.email;
    const existingUser = userPerformance.find((user) => user.email === userEmail);
    if (existingUser) {
      existingUser.orderCount++;
      existingUser.totalSpent += order.totals.order + order.totals.fees;
      const orderTotal = order.order.reduce((total, item) => total + item.cartValue * item.profit, 0);
      existingUser.totalProfit += orderTotal;
    } else {
      const newUser = {
        email: userEmail,
        username: `${order.user.profile.last}, ${order.user.profile.first}`,
        orderCount: order.order.length,
        totalSpent: order.totals.order + order.totals.fees,
        totalProfit: order.order.reduce((total, item) => total + item.cartValue * item.profit, 0),
        coords: order.user.locationCoords,
        location: order.user.location,
        gender: order.user.profile.gender,
        phone: order.user.profile.pnum,
        birth: order.user.profile.birth,
        other: order.user.profile.other,
        job: order.user.profile.job,
        customjob: order.user.profile.customjob,
        company: order.user.profile.company,
      };
      userPerformance.push(newUser);
    }
  }


  let repeaterCount = 0;

  userPerformance.forEach((user) => {
    if (user.orderCount > 1) {
      repeaterCount++;
    }
  });

  let orderSum = 0;
  userPerformance.forEach((user) => {
    orderSum += user.orderCount;
  })

  let spentSum = 0;
  userPerformance.forEach((user) => {
    spentSum += user.totalSpent;
  })

  let profitSum = 0;
  userPerformance.forEach((user) => {
    profitSum += user.totalProfit;
  })

  const ageColors = useMemo(() => {
    return ageList.map(({ age }) => {
      const rng = seedrandom(age.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  }, []);

  const genderColors = useMemo(() => {
    return genderList.map(({ gender }) => {
      const rng = seedrandom(gender.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  }, []);

  let weightedSum = 0;
  let ageCountTotal = 0;

  for (const entry of ageList) {
    weightedSum += entry.age * entry.count;
    ageCountTotal += entry.count;
  }

  const averageAge = ageCountTotal > 0 ? weightedSum / ageCountTotal : 0;

  const coordColors = useMemo(() => {
    return userPerformance.map(({ email }) => {
      const rng = seedrandom(email.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  }, []);

  function showProfile(data) {
    handleSetUser(data)
  }
  const profitArray = filteredOrders.map((order) => order.order.reduce((total, item) => total + (item.profit * item.cartValue), 0));
  const boughtArray = filteredOrders.map((order) => order.order.reduce((total, item) => total + item.cartValue, 0));

  const totalProfit = profitArray.reduce((acc, curr) => acc + curr, 0);
  const totalUnits = boughtArray.reduce((acc, curr) => acc + curr, 0);

  const [rank, setRank] = useState(1)
  const handleRank = () => {
    if (rank < 3) {
      setRank(rank + 1);
    } else {
      setRank(1);
    }
  };

  const [rank2, setRank2] = useState(1)
  const handleRank2 = () => {
    if (rank2 < 3) {
      setRank2(rank2 + 1);
    } else {
      setRank2(1);
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

    let productColorsFn = () => {
    return combinedProducts.map(({ name }) => {
      const rng = seedrandom(name.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  };  

  const productColors = productColorsFn()

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
      </span>

      <div className='analytics-sales-container'>
        <div>
          <div className='flex-row' style={{ gap: "5rem", margin: "0.5rem" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-ter-cube svg-tertiary">&nbsp;</div>
              <h2 className="heading-tertiary">Total Buys: {totalUnits} unit/s</h2>
            </div>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-ter-profit svg-tertiary">&nbsp;</div>
              <h2 className="heading-tertiary">Total Profits: {shopCurrency} {totalProfit}</h2>
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
            <RankPie data={categories} colors={categoryColors} chosen={rank} />
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
              {categoriesList.map((item) => {
                return <option value={item}>{item}</option>
              })

              }
              </select>
              <h2 className='heading-secondary'>Products</h2>
            </div>
          </div>
          <div className='analytics-sales-cell' style={{transform:"translateY(-1rem)"}}>
              <ProductBar data={combinedProducts} colors={productColors}></ProductBar>
          </div>
        </div>

        <div className='analytics-sales-cell'>
        </div>
        <div className='analytics-sales-cell'>
        </div>

      </div>
    </Fragment>
  );
}

export default Analytics;

export { getServerSideProps };
