import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import Link from "next/link";
import { cloneDeep } from "lodash";

function EditOrder(props) {
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
    let newOrder = {}
    
    if (props.order !== null){
        newOrder = cloneDeep(props.order.order);
    }

    const [currentOrder, setCurrentOrder] = useState([])

    useEffect(() => {
        setCurrentOrder(newOrder);
    }, [props.modalStatus]);    

    function exit(){
        props.disable()
    }

    function confirm(){
        props.change(currentOrder, props.order.id)
        props.disable()
    }

    const updateCartItem = (index, amount, select) => {
        const updatedData = [...currentOrder];
        const chosenProduct = findItem(select.category, select.name)

        if (amount === 1) {
            if (parseInt(updatedData[index].cartValue)) {
                updatedData[index].cartValue = parseInt(updatedData[index].cartValue) + parseInt(amount);
            } else {
                updatedData[index].cartValue = parseInt(select.amount);
            }
        } else if (amount === -1) {
            updatedData[index].cartValue = parseInt(updatedData[index].cartValue) + parseInt(amount);
            if (updatedData[index].cartValue === 0 || updatedData[index].cartValue < 0) {
                updatedData.splice(index, 1);
            }

        }

        setCurrentOrder(updatedData);
    };

    const updateCartInput = (index, amount, select) => {
        const updatedData = [...currentOrder];
        const item = updatedData[index];
        const newCartValue = parseInt(select.cartValue) + parseInt(amount);

        let chosenCartValue = newCartValue;

        if (isNaN(amount)) {
            chosenCartValue = "0";
        }

        item.cartValue = parseInt(chosenCartValue);

        setCurrentOrder(updatedData);
    };

    function findItem(category, varName) {
        let chosenCateg = props.categories.find((categ) => categ.categoryName === category)

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

    if (currentOrder !== null) {
        return (
            <Fragment>
                <AnimatePresence
                    initial={true}
                    mode={"wait"}
                    onExitComplete={() => null}
                >
                    {props.modalStatus && (
                        <Backdrop onClick={exit} className="categ-modals">
                            <motion.div
                                key={props.chosenItem}
                                onClick={(e) => e.stopPropagation()}
                                className="edit-order-modal"
                                variants={appear}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <span className="page-heading">
                                    <h2 className="heading-primary no-margin">Edit Order</h2>
                                    <div className="heading-icon-dropshadow">
                                        <div className="heading-icon-edit svg-color">&nbsp;</div>
                                    </div>
                                </span>

                                {currentOrder.length > 0 && currentOrder.map((item, index) => {
                                    let foundProduct = findItem(item.category, item.name);
                                    let currency = props.currency;

                                    return (
                                        <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }} key={index}>

                                            <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>

                                                <div className="add-buttons flex-row-spaceless" style={{ width: "16rem", marginRight: "1rem" }}>
                                                    <button type="button" className="minus-button"><div className="heading-icon-minus-act svg-color" onClick={() => updateCartItem(index, -1, item)}>&nbsp;</div></button>
                                                    <input type="number" className="text-small input-number" placeholder="Amount" style={{ borderRadius: "0", margin: "0", width: "8rem" }} value={item.cartValue} onChange={(e) => updateCartInput(index, parseInt(e.target.value) - item.cartValue, item)}></input>
                                                    <button type="button" className="add-button svg-color"><div className="heading-icon-plus-act svg-decolor" onClick={() => updateCartItem(index, 1, item)}>&nbsp;</div></button>
                                                </div>

                                                <img className="order-img round-borderer" src={item.image}></img>

                                                <div className="flex-col">

                                                    <div className="flex-row flex-row-align">
                                                        <Link style={{ marginRight: "auto", fontWeight: "900" }} href={`/${item.url}`} className="heading-tertiary whiteSpace noDecor">&nbsp;{item.name} - {item.category}&nbsp;</Link>

                                                        <div className="flex-row" style={{ margin: "1rem" }}>
                                                            <h2 className="heading-tertiary whiteSpace">{typeof foundProduct !== "object" ? foundProduct : foundProduct.active ? "Active" : "Inactive"}&nbsp;</h2> {typeof foundProduct !== "object" ? <div className="order-missing">&nbsp;</div> : foundProduct.active ? <div className="order-active">&nbsp;</div> : <div className="order-inactive">&nbsp;</div>}
                                                        </div>
                                                    </div>

                                                    <div className="flex-row-align" style={{ justifyContent: "space-between" }}>
                                                        <h2 className={foundProduct.productStock.stockAmount >= item.cartValue ? "heading-tertiary transitionAll" : "heading-tertiary red-text transitionAll"}>&nbsp;Current Stock: {typeof foundProduct !== "object" ? foundProduct : foundProduct.productStock.stockAmount}</h2>

                                                        <div className="flex-row">
                                                            <h2 className={foundProduct.productStock.stockAmount >= item.cartValue ? "heading-tertiary transitionAll" : "heading-tertiary red-text transitionAll"} style={{ fontWeight: "900" }}>Cart Amount: {item.cartValue} {item.unit}/s</h2>
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
                                    );
                                })}

                                <div className="order-button-grid-2">
                                    <button className="product-action-1 heading-secondary" onClick={exit} style={{ width: "18rem", margin: "0" }}>Cancel</button>
                                    <button className="product-action-2 heading-secondary" onClick={confirm} style={{ width: "18.5rem", margin: "0" }}>Confirm</button>
                                </div>

                            </motion.div>
                        </Backdrop>
                    )}
                </AnimatePresence>
            </Fragment>
        );
    }
}

export default EditOrder;