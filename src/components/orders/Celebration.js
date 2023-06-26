import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Backdrop from "../Modal/Backdrop";

function Celebration(props) {
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

  return (
    <Fragment>
      <AnimatePresence
        initial={false}
        mode={"wait"}
        onExitComplete={() => null}
      >
        {props.modalStatus && (
          <Backdrop className="categ-modals" onClick={props.disable}>
            <motion.div
              onClick={(e) => {e.stopPropagation(); props.disable()}}
              className="celeb-modal"
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >

            <span className="page-heading flex-row-align" style={{ marginBottom: "1rem" }}>
                    <div className="heading-icon-celebration svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin">Order Successful</h1>
                </span>

            <img src={"/coin.gif"} className="finish-coin"></img>

            <button onClick={props.disable} className="product-action-2 heading-secondary margin-side">Finish</button>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default Celebration;
