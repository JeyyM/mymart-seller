import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function CartNav(props) {
  const router = useRouter();
  const localStorageKey = `mart_${router.query.shopid}`;
  const [parsedData, setParsedData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [localStorageChanged, setLocalStorageChanged] = useState(false);

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
        setLocalStorageChanged(true);
      }
    };

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);

      if (document.hidden && localStorageChanged) {
        updateParsedData();
        setLocalStorageChanged(false);
      }
    };

    handleVisibilityChange();
    updateParsedData();

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [localStorageKey]);

  var total = parsedData.reduce(function (sum, item) {
    return sum + item.cartValue;
  }, 0);

  return (
    <Link
      href={`/${router.query.shopid}/${props.link}`}
      title={props.title}
      style={{ textDecoration: "none" }}
    >
      <button className="navitem" style={{ gap: "0rem" }}>
        <h3 className="heading-secondary">{isVisible ? total : "-"}</h3>
        <div style={{ transform: "translateY(-1rem)" }}>
          {props.svg}
          <h3 className="heading-tertiary">{props.label}</h3>
        </div>
      </button>
    </Link>
  );
}

export default CartNav;
