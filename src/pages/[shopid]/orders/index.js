import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSideProps } from "..";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";
import EditOrder from "@/components/orders/EditOrder";
import UserProfile from "@/components/orders/UserProfile";
import RefuseOrder from "@/components/orders/RefuseOrder";
import AcceptOrder from "@/components/orders/AcceptOrder";

import OrderItem from "@/components/orders/OrderItem";
import pako from "pako";

function Orders({ shopID, screenWidth }) {
    const router = useRouter();
    const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
    const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    const final = JSON.parse(decompressedBytes);

    const { shopData } = final;
    const currency = shopData.shopDetails.paymentData.checkoutInfo.currency
    const contents = shopData.shopSales.activeOrders;
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
                if (screenWidth > 900) {
                    col2.push(order);
                } else {
                    col1.push(order)
                }
            }
        });
    }

    sorter()

    async function editApi(productIds) {
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

    async function refuseApi(productIds) {
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

    async function acceptApi() {
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

        await editApi(selectedOrder, ProductIdentifiers)
    }

    async function finishRefusal(changedOrder, message) {
        let updatedOrder = activeOrders.filter((item) => item.id === changedOrder.id)
        updatedOrder[0].order = changedOrder.order;
        updatedOrder[0].status = "refused";
        updatedOrder[0].ownerMessage = message

        const today = new Date();
        updatedOrder[0].finishedOn = today

        let ProductIdentifiers = []

        await refuseApi(selectedOrder, ProductIdentifiers)
    }

    async function finishAccept(changedOrder, message, expectDate) {
        let updatedOrder = activeOrders.filter((item) => item.id === changedOrder.id)
        updatedOrder[0].order = changedOrder.order;
        updatedOrder[0].status = "accepted";
        updatedOrder[0].ownerMessage = message
        updatedOrder[0].expectBy = expectDate

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

        await acceptApi(selectedOrder)
    }

    const [buttonMode, setButtonMode] = useState(true)
    const ongoingClass = `${buttonMode ? "product-action-2 flex-row-align" : "product-action-1 flex-row-align"}`
    const acceptClass = `${buttonMode ? "product-action-1 flex-row-align" : "product-action-2 flex-row-align"}`

    const ongoingText = `${buttonMode ? "heading-tertiary margin-side solid-text-color" : "heading-tertiary margin-side"}`
    const acceptText = `${buttonMode ? "heading-tertiary margin-side" : "heading-tertiary margin-side solid-text-color"}`

    const removeList = []

    if (contents.length > 0) {
        return (
            <Fragment>
                <Head>
                    <title>Ongoing Sales</title>
                    <link rel="icon" type="image/jpeg" href={favicon} />
                </Head>
                <EditOrder modalStatus={SetEdit} order={selectedOrder} disable={editClose} change={changeOrder} categories={shopCategories} currency={currency} takebacks={takebacks} screenWidth={screenWidth}></EditOrder>
                <UserProfile modalStatus={SetUser} user={selectedUser} disable={userClose} currency={currency} martCoords={shopData.shopDetails.footerData.shopCoords}></UserProfile>
                <RefuseOrder modalStatus={refuse} user={selectedUser} disable={refuseClose} change={finishRefusal} currency={currency} martCoords={shopData.shopDetails.footerData.shopCoords} order={selectedOrder} removeList={removeList}></RefuseOrder>
                <AcceptOrder modalStatus={accept} user={selectedUser} disable={acceptClose} change={finishAccept} currency={currency} martCoords={shopData.shopDetails.footerData.shopCoords} order={selectedOrder} colormode={defaultColor} design={design} screenWidth={screenWidth} removeList={removeList}></AcceptOrder>

                <span className="page-heading">
                    <div className="heading-icon-dropshadow">
                        <div className="heading-icon-ongoing-1 svg-color">&nbsp;</div>
                    </div>
                    <h1 className="heading-primary no-margin">Ongoing Sales</h1>
                    {screenWidth > 500 && <>
                        <Link href={`/${router.query.shopid}/orders`} onClick={() => { setButtonMode(true) }} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={ongoingText} style={{ transform: "translateY(0rem)" }}>Ongoing Orders</h3></Link>
                        <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => { setButtonMode(false) }} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>Accepted Orders</h3></Link>
                    </>}

                </span>
                {screenWidth < 500 && <div className="flex-row">
                    <Link href={`/${router.query.shopid}/orders`} onClick={() => { setButtonMode(true) }} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={ongoingText} style={{ transform: "translateY(0rem)" }}>Ongoing Orders</h3></Link>
                    <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => { setButtonMode(false) }} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>Accepted Orders</h3></Link>
                </div>}
                <div className="order-container">

                    <div className="order-column">
                        {col1.map((order) => (
                            <OrderItem handleSetUser={handleSetUser} handleSetAccept={handleSetAccept} handleSetRefuse={handleSetRefuse} handleSetEdit={handleSetEdit} toggleExpand={toggleExpand} key={order.id} order={order} screenWidth={screenWidth} ExpandedOrders={ExpandedOrders} currency={currency} shopCategories={shopCategories} router={router} />
                        ))}
                    </div>

                    {screenWidth > 900 && <div className="order-column">
                        {col2.map((order) => (
                            <OrderItem handleSetUser={handleSetUser} handleSetAccept={handleSetAccept} handleSetRefuse={handleSetRefuse} handleSetEdit={handleSetEdit} toggleExpand={toggleExpand} key={order.id} order={order} screenWidth={screenWidth} ExpandedOrders={ExpandedOrders} currency={currency} shopCategories={shopCategories} router={router} />
                        ))}
                    </div>}

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
                    <div className="heading-icon-ongoing-1 svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">Ongoing Sales</h1>
                {screenWidth > 500 && <><Link href={`/${router.query.shopid}/orders`} onClick={() => { setButtonMode(true) }} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={ongoingText} style={{ transform: "translateY(0rem)" }}>Ongoing Orders</h3></Link>
                    <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => { setButtonMode(false) }} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>Accepted Orders</h3></Link></>}

            </span>
            {screenWidth < 500 && <div className="flex-row">
                <Link href={`/${router.query.shopid}/orders`} onClick={() => { setButtonMode(true) }} className={ongoingClass} style={{ width: "max-content", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={ongoingText} style={{ transform: "translateY(0rem)" }}>Ongoing Orders</h3></Link>
                <Link href={`/${router.query.shopid}/orders/approved`} onClick={() => { setButtonMode(false) }} className={acceptClass} style={{ width: "20rem", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>Accepted Orders</h3></Link>
            </div>}
            <div className="empty-contents">
                <div className="empty-ongoing-1 svg-color">&nbsp;</div>
                <h2 className="empty-text">There seems to be no ongoing sales</h2>
            </div>
        </Fragment>
    }
}

export default Orders;

export { getServerSideProps }
