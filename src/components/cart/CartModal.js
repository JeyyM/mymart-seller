import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MyContext } from "../store/MyProvider";
import dynamic from "next/dynamic";

function CartModal(props) {
  const {screenWidth} = props
  const router = useRouter()
  const localStorageKey = `mart_${router.query.shopid}`;
  const { handleIncrement } = useContext(MyContext);

  const shopCategories = props.categs
  
  function findItem(category, varName) {
    let chosenCateg = shopCategories.find((categ) => categ.categoryName === category)

    if (chosenCateg) {
        let chosenVariation = chosenCateg.categoryProducts.flatMap((prod) => prod.variations).find((variation) => variation.productName === varName);
        if (chosenVariation) {
            return chosenVariation
        } else {
            return 
        }
    } else {
        return
    }
}

  const appear = {
    hidden: {
      transform: "scale(0)",
      opacity: 0,
    },
    visible: {
      transform: " scale(1)",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      transform: "scale(0)",
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const [parsedData, setParsedData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  async function updateData() {
    if (typeof window !== 'undefined') {
      let storedItems = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;

      const response = await fetch(
        `/api/read-cart?martid=${router.query.shopid}&email=${props.user.email}&password=${props.user.password}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(JSON.parse(storedItems))
        }
      );
      const data = await response.json();
    }
  }

  useEffect(() => {
    const updateParsedData = () => {
      const storedCartItems =
        typeof window !== "undefined"
          ? localStorage.getItem(localStorageKey)
          : null;
      const parsedData = storedCartItems ? JSON.parse(storedCartItems) : [];

      // const updatedData = parsedData.map((item, index) => ({ ...item, key: index.toString() }));
      setParsedData(parsedData);
    };

    const handleStorageChange = (event) => {
      if (event.key === localStorageKey) {
        updateParsedData();
      }
    };

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    handleVisibilityChange();

    updateParsedData();

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [localStorageKey, props.modalStatus]);


  const updateCartItem = (index, amount, select) => {
    const updatedData = [...parsedData];
    const chosenProduct = findItem(select.category, select.name)

    if (amount === 1) {
        if (parseInt(updatedData[index].cartValue) < parseInt(typeof chosenProduct === "object" ? chosenProduct.productStock.stockAmount : 0)) {
            updatedData[index].cartValue = parseInt(updatedData[index].cartValue) + parseInt(amount);
        } else {
            updatedData[index].cartValue = parseInt(typeof chosenProduct === "object" ? chosenProduct.productStock.stockAmount : 0);
        }
    } else if (amount === -1) {
        updatedData[index].cartValue = parseInt(updatedData[index].cartValue) + parseInt(amount);
        if (updatedData[index].cartValue === 0 || updatedData[index].cartValue < 0) {
            updatedData.splice(index, 1);
        }

    }

    localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
    setParsedData(updatedData);
    handleIncrement();

    if (props.user !== undefined) {
        updateData()
    }
};


const updateCartInput = (index, amount, select) => {
  const updatedData = [...parsedData];
  const item = updatedData[index];
  const newCartValue = parseInt(select.cartValue) + parseInt(amount);
  const chosenProduct = findItem(select.category, select.name)

  let stockInput = 0

  if (typeof chosenProduct === "object"){stockInput = chosenProduct.productStock.stockAmount}

  let chosenCartValue = newCartValue <= stockInput ? newCartValue : stockInput;

  if (isNaN(amount)) {
      chosenCartValue = "0";
  }

  item.cartValue = parseInt(chosenCartValue);

  localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
  setParsedData(updatedData);
  handleIncrement()
};


  const calculateTotal = () => {
    let total = 0;

    parsedData.forEach((item) => {
      const totalCost = item.cartValue * parseFloat(item.price);
      total += totalCost;
    });

    return total;
  };

  const total = calculateTotal();

  const DynamicComponent1 = dynamic(() => import("./CheckoutButton1"), {
    ssr: false,
  });

  const DynamicComponent2 = dynamic(() => import("./CheckoutButton2"), {
    ssr: false,
  });

  return (
    <Fragment>
      <AnimatePresence
        initial={false}
        mode={"wait"}
        onExitComplete={() => null}
      >
        {props.modalStatus && (
          <Backdrop className="categ-modals" onClick={props.cartOpen}>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="cart-modal round-borderer round-borderer-extra"
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <span className="page-heading dark-underline">
                <div className="heading-icon-dropshadow">
                  <div className="menu-tocart svg-color" style={{ margin: "1rem" }}>&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">Current Cart</h1>
              </span>
              {parsedData.length === 0 && <div className="cart-empty-cont">
                <div className="empty-contents">
                  <div className="empty-cart svg-color">&nbsp;</div>
                  <h2 className="empty-text">There seems to be no products yet</h2>
                </div>
              </div>}

              {parsedData.length > 0 && <div className="cart-rows">
                {parsedData.map((item, index) => (
                  <div className="cart-row" key={index}>
                    <img className="cart-img round-borderer" src={item.image} alt={item.name}></img>
                    <div className="flex-col-2" style={{ width: "auto" }}>
                      <a href={`/${item.url}`} className={`${screenWidth > 500 ? "heading-secondary" : "heading-tertiary font-boost"} clamp-1`} style={{ whiteSpace: "pre-wrap", textDecoration: "none", fontWeight:"900" }}>{item.name}</a>
                      <h3 className="heading-tertiary clamp-1" style={{ display: "inline", marginTop:"1rem" }}>{item.category}</h3>
                    </div>

                    <div className="cart-pay">
                      <h2 className="heading-tertiary" style={{ marginBottom: "1rem", textAlign:"center" }}>Price: {props.currency} {item.price} / {item.unit}</h2>

                      <div className="add-buttons flex-row-spaceless" style={{ width: `${screenWidth > 500 ? "20rem" : screenWidth > 400 ? "18rem" : "16rem"}`, justifyContent:'flex-end', marginLeft:'auto' }}>
                        <button type="button" className="minus-button" onClick={() => updateCartItem(index, -1, item)}><div className="heading-icon-minus-act svg-color">&nbsp;</div></button>
                        <input type="number" className="text-small input-number" placeholder="Amount" style={{ borderRadius: "0", margin: "0", width:`${screenWidth > 500 ? "95%" : screenWidth > 400 ? "8rem" : "6rem"}` }} value={item.cartValue} onChange={(e) => updateCartInput(index, parseInt(e.target.value) - item.cartValue, item)}></input>
                        <button type="button" className="add-button svg-color" onClick={() => updateCartItem(index, 1, item)}><div className="heading-icon-plus-act svg-decolor">&nbsp;</div></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}

              {parsedData.length > 0 && <>
              {parsedData.length > 0 && <div className="empty-cart-row"></div>}
              {/* style={{flexDirection:"column", padding:"1rem"}} */}
              <div className="cart-bottom dark-underline-upper" style={{flexDirection:`${screenWidth <= 360 && props.user !== undefined ? "column" : "row"}`, padding:`${screenWidth <= 360 && props.user !== undefined ? "1rem" : "0rem"}`, gap:`${screenWidth <= 360 && props.user !== undefined ? "1rem" : "0rem"}` }}>
                <h2 className="heading-secondary">Total: {props.currency} {total}</h2>
                {typeof window !== 'undefined' && (<>
                  {props.user === undefined && <DynamicComponent2 route={router.query.shopid} click={props.cartOpen} screenWidth={screenWidth} />}
                  {props.user !== undefined && <DynamicComponent1 route={router.query.shopid} click={props.cartOpen} screenWidth={screenWidth} />}
                </>
                )}              
                </div>
                </>}

            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default CartModal;
