import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import { useRouter } from "next/router";

function NewFaq(props) {
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

    const [q, setQ] = useState("")
    const [a, setA] = useState("")

    useEffect(() => {
        setQ("")
        setA("")
    }, [props.modalStatus])

    return (
        <Fragment>
            <AnimatePresence
                initial={true}
                mode={"wait"}
                onExitComplete={() => null}
            >
                {props.modalStatus && (
                    <Backdrop onClick={() => props.disable("", "")} className="categ-modals">
                        <motion.div
                            key={props.chosenItem}
                            onClick={(e) => e.stopPropagation()}
                            className="edit-order-modal"
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{ overflow: "hidden" }}
                        >
                            <span className="page-heading" style={{ marginBottom: "1rem" }}>
                                <div className="heading-icon-dropshadow">
                                    <div className="heading-icon-ink svg-color">&nbsp;</div>
                                </div>
                                <h2 className="heading-secondary no-margin">&nbsp;Add New Item</h2>
                            </span>

                            <input
                                type="text"
                                className="text-small input-number"
                                placeholder="Question"
                                autoComplete="off"
                                style={{ width: "100%" }}
                                onChange={(event) => setQ(event.target.value)}
                                value={q}
                            ></input>

                            <textarea
                                rows='5'
                                className="desc-text-area"
                                placeholder="Answer"
                                style={{ display: "block", margin: "1.5rem auto 0.5rem" }}
                                onChange={(event) => setA(event.target.value)}
                                value={a}
                            ></textarea>

                            <div className="add-categ-buttons">
                                <button className="product-action-1 heading-secondary categ-button-1" type="button" style={{marginBottom:"0"}} onClick={() => props.disable("", "")}>Cancel</button>
                                <button className="product-action-2 heading-secondary categ-button-2" type="submit" style={{marginBottom:"0"}} onClick={() => props.submit({q: q, a: a})}>Submit</button>
                            </div>

                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );

}

export default NewFaq;