import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSideProps } from "..";
import { motion } from "framer-motion";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";
import RevertOrder from "@/components/orders/RevertOrder";
import UserProfile from "@/components/orders/UserProfile";
import FinishOrder from "@/components/orders/FinishOrder";
import Celebration from "@/components/orders/Celebration";
import pako from "pako";

function Orders({ shopID, screenWidth }) {
    const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
    const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    const final = JSON.parse(decompressedBytes);

    const router = useRouter();
    const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    const { shopData } = final;
    const currency = shopData.shopDetails.paymentData.checkoutInfo.currency
    let contents = shopData.shopSales.activeOrders.filter((order) => order.status === "accepted")
    const usersList = shopData.shopAccounts
    const takebacks = shopData.shopDetails.paymentData.Takebacks

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

    function sorter() {
        activeOrders.map((order, index) => {
            if (index % 2 === 0) {
                col1.push(order);
            } else if (index % 2 === 1) {
                if  (screenWidth > 900){
                col2.push(order);} else {
                    col1.push(order)
                }
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

    async function editApi(productIds){
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

    async function finishApi(newOrder){
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
        const today = new Date();
        const currentDate = new Date();
        updatedOrder[0].finishedOn = today

        let { refundCount, refundDuration } = takebacks; 
        refundCount = parseInt(refundCount, 10);

        if (refundDuration === 'minute') {
            currentDate.setMinutes(currentDate.getMinutes() + refundCount);
          } else if (refundDuration === 'hour') {
            currentDate.setHours(currentDate.getHours() + refundCount);
          } else if (refundDuration === 'day') {
            currentDate.setDate(currentDate.getDate() + refundCount);
          } else if (refundDuration === 'week') {
            currentDate.setDate(currentDate.getDate() + (refundCount * 7));
          } else if (refundDuration === 'month') {
            currentDate.setMonth(currentDate.getMonth() + refundCount);
          } else if (refundDuration === 'year') {
            currentDate.setFullYear(currentDate.getFullYear() + refundCount);
          }

          updatedOrder[0].currentTime = today;
          updatedOrder[0].refundDuration = currentDate

        await finishApi(selectedOrder)
        celebrationClose()
    }

    const [buttonMode, setButtonMode] = useState(false)
    const ongoingClass = `${buttonMode ? "product-action-2 flex-row-align" : "product-action-1 flex-row-align"}`
    const acceptClass = `${buttonMode ? "product-action-1 flex-row-align" : "product-action-2 flex-row-align"}`

    const ongoingText = `${buttonMode ? "heading-tertiary margin-side solid-text-color" : "heading-tertiary margin-side"}`
    const acceptText = `${buttonMode ? "heading-tertiary margin-side" : "heading-tertiary margin-side solid-text-color"}`

    const removeList = []

    if (contents.length > 0) {
        return (
            <Fragment>
                <Head>
                    <title>Approved Sales</title>
                    <link rel="icon" type="image/jpeg" href={favicon} />
                </Head>
                <RevertOrder modalStatus={SetEdit} order={selectedOrder} disable={editClose} change={changeOrder} categories={shopCategories} currency={currency} takebacks={takebacks} removeList={removeList}></RevertOrder>
                <UserProfile modalStatus={SetUser} user={selectedUser} disable={userClose} currency={currency} martCoords={shopData.shopDetails.footerData.shopCoords}></UserProfile>
                <FinishOrder modalStatus={refuse} user={selectedUser} disable={refuseClose} change={finishRefusal} currency={currency} martCoords={shopData.shopDetails.footerData.shopCoords} order={selectedOrder} removeList={removeList}></FinishOrder>
                <Celebration modalStatus={celebration} disable={celebrationClose}></Celebration>

                <span className="page-heading">
                    <div className="heading-icon-dropshadow">
                        <div className="heading-icon-ongoing svg-color">&nbsp;</div>
                    </div>
                    <h1 className="heading-primary no-margin">Approved Sales</h1>

                    {screenWidth > 500 && <>
                    <Link href={`/${router.query.shopid}/orders`} onClick={() => {setButtonMode(true)}} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={ongoingText} style={{transform:"translateY(0rem)"}}>Ongoing Orders</h3></Link>
                    <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => {setButtonMode(false)}} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={acceptText} style={{transform:"translateY(0rem)"}}>Accepted Orders</h3></Link>
                    </>}

                    {/* <button className="heading-tertiary add-categ-init" style={{ width: "max-content" }}>
        <div className="heading-icon-check svg-color">&nbsp;</div>Submit &nbsp;</button> */}
                </span>
                {screenWidth < 500 && <div className="flex-row">
                    <Link href={`/${router.query.shopid}/orders`} onClick={() => {setButtonMode(true)}} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={ongoingText} style={{transform:"translateY(0rem)"}}>Ongoing Orders</h3></Link>
                    <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => {setButtonMode(false)}} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={acceptText} style={{transform:"translateY(0rem)"}}>Accepted Orders</h3></Link>
                    </div>}

                <div className="order-container">

                    <div className="order-column">
                    {
                            col1.map((order) => {
                                    const itemClass = `${order.status === "accepted" ? "round-borderer round-borderer-extra order-item" : "round-borderer round-borderer-extra order-item hidden-order-item"}`

                                return <div className={itemClass} key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem", cursor: "pointer" }} onClick={() => toggleExpand(order.id)}>
                                        <div className="flex-row-spaceless flex-centered">
                                            <button className="order-toggle">
                                                <div className={ExpandedOrders.includes(order.id) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                                            </button>
                                            <div className="text-sec-profile svg-tertiary" >&nbsp;</div>
                                            <h2 className="heading-secondary clamp-1">&nbsp;{order.user.profile.last}, {order.user.profile.first}</h2>
                                        </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>

                                    <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                            <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(order.currentTime)} for&nbsp;</h2> {order.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                        </div>

                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between" }} >
                                        <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                            <div className="text-ter-alarm svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>Expected By: {formatDateTime2(order.currentTime)}</span></h2>
                                        </div>
                                        {screenWidth >= 1100 || (screenWidth < 900 && screenWidth >= 400) ?(<h2 className="heading-tertiary" style={{ fontWeight: "900" }}> Total: {currency}{order.totals.order + order.totals.fees}</h2>) : null}
                                    </div>

                                    {(screenWidth < 900 && screenWidth >= 400) || screenWidth < 1100 && <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total: {currency}{order.totals.order + order.totals.fees}</h2>}

                                    <textarea
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

                                        <div className="order-button-grid-3 dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }}>
                                            <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetUser(order.user)}>User Data</button>
                                            {/* <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetEdit(order)}>Edit Order</button> */}

                                            <button className="product-action-3 white heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetEdit(order)}>Revert Order</button>
                                            <button className="product-action-2 heading-secondary" style={{ width: "18.5rem", margin: "0" }} onClick={() => handleSetRefuse(order)}>Finish Order</button>
                                        </div>

                                        {order.order.map((item, index) => {
                                            let foundProduct = findItem(item.category, item.name)
                                            if (foundProduct === "Missing Product" || foundProduct === "Category Missing"){
                                                removeList.push([item.name, item.category])
                                            }

                                            return <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }} key={index}>

                                                <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>
                                                    <img className="order-img round-borderer" alt={item.name} src={item.image}></img>

                                                    <div className="flex-col">

                                                    <div className="flex-row">
                                                        <Link style={{ marginRight: "auto" }} href={`/${item.url}`} className="heading-secondary whiteSpace noDecor clamp-1">&nbsp;{item.name}&nbsp;</Link>

                                                            <div className="flex-row" style={{ marginTop: "1rem" }}>
                                                                <h2 className="heading-tertiary whiteSpace">{typeof foundProduct !== "object" ? foundProduct : foundProduct.active ? "Active" : "Inactive"}&nbsp;</h2> {typeof foundProduct !== "object" ? <div className="order-missing">&nbsp;</div> : foundProduct.active ? <div className="order-active">&nbsp;</div> : <div className="order-inactive">&nbsp;</div>}
                                                            </div>
                                                        </div>
                                                        <Link style={{margin:"0.5rem 0", marginRight: "auto", fontWeight:"900" }} href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}`} className="heading-tertiary whiteSpace noDecor clamp-1">&nbsp;{item.category}&nbsp;</Link>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Current Stock: {typeof foundProduct !== "object" ? foundProduct : foundProduct.productStock.stockAmount}</h2>

                                                            {screenWidth > 400 && <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart: {item.cartValue} {item.unit}/s</h2>
                                                            </div>}
                                                        </div>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Price: {typeof foundProduct !== "object" ? foundProduct : `${currency} ${foundProduct.productPrice} / ${foundProduct.productStock.stockUnit}`}</h2>

                                                            {screenWidth > 400 && <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total Cost: {currency}{item.cartValue * item.price}</h2>
                                                            </div>}
                                                        </div>

                                                        {screenWidth < 400 && <>
                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart: {item.cartValue} {item.unit}/s</h2>
                                                            </div>
                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total Cost: {currency}{item.cartValue * item.price}</h2>
                                                            </div>
                                                        </>}

                                                    </div>
                                                </div>

                                            </div>


                                        })}
                                    </motion.div>
                                </div>
                            })
                        }

                    </div>

                    {screenWidth > 900 && <div className="order-column">
                    {
                            col2.map((order) => {
                                    const itemClass = `${order.status === "accepted" ? "round-borderer round-borderer-extra order-item" : "round-borderer round-borderer-extra order-item hidden-order-item"}`

                                return <div className={itemClass} key={order.id}>
                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem", cursor: "pointer" }} onClick={() => toggleExpand(order.id)}>
                                        <div className="flex-row-spaceless flex-centered">
                                            <button className="order-toggle">
                                                <div className={ExpandedOrders.includes(order.id) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                                            </button>
                                            <div className="text-sec-profile svg-tertiary" >&nbsp;</div>
                                            <h2 className="heading-secondary clamp-1">&nbsp;{order.user.profile.last}, {order.user.profile.first}</h2>
                                        </div>

                                        <h2 className="heading-secondary">{order.id}</h2>
                                    </div>

                                    <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                            <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(order.currentTime)} for&nbsp;</h2> {order.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
                                        </div>

                                    <div className="flex-row flex-centered" style={{ justifyContent: "space-between" }} >
                                        <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                            <div className="text-ter-alarm svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>Expected By: {formatDateTime2(order.currentTime)}</span></h2>
                                        </div>
                                        {screenWidth >= 1100 || (screenWidth < 900 && screenWidth >= 400) ?(<h2 className="heading-tertiary" style={{ fontWeight: "900" }}> Total: {currency}{order.totals.order + order.totals.fees}</h2>) : null}
                                    </div>

                                    {(screenWidth < 900 && screenWidth >= 400) || screenWidth < 1100 && <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total: {currency}{order.totals.order + order.totals.fees}</h2>}

                                    <textarea
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

                                        <div className="order-button-grid-3 dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }}>
                                            <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetUser(order.user)}>User Data</button>
                                            {/* <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetEdit(order)}>Edit Order</button> */}

                                            <button className="product-action-3 white heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetEdit(order)}>Revert Order</button>
                                            <button className="product-action-2 heading-secondary" style={{ width: "18.5rem", margin: "0" }} onClick={() => handleSetRefuse(order)}>Finish Order</button>
                                        </div>

                                        {order.order.map((item, index) => {
                                            let foundProduct = findItem(item.category, item.name)
                                            if (foundProduct === "Missing Product" || foundProduct === "Category Missing"){
                                                removeList.push([item.name, item.category])
                                            }

                                            return <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }} key={index}>

                                                <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>
                                                    <img className="order-img round-borderer" alt={item.name} src={item.image}></img>

                                                    <div className="flex-col">

                                                    <div className="flex-row">
                                                        <Link style={{ marginRight: "auto" }} href={`/${item.url}`} className="heading-secondary whiteSpace noDecor clamp-1">&nbsp;{item.name}&nbsp;</Link>

                                                            <div className="flex-row" style={{ marginTop: "1rem" }}>
                                                                <h2 className="heading-tertiary whiteSpace">{typeof foundProduct !== "object" ? foundProduct : foundProduct.active ? "Active" : "Inactive"}&nbsp;</h2> {typeof foundProduct !== "object" ? <div className="order-missing">&nbsp;</div> : foundProduct.active ? <div className="order-active">&nbsp;</div> : <div className="order-inactive">&nbsp;</div>}
                                                            </div>
                                                        </div>
                                                        <Link style={{margin:"0.5rem 0", marginRight: "auto", fontWeight:"900" }} href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}`} className="heading-tertiary whiteSpace noDecor clamp-1">&nbsp;{item.category}&nbsp;</Link>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Current Stock: {typeof foundProduct !== "object" ? foundProduct : foundProduct.productStock.stockAmount}</h2>

                                                            {screenWidth > 400 && <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart: {item.cartValue} {item.unit}/s</h2>
                                                            </div>}
                                                        </div>

                                                        <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                            <h2 className="heading-tertiary">&nbsp;Price: {typeof foundProduct !== "object" ? foundProduct : `${currency} ${foundProduct.productPrice} / ${foundProduct.productStock.stockUnit}`}</h2>

                                                            {screenWidth > 400 && <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total Cost: {currency}{item.cartValue * item.price}</h2>
                                                            </div>}
                                                        </div>

                                                        {screenWidth < 400 && <>
                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart: {item.cartValue} {item.unit}/s</h2>
                                                            </div>
                                                            <div className="flex-row">
                                                                <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total Cost: {currency}{item.cartValue * item.price}</h2>
                                                            </div>
                                                        </>}

                                                    </div>
                                                </div>

                                            </div>


                                        })}
                                    </motion.div>
                                </div>
                            })
                        }
                    </div>}

                </div>
            </Fragment>
        );
    } else {
        return <Fragment>
            <Head>
                <title>Approved Sales</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <Celebration modalStatus={celebration} disable={celebrationClose}></Celebration>
            <span className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-ongoing svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">Approved Sales</h1>
                {screenWidth > 500 && <>
                    <Link href={`/${router.query.shopid}/orders`} onClick={() => {setButtonMode(true)}} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={ongoingText} style={{transform:"translateY(0rem)"}}>Ongoing Orders</h3></Link>
                    <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => {setButtonMode(false)}} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={acceptText} style={{transform:"translateY(0rem)"}}>Accepted Orders</h3></Link>
                    </>}
            </span>
            {screenWidth < 500 && <div className="flex-row">
                    <Link href={`/${router.query.shopid}/orders`} onClick={() => {setButtonMode(true)}} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={ongoingText} style={{transform:"translateY(0rem)"}}>Ongoing Orders</h3></Link>
                    <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => {setButtonMode(false)}} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height:"3.5rem", textDecoration:"none"}}><h3 className={acceptText} style={{transform:"translateY(0rem)"}}>Accepted Orders</h3></Link>
                    </div>}
                    
            <div className="empty-contents">
                <div className="empty-ongoing svg-color">&nbsp;</div>
                <h2 className="empty-text">There seems to be no approved sales</h2>
            </div>
        </Fragment>
    }
}

export default Orders;

export { getServerSideProps }
