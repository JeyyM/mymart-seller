import Backdrop from "./Backdrop";
import { motion, AnimatePresence, color } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";

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

  function isEmpty(word) {
    word.trim() === ""
  }

  function startsImgur(word) {
    return word.slice(0, 20) === "https://i.imgur.com/";
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameValid = nameValue !== ""
    const imgValid = startsImgur(imgValue) && !isEmpty(imgValue)
    const descValid = descValue !== ""

    setFormInputValidity({
      name: nameValid,
      img: imgValid,
      desc: descValid,
    });

    const submissionValid = nameValid && imgValid && descValid

    const incomingData = {
      categoryName: nameValue,
      categoryImage: imgValue,
      categoryDescription: descValue,
      categoryId: "id" + (props.total + 1),
      categoryProducts: {},
    }

    if (submissionValid) {

      if (setting === "Add Category") {
        emptyContents()
        props.finish(incomingData)
      }

      if (setting === "Edit Category") {
        emptyContents()

        console.log("within validation - ", defaultName )

        console.log("within setting ===", defaultName)
        
        const categoryContents = Object.entries(props.categIndexes)

        const chosenKeyFind = categoryContents.find(([key, value]) => {
          console.log(value.categoryName, "within chosenkeyfind")
          return value.categoryName === defaultName
        })

        console.log(incomingData.categoryName)
        console.log("INCOMING")

        console.log(chosenKeyFind, "Alpha")

        const chosenKey = chosenKeyFind[0]
        
        console.log("KEY HAS BEEN CHOSEN", chosenKey)
        console.log("default is", defaultName)

        props.edit(incomingData, chosenKey)
        // props.edit(incomingData)
      }

      // if (setting === "Edit Category") {
      //   emptyContents()
      //   const resultingCategory = Object.entries(props.categIndexes).find(([key, value]) => {
      //     return value.categoryName === incomingData.categoryName
      //   })
      //   console.log(resultingCategory, "Iam here")
      //   props.edit(incomingData)
      // }
    }

  };

  const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"
    }`;

  const imgClasses = `${formInputValidity.img ? "text-full" : "invalid-form"
    }`;

  const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"
    }`;

  function emptyContents() {
    props.disable(event)
    setNameValue("")
    setImgValue("")
    setDescValue("")
    props.clear()
  }


  useEffect(() => {
    if (props.defs[0] !== "") {
      setNameValue(props.defs[0])
    }
  }, props.defs)
  useEffect(() => {
    if (props.defs[1] !== "") {
      setImgValue(props.defs[1])
    }
  }, props.defs)
  useEffect(() => {
    if (props.defs[2] !== "") {
      setDescValue(props.defs[2])
    }
  }, props.defs)

  const [setting, setSetting] = useState("Add Category")

  useEffect(() => {
    if (props.defs[0] !== "") {
      setSetting("Edit Category")
    } else { setSetting("Add Category") }
  }, props.defs)


  const [count, setCount] = useState(0)

  const [defaultName, setDefaultName] = useState(nameValue)
  // console.log(defaultName, "initial fire")

  // console.log(nameValue, "First time name check")
  console.log(defaultName, "DEFAULT name check")

function newTest(c){
  console.log("newtest", c)
  setDefaultName(nameValue)
  console.log("pls work", nameValue)
  setCount(count + 1)
  console.log(count)
  console.log(defaultName)
}

  // console.log(props.modalStatus)
  useEffect(() => {
    console.log(props.modalStatus)

    // if (props.modalStatus){
      // console.log("within", nameValue)
      console.log("within2", defaultName)
      setDefaultName(nameValue)
      console.log("After", defaultName)
      newTest(defaultName)


    // }

    // setDefaultName(nameValue)
    // setDefaultName(nameValue)
    console.log(defaultName, "checking in DEF")

}, [props.modalStatus, defaultName])


  // const [currentName, setCurrentName] = useState(nameValue)
  // console.log(currentName, "ON STARTUP")

  return (
    <Fragment>
      <AnimatePresence
        initial={false}
        mode={"wait"}
        onExitComplete={() => null}
      >
        {props.modalStatus && (
          <Backdrop onClick={emptyContents} className="categ-modals">
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
                  <h2 className="heading-primary no-margin">{setting}</h2>
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
                    // defaultValue={props.defs[0]}
                    onChange={handleNameChange}
                    // required
                    id="name"
                    autoComplete="off"
                  ></input>
                  {formInputValidity.name ? <label className="form-label">Category Name</label> : <label className="form-label" style={{ color: "red" }}>Input a valid category name</label>}
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
                  {formInputValidity.img ? <label className="form-label">Category Image (Imgur Links Only)</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid Imgur link</label>}
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
                  {formInputValidity.desc ? <label className="form-label">Description</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid description</label>}
                </div>
                <div className="add-categ-buttons">
                  <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={emptyContents}>Cancel</button>
                  <button className="product-action-2 heading-secondary categ-button-2" type="submit">Submit</button>
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
