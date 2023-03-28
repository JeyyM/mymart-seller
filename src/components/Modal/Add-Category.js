import Backdrop from "./Backdrop";
import { motion, AnimatePresence, color } from "framer-motion";
import { Fragment } from "react";
import { useState } from "react";

function AddCategory(props) {
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

  const [imgValue, setImgValue] = useState("");
  const handleImgChange = (event) => {
    setImgValue(event.target.value);
  };

  const [descValue, setDescValue] = useState("");
  const handleDescChange = (event) => {
    setDescValue(event.target.value);
  };

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    img: true,
    desc: true,
  });

  function isEmpty(word){
    word.trim() === ""
  }

  function startsImgur(word){
    return word.slice(0, 20) === "https://i.imgur.com/";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(nameValue);
    console.log(imgValue);
    console.log(descValue);

    const nameValid = nameValue !== ""
    const imgValid = startsImgur(imgValue) && !isEmpty(imgValue)
    const descValid = descValue !== ""

    setFormInputValidity({
      name: nameValid,
      img: imgValid,
      desc: descValid,
    });

    const submissionValid = nameValid && imgValid && descValid

    console.log(submissionValid)
    console.log("bruh")
    console.log(nameValid, imgValid, descValid)
  };

  const nameClasses = `${
    formInputValidity.name ? "text-full" : "invalid-form"
  }`;

  const imgClasses = `${
    formInputValidity.img ? "text-full" : "invalid-form"
  }`;

  const descClasses = `${
    formInputValidity.desc ? "desc-text-area" : "invalid-form-box"
  }`;

  return (
    <Fragment>
      <AnimatePresence
        initial={false}
        mode={"wait"}
        onExitComplete={() => null}
      >
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
              <form onSubmit={handleSubmit}>
                <span className="page-heading">
                  <h2 className="heading-primary no-margin">Add Categories</h2>
                  <div className="heading-icon-dropshadow">
                    <div className="heading-icon-category">&nbsp;</div>
                  </div>
                </span>

            <div className="form-group">
                <input
                  type="text"
                  className={nameClasses}
                  placeholder="Category Name"
                  value={nameValue}
                  onChange={handleNameChange}
                  // required
                  id="name"
                  autoComplete="off"
                ></input>
                {formInputValidity.name ? <label className="form-label">Category Name</label> : <label className="form-label" style={{color: "red"}}>Input a valid category name</label>}
            </div>

            <div className="form-group">
                <input
                  type="text"
                  className={imgClasses}
                  placeholder="Category Image (Imgur Links Only)"
                  value={imgValue}
                  onChange={handleImgChange}
                  // required
                  id="image"
                  autoComplete="off"
                ></input>
                {formInputValidity.img ? <label className="form-label">Category Image (Imgur Links Only)</label> : <label className="form-label" style={{color: "red"}}>Enter a valid Imgur link</label>}
            </div>
                {imgValue && <img src={imgValue} className="add-categ-img" alt="Link is Invalid"></img>}

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
                {formInputValidity.desc ? <label className="form-label">Description</label> : <label className="form-label" style={{color: "red"}}>Enter a valid description</label>}
              </div>
                <div className="add-categ-buttons">
                  <button className="product-action-1 heading-secondary categ-button-1">Cancel</button>
                  <button className="product-action-2 heading-secondary categ-button-2">Submit</button>
                </div>
              </form>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default AddCategory;
