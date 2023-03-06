import { Fragment } from "react"
import NavButton from "./Nav-Button"
import NavLogo from "./Nav-Logo"
import NavItem from "./NavItem"




function NavbarItems(){
return <div className="navbar">
    <NavButton></NavButton>
    <NavLogo></NavLogo>
    <div className="navcontainer">
    <NavItem svg="test" link="#" label="label"></NavItem>
    </div>


</div>
}

export default NavbarItems