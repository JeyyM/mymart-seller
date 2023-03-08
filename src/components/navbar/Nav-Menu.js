import { Fragment } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { useTransition, animated } from "@react-spring/web"

function NavMenu(props){
    // const transition = useTransition(props.menuHandler)

    function Backdrop (){
        return <div className="backdrop" onClick={props.onClick}></div>
    }

    const transition = useTransition(props.menuStatus, {
        from:{x:-1000, opacity:0},
        enter:{x: 0, y:0, opacity: 1},
        leave:{x:-1000, opacity:0}
    })

    // {transition((style, item) => item ? <NavMenu menuHandler={showMenuToggler}></NavMenu> : "")}

    function Menu(){
        return <Fragment>
        <div className="navmenu">
            <div className="menu-decoy"></div>
            <NavMenuItem logo={"category"} label={"Categories & Products"} first={"menu-first"}></NavMenuItem>
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
    {transition((style, item) => item ? 
        <animated.div style={style} className="menu-animation">
    <Backdrop onClose={props.onClick}></Backdrop>
    <Menu>
    </Menu>
    </animated.div> : ""
    )}
    </Fragment>
}

export default NavMenu