import { Fragment } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { motion, AnimatePresence } from "framer-motion"
import Backdrop from "../Modal/Backdrop"
import NavLogo from "./Nav-Logo"

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
        <NavMenuItem logo={"category"} label={"Categories & Products"} link={"categories"} exit={props.onClick} function={props.function} title={"Add and edit categories, products, and variations"}></NavMenuItem>
        <NavMenuItem logo={"checkout"} label={"To Checkout"} link={"checkout"} exit={props.onClick}></NavMenuItem>
        
        <button className="navmenu-item" onClick={() => {props.userHandler(); props.onClick()}}>
        <div className={`menu-profile svg-color`}>&nbsp;</div>
        <h2 className="heading-secondary">Profile Details</h2>
      </button>

      <NavMenuItem logo={"receipt"} label={"My Orders"} link={"orders"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"info"} label={"About Us"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"quiz"} label={"Frequently Asked Questions"} link={"faq"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"policy"} label={"Terms & Policies"} link={"policies"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"manage"} label={"Sign-Up to MyMart"} exit={props.onClick}></NavMenuItem>
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
