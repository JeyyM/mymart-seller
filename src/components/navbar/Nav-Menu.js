import { Fragment } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"
import { motion } from "framer-motion"

function NavMenu(props){

    function Menu(){
        return <Fragment>
        <div className="navmenu">
            <div className="menu-decoy"></div>
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
        </Fragment>
    }

    return <Fragment>
    <div className="backdrop" onClick={props.onClick} ></div>
    <Menu>
    </Menu>
    </Fragment>
}

export default NavMenu