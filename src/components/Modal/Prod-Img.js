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

    console.log("props.imgs", props.imgs, props.imgs.length > 0 ? props.imgs[0].image : null);

    const [validImgs, setValidImgs] = useState([])

    useEffect(() => {
        if (props.imgs.length > 0) {
          setValidImgs([props.imgs[0], props.imgs[1], props.imgs[2], props.imgs[3]]);
        }
      }, [props.imgs]);

    console.log("valid imgs check", validImgs)

    const [imgValue1, setImgValue1] = useState(validImgs[0]);
    const handleImgChange1 = (event) => {
      setImgValue1(event.target.value);
    };
  
    const [imgValue2, setImgValue2] = useState(props.imgs[1]);
    const handleImgChange2 = (event) => {
      setImgValue2(event.target.value);
    };
  
    const [imgValue3, setImgValue3] = useState(props.imgs[2]);
    const handleImgChange3 = (event) => {
      setImgValue3(event.target.value);
    };
  
    const [imgValue4, setImgValue4] = useState(props.imgs[3]);
    const handleImgChange4 = (event) => {
      setImgValue4(event.target.value);
    };

    // useEffect(() => {
    //       setImgValue1(props.imgs[0]);
    //       setImgValue2(props.imgs[1]);
    //       setImgValue3(props.imgs[2]);
    //       setImgValue4(props.imgs[3]);
    //   }, [props.imgs[0], props.imgs[1], props.imgs[2], props.imgs[3]]);

    //   console.log("bazinga", props.imgs[0], props.imgs[1], props.imgs[2], props.imgs[3])
      
    useEffect(() => {
        setImgValue1(props.imgs[0]);
        setImgValue2(props.imgs[1]);
        setImgValue3(props.imgs[2]);
        setImgValue4(props.imgs[3]);

        // console.log("bazinga", props.imgs[0], props.imgs[1], props.imgs[2], props.imgs[3])
      }, [props.imgs]);

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
                                        value={imgValue1}
                                        onChange={handleImgChange1}
                                        // required
                                        id="image1"
                                        autoComplete="off"
                                    ></input>

                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 1 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </div>}

                                {imgValue1 && <img src={imgValue1} className="add-categ-img" alt="Link is Invalid"></img>}

                                {props.imgnumber >= 1 && imgValue2 !== undefined && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                    <input
                                        type="text"
                                        // className={imgClasses}
                                        className="text-full"
                                        placeholder="Category Image 2 (Imgur Links Only)"
                                        value={imgValue2}
                                        onChange={handleImgChange2}
                                        // required
                                        id="image2"
                                        autoComplete="off"
                                    ></input>
                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 2 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </motion.div>}

                                {imgValue2 && <img src={imgValue2} className="add-categ-img" alt="Link is Invalid"></img>}

                                {props.imgnumber >= 2 && imgValue3 !== undefined && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                    <input
                                        type="text"
                                        className="text-full"
                                        placeholder="Category Image 3 (Imgur Links Only)"
                                        value={imgValue3}
                                        onChange={handleImgChange3}
                                        id="image3"
                                        autoComplete="off"
                                    ></input>
                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 3 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </motion.div>}
                                {imgValue3 && <img src={imgValue3} className="add-categ-img" alt="Link is Invalid"></img>}

                                {props.imgnumber >= 3 && imgValue4 !== undefined && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                    <input
                                        type="text"
                                        className="text-full"
                                        placeholder="Category Image 4 (Imgur Links Only)"
                                        value={imgValue4}
                                        onChange={handleImgChange4}
                                        id="image4"
                                        autoComplete="off"
                                    ></input>
                                    {/* {formInputValidity.img ? <label className="form-label">Product Image 4 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>} */}
                                </motion.div>}
                                {imgValue4 && <img src={imgValue4} className="add-categ-img" alt="Link is Invalid"></img>}

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
