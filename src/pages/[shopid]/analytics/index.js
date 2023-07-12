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

const DynamicLineChart = dynamic(() => import('../../../components/Analytics/DayLine'), {
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

  // useEffect(() => {
  //   finishedOrders.forEach((order) => {
  //     order.order.forEach((item) => {
  //       const existingProduct = products.find((product) => product.name === item.name && product.category === item.category);

  //       if (existingProduct) {
  //         existingProduct.orders += parseFloat(item.cartValue);
  //         existingProduct.profit += parseFloat(item.profit * item.cartValue);
  //       } else {
  //         console.log(item)
  //         products.push({
  //           name: item.name,
  //           category: item.category,
  //           orders: parseFloat(item.cartValue),
  //           profit: parseFloat(item.profit * item.cartValue),
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
        profit: item.profit * item.orders
      });
      existingCategory.orderTotal += item.orders;
      existingCategory.profitTotal += item.profit;
    } else {
      result.push({
        name: item.category,
        products: [{
          name: item.name,
          orders: item.orders,
          profit: item.profit * item.orders
        }],
        orderTotal: item.orders,
        profitTotal: item.profit
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

const ageColors = () => {
  return ageList.map(({ age }) => {
    const rng = seedrandom(age.toString());
    return '#' + Math.floor(rng() * 16777215).toString(16);
  });
}

  const genderColors = () => {
    return genderList.map(({ gender }) => {
      const rng = seedrandom(gender.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
    });
  }

let weightedSum = 0;
let ageCountTotal = 0;

for (const entry of ageList) {
  weightedSum += entry.age * entry.count;
  ageCountTotal += entry.count;
}

const averageAge = ageCountTotal > 0 ? weightedSum / ageCountTotal : 0;

const coordColorsFn = () => {
  return userPerformance.map(({ email }) => {
    const rng = seedrandom(email.toString());
    return '#' + Math.floor(rng() * 16777215).toString(16);
  });
}

const coordColors = coordColorsFn()

function showProfile(data){
handleSetUser(data)
}

  return (
    <Fragment>
      <Head>
        <title>Mart Analytics</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>

      <ShowUser modalStatus={SetUser} user={selectedUser} disable={() => {setUserModal(false)}} currency={shopCurrency} martCoords={shopCenter}></ShowUser>

      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-insights svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">&nbsp;Mart Analytics</h1>
        <button className="add-categ-init" style={{ width: "17rem", marginLeft:"auto", marginRight:"1rem" }}><h2 className='margin-side heading-tertiary'>Download CSV</h2></button>
      </span>
      <div className="analytics-container">
        <div className="analytics-row round-borderer round-borderer-extra">
          <span className="page-heading">
            <div className="heading-icon-sales svg-color">&nbsp;</div>
            <h1 className="heading-secondary no-margin">&nbsp;Sales & Profits</h1>
            <select
              value={SelectDate}
              className="text-options text-black"
              style={{ width: "20rem", marginLeft: "1rem", transform: "translateY(-0.4rem)" }}
              onChange={(event) => handleSelectDate(event)}
            >
              <option value="1">Today</option>
              <option value="30">Past 30 Days</option>
              <option value="9999">All Time</option>
              <option value="-5">Neg</option>
            </select>

            <Link href={`/${router.query.shopid}/analytics/sales`} className="product-action-2 flex-row-align" style={{ width: "18rem", margin: "0rem 1rem", marginLeft: "auto", height: "3.5rem", textDecoration: "none" }}><h3 className="heading-tertiary margin-side solid-text-color" style={{ transform: "translateY(0rem)" }}>See More</h3></Link>
          </span>

          <div className="analytics-grid">
            <div className="analytics-preview">
              <DynamicLineChart finishedOrders={finishedOrders} profitColor={profitColor} cartValueColor={cartValueColor} dateBy={SelectDate} />
            </div>

            <div className="analytics-rank-prev round-borderer round-borderer-extra">
              <div className="flex-row" style={{ paddingBottom: '1rem' }}>
                <div className="text-sec-popular svg-secondary">&nbsp;</div>
                <h2 className="heading-secondary">Most Bought</h2>
                <div className="heading-icon-tune svg-secondary" style={{ marginLeft: 'auto' }} onClick={handleBought}>
                  &nbsp;
                </div>
              </div>
              {mostBought.slice(startIndex1, startIndex1 + 10).map((item, index) => {
                const position = boughtSymbol ? index + 1 : mostBought.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <Link href={`/${item.url}`} className="heading-tertiary" style={{ textDecoration: 'none' }}>
                      {position}. {item.name.length > 10 ? item.name.substring(0, 7) + '...' : item.name} -{' '}
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
              {mostProfit.slice(startIndex2, startIndex2 + 10).map((item, index) => {
                const position = profitSymbol ? index + 1 : mostProfit.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <Link href={`/${item.url}`} className="heading-tertiary" style={{ textDecoration: 'none' }}>
                      {position}. {item.name.length > 10 ? item.name.substring(0, 7) + '...' : item.name} -{' '}
                      {item.category.length > 8 ? item.category.substring(0, 5) + '...' : item.category}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className='flex-col analytics-prev-small'>
            <div className="flex-row-spaceless" style={{margin:"1rem"}}>
                <div className="text-ter-rank svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Categories by profits</h2>
              </div>
            <div className="analytics-age-prev">
            <CategoryPerformance data={categories} colors={categoryColors} />
            </div>
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
              style={{ width: "20rem", marginLeft: "1rem", transform: "translateY(-0.4rem)" }}
              onChange={(event) => handleSelectDate2(event)}
            >
              <option value="1">Today</option>
              <option value="30">Past 30 Days</option>
              <option value="9999">All Time</option>
              <option value="-10">Neg</option>
            </select>

            <Link href={`#`} className="product-action-2 flex-row-align" style={{ width: "18rem", margin: "0rem 1rem", marginLeft: "auto", height: "3.5rem", textDecoration: "none" }}><h3 className="heading-tertiary margin-side solid-text-color" style={{ transform: "translateY(0rem)" }}>See More</h3></Link>
          </span>

          <div className="analytics-grid">
            <div className="analytics-rank-prev round-borderer round-borderer-extra" style={{ justifyContent: "space-around" }}>
              <div className="flex-row" style={{ paddingBottom: '1rem' }}>
                <div className="text-sec-user-perform svg-secondary">&nbsp;</div>
                <h2 className="heading-secondary">User Performance</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-eye svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Mart Views: {timeCount} view/s</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-views-total svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Total Views: {totalCount} view/s</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-new-users svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;New Users: {filteredNewAccounts.length} user/s</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-user svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Total Users: {shopAccounts.length} user/s</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-repeat svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Repeat Users: {repeaterCount} user/s</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-repeat-user svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Total Repeat Users: {repeatTotal.length} user/s</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-receipt svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Average Orders: {orderSum / userPerformance.length} order/s</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-profit svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Average Profit: {shopCurrency} {profitSum / userPerformance.length}</h2>
              </div>
              <div className="flex-row-spaceless">
                <div className="text-ter-tags svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Average Spent: {shopCurrency} {spentSum / userPerformance.length}</h2>
              </div>
            </div>

            <div className='flex-col analytics-prev-small'>
            <div className="flex-row-spaceless" style={{margin:"1rem"}}>
                <div className="text-ter-cake svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Average Age: {averageAge} years old</h2>
              </div>
            <div className="analytics-age-prev">
              <PieChart data={ageList} colors={ageColors} type="age"/>
            </div>
            </div>

            <div className='flex-col analytics-prev-small'>
            <div className="flex-row-spaceless" style={{margin:"1rem"}}>
                <div className="text-ter-gender4 svg-tertiary">&nbsp;</div><h2 className="heading-tertiary margin-vert">&nbsp;Gender Distribution</h2>
              </div>
            <div className="analytics-age-prev">
            <PieChart data={genderList} colors={genderColors} type="gender"/>
            </div>
            </div>

            <div className="analytics-location-prev">
            {typeof window !== "undefined" && <DynamicUserMap data={userPerformance} center={shopCenter} colors={coordColors} showuser={showProfile}></DynamicUserMap>}
            </div>
          </div>

        </div>
      </div>

    </Fragment>
  );
}

export default Analytics;

export { getServerSideProps };
