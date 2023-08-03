import { Fragment, useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { motion, AnimatePresence } from "framer-motion"
import Backdrop from "../Modal/Backdrop"
import NavLogo from "./Nav-Logo"
import Link from "next/link"
import { useRouter } from "next/router"

function NavMenu(props) {
  const router = useRouter()
  const { transformedData } = props
  const {screenWidth} = props

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

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([]);

  const [searchVisible, setSearchVisible] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);

    const results = transformedData.filter((item) => {
      return item.tags.includes(searchTerm);
    });

    setSearchResults(results);
    setSearchVisible(results.length > 0);
  };

  useEffect(() => {
    const focusInput = () => {
      const inputElement = document.getElementById("search-input");
      if (inputElement) {
        inputElement.focus();
      }
    };

    focusInput();

    return () => {
      const inputElement = document.getElementById("search-input");
      if (inputElement) {
        inputElement.blur();
      }
    };
  }, [search]);

  useEffect(() => {
    setSearchVisible(false)
  },[props.menuStatus])

  const handleGoBack = () => {
    window.history.back();
    props.onClick()
  };

  function Menu() {

    return <Fragment>
      <div className="navmenu">
        <div className="menu-decoy"></div>

        <div className="margin-side dark-underline" style={{ width: "100%", position: "relative", zIndex: "21", paddingBottom:"2rem", marginTop:"1rem", paddingLeft:"3rem", paddingRight:"3rem" }}>
          <input
            id="search-input"
            type="text"
            className="text-small input-number"
            style={{ width: "100%" }}
            placeholder="Search"
            onChange={handleSearch}
            value={search}
            autoComplete="off"
          />
          <div className="search-magnifying svg-tertiary" style={{ position: "absolute", right: "8%", top: "15%" }}></div>
          {searchVisible && search.length > 0 && (
            <div className="search-row">
              {searchResults.map((item) => (
                <a onClick={() => {props.onClick(); setSearch("")}} style={{ textDecoration: "none" }} className="search-item" key={item.name} href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}/${encodeURIComponent(item.name)}`}>
                  <div className="flex-row">
                    <img src={item.image} className="round-borderer" style={{ height: "4rem", width: "4rem" }}></img>
                    <div className="flex-col">
                      <h2 className="heading-tertiary text-black clamp-1" style={{ fontWeight: "900" }}>{item.name}</h2>
                      <h2 className="heading-tertiary text-black">{props.currency} {item.price}</h2>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <NavMenuItem logo={"category"} label={"Categories & Products"} link={"categories"} exit={props.onClick} function={props.function} title={"Add and edit categories, products, and variations"}></NavMenuItem>
        {props.user !== undefined && <NavMenuItem logo={"checkout"} label={"To Checkout"} link={"checkout"} exit={props.onClick}></NavMenuItem>}

        {props.user === undefined && <NavMenuItem logo={"login"} label={"Login"} link={"login"} exit={props.onClick}></NavMenuItem>}

        {props.user !== undefined && <>
          <button className="navmenu-item" onClick={() => { props.userHandler(); props.onClick() }}>
            <div className={`menu-profile svg-color`} style={{marginLeft:"-1.5rem"}}>&nbsp;</div>
            <h2 className="heading-secondary">Profile Details</h2>
          </button>
          <NavMenuItem logo={"receipt"} label={"My Orders"} link={"orders"} exit={props.onClick}></NavMenuItem>
        </>}

        <NavMenuItem logo={"info"} label={"About Us"} link={"about"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"quiz"} label={"FAQ"} link={"faq"} exit={props.onClick}></NavMenuItem>
        <NavMenuItem logo={"policy"} label={"Terms & Policies"} link={"policies"} exit={props.onClick}></NavMenuItem>

        {props.user !== undefined && <>
          <button className="navmenu-item" onClick={() => { props.changeColor(); props.onClick() }}>
            <div className={`${props.currentColor ? "menu-sun" : "menu-moon"} svg-color`} style={{marginLeft:"-1.5rem"}}>&nbsp;</div>
            <h2 className="heading-secondary">Change Colormode</h2>
          </button>
        </>}

        <NavMenuItem logo={"manage"} label={"Sign-Up to MyMart"} exit={props.onClick}></NavMenuItem>

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
