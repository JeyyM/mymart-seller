import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import Link from "next/link";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";

function EditOrder(props) {
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
    const [brokenItems, setBrokenItems] = useState([]);

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

    const categoryOptions = props.categories.map((item) => item.categoryName)
    const [categories, setCategories] = useState([...categoryOptions])

    const [selectedCateg, setSelectedCateg] = useState(props.categories[0].categoryName)

    const [selectedProducts, setSelectedProducts] = useState(props.categories[0].categoryProducts[0].variations[0].productName)

    const selectCateg = (event) => {
        setSelectedCateg(event.target.value);
        changeProducts(event.target.value)
    };

    const changeProducts = (category) => {
    }

    useEffect(() => {
        categoryFinder = props.categories.filter((categ) => categ.categoryName === selectedCateg)
        categoryProducts = categoryFinder[0].categoryProducts

        variationList = categoryProducts.flatMap((prod) => prod.variations.flatMap((prod) => prod.productName))
        setVarOptions([...variationList])
        setSelectedProducts(variationList[0])
    }, [selectedCateg])

    const [varOptions, setVarOptions] = useState([variationList])

    const selectProd = (event) => {
        setSelectedProducts(event.target.value)
    };

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

    const updateCartItem = (index, amount, select) => {
        const updatedData = [...currentOrder];
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
                                    <h2 className="heading-primary no-margin">Edit Order</h2>
                                    <div className="heading-icon-dropshadow">
                                        <div className="heading-icon-edit svg-color">&nbsp;</div>
                                    </div>
                                </span>

                                <h3 className="heading-tertiary" style={{ margin: "1rem 0" }}>Edits will be applied upon confirming. It cannot be undone. Customers will be notified of edits. The cancellation period will reset.</h3>

                                <div className="dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }}>
                                    <h2 className="heading-secondary">Add Products</h2>
                                    <div className="flex-row flex-centered" style={{ margin: "1rem 0", justifyContent: "center", gap: "2rem" }}>
                                        <select
                                            value={selectedCateg}
                                            className={`text-options text-span`}
                                            style={{ width: "30%" }}
                                            onChange={(event) => selectCateg(event)}
                                        >
                                            {categories.map(categ => (
                                                <option key={categ} value={categ}>{categ}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={selectedProducts}
                                            className={`text-options text-span`}
                                            style={{ width: "40%" }}
                                            onChange={(event) => selectProd(event)}
                                        >
                                            {varOptions.map(prod => (
                                                <option key={prod} value={prod}>{prod}</option>
                                            ))}
                                        </select>

                                        <button className="add-img" type="button" onClick={() => { addItem(selectedCateg, selectedProducts) }}>
                                            <div className="heading-icon-plus-marginless svg-color">&nbsp;</div>
                                        </button>

                                    </div>
                                </div>

                                {currentOrder.length > 0 && currentOrder.map((item, index) => {
                                    let foundProduct = findItem(item.category, item.name);
                                    let currency = props.currency;

                                    if (typeof foundProduct !== "object") {
                                        brokenItems.push(item)

                                        const filteredOrder = currentOrder.filter((broken) => {
                                            return broken.category !== item.category && broken.name !== item.name;
                                        });

                                        setCurrentOrder(filteredOrder);

                                        return
                                    } else {
                                        return (
                                            <div className="flex-row flex-centered dark-underline" style={{ marginBottom: "1rem", paddingBottom: "1rem" }} key={index}>

                                                <div className="flex-row-spaceless" style={{ alignItems: "center", width: "100%" }}>

                                                    <div className="add-buttons flex-row-spaceless" style={{ width: "16rem", marginRight: "1rem" }}>
                                                        <button type="button" className="minus-button" onClick={() => updateCartItem(index, -1, item)}><div className="heading-icon-minus-act svg-color">&nbsp;</div></button>
                                                        <input type="number" className="text-small input-number" placeholder="Amount" style={{ borderRadius: "0", margin: "0", width: "8rem" }} value={item.cartValue} onChange={(e) => updateCartInput(index, parseInt(e.target.value) - item.cartValue, item)}></input>
                                                        <button type="button" className="add-button svg-color" onClick={() => updateCartItem(index, 1, item)}><div className="heading-icon-plus-act svg-decolor">&nbsp;</div></button>
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
                                    }
                                })}

                                <div className="dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }}>
                                    <h2 className="heading-secondary">Edit Message</h2>

                                    <textarea
                                        rows='3'
                                        value={ownerMessage}
                                        className={"desc-text-area"}
                                        placeholder="Description"
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