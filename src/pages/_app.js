import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import {useEffect} from "react";
import { useState } from "react";
import { MyProvider } from "@/components/store/MyProvider";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import pako from "pako";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const shopid = router.query.shopid
  const [preferred, setPreferred] = useState(true)

  if (!pageProps.shopID) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    );
  }

  const compressedBytes = new Uint8Array(atob(pageProps.shopID).split("").map((c) => c.charCodeAt(0)));
  const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
  const final = JSON.parse(decompressedBytes);

  let data = {}
  let database = {}
  let colormode = ""
  let details = {}
  let iconInfo = {}
  let martCurrency = ""
  let accountsList = []
  let currentAcc;
  let chosenAccount;
  let martCategories = {}

  async function colorApi(mode){
    const response = await fetch(
      `../../../api/set-colormode?martid=${router.query.shopid}&newmode=${mode}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chosenAccount)
      }
    );
    const data = await response.json();

  }

  async function handlePreferred(){
    setPreferred(!preferred)
    await colorApi(!preferred)
  }

  useEffect(() => {
    if (database){
      setPreferred(database.defaultMode)
    }
  },[])

  useEffect(() => {
    if (final){
      setPreferred(chosenAccount ? chosenAccount.preferredColor : database.defaultMode)
    }
  }, [])

  if (final) {
    const authStorageKey = `auth_${shopid}`;

    iconInfo = final.shopData.shopDetails.imageData.icons
    database = final.shopData.shopDesigns
    details = final.shopData.shopDetails.footerData
    martCurrency = final.shopData.shopDetails.paymentData.checkoutInfo.currency
    accountsList = final.shopData.shopAccounts
    martCategories = final.shopData.shopCategories
    
    if (typeof window !== 'undefined') {
      currentAcc = JSON.parse(localStorage.getItem(authStorageKey) || null);
    
      if (currentAcc !== null){
      chosenAccount = accountsList.find(
        (account) =>
          account.email === currentAcc.email && account.password === currentAcc.password
      );
      }
    }
    
    if (database.defaultMode) {
      data = database.lightDesign
    } else { data = database.darkDesign }

    if (chosenAccount !== undefined){
      if (preferred){
        data = database.lightDesign
      } else if (!preferred) {
        data = database.darkDesign}
    }

    if (router.asPath === `/${router.query.shopid}/design/light`) {
      data = database.lightDesign
      colormode = true
    }

    if (router.asPath === `/${router.query.shopid}/design/dark`) {
      data = database.darkDesign
      colormode = false
    }
  }

  if (router.asPath === "/" || !final){
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Component {...pageProps} user={chosenAccount}/>
    </LocalizationProvider>
  } else {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
  <MyProvider>
  <NavbarLayout color={data} mode={colormode} contents={details} icons={iconInfo} curr={martCurrency} user={chosenAccount} martCateg={martCategories} handlePreferred={handlePreferred} currentColor={preferred}>
  <Component {...pageProps} user={chosenAccount}/>
  </NavbarLayout>
  </MyProvider>
  </LocalizationProvider>
  }
  }


export { getServerSideProps }