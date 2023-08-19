import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useRouter } from "next/router";


function PopModal(props) {
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

    const slide = {
        hidden: {
            x: "-100vw",
            opacity: 1,
        },
        visible: {
            x: "0px",
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.3,
                bounce: 0.2,
            },
        },
        exit: {
            x: "-100vw",
            opacity: 1,
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

                        <motion.img
                            onClick={() => {
                                window.open(props.link, '_blank', 'noopener,noreferrer');
                            }}
                            variants={appear}
                            src={props.image}
                            className="pop-up-img"
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                        </motion.img>

                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default PopModal;
