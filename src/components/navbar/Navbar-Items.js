import { Fragment } from "react"
import NavButton from "./Nav-Button"
import NavLogo from "./Nav-Logo"
import NavItem from "./NavItem"
import Head from "next/head"
import CartNav from "./Cart-Nav"
import Link from "next/link"

import { Category } from "../svgs"
import { Insights } from "../svgs"
import { Ongoing } from "../svgs"
import { Brush } from "../svgs"
import { Manage } from "../svgs"
import { Receipt } from "../svgs"
import { Power } from "../svgs"
import { useState } from "react"
import NavMenu from "./Nav-Menu"
import { useEffect } from "react"
import { Info } from "../svgs"
import { Cart } from "../svgs"

let previousScrollPos = 0;
function NavbarItems(props) {

  const [menuIsOn, setMenuIsOn] = useState(false)

  const showMenuToggler = () => {
    setMenuIsOn(!menuIsOn);
    if (!menuIsOn) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
  };

  const [isNavbarVisible, setNavbarVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = typeof window !== "undefined" ? window.pageYOffset : 0;
    setNavbarVisible(currentScrollPos < previousScrollPos || currentScrollPos === 0);
    previousScrollPos = currentScrollPos;
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return <Fragment>

    <NavMenu menuStatus={menuIsOn} onClick={showMenuToggler} function={showMenuToggler}></NavMenu>

    <header className={`navbar ${isNavbarVisible ? 'nav-visible' : 'nav-hidden'}`}>
      <NavButton menuHandler={showMenuToggler} status={menuIsOn}></NavButton>
      <NavLogo navicon={props.navicon}></NavLogo>
      <div className="navcontainer">
        <CartNav svg={<Cart className="menu-cart svg-color"></Cart>} link={"mart"} label="Cart" handleCart={props.cartOpen}></CartNav>
        <NavItem svg={<Category className="menu-category svg-color"></Category>} link={"categories"} label="Categories & Products" ></NavItem>
        <NavItem svg={<Info className="menu-info svg-color"></Info>} link={"about"} label="About Us"></NavItem>
        <NavItem svg={<Manage className="menu-manage svg-color"></Manage>} link={"mart"} label="Sign-Up to MyMart"></NavItem>
        <div className="nav-sign">
          <button className="product-action-1 log-button"><h2 className="heading-tertiary">Log-In</h2></button>
          <Link className="product-action-2 sign-button flex-row-align" href={`/${props.shopid}/signup`} style={{justifyContent:"center", textDecoration:"none"}}><h2 className="heading-tertiary button-solid-text">Sign-Up</h2></Link>
        </div>
      </div>
    </header>
  </Fragment>
}

export default NavbarItems