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


function NavbarItems(){
return <div className="navbar">
    <NavButton></NavButton>
    <NavLogo></NavLogo>
    <div className="navcontainer">
    <NavItem svg={<Category  className="nav-category"></Category>} link="#" label="Categories & Products"></NavItem>
    <NavItem svg={<Insights  className="nav-insights"></Insights>} link="#" label="My Analytics"></NavItem>
    <NavItem svg={<Ongoing  className="nav-ongoing"></Ongoing>} link="#" label="Ongoing Sales"></NavItem>
    <NavItem svg={<Brush  className="nav-brush"></Brush>} link="#" label="Mart Design"></NavItem>
    <NavItem svg={<Manage  className="nav-manage"></Manage>} link="#" label="My Mart"></NavItem>
    <NavItem svg={<Receipt  className="nav-receipt"></Receipt>} link="#" label="Customer Records"></NavItem>
    <NavItem svg={<Power  className="nav-power"></Power>} link="#" label="Close or Open Mart"></NavItem>
    </div>
</div>
}

export default NavbarItems

// mask-image: url(../../components/svgs/category.svg);
// mask-size: cover;
// mask-image: url(../../components/svgs/category.svg);
// mask-size: cover;
// background-image: linear-gradient(to right, $color-primary-dark, $color-primary-light);
