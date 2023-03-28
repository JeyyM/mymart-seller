import Backdrop from "./Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";

function AddCategory(props){
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

    return <Fragment>
    <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
    {props.modalStatus && <Backdrop onClick={props.disable} className="modals">
    <motion.div
          onClick={(e) => e.stopPropagation()}   
          className="modal  orange-gradient"
          variants={appear}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
                <h1 className="modal-item">Text</h1>
        </motion.div>
    </Backdrop>}
    </AnimatePresence>
    </Fragment>
}

export default AddCategory