import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSideProps } from "..";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RevertOrder from "@/components/orders/RevertOrder";
import UserProfile from "@/components/orders/UserProfile";
import FinishOrder from "@/components/orders/FinishOrder";
import Celebration from "@/components/orders/Celebration";

import OrderItem2 from "@/components/orders/OrderItem-2";
import pako from "pako";

function Records({ shopID, screenWidth }) {
    const router = useRouter();

    const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
    const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    const final = JSON.parse(decompressedBytes);

    const { shopData } = final;

    const currency = shopData.shopDetails.paymentData.checkoutInfo.currency
    let contents = shopData.shopSales.finishedOrders.slice().reverse();
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
                if  (screenWidth > 1100){
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
        updatedOrder[0].status = "finished";
        updatedOrder[0].ownerMessage = message

        await finishApi(selectedOrder)
        celebrationClose()
    }

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
                <div className="order-container-2">

                <div className="order-column">
            {col1.map((order) => (
                <OrderItem2
                    order={order}
                    screenWidth={screenWidth}
                    ExpandedOrders={ExpandedOrders}
                    currency={currency}
                    router={router}
                    toggleExpand={toggleExpand}
                    formatDateTime={formatDateTime}
                    findItem={findItem}
                    key={order.id}
                />
            ))}
        </div>

                    {screenWidth > 1100 && <div className="order-column">
                    {
                    <div className="order-column">
                    {col2.map((order) => (
                <OrderItem2
                    order={order}
                    screenWidth={screenWidth}
                    ExpandedOrders={ExpandedOrders}
                    currency={currency}
                    router={router}
                    toggleExpand={toggleExpand}
                    formatDateTime={formatDateTime}
                    findItem={findItem}
                    key={order.id}
                />
            ))}
                    </div>
                }
                    </div>}

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
