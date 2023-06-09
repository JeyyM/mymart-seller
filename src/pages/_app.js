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

  if (pageProps.shopID) {
    const authStorageKey = `auth_${shopid}`;

    iconInfo = pageProps.shopID.shopData.shopDetails.imageData.icons
    database = pageProps.shopID.shopData.shopDesigns
    details = pageProps.shopID.shopData.shopDetails.footerData
    martCurrency = pageProps.shopID.shopData.shopDetails.paymentData.checkoutInfo.currency
    accountsList = pageProps.shopID.shopData.shopAccounts
    
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
      if (chosenAccount.preferredColor === true){
        data = database.lightDesign
      } else if (chosenAccount.preferredColor === false) {
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
  
    return<LocalizationProvider dateAdapter={AdapterDayjs}>
    <MyProvider>
    <NavbarLayout color={data} mode={colormode} contents={details} icons={iconInfo} curr={martCurrency} user={chosenAccount}>
    <Component {...pageProps} user={chosenAccount}/>
    </NavbarLayout>
    </MyProvider>
    </LocalizationProvider>
  }


export { getServerSideProps }