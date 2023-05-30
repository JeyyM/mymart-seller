    import React, { useState, useEffect } from "react";
    import Link from "next/link";
    import { useRouter } from "next/router";
    import { MyContext } from "@/pages/_app";
    import { useContext } from "react";
import { updateWith } from "lodash";

    function CartNav(props) {
    const router = useRouter();
    const localStorageKey = `mart_${router.query.shopid}`;
    const [parsedData, setParsedData] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    const sharedData = useContext(MyContext);

    const { handleChange, change } = useContext(MyContext);

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

        // handleStorageChange()
        handleVisibilityChange()

        updateParsedData();

        window.addEventListener("storage", handleStorageChange);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
        window.removeEventListener("storage", handleStorageChange);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [localStorageKey, change]);

    var total = parsedData.reduce(function (sum, item) {
        return sum + item.cartValue;
    }, 0);

    return (
        <button className="navitem" style={{ gap: "0rem" }} onClick={handleChange} type="button">
            <h3 className="heading-secondary">{isVisible ? total : "-"}</h3>
            <div style={{ transform: "translateY(-1rem)" }}>
            {props.svg}
            <h3 className="heading-tertiary">{props.label}</h3>
            </div>
        </button>
    );
    }

    export default CartNav;
