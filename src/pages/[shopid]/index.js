import { Fragment, useState, useEffect } from "react"
import HomepageButton from "../../components/homepage/Homepage-Button"
import HomepageButtonBlank from "@/components/homepage/Homepage-Button-Blank"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import { getServerSideProps } from "@/utilities/serversideProps"
import BannerCarousel from "@/components/Mart/BannerCarousel"
import { AnimatePresence, motion } from "framer-motion"
import ActiveNotifs from "@/components/Mart/ActiveNotifs"

function HomePage({ shopID }){
    const router = useRouter();
    const slide = {
        hidden: {
            x: "-10rem",
            opacity: 0,
        },
        visible: (index) => ({
            x: "0px",
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.3,
                bounce: 0.2,
                delay: index * 0.2,
            },
        }),
        exit: {
            x: "-10rem",
            opacity: 0,
            transition: {
                duration: 0.1,
            },
        },
    };

    const { shopid } = router.query;
    const shopData = shopID.shopData;
    const imageData = shopID.shopData.shopDetails.imageData
    const favicon = shopID.shopData.shopDetails.imageData.icons.icon

    const activeNotifs = imageData.notifications.filter((notif) => notif.active)

    return <Fragment>
<Head>
  <title>{shopID.name}</title>
  <link rel="icon" type="image/jpeg" href={favicon} />

</Head>
            <ActiveNotifs notifs={activeNotifs}></ActiveNotifs>
            <BannerCarousel data={imageData.banners}></BannerCarousel>

        <h1 className="heading-primary">Dashboard</h1>
        <main className="maincontainer">

        </main>
    </Fragment>
}

export default HomePage

export {getServerSideProps}

