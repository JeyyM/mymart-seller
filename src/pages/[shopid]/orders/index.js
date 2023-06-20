import Category from "../../../components/category/Category";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import AddCategory from "@/components/Modal/Add-Category";
import Head from "next/head";
import { getServerSideProps } from "..";
import { AnimatePresence, motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";

function Orders({ shopID }) {
    const router = useRouter();

    const { shopData } = shopID;
    const currency = shopData.shopDetails.paymentData.checkoutInfo.currency
    const contents = shopData.shopSales.activeOrders;

    const shopCategories = shopData.shopCategories

    const favicon = shopData.shopDetails.imageData.icons.icon

    let orderAmount = true

    let col1 = []
    let col2 = []

    function sorter() {
        contents.map((order, index) => {
            if (index % 2 === 0) {
                col1.push(order);
            } else if (index % 2 === 1) {
                col2.push(order);
            }
        });
    }

    sorter()

    console.log(col1, col2)

    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        const formattedDate = dateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).replace(/\//g, '-');

        const formattedTime = dateTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        const formattedDateTime = `${formattedDate}, ${formattedTime}`;

        return formattedDateTime;
    }

    const calculateTotal = (data) => {
        let total = 0;

        data.forEach((item) => {
            const totalCost = item.cartValue * parseFloat(item.price);
            total += totalCost;
        });

        return total;
    };

    console.log(shopCategories)

    function findItem(category, varName) {
        let chosenCateg = shopCategories.find((categ) => categ.categoryName === category)

        if (chosenCateg) {
            let chosenVariation = chosenCateg.categoryProducts.flatMap((prod) => prod.variations).find((variation) => variation.productName === varName);
            if (chosenVariation) {
                return chosenVariation
            } else {
                return "Missing Product"
            }
        } else {
            return "Category Missing"
        }
    }

    if (orderAmount) {
        return (

            <Fragment>
                <Head>
                    <title>Ongoing Sales</title>
                    <link rel="icon" type="image/jpeg" href={favicon} />
                </Head>
                <span className="page-heading">
                    <div className="heading-icon-dropshadow">
                        <div className="heading-icon-ongoing svg-color">&nbsp;</div>
                    </div>
                    <h1 className="heading-primary no-margin">Ongoing Sales</h1>
                </span>
                <div className="order-container">

                    <div className="order-column">
                        {
                            col1.map((order) => (
                                <div className="round-borderer round-borderer-extra order-item" key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }} >
                                        <div className="flex-row-spaceless flex-centered">
                                            <button className="order-toggle">
                                                <div className="heading-icon-chevron svg-color">&nbsp;</div>
                                            </button>
                                            <div className="text-sec-profile svg-tertiary">&nbsp;</div>
                                            <h2 className="heading-secondary">&nbsp;{order.user.profile.last}, {order.user.profile.first} -&nbsp;</h2> <div className="text-sec-mail svg-tertiary">&nbsp;</div> <h2 className="heading-secondary">&nbsp;{order.user.email}</h2>
                                        </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>

                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between" }} >
                                        <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                            <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(order.currentTime)} for&nbsp;</h2> {order.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                        </div>
                                        <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total: {currency} {order.totals.order + order.totals.fees}</h2>
                                    </div>
                                    <textarea
                                        id='description'
                                        required
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                    ></textarea>

                                    <div className="flex-row flex-align" style={{ justifyContent: "space-around", margin: "1rem" }}>
                                        <button className="product-action-1 heading-secondary" style={{ width: "20rem", margin: "0" }}>User Data</button>
                                        <button className="product-action-3 white heading-secondary" style={{ width: "20rem", margin: "0" }}>Refuse Order</button>
                                        <button className="product-action-2 heading-secondary" style={{ width: "20rem", margin: "0" }}>Approve Order</button>
                                    </div>

                                    {order.order.map((item, index) => {
                                        let foundProduct = findItem(item.category, item.name)
                                        return <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }} >
                                        <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                        <img className="order-img round-borderer" src={item.image}></img>
                                        <Link href={`/${item.url}`} className="heading-secondary whiteSpace noDecor">&nbsp;{item.name} - {item.category}&nbsp;
                                        </Link>                              
                                        </div>
                                        <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                        <h2 className="heading-tertiary whiteSpace">{typeof foundProduct !== "object" ? foundProduct : foundProduct.active ? "Active" : "Inactive"}&nbsp;</h2> {typeof foundProduct !== "object" ? <div className="order-missing">&nbsp;</div> : foundProduct.active ? <div className="order-active">&nbsp;</div> : <div className="order-inactive">&nbsp;</div>}     
                                        </div>   
                                         
                                        
                                        </div>
                                    

                                    })}
                                </div>
                            ))
                        }

                    </div>

                    <div className="order-column">
                        {
                            col2.map((order) => (
                                <div className="round-borderer round-borderer-extra order-item" key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }} >
                                        <div className="flex-row-spaceless flex-centered">
                                            <button className="order-toggle">
                                                <div className="heading-icon-chevron svg-color">&nbsp;</div>
                                            </button>
                                            <div className="text-sec-profile svg-tertiary">&nbsp;</div>
                                            <h2 className="heading-secondary">&nbsp;{order.user.profile.last}, {order.user.profile.first} -&nbsp;</h2> <div className="text-sec-mail svg-tertiary">&nbsp;</div> <h2 className="heading-secondary">&nbsp;{order.user.email}</h2>
                                        </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>

                                    <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                        <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(order.currentTime)} for&nbsp;</h2> {order.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                    </div>
                                    <textarea
                                        id='description'
                                        required
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                    ></textarea>

                                    <div className="flex-row flex-align" style={{ justifyContent: "space-around", margin: "1rem" }}>
                                        <button className="product-action-1 heading-secondary" style={{ width: "20rem", margin: "0" }}>User Data</button>
                                        <button className="product-action-3 white heading-secondary" style={{ width: "20rem", margin: "0" }}>Refuse Order</button>
                                        <button className="product-action-2 heading-secondary" style={{ width: "20rem", margin: "0" }}>Approve Order</button>


                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>

            </Fragment>
        );
    } else {
        return <Fragment>
            <Head>
                <title>Ongoing Sales</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <span className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-category svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">Ongoing Sales</h1>
            </span>
            <div className="empty-contents">
                <div className="empty-ongoing svg-color">&nbsp;</div>
                <h2 className="empty-text">There seems to be no ongoing sales</h2>
            </div>
        </Fragment>
    }
}

export default Orders;

export { getServerSideProps }
