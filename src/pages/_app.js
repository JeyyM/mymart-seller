import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import { useEffect } from "react";
import { useState } from "react";
import store from "@/components/store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  let data = {}
  let database = {}
  let colormode = ""
  let details = {}
  let iconInfo = {}

  if (pageProps.shopID) {
    iconInfo = pageProps.shopID.shopData.shopDetails.imageData.icons
    database = pageProps.shopID.shopData.shopDesigns
    details = pageProps.shopID.shopData.shopDetails.footerData
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

  return <Provider store={store}>
  <NavbarLayout color={data} mode={colormode} contents={details} icons={iconInfo}><Component {...pageProps} /></NavbarLayout>;
  </Provider>
}

export { getServerSideProps }