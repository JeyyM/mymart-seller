import Backdrop from "./Backdrop";
import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

function Confirmer(props) {
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

  const checkmark = (
    <svg viewBox="0 0 100 100" width="7rem" height="7rem">
      <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
        strokeDasharray="200" strokeDashoffset="200">
        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
      </path>
    </svg>
  )

  function waitSeconds() {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }

  const handleClick = async (event) => {
    props.load()
    await handleSubmit(event);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    props.finish(props.default)

    await waitSeconds();

    setLoading(false)
    setCompletion(true)

    router.reload()
  }

  const [loading, setLoading] = useState(false)
  const [completion, setCompletion] = useState(false)

  return (
    <Fragment>
      <AnimatePresence
        initial={true}
        mode={"wait"}
        onExitComplete={() => null}
      >
        {props.modalStatus && (
          <Backdrop onClick={loading ? null : props.disable} className="categ-modals">
            <motion.div
              key={props.chosenItem}
              onClick={(e) => e.stopPropagation()}
              className={`confirm-modal ${!props.modalStatus && "element-exit"}`}
              // className={`confirm-modal element-exit`}
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="heading-secondary no-margin">Delete Category?</h2>
              <div className="confirm-contents">
                <div className="warning-logo">&nbsp;</div>
                <h2 className="confirm-text heading-tertiary">{props.msg}</h2>
                <h2 className="heading-secondary" style={{ margin: "1rem" }}>{props.label}</h2>
              </div>
              <div className="add-categ-buttons">
                <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable} disabled={loading}>Cancel</button>
                <button className="product-action-3 heading-secondary categ-button-2 white" type="button" onClick={handleClick} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? checkmark : "Confirm")}</button>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default Confirmer;
