import { Fragment } from "react"
import NavButton from "./Nav-Button"
import NavLogo from "./Nav-Logo"
import NavItem from "./NavItem"
import Head from "next/head"

import { Category } from "../svgs"
import { Insights } from "../svgs"
import { Ongoing } from "../svgs"
import { Brush } from "../svgs"
import { Manage } from "../svgs"
import { Receipt } from "../svgs"
import { Power } from "../svgs"
import { useState } from "react"
import NavMenu from "./Nav-Menu"
import { motion } from "framer-motion"

function NavbarItems(props){
console.log("colormode here", props.colormode)

const [menuIsOn, setMenuIsOn] = useState(false)

const showMenuToggler = () => {
    setMenuIsOn(!menuIsOn)
}

return <Fragment>


<NavMenu menuStatus={menuIsOn} onClick={showMenuToggler} function={showMenuToggler}></NavMenu>

<div className="navbar">
    <NavButton menuHandler={showMenuToggler} status={menuIsOn}></NavButton>
    <NavLogo></NavLogo>
    <div className="navcontainer">
    <NavItem svg={<Category  className="menu-category svg-color"></Category>} link={"categories"} label="Categories & Products" ></NavItem>
    <NavItem svg={<Insights  className="menu-insights svg-color"></Insights>} link={"analytics"} label="My Analytics"></NavItem>
    <NavItem svg={<Ongoing  className="menu-ongoing svg-color"></Ongoing>} link="#" label="Ongoing Sales"></NavItem>
    <NavItem svg={<Brush  className="menu-brush svg-color"></Brush>} link={"design"} label="Mart Design" extension={props.colormode}></NavItem>
    <NavItem svg={<Manage  className="menu-manage svg-color"></Manage>} link="#" label="My Mart"></NavItem>
    <NavItem svg={<Receipt  className="menu-receipt svg-color"></Receipt>} link="#" label="Customer Records"></NavItem>
    <NavItem svg={<Power  className="menu-power svg-color"></Power>} link="#" label="Close or Open Mart"></NavItem>
    </div>
</div>
</Fragment>
}

export default NavbarItems

// mask-image: url(../../components/svgs/category.svg);
// mask-size: cover;
// mask-image: url(../../components/svgs/category.svg);
// mask-size: cover;
// background-image: linear-gradient(to right, $color-primary-dark, $color-primary-light);
