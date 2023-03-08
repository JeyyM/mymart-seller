import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  const Modal = ({ handleClose, text, type }) => {
    return (
      <Backdrop onClick={onClick}>
        {type === "dropIn" && (
          <motion.div
            onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
            className="modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit">
          </motion.div>
        )}
      </Backdrop>
    );
  };