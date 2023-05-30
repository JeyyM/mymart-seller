import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


function Cart(props) {
    const router = useRouter()
    const shopid = router.query.shopid
    const [cartItems, setCartItems] = useState([]);
    
    // useEffect(() => {
    //     const localStorageKey = `mart_${shopid}`;
    
    //     const existingCartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    //     setCartItems(existingCartItems);

    //   }, []);
    //   const updateCartItems = (newCartItems) => {
    //     const localStorageKey = `mart_${shopid}`;
    
    //     setCartItems(newCartItems);
    //     localStorage.setItem(localStorageKey, JSON.stringify(newCartItems));
    //   };

    //   const addToCart = (item) => {
    //     const newCartItems = [...cartItems, item];
    //     updateCartItems(newCartItems);
    //   };


    return (
        <>
          {props.children}
        </>
      );    
}

export default Cart;
