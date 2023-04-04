import Backdrop from "./Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";
// import DefaultValueContext from "../store/default-value-context";
import Confirmer from "./Confirmer";
import { useRouter } from "next/router";

function AddCategory2(props) {
  const setDefaultName = props.defs[0]
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
      setLoading(true)

      if (setting === "Add Category") {
        props.finish(incomingData)

        await waitSeconds();

        emptyContents(event)

        setLoading(false)
        setCompletion(true)

        router.reload()
      }

      if (setting === "Edit Category") {
        const categoryContents = Object.entries(props.categIndexes)

        const chosenKeyFind = categoryContents.find(([key, value]) => {
          return value.categoryName === setDefaultName
        })

        const chosenKey = chosenKeyFind[0]

        props.edit(incomingData, chosenKey)

        await waitSeconds();

        emptyContents(event)

        setLoading(false)
        setCompletion(true)

        router.reload()
      }
    }

  };

  const handleDelete= async (title) => {
    console.log("in handle deletion")

    const categoryContents = Object.entries(props.categIndexes)

    const chosenKeyFind = categoryContents.find(([key, value]) => {
      return value.categoryName === setDefaultName
    })

    const chosenKey = chosenKeyFind[0]

    props.deletion(chosenKey)

    // await waitSeconds();

    console.log("finish deletion")
    console.log(chosenKey)

    // emptyContents(event)

    // setLoading(false)
    // setCompletion(true)

    router.reload()
  }

  const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"
    }`;

  const imgClasses = `${formInputValidity.img ? "text-full" : "invalid-form"
    }`;

  const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"
    }`;

  function emptyContents() {
    if (event) {
      props.disable(event)
      setNameValue("")
      setImgValue("")
      setDescValue("")
      props.clear()
    } else { return }
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


  const [delCateg, setDelCateg] = useState(false)

  function delCategHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDelCateg(!delCateg)
  }

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
        {props.modalStatus && (
          <Backdrop onClick={loading ? null : emptyContents} className="categ-modals">
            {delCateg && <Confirmer modalStatus={delCateg} disable={delCategHandler} clear={props.clear} delete={delCategHandler} default={setDefaultName} finish={handleDelete} chosenItem={props.defs[0]}></Confirmer>}
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
                  {setting === "Edit Category" && <button className="product-action-3 heading-secondary categ-button-2" type="button" onClick={delCategHandler} disabled={loading}>Delete</button>}
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

export default AddCategory2;
