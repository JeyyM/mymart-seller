import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import { useRouter } from "next/router";

function FaqModal(props) {
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

    const slide = {
        hidden: {
          x: "-10rem",
          opacity: 0,
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
          x: "-10rem",
          opacity: 0,
          transition: {
            duration: 0.1,
          },
        },
      };

      const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

      const [Expanded, setExpanded] = useState([]);
      const toggleExpand = (index) => {
          if (Expanded.includes(index)) {
              setExpanded(Expanded.filter((expIndex) => expIndex !== index));
          } else {
              setExpanded([...Expanded, index]);
          }
      };

      const [confirmDelete1, setConfirmDelete1] = useState(null);
      function handleDeleteDel(index) {
          if (confirmDelete1 === index) {
              let newQuestions = props.questions.filter((add, i) => i !== index);
              props.change(newQuestions);
              setConfirmDelete1(null);
          } else {
              setConfirmDelete1(index);
              setTimeout(() => {
                  setConfirmDelete1(null);
              }, 2000);
          }
      }
  
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
                                key={props.chosenItem}
                                onClick={(e) => e.stopPropagation()}
                                className="edit-order-modal"
                                variants={appear}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                            <span className="page-heading">
                  <div className="heading-icon-dropshadow">
                    <div className="heading-icon-ink svg-color">&nbsp;</div>
                  </div>
                  <h2 className="heading-secondary no-margin">&nbsp;Add New Item</h2>
                </span>

                <button onClick={() => props.addNew("", "")} className="product-action-1 heading-secondary flex-row-align margin-side" type="button" style={{ width: "22rem", height:"6rem", marginBottom:"1rem" }}><h2 className="heading-secondary outline-button margin-side">Add Custom</h2></button>

                {props.questions.length > 0 ? <div className="faq-container">
        <AnimatePresence>
            {props.questions.map((answer, index) => {
                return (
                    <motion.div className="qna-item round-borderer round-borderer-extra" key={index} variants={slide} initial="hidden" animate="visible" exit="exit" style={{width:"100%"}}>
                        <div className="flex-row-spaceless flex-centered">
                            <button className="order-toggle" onClick={() => toggleExpand(index)}>
                                <div className={Expanded.includes(index) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                            </button>
                            <h2 className="heading-secondary" onClick={() => toggleExpand(index)}>&nbsp;{answer.q}</h2>
                        </div>
                        <button className="add-img" type="button" onClick={() => handleDeleteDel(index)} style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                            {confirmDelete1 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                        </button>

                        <button className="add-img" type="button" onClick={() => props.addNew(answer.q, answer.a, index)} style={{ position: "absolute", top: "1rem", right: "6rem" }}>
                        <div className="heading-icon-pen svg-color margin-side">&nbsp;</div>
                        </button>


                        <motion.div
                            style={{ overflow: 'hidden' }}
                            initial={Expanded.includes(index) ? 'visible' : 'hidden'}
                            animate={Expanded.includes(index) ? 'visible' : 'hidden'}
                            variants={SlideHeight}>
                            <h3 className="heading-tertiary">{answer.a}</h3>
                        </motion.div>
                    </motion.div>
                )
            })}
            
            </AnimatePresence>
        </div> :
            <div className="empty-contents" style={{height:"50%", paddingTop:"10rem"}}>
                <div className="empty-quiz svg-color">&nbsp;</div>
                <h2 className="empty-text">There seems to be no question requests yet</h2>
            </div>}

                            
                            </motion.div>
                        </Backdrop>
                    )}
                </AnimatePresence>
            </Fragment>
        );
    
}

export default FaqModal;