import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import { useEffect } from "react";
import { useState } from "react";
import store from "@/components/defunctstore/store";
import { Provider } from "react-redux";
import Cart from "@/components/cart/Cart";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const shopid = router.query.shopid

  const [cartItems, setCartItems] = useState([]);

    const initializeLocalStorage = (shopId) => {
    const localStorageKey = `mart_${shopId}`;
    let existingCartItems;
  
    if (localStorageKey !== "mart_undefined"){

    if (typeof window !== 'undefined') {
      existingCartItems = localStorage.getItem(localStorageKey);
    }
  
    if (!existingCartItems) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(localStorageKey, JSON.stringify([]));
      }
    }
  };
  
  initializeLocalStorage(shopid);

  useEffect(() => {
    const localStorageKey = `mart_${shopid}`;
    const existingCartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setCartItems(existingCartItems);
  }, [router.query.shopid]);
}

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

  

    return <NavbarLayout color={data} mode={colormode} contents={details} icons={iconInfo}>
    <Cart>
    <Component {...pageProps} />
    </Cart>
    </NavbarLayout>;
  }

export { getServerSideProps }