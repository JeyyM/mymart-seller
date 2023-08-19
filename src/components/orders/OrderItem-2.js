import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function OrderItem2({ order, screenWidth, ExpandedOrders, currency, router, toggleExpand, formatDateTime, findItem }) {
    const itemClass = `${order.status === "finished" ? "round-borderer round-borderer-extra order-item-2" : "round-borderer-red order-item-2"}`;

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

    const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    return (
        <div className={itemClass} key={order.id}>
            <div className="flex-row flex-centered" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                <div className="flex-row-spaceless flex-centered">
                    <button className="order-toggle" onClick={() => toggleExpand(order.id)}>
                        <div className={ExpandedOrders.includes(order.id) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                    </button>
                    <div className="text-sec-profile svg-tertiary" >&nbsp;</div>
                    <h2 className="heading-secondary clamp-1">&nbsp;{order.user.profile.last}, {order.user.profile.first}</h2>
                    <button onClick={() => handleSetUser(order.user)} className={"product-action-1 flex-row-align user-data-button"}><h3 className={"heading-tertiary margin-side"} style={{ transform: "translateY(0rem)" }}>User Data</h3></button>
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
                {screenWidth >= 1100 || (screenWidth < 900 && screenWidth >= 400) ?(<h2 className="heading-tertiary" style={{ fontWeight: "900" }}> Total: {currency} {order.totals.order + order.totals.fees}</h2>) : null}
            </div>
            {(screenWidth < 900 && screenWidth >= 400) || screenWidth < 1100 && <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Total: {currency} {order.totals.order + order.totals.fees}</h2>}

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
                                <Link style={{ marginRight: "auto" }} href={`/${item.url}`} className="heading-secondary whiteSpace noDecor clamp-1">&nbsp;{item.name}&nbsp;</Link>

                                    <div className="flex-row" style={{ marginTop: "1rem" }}>
                                        <h2 className="heading-tertiary whiteSpace">{typeof foundProduct !== "object" ? foundProduct : foundProduct.active ? "Active" : "Inactive"}&nbsp;</h2> {typeof foundProduct !== "object" ? <div className="order-missing">&nbsp;</div> : foundProduct.active ? <div className="order-active">&nbsp;</div> : <div className="order-inactive">&nbsp;</div>}
                                    </div>
                                </div>
                                <Link style={{margin:"0.5rem 0", marginRight: "auto", fontWeight:"900" }} href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}`} className="heading-tertiary whiteSpace noDecor clamp-1">&nbsp;{item.category}&nbsp;</Link>


                                <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                    <h2 className="heading-tertiary">&nbsp;Current Stock: {typeof foundProduct !== "object" ? foundProduct : foundProduct.productStock.stockAmount}</h2>

                                    <div className="flex-row">
                                        <h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Cart: {item.cartValue} {item.unit}/s</h2>
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
    );
}

export default OrderItem2;


