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

function Orders({ shopID }) {
    const router = useRouter();

    const { shopData } = shopID;
    const contents = shopData.shopSales.activeOrders;

    console.log(contents)

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

    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log('Button clicked');
      };

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
                                    <div className="flex-row flex-centered">
                                    <button className="order-toggle">
                                    <div className="heading-icon-chevron svg-color">&nbsp;</div>                          
                                    </button>
                                        <h2 className="heading-secondary">{order.user.profile.last}, {order.user.profile.first} - {order.user.email}</h2>
                                    </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>
                                    <div className="flex-align flex-row" style={{ justifyContent: "space-between" }}>
                                        <h2 className="heading-tertiary">On: {formatDateTime(order.currentTime)} for <span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                    </div>
                                    <textarea
                                        id='description'
                                        required
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                    ></textarea>

                                <div className="flex-row flex-align" style={{justifyContent:"space-around", margin:"1rem"}}>
                                <button className="product-action-1 heading-secondary" style={{width:"20rem", margin:"0"}}>User Data</button>
                                <button className="product-action-3 white heading-secondary" style={{width:"20rem", margin:"0"}}>Refuse Order</button>
                                <button className="product-action-2 heading-secondary" style={{width:"20rem", margin:"0"}}>Approve Order</button>

                                </div>
                                </div>
                            ))
                        }

                    </div>

                    <div className="order-column">
                    {
                            col2.map((order) => (
                                <div className="round-borderer round-borderer-extra order-item" key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }} >
                                    <div className="flex-row flex-centered">
                                    <button className="order-toggle">
                                    <div className="heading-icon-chevron svg-color">&nbsp;</div>                          
                                    </button>
                                        <h2 className="heading-secondary">{order.user.profile.last}, {order.user.profile.first} - {order.user.email}</h2>
                                    </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>
                                    <div className="flex-align flex-row" style={{ justifyContent: "space-between" }}>
                                        <h2 className="heading-tertiary">On: {formatDateTime(order.currentTime)} for <span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                    </div>
                                    <textarea
                                        id='description'
                                        required
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                    ></textarea>

                                <div className="flex-row flex-align" style={{justifyContent:"space-around", margin:"1rem"}}>
                                <button className="product-action-1 heading-secondary" style={{width:"20rem", margin:"0"}}>User Data</button>
                                <button className="product-action-3 white heading-secondary" style={{width:"20rem", margin:"0"}}>Refuse Order</button>
                                <button className="product-action-2 heading-secondary" style={{width:"20rem", margin:"0"}}>Approve Order</button>

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
