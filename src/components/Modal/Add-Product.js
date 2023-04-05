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

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    img: true,
    desc: true,
  });

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

  const handleClick = async (event) => {
    await handleSubmit(event);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting")

    // const nameValid = nameValue !== ""
    // const imgValid = startsImgur(imgValue) && !isEmpty(imgValue)
    // const descValid = descValue !== ""

    // setFormInputValidity({
    //   name: nameValid,
    //   img: imgValid,
    //   desc: descValid,
    // });

    // const submissionValid = nameValid && imgValid && descValid

    // const incomingData = {
    //   categoryName: nameValue,
    //   categoryImage: imgValue,
    //   categoryDescription: descValue,
    //   categoryId: "id" + (props.total + 1),
    //   categoryProducts: {},
    // }

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

    //   if (setting === "Edit Category") {
    //     const categoryContents = Object.entries(props.categIndexes)

    //     const chosenKeyFind = categoryContents.find(([key, value]) => {
    //       return value.categoryName === setDefaultName
    //     })

    //     const chosenKey = chosenKeyFind[0]

    //     props.edit(incomingData, chosenKey)

    //     await waitSeconds();

    //     emptyContents(event)

    //     setLoading(false)
    //     setCompletion(true)

    //     router.reload()
    //   }
    // }

  };

  const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"
    }`;

  const imgClasses = `${formInputValidity.img ? "text-full" : "invalid-form"
    }`;

  const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"
    }`;

  function emptyContents() {
    if (event) {
      props.disable(event)
      // setNameValue("")
      // setImgValue("")
      // setDescValue("")
      props.clear()
    } else { return }
  }


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
    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite"/>
  </path>
</svg>
  )

  return (
    <Fragment>
      <AnimatePresence
        initial={false}
        mode={"wait"}
        onExitComplete={() => null}
      >

{/* <Backdrop onClick={loading ? null : emptyContents} className="categ-modals"> */}
        {props.modalStatus && (
          <Backdrop onClick={props.disable} className="categ-modals">
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
                    <div className="heading-icon-category">&nbsp;</div>
                  </div>
                </span>

                <div className="form-group">
                  <input
                    type="text"
                    className={nameClasses}
                    placeholder="Product Name"
                    value={nameValue}
                    // defaultValue={props.defs[0]}
                    onChange={handleNameChange}
                    // required
                    id="name"
                    autoComplete="off"
                  ></input>
                  <label className="form-label">Product Name</label> 
                  {/* {formInputValidity.name ? <label className="form-label">Category Name</label> : <label className="form-label" style={{ color: "red" }}>Input a valid category name</label>} */}
                </div>

                <div className="form-group">
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
                  <label className="form-label">Category Image 1 (Imgur Links Only)</label>
                  {/* {formInputValidity.img ? <label className="form-label">Category Image (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid Imgur link</label>} */}
                </div>
                {imgValue1 && <img src={imgValue1} className="add-categ-img" alt="Link is Invalid"></img>}

                <div className="form-group">
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
                  <label className="form-label">Category Image 2 (Imgur Links Only)</label>
                  {/* {formInputValidity.img ? <label className="form-label">Category Image (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid Imgur link</label>} */}
                </div>
                {imgValue2 && <img src={imgValue2} className="add-categ-img" alt="Link is Invalid"></img>}

                <div className="form-group">
                  <input
                    type="text"
                    className={imgClasses}
                    placeholder="Category Image 3 (Imgur Links Only)"
                    value={imgValue3}
                    onChange={handleImgChange3}
                    // required
                    id="image3"
                    autoComplete="off"
                  ></input>
                  <label className="form-label">Category Image 3 (Imgur Links Only)</label>
                  {/* {formInputValidity.img ? <label className="form-label">Category Image (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid Imgur link</label>} */}
                </div>
                {imgValue3 && <img src={imgValue3} className="add-categ-img" alt="Link is Invalid"></img>}

                <div className="form-group">
                  <input
                    type="text"
                    className={imgClasses}
                    placeholder="Category Image 4 (Imgur Links Only)"
                    value={imgValue4}
                    onChange={handleImgChange4}
                    // required
                    id="image4"
                    autoComplete="off"
                  ></input>
                  <label className="form-label">Category Image 4 (Imgur Links Only)</label>
                  {/* {formInputValidity.img ? <label className="form-label">Category Image (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid Imgur link</label>} */}
                </div>
                {imgValue4 && <img src={imgValue4} className="add-categ-img" alt="Link is Invalid"></img>}

                <div className="form-group">
                  <textarea
                    id="description"
                    // required
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
                  <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable} disabled={loading}>Cancel</button>
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
