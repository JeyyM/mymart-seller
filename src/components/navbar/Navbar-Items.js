import { Fragment } from "react"
import NavButton from "./Nav-Button"
import NavLogo from "./Nav-Logo"
import NavItem from "./NavItem"

import { Category } from "../svgs"


function NavbarItems(){
return <div className="navbar">
    <NavButton></NavButton>
    <NavLogo></NavLogo>
    <div className="navcontainer">
    <NavItem svg="test" link="#" label="label"></NavItem>
    </div>
    <Category></Category>
</div>
}

export default NavbarItems