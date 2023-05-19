import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import { useEffect } from "react";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  let data = {}
  let database = pageProps.shopID.shopData.shopDesigns.defaultMode
  let details = {}

  if (pageProps.shopID){
  database = pageProps.shopID.shopData.shopDesigns
  details = pageProps.shopID.shopData.shopDetails.footerData
  if (database.defaultMode){
    data = database.lightDesign
  } else {data = database.darkDesign}

  if (router.asPath === `/${router.query.shopid}/design/light`){
        data = database.lightDesign
        // database = true
        // console.log("lightmod here")
      }

  if (router.asPath === `/${router.query.shopid}/design/dark`){
    data = database.darkDesign}
    // database = false
    // console.log("dark mode here")
}

console.log("in other _app", pageProps.shopID.shopData.shopDesigns.defaultMode)

  return <NavbarLayout color={data} mode={pageProps.shopID.shopData.shopDesigns.defaultMode} contents={details}><Component {...pageProps} /></NavbarLayout>;
}

export {getServerSideProps}