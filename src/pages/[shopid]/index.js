import { Fragment, useState, useEffect } from "react"
import HomepageButton from "../../components/homepage/Homepage-Button"
import HomepageButtonBlank from "@/components/homepage/Homepage-Button-Blank"
import HomepageLater from "@/components/homepage/HomapageLater"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import { getServerSideProps } from "@/utilities/serversideProps"

function HomePage({ shopID, screenWidth }){
    const router = useRouter();
    const { shopid } = router.query;
    const shopData = shopID.shopData;
    const favicon = shopID.shopData.shopDetails.imageData.icons.icon

    let mode = ""
    if (shopData.shopDesigns.defaultMode){mode = "/light"} else {
        mode = "/dark"
    }

    const colorState = shopData.shopDesigns.defaultMode

    let defaultColors = {}

    if (colorState){
        defaultColors = shopData.shopDesigns.lightDesign
    } else {defaultColors = shopData.shopDesigns.darkDesign}

    return <Fragment>
<Head>
  <title>Dashboard</title>
  <link rel="icon" type="image/jpeg" href={favicon} />

</Head>
        <h1 className="heading-primary">Dashboard</h1>
        <main className="maincontainer">
            <HomepageButton color={defaultColors} title={"Add and edit categories, products, and variations"} item="home-category" label="Categories & Products" direction="categories"></HomepageButton>
            {screenWidth < 650 && <HomepageButton color={defaultColors} item="home-insights" label="Mart Analytics" direction="analytics"></HomepageButton>}
            <HomepageButton color={defaultColors} item="home-ongoing" label="Ongoing Sales" direction="orders"></HomepageButton>
            {screenWidth >= 650 && screenWidth < 1000 && <HomepageButton color={defaultColors} item="home-insights" label="Mart Analytics" direction="analytics"></HomepageButton>}
            <HomepageButton color={defaultColors} title={"Set about page, descriptions, footers, and details of your mart"} item="home-manage" label="My Mart" direction="mart"></HomepageButton>
            {screenWidth > 1000 && <HomepageButton color={defaultColors} item="home-insights" label="Mart Analytics" direction="analytics"></HomepageButton>}
            <HomepageButton color={defaultColors} item="home-receipt" label="Customer Records" direction="records"></HomepageButton>
            <HomepageButton color={defaultColors} title={"Edit mart's colors and fonts"} item="home-brush" label="Mart Design" direction="design" extra={mode}></HomepageButton>
            <HomepageButtonBlank color={defaultColors} item="home-policy" label="Terms & Policies" direction="policies"></HomepageButtonBlank>
            <HomepageLater color={defaultColors} item="home-support" label="Customer Service" direction="toggle"></HomepageLater>
            <HomepageButtonBlank color={defaultColors} item="home-quiz" label={screenWidth > 450 ? "Frequently Asked Questions" : "FAQ"} direction="faq"></HomepageButtonBlank>
            <HomepageLater color={defaultColors} item="home-power" label="Close or Open Mart" direction="toggle"></HomepageLater>
        </main>
    </Fragment>
}

export default HomePage

export {getServerSideProps}

