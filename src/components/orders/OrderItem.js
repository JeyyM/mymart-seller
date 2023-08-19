import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function OrderItem({ order, screenWidth, ExpandedOrders, currency, shopCategories, router, toggleExpand }) {
        const [timeDifference, setTimeDifference] = useState('');
        const SlideHeight = {
            hidden: { opacity: 1, height: 0 },
            visible: { opacity: 1, height: 'auto' }
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

            useEffect(() => {
                if (!order || !order.cancelDuration) {
                    setTimeDifference('Invalid order');
                    return;
                }

                const interval = setInterval(() => {
                    const currentTime = new Date();
                    const cancelTime = new Date(order.cancelDuration);
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

            const itemClass = `${order.status !== "refused" && order.status !== "accepted" ? "round-borderer round-borderer-extra order-item" : "round-borderer round-borderer-extra order-item hidden-order-item"}`

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

            <div className="flex-row flex-centered" style={{ justifyContent: "space-between" }} >
                <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                    <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(order.currentTime)} for&nbsp;</h2> {order.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{order.mode}</span></h2>
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

                <div className="order-button-grid dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }}>
                    <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetUser(order.user)}>User Data</button>
                    <button className="product-action-1 heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetEdit(order)}>Edit Order</button>

                    <button className="product-action-3 white heading-secondary" style={{ width: "18rem", margin: "0" }} onClick={() => handleSetRefuse(order)}>Refuse Order</button>
                    <button className="product-action-2 heading-secondary" style={{ width: "18.5rem", margin: "0" }} onClick={() => handleSetAccept(order)}>Approve Order</button>
                </div>

                {order.order.map((item, index) => {
                    let foundProduct = findItem(item.category, item.name)
                    if (foundProduct === "Missing Product" || foundProduct === "Category Missing"){
                        removeList.push([item.name, item.category])
                    }

                    return <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }} key={index}>

                        <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>
                            <img className="order-img round-borderer" src={item.image}></img>

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

                                    {screenWidth > 450 && <div className="flex-row">
                                        <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart: {item.cartValue} {item.unit}/s</h2>
                                    </div>}
                                </div>

                                <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                    <h2 className="heading-tertiary">&nbsp;Price: {typeof foundProduct !== "object" ? foundProduct : `${currency} ${foundProduct.productPrice} / ${foundProduct.productStock.stockUnit}`}</h2>

                                    {screenWidth > 450 && <div className="flex-row">
                                        <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total Cost:{currency} {item.cartValue * item.price}</h2>
                                    </div>}
                                </div>

                                {screenWidth < 450 && <>
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
                {order.allowCancel ? <h2 className="heading-tertiary">Cancellation Period: {timeDifference}</h2> : "Cancellations disabled"}
            </motion.div>
        </div>
}

export default OrderItem;
