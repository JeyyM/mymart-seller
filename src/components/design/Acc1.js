import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import Backdrop from "../Modal/Backdrop";

function Acc1(props) {

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


  //   .green{color: #285430 !important;}

  // .yellow{color: #3b2f01 !important;}

  // .red{color: #540804 !important;}

  let hexColor = ""
  if (props.value >= 7) { hexColor = "#285430" }
  if (7 > props.value >= 4.5) { hexColor = "#285430" }
  if (props.value < 4.5) { hexColor = "#540804" }

  const colorClass = "heading-primary no-margin " + props.color.split(" ")[1]
  const bgColor = props.bg.background
  const tertiaryClass = "heading-tertiary no-margin " + props.color.split(" ")[1]

  return (
    <Fragment>
      <AnimatePresence
        initial={true}
        mode={"wait"}
        onExitComplete={() => null}
      >
        {props.modalStatus && (
          <Backdrop onClick={props.disable} className="categ-modals">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ margin: "0 auto", maxWidth: "73rem", height: "auto", backgroundImage: `linear-gradient(to right, ${bgColor}, ${bgColor})`, borderRadius: "1.5rem", border: `5px solid ${hexColor}` }}
            >
              <h2 style={{ margin: "1rem 3rem" }} className={colorClass}>Primary Contrast: {props.value} - {props.value >= 7 ? <h2 className="heading-primary no-margin green" style={{ display: "inline" }}>Great</h2> : props.value >= 4.5 ? <h2 className="heading-primary no-margin yellow" style={{ display: "inline" }}>Suboptimal</h2> : <h2 className="heading-primary no-margin red" style={{ display: "inline" }}>Bad</h2>}</h2>

              <div style={{ width: "100%", borderTop: `5px solid ${hexColor}` }}></div>

              <h3 className={tertiaryClass} style={{ padding: "1rem 2rem 0rem 2rem" }}>The color contrast between the background and the primary text is: {props.value}</h3>
              <h3 className={tertiaryClass} style={{ padding: "1rem 2rem 0rem 2rem" }}>A value above 7 is great and makes the text very legible.</h3>
              <h3 className={tertiaryClass} style={{ padding: "1rem 2rem 0rem 2rem" }}>A value from 4.5 to 7 is suboptimal and makes the text less accessible.</h3>
              <h3 className={tertiaryClass} style={{ padding: "1rem 2rem 0rem 2rem" }}>A value less than 4.5 is bad and makes text illegible.</h3>
              <h3 className={tertiaryClass} style={{ padding: "1rem 2rem 0rem 2rem" }}>Try to keep a score of at least 7 and above to have good user experience</h3>

              <div className="add-categ-buttons">
                <button className="product-action-1 heading-secondary" type="button" onClick={props.disable} style={{ width: "10rem" }}>Close</button>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default Acc1;
