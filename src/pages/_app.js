import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import { createContext, useEffect, useContext, useRef } from "react";
import { useState, useReducer } from "react";
import store from "@/components/store/store";
import { Provider } from "react-redux";
import Cart from "@/components/cart/Cart";
import { MyProvider } from "@/components/store/MyProvider";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const shopid = router.query.shopid

  const [cartItems, setCartItems] = useState([]);

//     const initializeLocalStorage = (shopId) => {
//     const localStorageKey = `mart_${shopId}`;

//     let existingCartItems;
  
//     if (localStorageKey !== "mart_undefined"){

//     if (typeof window !== 'undefined') {
//       existingCartItems = localStorage.getItem(localStorageKey);
//     }
  
//     if (!existingCartItems) {
//       if (typeof window !== 'undefined') {
//         localStorage.setItem(localStorageKey, JSON.stringify([]));
//       }
//     }
//   };

//   console.log("in initial")
  
//   initializeLocalStorage(shopid);

//   useEffect(() => {
//     const localStorageKey = `mart_${shopid}`;
//     const existingCartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//     setCartItems(existingCartItems);
//   }, [router.query.shopid]);
// }

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

  const [preferred, setPreferred] = useState(true)
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
    if (pageProps.shopID){
      setPreferred(chosenAccount ? chosenAccount.preferredColor : database.defaultMode)
    }
  }, [])

  if (pageProps.shopID) {
    const authStorageKey = `auth_${shopid}`;

    iconInfo = pageProps.shopID.shopData.shopDetails.imageData.icons
    database = pageProps.shopID.shopData.shopDesigns
    details = pageProps.shopID.shopData.shopDetails.footerData
    martCurrency = pageProps.shopID.shopData.shopDetails.paymentData.checkoutInfo.currency
    accountsList = pageProps.shopID.shopData.shopAccounts
    martCategories = pageProps.shopID.shopData.shopCategories
    
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

  if (router. asPath === "/" || !pageProps.shopID){
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