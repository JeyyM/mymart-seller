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

    function isEmpty(word) {
        word.trim() === ""
    }

    function startsImgur(word) {
        if (word) { return word.startsWith("https://i.imgur.com/") || word.startsWith("https://picsum.photos/"); }
      }
    

    const handleClick = async (event) => {
        await handleSubmit(event);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const img1Valid = startsImgur(imgValue1) && !isEmpty(imgValue1)
        const img2Valid = startsImgur(imgValue2) && !isEmpty(imgValue2)
        const img3Valid = startsImgur(imgValue3) && !isEmpty(imgValue3)
        const img4Valid = startsImgur(imgValue4) && !isEmpty(imgValue4)

        const givenImages = [
            img1Valid && { image: imgValue1 },
            img2Valid && { image: imgValue2 },
            img3Valid && { image: imgValue3 },
            img4Valid && { image: imgValue4 },
        ].filter(Boolean)

        if (givenImages.length > 0) {
            props.setImg(givenImages)
            props.disable()
        } else {
            setFormInputValidity({
                img: false
            })
        }
    }

    const [imgValue1, setImgValue1] = useState(props.imgs[0]);
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

    useEffect(() => {
        setImgValue1(props.imgs[0]);
        setImgValue2(props.imgs[1]);
        setImgValue3(props.imgs[2]);
        setImgValue4(props.imgs[3]);

    }, [props.imgs]);

    const [newLength, setNewLength] = useState(props.imgnumber)

    useEffect(() => {
        setNewLength(props.imgnumber);
    }, [props.imgnumber]);

    const handleAddImgNumber = () => {
        if (newLength <= 3) {
            setNewLength(newLength + 1)
        }
        else { return }
    }

    const resetCommands = [() => setImgValue1(""),
    () => setImgValue2(""),
    () => setImgValue3(""),
    () => setImgValue4(""),
    ];

    const resetLines = (length) => {
        const resetLimits = resetCommands.slice(length);
        resetLimits.forEach((command) => command());
    }

    const [formInputValidity, setFormInputValidity] = useState({
        img: true,
    });

    const imgClasses = `${formInputValidity.img ? "text-full image-input" : "invalid-form image-input"
        }`;

    function massReset() {
        props.disable();
        setNewLength(props.imgnumber);
        resetLines(props.imgnumber)
        setFormInputValidity({ img: true })
        setImgValue1(props.imgs[0])
        setImgValue2(props.imgs[1])
        setImgValue3(props.imgs[2])
        setImgValue4(props.imgs[3])
    }

    return (
        <Fragment>
            <AnimatePresence
                initial={true}
                mode={"wait"}
                onExitComplete={() => null}
            >
                {props.modalStatus && (
                    <Backdrop onClick={() => { massReset() }} className="categ-modals">
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className={`categ-modal`}
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <span className="page-heading">
                                <h2 className="heading-secondary no-margin">Product Images&nbsp;</h2> <button className="add-img" type="button" onClick={handleAddImgNumber}><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
                                <div className="heading-icon-dropshadow">
                                    <div className="heading-icon-add-img svg-color">&nbsp;</div>
                                </div>
                            </span>
                            <div className="image-modal">
                                <div className="flex-col">
                                    {newLength >= 1 && <div className="form-group">
                                        <input
                                            type="text"
                                            className={imgClasses}
                                            placeholder="Category Image 1 (Imgur Links Only)"
                                            value={imgValue1}
                                            onChange={handleImgChange1}
                                            id="image1"
                                            autoComplete="off"
                                        ></input>

                                        {formInputValidity.img ? <label className="form-label">Product Image 1 (Imgur Links Only)</label> : <label className="form-label inv" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                                    </div>}

                                    {newLength >= 2 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                        <input
                                            type="text"
                                            className={imgClasses}
                                            placeholder="Category Image 2 (Imgur Links Only)"
                                            value={imgValue2}
                                            onChange={handleImgChange2}
                                            id="image2"
                                            autoComplete="off"
                                        ></input>
                                        {formInputValidity.img ? <label className="form-label">Product Image 2 (Imgur Links Only)</label> : <label className="form-label inv" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                                    </motion.div>}

                                    {newLength >= 3 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                        <input
                                            type="text"
                                            className={imgClasses}
                                            placeholder="Category Image 3 (Imgur Links Only)"
                                            value={imgValue3}
                                            onChange={handleImgChange3}
                                            id="image3"
                                            autoComplete="off"
                                        ></input>
                                        {formInputValidity.img ? <label className="form-label">Product Image 3 (Imgur Links Only)</label> : <label className="form-label inv" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                                    </motion.div>}

                                    {newLength >= 4 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                                        <input
                                            type="text"
                                            className={imgClasses}
                                            placeholder="Category Image 4 (Imgur Links Only)"
                                            value={imgValue4}
                                            onChange={handleImgChange4}
                                            id="image4"
                                            autoComplete="off"
                                        ></input>
                                        {formInputValidity.img ? <label className="form-label">Product Image 4 (Imgur Links Only)</label> : <label className="form-label inv" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                                    </motion.div>}
                                </div>

                                <div className="image-collection">
                                    {imgValue1 && newLength >= 1 && <img src={imgValue1} className="add-prod-img" alt="Link is Invalid"></img>}
                                    {imgValue2 && newLength >= 2 && <img src={imgValue2} className="add-prod-img" alt="Link is Invalid"></img>}
                                    {imgValue3 && newLength >= 3 && <img src={imgValue3} className="add-prod-img" alt="Link is Invalid"></img>}
                                    {imgValue4 && newLength >= 4 && <img src={imgValue4} className="add-prod-img" alt="Link is Invalid"></img>}
                                </div>
                            </div>
                            <div className="add-categ-buttons">
                                <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={() => { massReset() }}>Cancel</button>
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
