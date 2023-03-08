import { Fragment } from "react"
import { createPortal } from "react-dom"
import NavMenuItem from "./Nav-Menu-Item"

function NavMenu(props){
    function Backdrop (){
        return <div className="backdrop" onClick={props.menuHandler}></div>
    }

    function Menu(){
        return <div className="navmenu">
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
    }

    return <Fragment>
    <Backdrop onClose={props.onClick}></Backdrop>
    <Menu>
    </Menu>

    </Fragment>
}

export default NavMenu