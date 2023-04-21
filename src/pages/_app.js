import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import { useEffect } from "react";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter()

//   let data = {}
//   let database = {}

//   if (pageProps.shopID){
//   database = pageProps.shopID.shopData.shopDesigns
//   if (database.defaultMode){
//     data = database.lightDesign
//   } else {data = database.darkDesign}
// }

const [themeData, setThemeData] = useState({})
const [themeMode, setThemeMode] = useState(true)

useEffect(() => {
  let data = {}
  let database = {}

  if (pageProps.shopID){
  database = pageProps.shopID.shopData.shopDesigns
  if (database.defaultMode){
    data = database.lightDesign
    setThemeData(data)
    setThemeMode(true)
  } else {data = database.darkDesign
  setThemeData(data)}
  setThemeMode(false)
}

  if (router.asPath === `/${router.query.shopid}/design/light`){
    console.log("light mode")
    data = database.lightDesign
    console.log("light data", data)
    setThemeData(data)
    setThemeMode(true)
  }

  if (router.asPath === `/${router.query.shopid}/design/dark`){
    console.log("dark mode")
    data = database.darkDesign
    console.log("dark data", data)
    setThemeData(data)
    setThemeMode(false)
  }
}, []);

  return <NavbarLayout color={themeData} mode={themeMode}><Component {...pageProps} /></NavbarLayout>;
}

export {getServerSideProps}
