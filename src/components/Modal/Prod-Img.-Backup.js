import Backdrop from "./Backdrop";
import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";

function ProdImg(props) {
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

    const handleClick = async (event) => {
        await handleSubmit(event);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

    }

    const [imgNumber, addImgNumber] = useState(0)

    const handleAddImgNumber = () => {
        if (imgNumber <= 2) {
            addImgNumber(imgNumber + 1)
        }
        else { return }
    }

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
                            // key={props.chosenItem}
                            onClick={(e) => e.stopPropagation()}
                            className={`categ-modal`}
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <span className="page-heading">
                                <h2 className="heading-primary no-margin">Product Images</h2>
                                <div className="heading-icon-dropshadow">
                                    <div className="heading-icon-add-img">&nbsp;</div>
                                </div>
                            </span>
                            <div className="confirm-contents">

                                {props.imgnumber >= 0 && <div className="form-group">
                                    <input
                                        type="text"
                                        // className={imgClasses}
                                        className={"text-full"}
                                        placeholder="Category Image 1 (Imgur Links Only)"
                                        value={props.imgs[0]}
                                        onChange={props.handlers[0]}
                                        // required
                                        id="image1"
                                        autoComplete="off"
                                    ></input>

                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 1 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </div>}

                                {props.imgs[0] && <img src={props.imgs[0]} className="add-categ-img" alt="Link is Invalid"></img>}

                                {props.imgnumber >= 1 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                    <input
                                        type="text"
                                        // className={imgClasses}
                                        className="text-full"
                                        placeholder="Category Image 2 (Imgur Links Only)"
                                        value={props.imgs[1]}
                                        onChange={props.handlers[1]}
                                        // required
                                        id="image2"
                                        autoComplete="off"
                                    ></input>
                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 2 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </motion.div>}

                                {props.imgs[1] && <img src={props.imgs[1]} className="add-categ-img" alt="Link is Invalid"></img>}

                                {props.imgnumber >= 2 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                    <input
                                        type="text"
                                        className="text-full"
                                        placeholder="Category Image 3 (Imgur Links Only)"
                                        value={props.imgs[2]}
                                        onChange={props.handlers[2]}
                                        id="image3"
                                        autoComplete="off"
                                    ></input>
                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 3 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </motion.div>}
                                {props.imgs[2] && <img src={props.imgs[2]} className="add-categ-img" alt="Link is Invalid"></img>}

                                {props.imgnumber >= 3 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                    <input
                                        type="text"
                                        className="text-full"
                                        placeholder="Category Image 4 (Imgur Links Only)"
                                        value={props.imgs[3]}
                                        onChange={props.handlers[3]}
                                        id="image4"
                                        autoComplete="off"
                                    ></input>
                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 4 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </motion.div>}
                                {props.imgs[3] && <img src={props.imgs[3]} className="add-categ-img" alt="Link is Invalid"></img>}

                                <h2 className="confirm-text heading-tertiary">{props.msg}</h2>
                            </div>
                            <div className="add-categ-buttons">
                                <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable}>Cancel</button>
                                <button className="product-action-2 heading-secondary categ-button-2" type="button" onClick={handleClick}>Confirm</button>
                            </div>
                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default ProdImg;
