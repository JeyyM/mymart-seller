import { Fragment, useMemo } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { motion, AnimatePresence } from "framer-motion"
import Backdrop from "../Modal/Backdrop"
import NavLogo from "./Nav-Logo"
import Link from "next/link"
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

  const {handleSearch, inputRef, searchVisible, searchResults, search, currency} = props


  function Menu() {

    return <Fragment>
      <div className="navmenu">
        <div className="menu-decoy"></div>

        <div className="margin-side" style={{ width: "80%", position: "relative", zIndex:"21" }}>
          <input
            type="text"
            className="text-small input-number"
            style={{ width: "100%" }}
            placeholder="Search"
            onChange={handleSearch}
            value={search}
          />
          <div className="search-magnifying svg-tertiary" style={{ position: "absolute", top: "0", right: "2%", top: "20%" }}></div>
          {searchVisible && search.length > 0 && (
            <div className="search-row">
              {searchResults.map((item) => (
                <Link style={{ textDecoration: "none" }} className="search-item" key={item.name} href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}/${encodeURIComponent(item.name)}`}>
                  <div className="flex-row">
                    <img src={item.image} className="round-borderer" style={{ height: "4rem", width: "4rem" }}></img>
                    <div className="flex-col">
                      <h2 className="heading-tertiary text-black" style={{ fontWeight: "900" }}>{item.name}</h2>
                      <h2 className="heading-tertiary text-black">{props.currency} {item.price}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <NavMenuItem logo={"category"} label={"Categories & Products"} link={"categories"} exit={props.onClick} function={props.function} title={"Add and edit categories, products, and variations"}></NavMenuItem>
        <NavMenuItem logo={"checkout"} label={"To Checkout"} link={"checkout"} exit={props.onClick}></NavMenuItem>

        {props.user === undefined && <NavMenuItem logo={"login"} label={"Login"} link={"login"} exit={props.onClick}></NavMenuItem>}
        
        {props.user !== undefined && <>
        <button className="navmenu-item" onClick={() => {props.userHandler(); props.onClick()}}>
        <div className={`menu-profile svg-color`}>&nbsp;</div>
        <h2 className="heading-secondary">Profile Details</h2>
      </button>
      <NavMenuItem logo={"receipt"} label={"My Orders"} link={"orders"} exit={props.onClick}></NavMenuItem>
      </>}

        <NavMenuItem logo={"info"} label={"About Us"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"quiz"} label={"Frequently Asked Questions"} link={"faq"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"policy"} label={"Terms & Policies"} link={"policies"} exit={props.onClick}></NavMenuItem>

    {props.user !== undefined && <>
    <button className="navmenu-item" onClick={() => {props.changeColor(); props.onClick()}}>
        <div className={`${props.currentColor ? "menu-sun" : "menu-moon"} svg-color`}>&nbsp;</div>
        <h2 className="heading-secondary">Change Colormode</h2>
      </button>
    </>}

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
