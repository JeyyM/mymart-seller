import { Fragment, useState, useEffect } from "react"
import HomepageButton from "../../components/homepage/Homepage-Button"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import { getServerSideProps } from "@/utilities/serversideProps"
// import { css } from "styled-jsx/css";


function HomePage({ shopID }){
    const router = useRouter();
    const { shopid } = router.query;
    const shopData = shopID.shopData;
    // console.log("shopData", shopData)

    const colorState = shopData.shopDesigns.defaultMode

    let defaultColors = {}

    if (colorState){
        defaultColors = shopData.shopDesigns.lightDesign
    } else {defaultColors = shopData.shopDesigns.darkDesign}

    // console.log(defaultColors)    

    return <Fragment>
<Head>
  <title>Dashboard</title>
  <style> 
  { `h1 { color: ${shopData.shopDesigns.lightDesign["color-primary-light"]} !important; }
  
  .homepage-button {  background-image: white,
    linear-gradient(45deg, red, green) !important ;}
  
  ` }
  </style>
</Head>
        <h1 className="heading-primary">Dashboard</h1>
        <main className="maincontainer">
            <HomepageButton color={defaultColors} item="home-category" label="Categories & Products" direction="categories" priority="eager"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-ongoing" label="Ongoing Sales" priority="lazy"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-manage" label="My Mart" priority="lazy"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-insights" label="Mart Analytics" priority="eager"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-receipt" label="Customer Records" priority="lazy"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-brush" label="Mart Design" priority="lazy"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-policy" label="Terms & Policies"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-support" label="Customer Service"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-quiz" label="Frequently Asked Questions"></HomepageButton>
            <HomepageButton color={defaultColors} item="home-power" label="Close or Open Mart"></HomepageButton>
        </main>
    </Fragment>
}

export default HomePage

export {getServerSideProps}

