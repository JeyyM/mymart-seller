import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import ThemePack2 from "./ThemePack2";

function Palette(props) {

    const {modalStatus, disable, color, copyHex, setColor, fetchChroma, copyItem, chromaItems} = props

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

                        <motion.div className="margin-side preview-modal-2"
                            onClick={disable}
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
        <div className="round-borderer round-borderer-extra palette-modal" onClick={(e) => {e.stopPropagation()}} style={{padding:"2rem"}}>
        <div className="palette-flex-component">
        <span className="page-heading flex-row-align">
            <div className="heading-icon-palette svg-color">&nbsp;</div>
            <h1 className="heading-secondary no-margin">Color Palette</h1>
          </span>
          <div style={{ overflow: "hidden" }}>
            <ChromePicker color={color} onChange={updatedColor => setColor(updatedColor)} className="color-picker" disableAlpha={true} renderers={{ hex: ChromePicker }}></ChromePicker>
          </div>
          <input onFocus={copyHex} onTouchStart={copyHex} type="text" placeholder="HEXCODE" className="text-small input-number" autoComplete="off" style={{ width: "50%", margin: "0 auto" }} value={color.hex}></input>
          </div>

          <div className="palette-flex-component">
        <span className="page-heading flex-row-align">
            <div className="heading-icon-dice svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">Random Colors</h1>
        </span>
        <button aria-label="Submit" className="product-action-1" onClick={fetchChroma} style={{ margin: "0rem auto", width: "20rem", height: "6rem" }}>Randomize</button>

        <ThemePack2 themeSet={chromaItems} copy={copyItem}></ThemePack2>
        </div>
        </div>

                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default Palette;
