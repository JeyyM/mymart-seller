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
import ViewLine from '@/components/Analytics/ViewLine';
import UserLine from '@/components/Analytics/UserLine';

const DynamicLineChart = dynamic(() => import('../../../components/Analytics/DayLine'), {
  ssr: false,
});

const DynamicUserMap = dynamic(() => import('../../../components/Analytics/UserMap'), {
  ssr: false,
});

function Analytics(martID) {
  const {screenWidth} = martID

  const router = useRouter()
  const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;
  const shopCurrency = martID.shopID.shopData.shopDetails.paymentData.checkoutInfo.currency
  const shopAccounts = martID.shopID.shopData.shopAccounts
  const shopCenter = martID.shopID.shopData.shopDetails.footerData.shopCoords
  const shopViews = martID.shopID.shopData.shopViews
  const currentTime = new Date();

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

  finishedOrders2.forEach((order) => {
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

  const userDetails = [];

  finishedOrders2.forEach((order) => {
    const existingUser = userDetails.find((user) => user.email === order.user.email);
  
    if (existingUser) {
      existingUser.buys.push(...order.order);
    } else {
      const userBuys = {
        email: order.user.email,
        company: order.user.profile.company,
        profile: order.user.profile,
        buys: [...order.order],
      };
      userDetails.push(userBuys);
    }
  });

  const aggregatedBuys = [];

userDetails.forEach((user) => {
  const aggregatedItems = {};

  user.buys.forEach((item) => {
    const key = `${item.name}-${item.category}`;

    if (aggregatedItems[key]) {
      aggregatedItems[key].profit += item.profit * item.cartValue;
      aggregatedItems[key].count += item.cartValue;
    } else {
      aggregatedItems[key] = {
        name: item.name,
        category: item.category,
        profit: item.profit * item.cartValue,
        count: item.cartValue,
      };
    }
  });

  const aggregatedItemsArray = Object.values(aggregatedItems);
  user.buys = aggregatedItemsArray;

  aggregatedBuys.push(user);
});

aggregatedBuys.forEach((user) => {
  const totalProfit = user.buys.reduce((sum, item) => sum + item.profit, 0);
  user.totalProfit = totalProfit;
  const totalCount = user.buys.reduce((sum, item) => sum + item.count, 0);
  user.totalCount = totalCount;
});

const aggregatedCompanies = {};

userDetails.forEach((user) => {
  const { email, company, totalProfit, totalCount } = user;
  if (aggregatedCompanies.hasOwnProperty(company)) {
    aggregatedCompanies[company].totalProfit += totalProfit;
    aggregatedCompanies[company].totalCount += totalCount;
    if (!aggregatedCompanies[company].employees.includes(email)) {
      aggregatedCompanies[company].employees.push(email);
    }
  } else {
    aggregatedCompanies[company] = {
      company,
      totalProfit,
      totalCount,
      employees: [email],
    };
  }
});

const aggregatedCompanyList = Object.values(aggregatedCompanies);

aggregatedCompanyList.forEach((company) => {
  company.employeeCount = company.employees.length;
});

const [Rank1, setRank1] = useState(1)
const handleRank1 = () => {
  if (Rank1 < 2) {
    setRank1(Rank1 + 1);
  } else {
    setRank1(1);
  }
};

const [Rank2, setRank2] = useState(1)
const handleRank2 = () => {
  if (Rank2 < 2) {
    setRank2(Rank2 + 1);
  } else {
    setRank2(1);
  }
};

const [Rank3, setRank3] = useState(1)
const handleRank3 = () => {
  if (Rank3 < 2) {
    setRank3(Rank3 + 1);
  } else {
    setRank3(1);
  }
};

const [Rank4, setRank4] = useState(1)
const handleRank4 = () => {
  if (Rank4 < 2) {
    setRank4(Rank4 + 1);
  } else {
    setRank4(1);
  }
};

  const [profitSymbol, setProfitSymbol] = useState(true);
  function handleProfit() {
    setProfitSymbol(!profitSymbol);
  }
  const [boughtSymbol, setBoughtSymbol] = useState(true);
  function handleBought() {
    setBoughtSymbol(!boughtSymbol);
  }

  const userSortProfit = [...aggregatedBuys].sort((a, b) => {
    if (profitSymbol === true) {
      return b.totalProfit - a.totalProfit;
    } else {
      return a.totalProfit - b.totalProfit;
    }
  });

  const userSortCount = [...aggregatedBuys].sort((a, b) => {
    if (profitSymbol === true) {
      return b.totalCount - a.totalCount;
    } else {
      return a.totalCount - b.totalCount;
    }
  });

  const companySortProfit = [...aggregatedCompanyList].sort((a, b) => {
    if (profitSymbol === true) {
      return b.totalProfit - a.totalProfit;
    } else {
      return a.totalProfit - b.totalProfit;
    }
  });

  const companySortCount = [...aggregatedCompanyList].sort((a, b) => {
    if (profitSymbol === true) {
      return b.totalCount - a.totalCount;
    } else {
      return a.totalCount - b.totalCount;
    }
  });

  const mostBought = [...products].sort((a, b) => {
    if (boughtSymbol === true) {
      return b.orders - a.orders;
    } else {
      return a.orders - b.orders;
    }
  });

  const startIndex1 = profitSymbol ? 0 : Math.max(userSortProfit.length - 9, 0);
  const startIndex2 = boughtSymbol ? 0 : mostBought.length - 9;

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

  const withinView = new Date();
  withinView.setDate(withinView.getDate() - SelectDate2);

  const filteredViews = shopViews.filter(item => {
    const keyDate = new Date(item.key);
    return keyDate >= withinView && keyDate <= currentTime;
  });

  const timeCount = filteredViews.reduce((total, item) => total + parseInt(item.count), 0);
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
      creation: order.user.creationDate
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

function warning(){
  alert("The show all user data wasn't built for now to not risk using up many Google Maps api calls per click. I'm not sure if that is how it works but I have chosen to not risk it")
}

console.log(shopAccounts)

const csvData = shopAccounts.map((item) => {
  const totalProfits = item.pastOrders.reduce((sum, order) => {
    return sum + order.order.reduce((orderSum, product) => {
      return orderSum + (parseFloat(product.profit) * parseFloat(product.cartValue));
    }, 0);
  }, 0);

  const totalbuys = item.pastOrders.reduce((sum, order) => {
    return sum + order.order.reduce((orderSum, product) => {
      return orderSum + parseFloat(product.cartValue);
    }, 0);
  }, 0);

  return {
    "Name": `${item.profile.first} ${item.profile.last}`,
    "Email": item.email,
    "Age": Math.floor((currentTime - new Date(item.profile.birth)) / (1000 * 3600 * 24 * 365.25)),
    "Gender": item.profile.gender,
    // "Location": item.location,
    "Creation Date": item.creationDate,
    "Custom Job": item.profile.other,
    "Occupation": item.profile.job,
    "Custom Occupation": item.profile.customjob,
    "Company": item.profile.company,
    "Total Orders": item.pastOrders.length,
    "Total Profits": totalProfits,
    "Total Buys": totalbuys
  };
});

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
    

  return (
    <Fragment>
      <Head>
        <title>User Data</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>

      <ShowUser modalStatus={SetUser} user={selectedUser} disable={() => {setUserModal(false)}} currency={shopCurrency} martCoords={shopCenter}></ShowUser>

      {/* <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-profile svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">&nbsp;User Profile</h1>
        <select
          value={SelectDate2}
          className="text-options text-black"
          style={{ width: "20rem", marginLeft: "1rem" }}
          onChange={(event) => handleSelectDate2(event)}
        >
          <option value="1">Today</option>
          <option value="30">Past 30 Days</option>
          <option value="9999">All Time</option>
        </select>
        <button onClick={handleDownload} className="add-categ-init" style={{ width: "17rem", marginLeft:"auto", marginRight:"1rem" }}><h2 className='margin-side heading-tertiary'>Download CSV</h2></button>
      </span> */}

      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-profile svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin"  style={{ fontSize: `${screenWidth > 425 ? "3.5rem" : screenWidth > 360 ? "3rem" : "2.5rem"}`}}>&nbsp;User Profile</h1>
        <select
          value={SelectDate2}
          className="text-options text-black"
          style={{ width: `${screenWidth > 480 ? "20rem" : screenWidth > 400 ? "16rem" : "13rem"}`, marginLeft: "1rem" }}
          onChange={(event) => handleSelectDate2(event)}
        >
          <option value="1">Today</option>
          <option value="30">Past 30 Days</option>
          <option value="9999">All Time</option>
        </select>
        <button onClick={handleDownload} className="add-categ-init" style={{ width: `${screenWidth > 580 ? "max-content" : screenWidth > 425 ? "14rem" : "11rem"}`, marginLeft:"auto", marginRight:"1rem", height: `${screenWidth > 580 ? "4rem" : "7rem"}` }}><h2 className='margin-side heading-tertiary'>Download CSV</h2></button>
      </span>

      <div className='analytics-user-container'>
      <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-eye svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">{timeCount} view/s</h2>
            </div>
            <div className="flex-row" style={{ paddingBottom: '1rem', marginRight:"1rem" }}>
              <div className="text-sec-views-total svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Total: {totalCount} view/s</h2>
            </div>
          </div>
          <div className='analytics-user-cell'>
            <ViewLine views={filteredViews} dateBy={SelectDate} />
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-new-users svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">{filteredNewAccounts.length} New User/s</h2>
            </div>
            <div className="flex-row" style={{ paddingBottom: '1rem', marginRight:"1rem" }}>
              <div className="text-sec-user svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Total: {shopAccounts.length} user/s</h2>
            </div>
          </div>
          <div className='analytics-user-cell'>
            <UserLine users={filteredNewAccounts} dateBy={SelectDate} />
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              {Rank2 === 1 ? <div className="text-sec-name svg-secondary">&nbsp;</div> : <div className="text-sec-company svg-secondary">&nbsp;</div>}
              <h2 className="heading-secondary">{Rank2 === 1 ? <>Users</> : <>Companies</>} by {Rank1 === 1 ? <>Profits</> : Rank1 === 2 ? <>Buys</> : "Both"}</h2>
            </div>
            <div className="flex-row" style={{ paddingBottom: '1rem', marginRight:"1rem" }}>
              <div className="text-sec-set-group svg-secondary" onClick={handleRank2} style={{ marginLeft: 'auto' }}>
                  &nbsp;
                </div>
              <div className="text-sec-exchange svg-secondary" onClick={handleRank1}>
                  &nbsp;
                </div>
                <div className="heading-icon-tune svg-secondary" onClick={handleProfit}>
                  &nbsp;
                </div>
            </div>
          </div>
          <div className='userbase-container round-borderer round-borderer-extra'>

              {Rank2 === 1 && Rank1 === 1 ? userSortProfit.slice(startIndex1, startIndex1 + 9).map((item, index) => {
                const position = profitSymbol ? index + 1 : userSortProfit.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <h2 className="heading-tertiary">
                      {position}. {item.profile.last}, {item.profile.first} -{' '}
                      {item.profile.company}
                    </h2>
                    <h3 className='heading-tertiary' style={{fontWeight:"900", marginLeft:"auto"}}>Profit: {shopCurrency} {item.totalProfit}</h3>
                  </div>
                );
              }) : Rank2 === 1 && userSortCount.slice(startIndex1, startIndex1 + 9).map((item, index) => {
                const position = profitSymbol ? index + 1 : userSortCount.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <h2 className="heading-tertiary">
                      {position}. {item.profile.last}, {item.profile.first} -{' '}
                      {item.profile.company}
                    </h2>
                    <h3 className='heading-tertiary' style={{fontWeight:"900", marginLeft:"auto"}}>Buys: {item.totalCount}</h3>
                  </div>
                );
              })
              }

              {Rank2 === 2 && Rank1 === 1 ? companySortProfit.slice(startIndex1, startIndex1 + 9).map((item, index) => {
                const position = profitSymbol ? index + 1 : companySortProfit.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <h2 className="heading-tertiary">
                      {position}. {item.company} - {item.employeeCount} Account/s
                    </h2>
                    <h3 className='heading-tertiary' style={{fontWeight:"900", marginLeft:"auto"}}>Profit: {shopCurrency} {item.totalProfit}</h3>
                  </div>
                );
              }) : Rank2 === 2 && companySortCount.slice(startIndex1, startIndex1 + 9).map((item, index) => {
                const position = profitSymbol ? index + 1 : companySortCount.length - index;

                return (
                  <div className="flex-row" key={index}>
                    <h2 className="heading-tertiary">
                      {position}. {item.company} - {item.employeeCount} Account/s
                    </h2>
                    <h3 className='heading-tertiary' style={{fontWeight:"900", marginLeft:"auto"}}>Buys: {item.totalCount}</h3>
                  </div>
                );
              })
              }

              <button onClick={warning} className="product-action-2 flex-row-align" style={{ width: "15rem", height: "3.5rem", margin:"0rem 0.5rem 0.5rem auto", position:"absolute", bottom:"0", right:"0"}}><h3 className="heading-tertiary margin-side solid-text-color" style={{ transform: "translateY(0rem)" }}>All Data</h3></button>
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-map svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">User Map</h2>
            </div>
          </div>
          <div className='analytics-user-cell'>
          {typeof window !== "undefined" && <DynamicUserMap data={userPerformance} center={shopCenter} colors={coordColors} showuser={showProfile}></DynamicUserMap>}
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-cake svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Average Age: {averageAge.toFixed(2)} years old</h2>
            </div>
          </div>
          <div className='analytics-user-cell'>
          <PieChart data={ageList} colors={ageColors} type="age"/>
          </div>
        </div>

        <div>
          <div className='flex-row' style={{ justifyContent:"space-between" }}>
            <div className="flex-row" style={{ paddingBottom: '1rem' }}>
              <div className="text-sec-gender4 svg-secondary">&nbsp;</div>
              <h2 className="heading-secondary">Gender Distribution</h2>
            </div>
          </div>
          <div className='analytics-user-cell'>
          <PieChart data={genderList} colors={genderColors} type="gender"/>
          </div>
        </div>

</div>
    </Fragment>
  );
}

export default Analytics;

export { getServerSideProps };