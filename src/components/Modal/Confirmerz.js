import Backdrop from "./Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";

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

      if (setting === "Edit Category") {
        
        const categoryContents = Object.entries(props.categIndexes)

        const chosenKeyFind = categoryContents.find(([key, value]) => {
          console.log(value.categoryName, "within chosenkeyfind")
          return value.categoryName === setDefaultName
        })

        console.log(incomingData.categoryName)
        console.log("INCOMING")

        console.log(chosenKeyFind, "Alpha")

        const chosenKey = chosenKeyFind[0]
        
        console.log("KEY HAS BEEN CHOSEN", chosenKey)
        console.log("default is", setDefaultName)

        props.edit(incomingData, chosenKey)
      }
    }

    return (
        <Fragment>
          <AnimatePresence
            initial={false}
            mode={"wait"}
            onExitComplete={() => null}
          >
            {!props.modalStatus && (
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
    
    
    
                    <div className="add-categ-buttons">
                      <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable}>Cancel</button>
                      <button className="product-action-3 heading-secondary categ-button-2" type="button" onClick={props.disable}>Confirm</button>
                    </div>
                  </form>
                </motion.div>
              </Backdrop>
            )}
          </AnimatePresence>
        </Fragment>
      );
  };



export default Confirmerz;
