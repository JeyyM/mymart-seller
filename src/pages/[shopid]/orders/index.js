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
import EditOrder from "@/components/orders/EditOrder";

function Orders({ shopID }) {
    const router = useRouter();

    const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    const { shopData } = shopID;
    const currency = shopData.shopDetails.paymentData.checkoutInfo.currency
    const contents = shopData.shopSales.activeOrders;

    const [activeOrders, setActiveOrders] = useState(contents)

    const shopCategories = shopData.shopCategories

    const favicon = shopData.shopDetails.imageData.icons.icon

    let orderAmount = true

    let col1 = []
    let col2 = []

    const [ExpandedOrders, setExpandedOrders] = useState([]);
    const toggleExpand = (index) => {
        if (ExpandedOrders.includes(index)) {
          setExpandedOrders(ExpandedOrders.filter((expIndex) => expIndex !== index));
        } else {
          setExpandedOrders([...ExpandedOrders, index]);
        }
      };

      const [SetEdit, setSetEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleSetEdit = (order) => {
        setSelectedOrder(order);
        setSetEdit(!SetEdit);
      };

    const editClose = () => {
        setSetEdit(!SetEdit);
    }

    function sorter() {
        activeOrders.map((order, index) => {
            if (index % 2 === 0) {
                col1.push(order);
            } else if (index % 2 === 1) {
                col2.push(order);
            }
        });
    }

    sorter()

    // console.log(col1, col2)

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

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    function deleteItem(order){
        const newOrders = activeOrders.filter((item) => item.id !== order.id)
        setActiveOrders(newOrders)
    }

    function changeOrder(changedOrder, id){
        let updatedOrder = activeOrders.filter((item) => item.id === id)
        updatedOrder[0].order = changedOrder;
        updatedOrder[0].status = "edited";

        console.log(updatedOrder)
    }

    if (orderAmount) {
        return (

            <Fragment>
                <Head>
                    <title>Ongoing Sales</title>
                    <link rel="icon" type="image/jpeg" href={favicon} />
                </Head>
                <EditOrder modalStatus={SetEdit} order={selectedOrder} disable={editClose} change={changeOrder} categories={shopCategories} currency = {currency}></EditOrder>
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
                                        <div className="flex-row-spaceless flex-centered" onClick={() => toggleExpand(order.id)}>
                                            <button className="order-toggle">
                                                <div className={ExpandedOrders.includes(order.id) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                                            </button>
                                            <div className="text-sec-profile svg-tertiary" >&nbsp;</div>
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
                                        required
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                    ></textarea>

                                    <motion.div
                                        style={{ overflow: 'hidden' }}
                                        initial={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        animate={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        variants={SlideHeight}>
                                        
                                        <div className="order-button-grid dark-underline" style={{ margin: "1rem 0", paddingBottom:"1rem" }}>
                                            <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }}>User Data</button>
                                            <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetEdit(order)}>Edit Order</button>

                                            <button className="product-action-3 white heading-secondary" style={{ width: "18rem", margin: "0" }}>Refuse Order</button>
                                            <button className="product-action-2 heading-secondary" style={{ width: "18.5rem", margin: "0" }}>Approve Order</button>
                                        </div>

                                        {order.order.map((item, index) => {
                                            let foundProduct = findItem(item.category, item.name)
                                            return <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom:"1rem" }} key={index}>

                                                <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>
                                                    <img className="order-img round-borderer" src={item.image}></img>

                                                    <div className="flex-col">

                                                        <div className="flex-row">
                                                            <Link style={{ marginRight: "auto" }} href={`/${item.url}`} className="heading-secondary whiteSpace noDecor">&nbsp;{item.name} - {item.category}&nbsp;</Link>

                                                            <div className="flex-row" style={{ margin: "1rem" }}>
                                                                <h2 className="heading-tertiary whiteSpace">{typeof foundProduct !== "object" ? foundProduct : foundProduct.active ? "Active" : "Inactive"}&nbsp;</h2> {typeof foundProduct !== "object" ? <div className="order-missing">&nbsp;</div> : foundProduct.active ? <div className="order-active">&nbsp;</div> : <div className="order-inactive">&nbsp;</div>}
                                                            </div>
                                                        </div>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Current Stock: {typeof foundProduct !== "object" ? foundProduct : foundProduct.productStock.stockAmount}</h2>

                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart Amount: {item.cartValue} {item.unit}/s</h2>
                                                            </div>
                                                        </div>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Price: {typeof foundProduct !== "object" ? foundProduct : `${currency} ${foundProduct.productPrice} / ${foundProduct.productStock.stockUnit}`}</h2>

                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total Cost: {currency} {item.cartValue * item.price}</h2>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>


                                        })}
                                    </motion.div>
                                </div>
                            ))
                        }

                    </div>

                    <div className="order-column">
                    {
                            col2.map((order) => (
                                <div className="round-borderer round-borderer-extra order-item" key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }} >
                                        <div className="flex-row-spaceless flex-centered" onClick={() => toggleExpand(order.id)}>
                                            <button className="order-toggle" onClick={() => toggleExpand(order.id)}>
                                                <div className={ExpandedOrders.includes(order.id) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
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
                                        required
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                    ></textarea>

                                    <motion.div
                                        style={{ overflow: 'hidden' }}
                                        initial={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        animate={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        variants={SlideHeight}>
                                        
                                        <div className="order-button-grid dark-underline" style={{ margin: "1rem 0", paddingBottom:"1rem" }}>
                                            <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }}>User Data</button>
                                            <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetEdit(order)}>Edit Order</button>

                                            <button className="product-action-3 white heading-secondary" style={{ width: "18rem", margin: "0" }}>Refuse Order</button>
                                            <button className="product-action-2 heading-secondary" style={{ width: "18.5rem", margin: "0" }}>Approve Order</button>
                                        </div>

                                        {order.order.map((item, index) => {
                                            let foundProduct = findItem(item.category, item.name)
                                            return <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom:"1rem" }} key={index}>

                                                <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>
                                                    <img className="order-img round-borderer" src={item.image}></img>

                                                    <div className="flex-col">

                                                        <div className="flex-row">
                                                            <Link style={{ marginRight: "auto" }} href={`/${item.url}`} className="heading-secondary whiteSpace noDecor">&nbsp;{item.name} - {item.category}&nbsp;</Link>

                                                            <div className="flex-row" style={{ margin: "1rem" }}>
                                                                <h2 className="heading-tertiary whiteSpace">{typeof foundProduct !== "object" ? foundProduct : foundProduct.active ? "Active" : "Inactive"}&nbsp;</h2> {typeof foundProduct !== "object" ? <div className="order-missing">&nbsp;</div> : foundProduct.active ? <div className="order-active">&nbsp;</div> : <div className="order-inactive">&nbsp;</div>}
                                                            </div>
                                                        </div>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Current Stock: {typeof foundProduct !== "object" ? foundProduct : foundProduct.productStock.stockAmount}</h2>

                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart Amount: {item.cartValue} {item.unit}/s</h2>
                                                            </div>
                                                        </div>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Price: {typeof foundProduct !== "object" ? foundProduct : `${currency} ${foundProduct.productPrice} / ${foundProduct.productStock.stockUnit}`}</h2>

                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total Cost: {currency} {item.cartValue * item.price}</h2>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>


                                        })}
                                    </motion.div>
                                </div>
                            ))
                        }
                    </div>

                </div>

                {/* <div style={{ backgroundColor: 'gray', width: '100%' }}>
                    <button onClick={toggleVisibility}>Toggle</button>
                    <motion.div
                        style={{ overflow: 'hidden' }}
                        initial={isVisible ? 'visible' : 'hidden'}
                        animate={isVisible ? 'visible' : 'hidden'}
                        variants={SlideHeight}
                    >
                        <h1>Content</h1>
                        <h1>Content</h1>
                        <h1>Content</h1>
                        <h1>Content</h1>
                        <h1>Content</h1>
                        <h1>Content</h1>
                        <h1>Content</h1>
                    </motion.div>
                    <h1>Stuffz</h1>
                </div> */}


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
