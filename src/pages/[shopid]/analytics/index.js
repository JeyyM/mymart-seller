import { Fragment, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getServerSideProps } from "../categories";

const DynamicLineChart = dynamic(() => import("../../../components/Analytics/LineChart"), {
  ssr: false,
});


// const DynamicComponent1 = dynamic(() => import("./UserProfile"), {
//   ssr: false,
// });

// const Link = dynamic(() => import("next/link"));


function Analytics(martID) {
  const finishedOrders = martID.shopID.shopData.shopSales.finishedOrders;
  console.log(finishedOrders)

  return (
    <Fragment>
      <Head>
        <title>Mart Analytics</title>
      </Head>
      <div className="analytics-container">
        <span className="page-heading">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-insights svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-primary no-margin">&nbsp;Mart Analytics</h1>
        </span>
        <DynamicLineChart finishedOrders={finishedOrders} />
      </div>
    </Fragment>
  );
}

export default Analytics;

export { getServerSideProps };
