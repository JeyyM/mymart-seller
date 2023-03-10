import { Fragment } from "react"
import NavButton from "./Nav-Button"
import NavLogo from "./Nav-Logo"
import NavItem from "./NavItem"

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

function NavbarItems(){
const [menuIsOn, setMenuIsOn] = useState(false)

const showMenuToggler = () => {
    setMenuIsOn(!menuIsOn)
}

return <Fragment>
<NavMenu menuStatus={menuIsOn} onClick={showMenuToggler}></NavMenu>

<div className="navbar">
    <NavButton menuHandler={showMenuToggler} status={menuIsOn}></NavButton>
    <NavLogo></NavLogo>
    <div className="navcontainer">
    <NavItem svg={<Category  className="menu-category"></Category>} link="#" label="Categories & Products"></NavItem>
    <NavItem svg={<Insights  className="menu-insights"></Insights>} link="#" label="My Analytics"></NavItem>
    <NavItem svg={<Ongoing  className="menu-ongoing"></Ongoing>} link="#" label="Ongoing Sales"></NavItem>
    <NavItem svg={<Brush  className="menu-brush"></Brush>} link="#" label="Mart Design"></NavItem>
    <NavItem svg={<Manage  className="menu-manage"></Manage>} link="#" label="My Mart"></NavItem>
    <NavItem svg={<Receipt  className="menu-receipt"></Receipt>} link="#" label="Customer Records"></NavItem>
    <NavItem svg={<Power  className="menu-power"></Power>} link="#" label="Close or Open Mart"></NavItem>
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
