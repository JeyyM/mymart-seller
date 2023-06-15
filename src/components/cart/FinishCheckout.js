import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Backdrop from "../Modal/Backdrop";

function FinishCheckout(props) {
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
          <Backdrop onClick={props.disable} className="categ-modals">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="categ-modal"
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >

            <button onClick={props.toHome}>Hey</button>

            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default FinishCheckout;
