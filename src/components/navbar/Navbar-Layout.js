import { Fragment } from "react";
import NavbarItems from "./Navbar-Items";

function NavbarLayout(props) {
    return (
    <Fragment>
        <NavbarItems/>
        <div>{props.children}</div>
    </Fragment>
    );
  }
  
  export default NavbarLayout;