
import { useRouter } from "next/router";


function Cart(props) {
    const router = useRouter()
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
