import { Fragment } from "react";
import NavbarItems from "./Navbar-Items";
import { useRouter } from "next/router";

function NavbarLayout(props) {
    const router = useRouter()
    
    return (
    <Fragment>
        <NavbarItems shopid={router.query.shopid}/>
        <div>{props.children}</div>
    </Fragment>
    );
  }
  
  export default NavbarLayout;