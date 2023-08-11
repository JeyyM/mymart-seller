import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import Link from "next/link";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";

function EditOrder(props) {
    console.log(props)
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
    let newOrder = {}
    let originalOrder = {}

    let totals = 0
    let filteredOrders = []
    let removedItems = []

    if (props.modalStatus){
        filteredOrders = props.order.order.filter(order => {
            return !props.removeList.some(pair => pair[0] === order.name && pair[1] === order.category);
          });

          removedItems = props.order.order.filter(order => {
            return props.removeList.some(pair => pair[0] === order.name && pair[1] === order.category);
          });

          const removedItemsTotalPrice = removedItems.reduce((total, item) => total + parseFloat(item.price), 0);

          props.order.order = filteredOrders
          const totalPrice = filteredOrders.reduce((total, item) => {
            const price = parseFloat(item.price);
            const cartValue = item.cartValue;
            return total + (price * cartValue);
          }, 0);

          totals = totalPrice + props.order.totals.fees

          props.order.totals.order = totalPrice
    }

    if (props.order !== null) {
        newOrder = cloneDeep(props.order.order);
        originalOrder = cloneDeep(props.order.order);
    }

    let variationList = []
    let categoryFinder = ""
    let categoryProducts = {}

    const [currentOrder, setCurrentOrder] = useState([])
    useEffect(() => {
        setCurrentOrder(newOrder);
    }, [props.modalStatus]);

    const [ownerMessage, setOwnerMessage] = useState("")
    const handleMessageChange = (event) => {
        setOwnerMessage(event.target.value);
    };

    const [selectedCateg, setSelectedCateg] = useState(props.categories[0].categoryName)

    useEffect(() => {
        categoryFinder = props.categories.filter((categ) => categ.categoryName === selectedCateg)
        categoryProducts = categoryFinder[0].categoryProducts

        variationList = categoryProducts.flatMap((prod) => prod.variations.flatMap((prod) => prod.productName))
    }, [selectedCateg])

    function exit() {
        props.disable()
    }

    useEffect(() => {
        if (props.order) {
            setOwnerMessage(props.order.ownerMessage)
        }
    }, [props.modalStatus])

    async function confirm() {
        const newArrivals = currentOrder.filter((item) => {
            const found = originalOrder.find((originalItem) => originalItem.name === item.name && originalItem.category === item.category);
            return !found;
        });

        const removedItems = originalOrder.filter((item) => {
            return !currentOrder.some((remove) => remove.name === item.name && remove.category === item.category);
        });

        const notBroken = removedItems.filter(item => {
            return !brokenItems.some(brokenItem => {
                return (
                    brokenItem.name === item.name &&
                    brokenItem.category === item.category
                );
            });
        });

        const modifiedRemove = notBroken.map((item) => {
            return {
                ...item,
                cartValue: item.cartValue * -1
            };
        });

        const remainingItems = originalOrder.filter((item) => {
            return currentOrder.some((remaining) => remaining.name === item.name && remaining.category === item.category);
        });

        const modifiedRemaining = remainingItems.map((item) => {
            const newItem = currentOrder.find((newItem) => newItem.name === item.name);
            return {
                ...item,
                cartValue: newItem.cartValue - item.cartValue
            };
        });

        const finalSetup = [...newArrivals, ...modifiedRemove, ...modifiedRemaining];

        props.change(currentOrder, props.order.id, ownerMessage, finalSetup)

        props.disable()
    }

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

    function findOrder(category, varName) {
        let chosenCateg = currentOrder.filter((categ) => categ.category === category)
        let chosenVar = chosenCateg.filter((variation) => variation.name === varName)
        let categLink = props.categories.find((categ) => categ.categoryName === category)
        let varLink = categLink.categoryProducts.flatMap((prod) => prod.variations);

        if (chosenVar.length > 0) {
            return
        } else {
            let newItem = findItem(category, varName)
            let schema = {
                name: newItem.productName,
                description: newItem.productDescription,
                category: category,
                image: newItem.productImages[0],
                price: newItem.productPrice,
                unit: newItem.productStock.stockUnit,
                amount: 1,
                cartValue: 1,
                url: `${router.query.shopid}/categories/${encodeURIComponent(category)}/${encodeURIComponent(varLink[0].productName)}`,
                router: router.query.shopid,

            }
            setCurrentOrder([...currentOrder, schema])
        }
    }

    function addItem(categ, prod) {
        findOrder(categ, prod)
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
                                    <h2 className="heading-primary no-margin">Revert Order?</h2>
                                </span>

                                <div className="confirm-contents">
                                    <div className="warning-logo">&nbsp;</div>
                                </div>

                                <h3 className="heading-tertiary" style={{ margin: "1rem 0" }}>Reverting the order will send the order back to the ongoing orders page. It will reset the cancellation period. Are you sure you want to do this? <span style={{fontWeight:"900"}}>Missing items or those with missing categories will be removed and ignored.</span></h3>

                                <div className="dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }}>
                                    <h2 className="heading-secondary">Revert Message</h2>

                                    <textarea
                                        rows='3'
                                        value={ownerMessage}
                                        className={"desc-text-area"}
                                        placeholder="Revert Message"
                                        onChange={handleMessageChange}
                                    ></textarea>
                                </div>

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