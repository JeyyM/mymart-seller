import Backdrop from "./Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Confirmer from "./Confirmer";
import { useRouter } from "next/router";

function AddProduct(props) {
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

  const [nameValue, setNameValue] = useState("");
  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const [descValue, setDescValue] = useState("");
  const handleDescChange = (event) => {
    setDescValue(event.target.value);
  };

  const [imgValue1, setImgValue1] = useState("");
  const handleImgChange1 = (event) => {
    setImgValue1(event.target.value);
  };

  const [imgValue2, setImgValue2] = useState("");
  const handleImgChange2 = (event) => {
    setImgValue2(event.target.value);
  };

  const [imgValue3, setImgValue3] = useState("");
  const handleImgChange3 = (event) => {
    setImgValue3(event.target.value);
  };

  const [imgValue4, setImgValue4] = useState("");
  const handleImgChange4 = (event) => {
    setImgValue4(event.target.value);
  };

  const [priceValue, setPriceValue] = useState("");
  const handlePriceChange = (event) => {
    setPriceValue(event.target.value);
  };

  const [stockAmount, setStockAmount] = useState("");
  const handleStockAmount = (event) => {
    setStockAmount(event.target.value);
  };

  const [stockUnit, setStockUnit] = useState("");
  const handleStockUnit = (event) => {
    setStockUnit(event.target.value);
  };

  function isEmpty(word) {
    word.trim() === ""
  }

  function startsImgur(word) {
    return word.slice(0, 20) === "https://i.imgur.com/";
  }

  const [loading, setLoading] = useState(false)

  function waitSeconds() {
    console.log("wait 2.5 sec")
    return new Promise(resolve => setTimeout(resolve, 2500));
  }

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    img: true,
    desc: true,
    price: true,
    amount: true,
    unit: true,
    images: true,
  });

  function isEmpty(word) {
    word.trim() === ""
  }

  function startsImgur(word) {
    return word.slice(0, 20) === "https://i.imgur.com/";
  }

  const handleClick = async (event) => {
    await handleSubmit(event);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("submitting")

    const img1Valid = startsImgur(imgValue1) && !isEmpty(imgValue1)
    const img2Valid = startsImgur(imgValue2) && !isEmpty(imgValue2)
    const img3Valid = startsImgur(imgValue3) && !isEmpty(imgValue3)
    const img4Valid = startsImgur(imgValue4) && !isEmpty(imgValue4)

    // console.log(img1Valid, img2Valid, img3Valid, img4Valid)

    const givenImages = [
      img1Valid && { image: imgValue1 },
      img2Valid && { image: imgValue2 },
      img3Valid && { image: imgValue3 },
      img4Valid && { image: imgValue4 },
    ].filter(Boolean)

    // console.log(givenImages)

    const nameValid = nameValue !== ""
    const descValid = descValue !== ""
    const priceValid = priceValue !== ""
    const amountValid = stockAmount !== ""
    const unitValid = stockUnit !== ""
    const imgValid = givenImages.length > 0

    const submissionValid = nameValid && imgValid && descValid && priceValid && unitValid && amountValid && imgValid

    setFormInputValidity({
      name: nameValid,
      img: imgValid,
      desc: descValid,
      price: priceValid,
      amount: amountValid,
      unit: unitValid,
      images: imgValid,
    });

    const incomingData = {
      productName: nameValue,
      productDescription: descValue,
      productPrice: priceValue,
      productStock: { stockAmount: stockAmount, stockUnit: stockUnit },
      productImages: givenImages.map((imageObject) => imageObject.image)
    }

    if (submissionValid) {
      setLoading(true)

      console.log(incomingData)

      props.finish(incomingData, props.categKey, props.length)

      await waitSeconds();
      console.log("valid")
      emptyContents(event)
      setLoading(false)
      setCompletion(true)
      router.reload()

    }

    // if (submissionValid) {
    //   setLoading(true)

    //   if (setting === "Add Category") {
    //     props.finish(incomingData)

    //     await waitSeconds();

    //     emptyContents(event)

    //     setLoading(false)
    //     setCompletion(true)

    //     router.reload()
    //   }

  };

  const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"
    }`;

  const imgClasses = `${formInputValidity.images ? "text-full" : "invalid-form"
    }`;

  const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"
    }`;

  const priceClasses = `${formInputValidity.price ? "text-small input-number" : "invalid-form-2"
    }`;

  const amountClasses = `${formInputValidity.amount ? "text-small input-number" : "invalid-form-2"
    }`;

  const unitClasses = `${formInputValidity.unit ? "text-small input-number" : "invalid-form-2"
    }`;

  // const unitClasses = `${formInputValidity.unit ? "text-small" : "invalid-form"
  //   }`;


  // useEffect(() => {
  //   if (props.defs[0] !== "") {
  //     setNameValue(props.defs[0])
  //   }
  // }, props.defs)
  // useEffect(() => {
  //   if (props.defs[1] !== "") {
  //     setImgValue(props.defs[1])
  //   }
  // }, props.defs)
  // useEffect(() => {
  //   if (props.defs[2] !== "") {
  //     setDescValue(props.defs[2])
  //   }
  // }, props.defs)

  const [completion, setCompletion] = useState(false)

  const checkmark = (
    <svg viewBox="0 0 100 100" width="7rem" height="7rem">
      <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
        strokeDasharray="200" strokeDashoffset="200">
        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
      </path>
    </svg>
  )


  function emptyContents() {
    if (event) {
      props.disable(event)
      setNameValue("")
      setImgValue1("")
      setImgValue2("")
      setImgValue3("")
      setImgValue4("")
      setDescValue("")
      setPriceValue("")
      setStockAmount("")
      setStockUnit("")
      addImgNumber(0)
    } else { return }
  }

  const [imgNumber, addImgNumber] = useState(0)

  const handleAddImgNumber = () => {
    if (imgNumber <= 2) {
      addImgNumber(imgNumber + 1)
    }
    else {return}
  }

  console.log(imgNumber)

  return (
    <Fragment>
      <AnimatePresence
        initial={false}
        mode={"wait"}
        onExitComplete={() => null}
      >

        {props.modalStatus && (
          <Backdrop onClick={loading ? null : emptyContents} className="categ-modals">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="categ-modal"
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form onSubmit={handleClick}>
                <span className="page-heading">
                  <h2 className="heading-primary no-margin">Add Product</h2>
                  <div className="heading-icon-dropshadow">
                    <div className="heading-icon-cube">&nbsp;</div>
                  </div>
                </span>

                <div className="form-group">
                  <input
                    type="text"
                    className={nameClasses}
                    placeholder="Product Name"
                    value={nameValue}
                    onChange={handleNameChange}
                    id="name"
                    autoComplete="off"
                  ></input>
                  {/* <label className="form-label">Product Name</label>  */}
                  {formInputValidity.name ? <label className="form-label">Product Name</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid product name</label>}
                </div>

                <div className="page-heading-secondary">
                <h1 className="heading-secondary" style={{marginTop: "0.3rem"}}>Product Images</h1> <button className="add-img" type="button" onClick={handleAddImgNumber}><div className="heading-icon-plus-marginless">&nbsp;</div></button>
                </div>

                {imgNumber >= 0 && <div className="form-group">
                  <input
                    type="text"
                    className={imgClasses}
                    placeholder="Category Image 1 (Imgur Links Only)"
                    value={imgValue1}
                    onChange={handleImgChange1}
                    // required
                    id="image1"
                    autoComplete="off"
                  ></input>

                  {formInputValidity.img ? <label className="form-label">Product Image 1 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                </div>}

                {imgValue1 && <img src={imgValue1} className="add-categ-img" alt="Link is Invalid"></img>}
                
                {imgNumber >= 1 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                  <input
                    type="text"
                    className={imgClasses}
                    placeholder="Category Image 2 (Imgur Links Only)"
                    value={imgValue2}
                    onChange={handleImgChange2}
                    // required
                    id="image2"
                    autoComplete="off"
                  ></input>
                  {formInputValidity.img ? <label className="form-label">Product Image 2 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                </motion.div> }

                {imgValue2 && <img src={imgValue2} className="add-categ-img" alt="Link is Invalid"></img>}

                {imgNumber >= 2 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                  <input
                    type="text"
                    className={imgClasses}
                    placeholder="Category Image 3 (Imgur Links Only)"
                    value={imgValue3}
                    onChange={handleImgChange3}
                    id="image3"
                    autoComplete="off"
                  ></input>
                  {formInputValidity.img ? <label className="form-label">Product Image 3 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                </motion.div> }
                {imgValue3 && <img src={imgValue3} className="add-categ-img" alt="Link is Invalid"></img>}

                {imgNumber >= 3 && <motion.div className="form-group" variants={slide} initial="hidden" animate="visible">
                  <input
                    type="text"
                    className={imgClasses}
                    placeholder="Category Image 4 (Imgur Links Only)"
                    value={imgValue4}
                    onChange={handleImgChange4}
                    id="image4"
                    autoComplete="off"
                  ></input>
                  {formInputValidity.img ? <label className="form-label">Product Image 4 (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter at least 1 valid Imgur link</label>}
                </motion.div> }
                {imgValue4 && <img src={imgValue4} className="add-categ-img" alt="Link is Invalid"></img>}



                <div className="price-pair">
            <label className="heading-secondary product-currency">$</label>
            <div>
            <input type="number" className={priceClasses} placeholder="Price" autoComplete="off" id='price' value={priceValue} onChange={handlePriceChange}></input>
            {formInputValidity.price ? <label className="form-label">Price</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid price</label>}
            </div>
            <div>
            <input type="number" className={amountClasses} placeholder="Stock Amount" autoComplete="off" id='amount' value={stockAmount} onChange={handleStockAmount}></input>
            {formInputValidity.amount ? <label className="form-label">Stock Amount</label> : <label className="form-label" style={{ color: "red" }}>Invalid stock amount</label>}
            </div>
            <div>
            <input type="text" className={unitClasses} placeholder="Stock Unit" autoComplete="off" id='unit' value={stockUnit} onChange={handleStockUnit}></input>
            {formInputValidity.unit ? <label className="form-label">Stock Unit</label> : <label className="form-label" style={{ color: "red" }}>Invalid stock unit</label>}
            </div>
          </div>

                <div className="form-group">
                  <textarea
                    id="description"
                    rows="5"
                    className={descClasses}
                    placeholder="Description"
                    onChange={handleDescChange}
                    value={descValue}
                    autoComplete="off"
                  ></textarea>
                  {formInputValidity.desc ? <label className="form-label">Description</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid description</label>}
                </div>
                <div className="add-categ-buttons">
                  <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={emptyContents} disabled={loading}>Cancel</button>
                  <button className="product-action-2 heading-secondary categ-button-2" type="submit" disabled={loading}> {loading ? <div className="spinner"></div> : (completion ? checkmark : "Submit")}</button>
                </div>
              </form>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default AddProduct;
