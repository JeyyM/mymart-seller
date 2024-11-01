import { Fragment } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { motion, AnimatePresence } from "framer-motion"
import Backdrop from "../Modal/Backdrop"
import NavLogo from "./Nav-Logo"
import { useRouter } from "next/router"

function NavMenu(props) {
  const router = useRouter()

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

  const {screenWidth} = props

  const handleGoBack = () => {
    window.history.back();
    props.onClick()
  };

  function Menu() {

    return <Fragment>
      <div className="navmenu">
        <div className="menu-decoy"></div>
        <NavMenuItem logo={"category"} label={"Categories & Products"} link={"categories"} exit={props.onClick} function={props.function} title={"Add and edit categories, products, and variations"}></NavMenuItem>
        <NavMenuItem logo={"insights"} label={"My Analytics"} link={"analytics"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"ongoing"} label={"Ongoing Sales"} link={"orders"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"receipt"} label={"Customer Records"} link={"records"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"manage"} label={"My Mart"} link={"mart"} exit={props.onClick} title={"Set about page, descriptions, footers, and details of your mart"}></NavMenuItem>
        <NavMenuItem logo={"brush"} label={"Mart Design"} link={`design${props.defaultMode ? "/light" : "/dark"}`} exit={props.onClick} title={"Edit mart's colors and fonts"}></NavMenuItem>
        <NavMenuItem logo={"quiz"} label={"FAQ"} link={"faq"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"policy"} label={"Terms & Policies"} link={"policies"} exit={props.onClick}></NavMenuItem>

        {router.asPath !== `/${router.query.shopid}` && <button className="navmenu-item" onClick={handleGoBack}>
        <div className={`menu-goback svg-color`} style={{marginLeft:"-1.5rem"}}>&nbsp;</div>
        <h2 className="heading-secondary">Back</h2>
      </button>}
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
