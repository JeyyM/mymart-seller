import { Fragment } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { motion, AnimatePresence } from "framer-motion"
import Backdrop from "../Modal/Backdrop"

function NavMenu(props){
    const menuAnimation = {
        hidden: {
          x: "-100vw",
          opacity: 1,
        },
        visible: {
          x: "0",
          opacity: 1,
          transition: {
            duration: 0.1,
            // type: "spring",
            damping: 25,
            stiffness: 500,
          },
        },
        exit: {
          x: "-100vw",
          opacity: 1,
        },
      };

    function Menu(){

        return <Fragment>
        <Backdrop onClick={props.onClick}>
    <motion.div onClick={(e) => e.stopPropagation()} variants={menuAnimation} initial="hidden" animate="visible" exit="exit">
        <div className="navmenu">
            <div className="menu-decoy"></div>
            <NavMenuItem logo={"home"} label={"Home" }></NavMenuItem>
            <NavMenuItem logo={"category"} label={"Categories & Products" }></NavMenuItem>
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
        </motion.div>
    </Backdrop>
        </Fragment>
    }

    return <Fragment>
    <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
    {props.menuStatus && <Menu>
    </Menu>}
    </AnimatePresence>
    </Fragment>
}

export default NavMenu