import { Fragment } from "react";
import NavbarItems from "./Navbar-Items";
import { useRouter } from "next/router";
import Head from "next/head";

function NavbarLayout(props) {
    const router = useRouter()

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return { r, g, b };
      }
      
    const primaryDarkHex = hexToRgb(`${props.color["color-primary-dark"]}`)
    console.log(primaryDarkHex.r)

    return (
        <Fragment>
            <Head>
                <style>
                    {`     
body{background-color: ${props.color["bg-body"]} !important;}

.maincontainer {filter: drop-shadow(-4px 4px 0px ${props.color["color-primary-dark"]}) !important;}

.heading-primary {font-family: ${props.color["text-primary-font"]} !important;
    color: ${props.color["text-primary-color"]} !important;}

.heading-secondary {font-family: ${props.color["text-secondary-font"]} !important;
    color: ${props.color["text-secondary-color"]} !important;}

.heading-tertiary {font-family: ${props.color["text-tertiary-font"]} !important;
    color: ${props.color["text-tertiary-color"]} !important;}

.navbar, .navmenu, .navmenu-item, .menu-decoy {background-color: ${props.color["bg-item"]} !important;
border-image: linear-gradient(
      45deg,
      ${props.color["color-primary-dark"]},
      ${props.color["color-primary-light"]}
    )
    1 !important;}

.homepage-button:hover.x {
    filter: drop-shadow(-6px 6px 0px ${props.color["color-primary-dark"]})}

.homepage-button:active.x {
    transform: translateY(0rem) translateX(0rem);
    filter: drop-shadow(-1px 1px 0px ${props.color["color-primary-dark"]});}

.navitem{border-image: linear-gradient(
      45deg,
      ${props.color["color-primary-dark"]},
      ${props.color["color-primary-light"]}
    )
    1 !important;
    background-color:${props.color["bg-item"]} !important;}

.svg-color{
    background-image: linear-gradient(
    to right,
    ${props.color["color-primary-dark"]},
    ${props.color["color-primary-light"]}
  ) !important;}

.company-logo-med {
    border-image: linear-gradient(
      45deg,
      ${props.color["color-primary-dark"]},
      ${props.color["color-primary-light"]}
    )
    1 !important;}

.navbutton { background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
    filter: drop-shadow(-2px 2px 0px ${props.color["color-primary-dark"]}) !important;}

.navbutton:hover.x {
    filter: drop-shadow(-6px 6px 0px ${props.color["color-primary-dark"]}) !important}

.navbutton:active.x {
    transform: translateY(0rem) translateX(0rem);
    filter: drop-shadow(-1px 1px 0px ${props.color["color-primary-dark"]}) !important}

.navbutton__hr, .navbutton__hr::before, .navbutton__hr::after, .navbutton:hover .navbutton__hr-2, .navbutton:hover .navbutton__hr-2::after, .navbutton:hover .navbutton__hr-2::before {
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
}

.navbutton__hr-2, .navbutton__hr-2::before, .navbutton__hr-2::after {
    background-image: linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
}

.navmenu {
    box-shadow: 0 0 0 2px ${props.color["color-primary-dark"]}, 0 0 0 4px ${props.color["bg-item"]} !important;
}

.navmenu-logo {margin-left: 10rem !important;}

.heading-icon-dropshadow{
    filter: drop-shadow(-2px 2px 0px ${props.color["text-primary-color"]}) !important;
}

.backdrop {background-color: rgba(${primaryDarkHex.r}, ${primaryDarkHex.g}, ${primaryDarkHex.b}, 0.7) !important;}



    ` }
                </style>
            </Head>
            <NavbarItems shopid={router.query.shopid} />
            <div>{props.children}</div>
        </Fragment>
    );
}

export default NavbarLayout;