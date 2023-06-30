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
import { useEffect } from "react"

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
        <NavItem svg={<Category className="menu-category svg-color"></Category>} title={"Add and edit categories, products, and variations"} link={"categories"} label="Categories & Products" ></NavItem>
        <NavItem svg={<Insights className="menu-insights svg-color"></Insights>} link={"analytics"} label="My Analytics"></NavItem>
        <NavItem svg={<Ongoing className="menu-ongoing svg-color"></Ongoing>} link="orders" label="Ongoing Sales"></NavItem>
        <NavItem svg={<Receipt className="menu-receipt svg-color"></Receipt>} link="records" label="Customer Records"></NavItem>
        <NavItem svg={<Manage className="menu-manage svg-color"></Manage>} title={"Set about page, descriptions, footers, and details of your mart"} link={"mart"} label="My Mart"></NavItem>
        <NavItem svg={<Brush className="menu-brush svg-color"></Brush>} link={"design"} title={"Edit mart's colors and fonts"} label="Mart Design" extension={props.colormode}></NavItem>
        {/* <NavItem svg={<Power className="menu-power svg-color"></Power>} link="#" label="Close or Open Mart"></NavItem> */}
      </div>
    </header>
  </Fragment>
}

export default NavbarItems