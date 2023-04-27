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
  let details = {}
  let address = {}

  if (pageProps.shopID){
  database = pageProps.shopID.shopData.shopDesigns
  details = pageProps.shopID.shopData.shopDetails.footerData
  address = pageProps.shopID.shopData.shopDetails.shopLocation
  if (database.defaultMode){
    data = database.lightDesign
  } else {data = database.darkDesign}

  if (router.asPath === `/${router.query.shopid}/design/light`){
        data = database.lightDesign
        database = true
      }

  if (router.asPath === `/${router.query.shopid}/design/dark`){
    data = database.darkDesign}
    database = false
}

  return <NavbarLayout color={data} mode={database} contents={details} address={address}><Component {...pageProps} /></NavbarLayout>;
}

export {getServerSideProps}