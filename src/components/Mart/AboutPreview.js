import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";

function AboutPreview(props) {
    const {modalStatus, disable, gridClass, textElements, imgElements, containerElements, prevDivs, device} = props

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
                {modalStatus && (
                    <Backdrop onClick={disable} className="categ-modals">

                        <motion.div className={`margin-side preview-modal-3 ${device === "desktop" ? "preview-desktop" : device === "tablet" ? "preview-tablet" : "preview-phone"}`}
                            onClick={disable}
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
<div onClick={(e) => {e.stopPropagation()}}>
<span className="page-heading" style={{ marginBottom: "1rem" }}>
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-preview svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">About Page Preview</h1>
    </span>
    <section className={gridClass}>

      <>{prevDivs}</>

      {containerElements}
      {imgElements}
      {textElements}

    </section>
</div>

                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default AboutPreview;
