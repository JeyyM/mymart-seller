import Backdrop from "./Backdrop";
import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";

function Confirmer(props) {

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("oh fuck")

    // if (setting === "Edit Category") {
    //   emptyContents()

    //   const categoryContents = Object.entries(props.categIndexes)

    //   const chosenKeyFind = categoryContents.find(([key, value]) => {
    //     console.log(value.categoryName, "within chosenkeyfind")
    //     return value.categoryName === setDefaultName
    //   })

    //   console.log(incomingData.categoryName)
    //   console.log("INCOMING")

    //   console.log(chosenKeyFind, "Alpha")

    //   const chosenKey = chosenKeyFind[0]

    //   console.log("KEY HAS BEEN CHOSEN", chosenKey)
    //   console.log("default is", setDefaultName)

    //   props.edit(incomingData, chosenKey)
    // }
  }

  console.log(props.chosenItem)

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
              className="confirm-modal"
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="heading-primary no-margin">Delete Category?</h2>
              <div className="confirm-contents">
                <div className="warning-logo">&nbsp;</div>
                <h2 className="confirm-text heading-tertiary">Are you sure you want to delete the category? This cannot be undone. However, the data from this category's statistics will remain.</h2>
                <h2 style={{ margin: "1rem" }}>Will you delete {props.chosenItem}</h2>
              </div>
              <div className="add-categ-buttons">
                <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable}>Cancel</button>
                <button className="product-action-3 heading-secondary categ-button-2" type="button" onClick={(event) => { props.disable(event); props.disable(event); handleSubmit }}>Confirm</button>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default Confirmer;
