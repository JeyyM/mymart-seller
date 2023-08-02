import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import { useEffect } from "react";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  let data = {}
  let database = {}
  let colormode = ""
  let details = {}
  let iconInfo = {}
  let adminInfo = {}
  let accEmail

  if (pageProps.shopID) {
    iconInfo = pageProps.shopID.shopData.shopDetails.imageData.icons
    database = pageProps.shopID.shopData.shopDesigns
    details = pageProps.shopID.shopData.shopDetails.footerData
    adminInfo = pageProps.shopID.adminData
    
    if (database.defaultMode) {
      data = database.lightDesign

    } else { data = database.darkDesign }

    if (router.asPath === `/${router.query.shopid}/design/light`) {
      data = database.lightDesign
      colormode = true
    }

    if (router.asPath === `/${router.query.shopid}/design/dark`) {
      data = database.darkDesign
      colormode = false
    }
  }

  if (router. asPath === "/" || !pageProps.shopID){
    return <Component {...pageProps} />
  } else {
  return <NavbarLayout color={data} mode={colormode} contents={details} icons={iconInfo} adminInfo={adminInfo} defaultMode={database.defaultMode}><Component {...pageProps} /></NavbarLayout>;
  }
}

export { getServerSideProps }