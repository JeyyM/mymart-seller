  import { Fragment } from "react"
  import NavButton from "./Nav-Button"
  import NavLogo from "./Nav-Logo"
  import NavItem from "./NavItem"
  import Head from "next/head"
  import CartNav from "./Cart-Nav"
  import Link from "next/link"
  import NavMenu from "./Nav-Menu"
  import { useEffect, useState } from "react"
  import NavUser from "./NavUser"

  import { Category } from "../svgs"
  import { Manage } from "../svgs"
  import { Info } from "../svgs"
  import { Cart } from "../svgs"

  let previousScrollPos = 0;

  import dynamic from "next/dynamic";

  function NavbarItems(props) {
    const DynamicComponent1 = dynamic(() => import("./NavUser"), {
      ssr: false,
    });

    const DynamicComponent2 = dynamic(() => import("./SignIn"), {
      ssr: false,
    });

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

    return (
      <Fragment>
        <NavMenu menuStatus={menuIsOn} onClick={showMenuToggler} function={showMenuToggler} user={props.user} userHandler={props.userHandler}></NavMenu>
        <header className={`navbar ${isNavbarVisible ? 'nav-visible' : 'nav-hidden'}`}>
          <NavButton menuHandler={showMenuToggler} status={menuIsOn}></NavButton>
          <NavLogo navicon={props.navicon}></NavLogo>
          <div className="navcontainer">
            <CartNav svg={<Cart className="menu-cart svg-color"></Cart>} link={"mart"} label="Cart" handleCart={props.cartOpen} user={props.user}></CartNav>
            <NavItem svg={<Category className="menu-category svg-color"></Category>} link={"categories"} label="Categories & Products" ></NavItem>
            <NavItem svg={<Info className="menu-info svg-color"></Info>} link={"about"} label="About Us"></NavItem>

            <Link href={`/`} style={{ textDecoration: 'none' }}>
    <button className="navitem">
    <Manage className="menu-manage svg-color"></Manage>
            <h3 className="heading-tertiary">Sign-Up to MyMart</h3></button>
    </Link>

            <div className="nav-sign">
              {typeof window !== 'undefined' && (<>
                {props.user === undefined && <DynamicComponent2 /> }
              {props.user !== undefined && <DynamicComponent1 userHandler={props.userHandler}/>}
              </>            
          )}

            </div>
          </div>
        </header>
      </Fragment>
    );
  }

  export default NavbarItems;
