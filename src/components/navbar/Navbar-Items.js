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
        <NavItem svg={<Category className="menu-category svg-color"></Category>} link={"categories"} label="Categories & Products" ></NavItem>
        <NavItem svg={<Brush className="menu-brush svg-color"></Brush>} link={"design"} title={"Edit mart's colors and fonts"} label="Mart Design" extension={props.colormode}></NavItem>
        <NavItem svg={<Manage className="menu-manage svg-color"></Manage>} title={"Set about page, descriptions, footers, and details of your mart"} link={"mart"} label="My Mart"></NavItem>
        <NavItem svg={<Manage className="menu-manage svg-color"></Manage>} link={"mart"} label="About Us"></NavItem>
        <NavItem svg={<Manage className="menu-manage svg-color"></Manage>} link={"mart"} label="Cart"></NavItem>
        <NavItem svg={<Manage className="menu-manage svg-color"></Manage>} link={"mart"} label="Sign/Log-up"></NavItem>
        <NavItem svg={<Manage className="menu-manage svg-color"></Manage>} link={"mart"} label="Sign-Up to MyMart"></NavItem>
      </div>
    </header>
  </Fragment>
}

export default NavbarItems