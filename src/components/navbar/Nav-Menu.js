import { Fragment } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { motion, AnimatePresence } from "framer-motion"
import Backdrop from "../Modal/Backdrop"

function NavMenu(props) {
  const dropIn = {
    hidden: {
      x: "-100vw",
      opacity: 1,
    },
    visible: {
      x: "0px",
      y: "0px",
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      x: "-100vw",
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  function Menu() {

    return <Fragment>
      <div className="navmenu">
        <div className="menu-decoy"></div>
        <NavMenuItem logo={"category"} label={"Categories & Products"} link={"categories"} function={props.function}></NavMenuItem>
        <NavMenuItem logo={"insights"} label={"My Analytics"}></NavMenuItem>
        <NavMenuItem logo={"ongoing"} label={"Ongoing Sales"}></NavMenuItem>
        <NavMenuItem logo={"manage"} label={"My Mart"}></NavMenuItem>
        <NavMenuItem logo={"receipt"} label={"Customer Records"}></NavMenuItem>
        <NavMenuItem logo={"brush"} label={"Mart Design"}></NavMenuItem>
        <NavMenuItem logo={"quiz"} label={"Frequently Asked Questions"}></NavMenuItem>
        <NavMenuItem logo={"policy"} label={"Terms & Policies"}></NavMenuItem>
        <NavMenuItem logo={"support"} label={"Customer Service"}></NavMenuItem>
        <NavMenuItem logo={"power"} label={"Close or Open Mart"}></NavMenuItem>
        <NavMenuItem logo={"settings"} label={"Close or Open Mart"}></NavMenuItem>
      </div>
    </Fragment>
  }

  return <Fragment>
    <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
      {props.menuStatus && <Backdrop onClick={props.onClick}>
        <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial="hidden" animate="visible" exit="exit">
          <Menu>
          </Menu>
        </motion.div>
      </Backdrop>}
    </AnimatePresence>
  </Fragment>
}

export default NavMenu
