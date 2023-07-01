import Backdrop from "./Backdrop";
import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";

function AddTags(props) {

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.submit(tagsValue)
        props.disable()
    }

    const [tagsValue, setTagsValue] = useState(props.list);

    const handleTagsChange = (event) => {
        setTagsValue(event.target.value);
    };

    useEffect(() => {
        setTagsValue(props.list);
    }, [props.modalStatus]);


    return (
        <Fragment>
            <AnimatePresence
                initial={true}
                mode={"wait"}
                onExitComplete={() => null}
            >
                {props.modalStatus && (
                    <Backdrop onClick={props.disable} className="categ-modals">
                        <motion.div
                            key={props.chosenItem}
                            onClick={(e) => e.stopPropagation()}
                            className={`confirm-modal`}
                            // className={`confirm-modal element-exit`}
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >


                            <span className="page-heading">
                                <h2 className="heading-secondary no-margin" title="Product tags affect how the item/s will be found in the search bar and for web search results">Edit Product Tags</h2> <div className="heading-icon-dropshadow">
                                    <div className="heading-icon-tag svg-color">&nbsp;</div>
                                </div>
                            </span>
                            <textarea
                                id='tags'
                                rows='12'
                                value={tagsValue}
                                className="desc-text-area"
                                placeholder="Product Tags"
                                onChange={handleTagsChange}
                            ></textarea>

                            <div className="add-categ-buttons">
                                <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable}>Cancel</button>
                                <button className="product-action-2 heading-secondary categ-button-2" type="button" onClick={handleSubmit}>Submit</button>
                            </div>
                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default AddTags;