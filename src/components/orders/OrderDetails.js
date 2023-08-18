import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function OrderDetails(props) {
    const router = useRouter()

    const appear = {
        hidden: {
            transform: "scale(0)",
            opacity: 0,
        },
        visible: {
            transform: " scale(1)",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            transform: "scale(0)",
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    };

    const slide = {
        hidden: {
            x: "-100vw",
            opacity: 1,
        },
        visible: {
            x: "0px",
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.3,
                bounce: 0.2,
            },
        },
        exit: {
            x: "-100vw",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    const { order, shopCategories, currency } = props

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

    const [timeDifference, setTimeDifference] = useState('');
    const [refundDifference, setRefundDifference] = useState('');


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

    useEffect(() => {
        if (!order || !order.refundDuration) {
            setRefundDifference('Invalid order');
            return;
        }

        const interval = setInterval(() => {
            const currentTime = new Date();
            const refundTime = new Date(order.refundDuration);
            const timeDifferenceMs = refundTime - currentTime;

            if (timeDifferenceMs <= 0) {
                clearInterval(interval);
                setRefundDifference('Refund period has passed');
            } else {
                const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

                const timeDifferenceStr = `${days > 0 ? days + ' days, ' : ''}${hours > 0 ? hours + ' hours, ' : ''}${minutes > 0 ? minutes + ' minutes, ' : ''}${seconds} seconds`;
                setRefundDifference(timeDifferenceStr);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [order]);

    const ongoingClass = "product-action-3 flex-row-align"
    const ongoingText = "heading-tertiary margin-side white"

    return (
        <Fragment>
            <AnimatePresence
                initial={false}
                mode={"wait"}
                onExitComplete={() => null}
            >

                {props.modalStatus && (
                    <Backdrop className="categ-modals" onClick={props.disable}>
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="categ-modal"
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <span className="page-heading" style={{ marginBottom: "1rem" }}>
                                <div className="heading-icon-dropshadow">
                                    <div className="heading-icon-receipt svg-color">&nbsp;</div>
                                </div>
                                <h1 className="heading-secondary no-margin">Ongoing Orders</h1>

                                <h2 className="heading-secondary" style={{ marginLeft: "auto" }}>
                                    {order.id}
                                </h2>
                            </span>

                            <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                <div className="text-sec-calendar svg-secondary">&nbsp;</div> <h2 className="heading-secondary">&nbsp;On: {formatDateTime(order.currentTime)}</h2>
                            </div>

                            {order.finishedOn !== undefined && <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
              {order.status === "finished" ? <div className="text-sec-finished svg-secondary">&nbsp;</div> : <div className="text-sec-refused svg-secondary">&nbsp;</div>} <h2 className="heading-secondary">&nbsp;<span style={{ fontWeight: "900" }}>{order.status === "finished" ? "Finished" : order.status === "refused" ? "Refused" : "Cancelled"} On: {formatDateTime(order.finishedOn)}</span></h2>
            </div>}

                            {order.status === "accepted" && <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                <div className="text-sec-alarm svg-secondary">&nbsp;</div> <h2 className="heading-secondary">&nbsp;Expect By: {formatDateTime2(order.expectBy)}</h2>
                            </div>}

                            <h3 className="heading-tertiary" style={{ marginTop: "1rem" }}>Your Message:</h3>
                            <textarea
                                rows='3'
                                value={order.message.length === 0 ? "No message" : order.message}
                                className={"desc-text-area"}
                                placeholder="Description"
                                style={{minHeight:"9rem"}}
                            ></textarea>

                            {order.status !== "ongoing" && <>
                                <h3 className="heading-tertiary" style={{ marginTop: "1rem" }}>Owner&apos;s Message:</h3>
                                <textarea
                                    rows='3'
                                    value={order.ownerMessage.length === 0 ? "No message" : order.ownerMessage}
                                    className={"desc-text-area"}
                                    placeholder="Description"
                                    style={{minHeight:"9rem"}}
                                ></textarea>
                            </>}

                            {order.order.map((item, index) => {
                                let foundProduct = findItem(item.category, item.name)

                                return <div className="flex-row flex-centered dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }} key={index}>

                                    <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>
                                        <img className="order-img round-borderer" src={item.image} alt={item.name}></img>

                                        <div className="flex-col">

                                            <div className="flex-row">
                                                <Link style={{ marginRight: "auto", textDecoration: "none" }} href={`/${item.url}`} className="heading-secondary whiteSpace noDecor clamp-1">{item.name}</Link>
                                            </div>
                                            
                                            <div className="flex-row">
                                                <Link style={{ margin:"1rem 0rem", marginRight: "auto", textDecoration: "none", fontWeight:"900" }} href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}`} className="heading-tertiary whiteSpace noDecor clamp-1">{item.category}</Link>
                                            </div>

                                            <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                <h2 className="heading-tertiary" style={{marginLeft:"0.5rem"}}>Current Stock: {typeof foundProduct !== "object" ? foundProduct : foundProduct.productStock.stockAmount}</h2>

                                                <div className="flex-row">
                                                    <h2 className="heading-tertiary" style={{ fontWeight: "900", textAlign:"right" }}>Cart: {item.cartValue} {item.unit}/s</h2>
                                                </div>
                                            </div>

                                            <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                <h2 className="heading-tertiary" style={{marginLeft:"0.5rem"}}>Price: {typeof foundProduct !== "object" ? foundProduct : `${currency} ${foundProduct.productPrice} / ${foundProduct.productStock.stockUnit}`}</h2>

                                                <div className="flex-row">
                                                    <h2 className="heading-tertiary" style={{ fontWeight: "900", textAlign:"right" }}>Total Cost: {currency}{item.cartValue * item.price}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>


                            })}

                            {(order.status === "ongoing" || order.status === "edited") && <div className="flex-row flex-row-align">
                                {order.allowCancel ? <><h2 className="heading-tertiary" style={{marginRight:"auto"}}>Cancellation Period: {timeDifference}</h2>
                                    {timeDifference !== 'Cancellation period has passed' && <button onClick={() => {props.initiateCancel(); props.disable()}} className={ongoingClass} style={{ minWidth:"max-content", width: "18rem", margin: "1rem 1rem", height: "3.5rem", textDecoration: "none" }}><h3 className={ongoingText} style={{ transform: "translateY(0rem)" }}>Cancel Order</h3></button>}
                                </> : "Cancellations disabled"}
                            </div>}

                            {order.status === "finished" && <div className="flex-row flex-row-align">
                                {order.allowCancel ? <><h2 className="heading-tertiary" style={{marginRight:"auto"}}>Refund Period: {refundDifference}</h2>
                                </> : "Cancellations disabled"}
                            </div>}

                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default OrderDetails;
