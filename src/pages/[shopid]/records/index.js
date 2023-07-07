import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSideProps } from "..";
import { AnimatePresence, motion } from "framer-motion";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";
import RevertOrder from "@/components/orders/RevertOrder";
import UserProfile from "@/components/orders/UserProfile";
import RefuseOrder from "@/components/orders/RefuseOrder";
import AcceptOrder from "@/components/orders/AcceptOrder";
import FinishOrder from "@/components/orders/FinishOrder";
import Celebration from "@/components/orders/Celebration";

function Records({ shopID }) {
    const router = useRouter();
    const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    const { shopData } = shopID;
    const currency = shopData.shopDetails.paymentData.checkoutInfo.currency
    let contents = shopData.shopSales.finishedOrders.slice().reverse();
    const usersList = shopData.shopAccounts
    const takebacks = shopData.shopDetails.paymentData.Takebacks
    const defaultColor = shopData.shopDesigns.defaultMode
    const design = shopData.shopDesigns

    function findUser(email) { return usersList.find((user) => user.email === email) }

    const [activeOrders, setActiveOrders] = useState(contents)

    const [shopCategories, setShopCategories] = useState(shopData.shopCategories)

    const favicon = shopData.shopDetails.imageData.icons.icon

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

    const [SetUser, setUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleSetUser = (user) => {
        let chosenUser = findUser(user.email)
        setSelectedUser(chosenUser);
        setUserModal(!SetUser);
    };

    const userClose = () => {
        setUserModal(!SetUser);
    }

    const [refuse, setRefuseModal] = useState(false);
    const handleSetRefuse = (order) => {
        setSelectedOrder(order);
        let chosenUser = findUser(order.user.email)
        setSelectedUser(chosenUser);
        setRefuseModal(!refuse);
    };

    const refuseClose = () => {
        setRefuseModal(!refuse);
    }


    const [celebration, setCelebration] = useState(false)
    const celebrationClose = () => {
        setCelebration(!celebration);
    }

    const [accept, setAcceptModal] = useState(false);
    const handleSetAccept = (order) => {
        setSelectedOrder(order);
        let chosenUser = findUser(order.user.email)
        setSelectedUser(chosenUser);
        setAcceptModal(!refuse);
    };

    const acceptClose = () => {
        setAcceptModal(!accept);
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

    function formatDateTime2(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        const formattedDate = dateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).replace(/\//g, '-');

        const formattedDateTime = `${formattedDate}`;

        return formattedDateTime;
    }

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

    function deleteItem(order) {
        const newOrders = activeOrders.filter((item) => item.id !== order.id)
        setActiveOrders(newOrders)
    }

    async function editApi(newOrder, productIds) {
        const requestBody = {
            selectedOrder: selectedOrder,
            productIds: productIds
        };

        const response = await fetch(
            `../../api/order-edit?martid=${router.query.shopid}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
        const data = await response.json();
    }

    async function refuseApi(newOrder, productIds) {
        const requestBody = {
            selectedOrder: selectedOrder,
            productIds: productIds
        };

        const response = await fetch(
            `../../api/order-refuse?martid=${router.query.shopid}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
        const data = await response.json();
    }

    async function finishApi(newOrder) {
        const requestBody = {
            selectedOrder: selectedOrder,
        };

        const response = await fetch(
            `../../api/order-finish?martid=${router.query.shopid}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
        const data = await response.json();
    }

    async function acceptApi(newOrder) {
        const requestBody = {
            selectedOrder: selectedOrder
        };

        const response = await fetch(
            `../../api/order-accept?martid=${router.query.shopid}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
        const data = await response.json();
    }

    async function changeOrder(changedOrder, id, message, final) {
        let updatedOrder = activeOrders.filter((item) => item.id === id)
        updatedOrder[0].order = changedOrder;
        updatedOrder[0].status = "edited";
        updatedOrder[0].ownerMessage = message

        const currentDate = new Date();
        const today = new Date();

        let { cancelCount, cancelDuration } = takebacks;
        cancelCount = parseInt(cancelCount, 10);

        if (cancelDuration === 'minute') {
            currentDate.setMinutes(currentDate.getMinutes() + cancelCount);
        } else if (cancelDuration === 'hour') {
            currentDate.setHours(currentDate.getHours() + cancelCount);
        } else if (cancelDuration === 'day') {
            currentDate.setDate(currentDate.getDate() + cancelCount);
        } else if (cancelDuration === 'week') {
            currentDate.setDate(currentDate.getDate() + (cancelCount * 7));
        } else if (cancelDuration === 'month') {
            currentDate.setMonth(currentDate.getMonth() + cancelCount);
        } else if (cancelDuration === 'year') {
            currentDate.setFullYear(currentDate.getFullYear() + cancelCount);
        }

        updatedOrder[0].currentTime = today;
        updatedOrder[0].cancelDuration = currentDate

        const calculateTotal = () => {
            let total = 0;

            updatedOrder[0].order.forEach((item) => {
                const totalCost = item.cartValue * parseFloat(item.price);
                total += totalCost;
            });

            return total;
        };

        let orderTotal = calculateTotal()

        updatedOrder[0].totals.order = orderTotal

        let ProductIdentifiers = []

        const newStocks = final.map((prod) => {
            const originalStocks = findItem(prod.category, prod.name)
            const newData = {
                ...originalStocks,
                productStock: {
                    ...originalStocks.productStock,
                    stockAmount: originalStocks.productStock.stockAmount - prod.cartValue
                }
            };

            const categId = shopCategories.findIndex(category => category.categoryName === prod.category);

            const productId = shopCategories[categId].categoryProducts.findIndex(
                (product) => product.variations.some((variation) => variation.productName === prod.name)
            );

            const variationId = shopCategories[categId].categoryProducts[productId].variations.findIndex(
                (variation) => variation.productName === prod.name
            );

            const updatedShopCategoryAmount = [...shopCategories]
            updatedShopCategoryAmount[categId].categoryProducts[productId].variations[variationId].productStock.stockAmount = newData.productStock.stockAmount;
            setShopCategories(updatedShopCategoryAmount)

            let newProductIdentifiers = [categId, productId, variationId, newData.productStock.stockAmount]
            ProductIdentifiers.push(newProductIdentifiers)

            return newData
        })

        await editApi(selectedOrder, ProductIdentifiers)
    }

    async function finishRefusal(changedOrder, message) {
        let updatedOrder = activeOrders.filter((item) => item.id === changedOrder.id)
        updatedOrder[0].order = changedOrder.order;
        updatedOrder[0].status = "finished";
        updatedOrder[0].ownerMessage = message

        await finishApi(selectedOrder)
        celebrationClose()
    }

    const [buttonMode, setButtonMode] = useState(false)
    const ongoingClass = `${buttonMode ? "product-action-2 flex-row-align" : "product-action-1 flex-row-align"}`
    const acceptClass = `${buttonMode ? "product-action-1 flex-row-align" : "product-action-2 flex-row-align"}`

    const ongoingText = `${buttonMode ? "heading-tertiary margin-side solid-text-color" : "heading-tertiary margin-side"}`
    const acceptText = `${buttonMode ? "heading-tertiary margin-side" : "heading-tertiary margin-side solid-text-color"}`

    if (contents.length > 0) {
        return (
            <Fragment>
                <Head>
                    <title>Customer Records</title>
                    <link rel="icon" type="image/jpeg" href={favicon} />
                </Head>
                <RevertOrder modalStatus={SetEdit} order={selectedOrder} disable={editClose} change={changeOrder} categories={shopCategories} currency={currency} takebacks={takebacks}></RevertOrder>
                <UserProfile modalStatus={SetUser} user={selectedUser} disable={userClose} currency={currency} martCoords={shopData.shopDetails.footerData.shopCoords}></UserProfile>
                <FinishOrder modalStatus={refuse} user={selectedUser} disable={refuseClose} change={finishRefusal} currency={currency} martCoords={shopData.shopDetails.footerData.shopCoords} order={selectedOrder}></FinishOrder>
                <Celebration modalStatus={celebration} disable={celebrationClose}></Celebration>


                <span className="page-heading">
                    <div className="heading-icon-dropshadow">
                        <div className="heading-icon-receipt svg-color">&nbsp;</div>
                    </div>
                    <h1 className="heading-primary no-margin">Customer Records</h1>

                </span>
                <div className="order-container">

                    <div className="order-column">
                        {
                            col1.map((order) => {
                                const itemClass = `${order.status === "finished" ? "round-borderer round-borderer-extra order-item" : "round-borderer-red order-item"}`

                                const [timeDifference, setTimeDifference] = useState('');

                                useEffect(() => {
                                    if (!order || !order.cancelDuration) {
                                        setTimeDifference('Invalid order');
                                        return;
                                    }

                                    const interval = setInterval(() => {
                                        const currentTime = new Date();
                                        const cancelTime = new Date(order.refundDuration);
                                        const timeDifferenceMs = cancelTime - currentTime;

                                        if (timeDifferenceMs <= 0) {
                                            clearInterval(interval);
                                            setTimeDifference('Cancellation period has passed');
                                        } else {
                                            const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
                                            const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                            const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
                                            const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

                                            const timeDifferenceStr = `${days > 0 ? days + ' days, ' : ''}${hours > 0 ? hours + ' hours, ' : ''}${minutes > 0 ? minutes + ' minutes, ' : ''}${seconds} seconds`;
                                            setTimeDifference(timeDifferenceStr);
                                        }
                                    }, 1000);

                                    return () => clearInterval(interval);
                                }, [order]);

                                return <div className={itemClass} key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                                        <div className="flex-row-spaceless flex-centered">
                                            <button className="order-toggle" onClick={() => toggleExpand(order.id)}>
                                                <div className={ExpandedOrders.includes(order.id) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                                            </button>
                                            <div className="text-sec-profile svg-tertiary" >&nbsp;</div>
                                            <h2 className="heading-secondary">&nbsp;{order.user.profile.last}, {order.user.profile.first}</h2>
                                            <button onClick={() => handleSetUser(order.user)} className={"product-action-1 flex-row-align"} style={{ width: "12rem", margin: "1rem 1rem", height: "4rem", textDecoration: "none" }}><h3 className={"heading-tertiary margin-side"} style={{ transform: "translateY(0rem)" }}>User Data</h3></button>
                                        </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>

                                    <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                        <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(order.currentTime)} for&nbsp;</h2> {order.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                    </div>

                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between" }} >
                                        <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                            {order.status === "finished" ? <div className="text-ter-finished svg-tertiary">&nbsp;</div> : <div className="text-ter-refused svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.status === "finished" ? "Finished" : order.status === "refused" ? "Refused" : "Cancelled"} On: {formatDateTime(order.finishedOn)}</span></h2>
                                        </div>
                                        <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total: {currency} {order.totals.order + order.totals.fees}</h2>
                                    </div>
                                    <textarea
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                        style={{ marginBottom: "1rem" }}
                                    ></textarea>

                                    <motion.div
                                        style={{ overflow: 'hidden' }}
                                        initial={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        animate={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        variants={SlideHeight}>

                                        {order.order.map((item, index) => {
                                            let foundProduct = findItem(item.category, item.name)


                                            return <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }} key={index}>

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
                                        {order.allowRefund ? <h2 className="heading-tertiary">Refund Period: {timeDifference}</h2> : "Refunds disabled"}
                                    </motion.div>
                                </div>
                            })
                        }

                    </div>

                    <div className="order-column">
                    {
                            col2.map((order) => {
                                const itemClass = `${order.status === "finished" ? "round-borderer round-borderer-extra order-item" : "round-borderer-red order-item"}`

                                const [timeDifference, setTimeDifference] = useState('');

                                useEffect(() => {
                                    if (!order || !order.cancelDuration) {
                                        setTimeDifference('Invalid order');
                                        return;
                                    }

                                    const interval = setInterval(() => {
                                        const currentTime = new Date();
                                        const cancelTime = new Date(order.refundDuration);
                                        const timeDifferenceMs = cancelTime - currentTime;

                                        if (timeDifferenceMs <= 0) {
                                            clearInterval(interval);
                                            setTimeDifference('Cancellation period has passed');
                                        } else {
                                            const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
                                            const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                            const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
                                            const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

                                            const timeDifferenceStr = `${days > 0 ? days + ' days, ' : ''}${hours > 0 ? hours + ' hours, ' : ''}${minutes > 0 ? minutes + ' minutes, ' : ''}${seconds} seconds`;
                                            setTimeDifference(timeDifferenceStr);
                                        }
                                    }, 1000);

                                    return () => clearInterval(interval);
                                }, [order]);

                                return <div className={itemClass} key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                                        <div className="flex-row-spaceless flex-centered">
                                            <button className="order-toggle" onClick={() => toggleExpand(order.id)}>
                                                <div className={ExpandedOrders.includes(order.id) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                                            </button>
                                            <div className="text-sec-profile svg-tertiary" >&nbsp;</div>
                                            <h2 className="heading-secondary">&nbsp;{order.user.profile.last}, {order.user.profile.first}</h2>
                                            <button onClick={() => handleSetUser(order.user)} className={"product-action-1 flex-row-align"} style={{ width: "12rem", margin: "1rem 1rem", height: "4rem", textDecoration: "none" }}><h3 className={"heading-tertiary margin-side"} style={{ transform: "translateY(0rem)" }}>User Data</h3></button>
                                        </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>

                                    <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                        <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(order.currentTime)} for&nbsp;</h2> {order.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                    </div>

                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between" }} >
                                        <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                            {order.status === "finished" ? <div className="text-ter-finished svg-tertiary">&nbsp;</div> : <div className="text-ter-refused svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.status === "finished" ? "Finished" : order.status === "refused" ? "Refused" : "Cancelled"} On: {formatDateTime(order.finishedOn)}</span></h2>
                                        </div>
                                        <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total: {currency} {order.totals.order + order.totals.fees}</h2>
                                    </div>
                                    <textarea
                                        rows='3'
                                        value={order.message.length === 0 ? "No message" : order.message}
                                        className={"desc-text-area"}
                                        placeholder="Description"
                                        style={{ marginBottom: "1rem" }}
                                    ></textarea>

                                    <motion.div
                                        style={{ overflow: 'hidden' }}
                                        initial={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        animate={ExpandedOrders.includes(order.id) ? 'visible' : 'hidden'}
                                        variants={SlideHeight}>

                                        {order.order.map((item, index) => {
                                            let foundProduct = findItem(item.category, item.name)


                                            return <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }} key={index}>

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
                                        {order.allowRefund ? <h2 className="heading-tertiary">Refund Period: {timeDifference}</h2> : "Refunds disabled"}
                                    </motion.div>
                                </div>
                            })
                        }
                    </div>

                </div>
            </Fragment>
        );
    } else {
        return <Fragment>
            <Head>
                <title>Customer Records</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <Celebration modalStatus={celebration} disable={celebrationClose}></Celebration>
            <span className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-receipt svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">Customer Records</h1>
            </span>
            <div className="empty-contents">
                <div className="empty-receipt svg-color">&nbsp;</div>
                <h2 className="empty-text">There seems to be no completed orders yet</h2>
            </div>
        </Fragment>
    }
}

export default Records;

export { getServerSideProps }
