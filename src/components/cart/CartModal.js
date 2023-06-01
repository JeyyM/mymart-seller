import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MyContext } from "../store/MyProvider";

function CartModal(props) {
  const router = useRouter()
  const localStorageKey = `mart_${router.query.shopid}`;
  const { handleIncrement } = useContext(MyContext);

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

    if (amount === 1) {
      if (parseInt(updatedData[index].cartValue) < parseInt(select.amount)) {
        updatedData[index].cartValue = parseInt(updatedData[index].cartValue) + parseInt(amount);
      } else {
        updatedData[index].cartValue = parseInt(select.amount);
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
  };


  const updateCartInput = (index, amount, select) => {
    const updatedData = [...parsedData];
    const item = updatedData[index];
    const newCartValue = parseInt(select.cartValue) + parseInt(amount);

    let chosenCartValue = newCartValue <= select.amount ? newCartValue : select.amount;

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
              <div className="cart-rows">
                {parsedData.map((item, index) => (
                  <div className="cart-row" key={index}>
                    <img className="cart-img round-borderer" src={item.image}></img>
                    <div className="flex-col-2" style={{ width: "auto" }}>
                      <a href={`/${item.url}`} className="heading-secondary" style={{ whiteSpace: "pre-wrap", display: "inline", textDecoration: "none" }}>{item.name}</a>
                      <h3 className="heading-tertiary" style={{ display: "inline" }}>{item.description}</h3>
                    </div>

                    <div className="cart-pay">
                      <h2 className="heading-tertiary" style={{ marginBottom: "1rem" }}>Price: {props.currency} {item.price} / {item.unit}</h2>

                      <div className="add-buttons flex-row-spaceless" style={{ width: "20rem" }}>
                        <button type="button" className="minus-button"><div className="heading-icon-minus-act svg-color" onClick={() => updateCartItem(index, -1, item)}>&nbsp;</div></button>
                        <input type="number" className="text-small input-number" placeholder="Amount" style={{ borderRadius: "0", margin: "0" }} value={item.cartValue} onChange={(e) => updateCartInput(index, parseInt(e.target.value) - item.cartValue, item)}></input>
                        <button type="button" className="add-button svg-color"><div className="heading-icon-plus-act svg-decolor" onClick={() => updateCartItem(index, 1, item)}>&nbsp;</div></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="empty-cart-row"></div>

              <div className="cart-bottom dark-underline-upper">
                <h2 className="heading-secondary">Total: {props.currency} {total}</h2>
                <button className="product-action-2 heading-secondary flex-row-align" type="button" style={{width:"24rem", margin:"0"}}><div className="menu-checkout svg-decolor">&nbsp;</div><h2 className="heading-secondary">To Checkout</h2></button>
              </div>

            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default CartModal;
