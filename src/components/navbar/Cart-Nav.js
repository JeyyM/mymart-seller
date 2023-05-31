import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { updateWith } from "lodash";
import { useRef, useReducer } from "react";
import { MyContext } from "../store/MyProvider";

function CartNav(props) {
  const router = useRouter();
  const localStorageKey = `mart_${router.query.shopid}`;
  const [parsedData, setParsedData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const sharedData = useContext(MyContext);

  const { state } = useContext(MyContext);
    const [buttonClass, setButtonClass] = useState('navitem');

  useEffect(() => {
    const updateParsedData = () => {
      const storedCartItems =
        typeof window !== "undefined"
          ? localStorage.getItem(localStorageKey)
          : null;
      const parsedData = storedCartItems ? JSON.parse(storedCartItems) : [];
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

    setButtonClass('navitem cartbob');
    setTimeout(() => {
      setButtonClass('navitem');
    }, 300);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [localStorageKey, state.count]);


  var total = parsedData.reduce(function (sum, item) {
    return sum + item.cartValue;
  }, 0);

  return (
    <>
    <button
      className={buttonClass}
      style={{ gap: "0rem" }}
      type="button"
      onClick={props.handleCart}
    >
      <h3 className="heading-secondary">{isVisible ? total : "-"}</h3>
      <div style={{ transform: "translateY(-1rem)" }}>
        {props.svg}
        <h3 className="heading-tertiary">{props.label}</h3>
      </div>
    </button>
    </>
  );
}

export default CartNav;
