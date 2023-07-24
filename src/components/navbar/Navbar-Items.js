import { Fragment } from "react"
import NavButton from "./Nav-Button"
import NavLogo from "./Nav-Logo"
import NavItem from "./NavItem"
import Head from "next/head"
import CartNav from "./Cart-Nav"
import Link from "next/link"
import NavMenu from "./Nav-Menu"
import { useEffect, useState, useRef } from "react"
import NavUser from "./NavUser"
import { useRouter } from "next/router"

import { Category } from "../svgs"
import { Manage } from "../svgs"
import { Info } from "../svgs"
import { Cart } from "../svgs"

let previousScrollPos = 0;

import dynamic from "next/dynamic";

function NavbarItems(props) {
  const router = useRouter()
  const DynamicComponent1 = dynamic(() => import("./NavUser"), {
    ssr: false,
  });

  const DynamicComponent2 = dynamic(() => import("./SignIn"), {
    ssr: false,
  });

  const [menuIsOn, setMenuIsOn] = useState(false)
  const { screenWidth } = props

  const showMenuToggler = () => {
    setMenuIsOn(!menuIsOn);
    // if (!menuIsOn) {
    //   document.body.classList.add('no-scroll');
    //   document.documentElement.classList.add('no-scroll');
    // } else {
    //   document.body.classList.remove('no-scroll');
    //   document.documentElement.classList.remove('no-scroll');
    // }
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

  const transformedData = props.categs.map((category) => {
    return category.categoryProducts
      .filter((product) => product.variations.some((variation) => variation.active))
      .map((product) => {
        const { variations, productTags } = product;
        const { productName, productImages } = product.variations[0];
        return {
          category: category.categoryName,
          name: productName,
          image: productImages[0],
          tags: productTags.toLowerCase(),
          price: product.variations[0].productPrice
        };
      });
  }).flat();

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([]);

  const [searchVisible, setSearchVisible] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(event.target.value)

    const results = transformedData.filter((item) => {
      return item.tags.includes(searchTerm);
    });

    setSearchResults(results);
    setSearchVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <Fragment>
      <NavMenu menuStatus={menuIsOn} onClick={showMenuToggler} function={showMenuToggler} user={props.user} userHandler={props.userHandler} 
      changeColor={props.changeColor} currentColor={props.currentColor} handleSearch={handleSearch} inputRef={inputRef} searchVisible={searchVisible}
      search={search} searchResults={searchResults} currency={props.currency} setSearchResults={setSearchResults} setSearchVisible={setSearchVisible}></NavMenu>
      <header className={`navbar ${isNavbarVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <NavButton menuHandler={showMenuToggler} status={menuIsOn}></NavButton>
        <NavLogo navicon={props.navicon}></NavLogo>

        {screenWidth > 500 && <div className="margin-side" style={{ width: "30%", position: "relative" }}>
          <input
            type="text"
            className="text-small input-number"
            style={{ width: "100%" }}
            placeholder="Search"
            onChange={handleSearch}
            value={search}
            // ref={inputRef}
          />
          <div className="search-magnifying svg-tertiary" style={{ position: "absolute", top: "0", right: "2%", top: "20%" }}></div>
          {searchVisible && search.length > 0 && (
            <div className="search-row">
              {searchResults.map((item) => (
                <Link style={{ textDecoration: "none" }} className="search-item" key={item.name} href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}/${encodeURIComponent(item.name)}`}>
                  <div className="flex-row">
                    <img src={item.image} className="round-borderer" style={{ height: "4rem", width: "4rem" }}></img>
                    <div className="flex-col">
                      <h2 className="heading-tertiary text-black" style={{ fontWeight: "900" }}>{item.name}</h2>
                      <h2 className="heading-tertiary text-black">{props.currency} {item.price}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>}

        <div className="navcontainer">
          <CartNav svg={<Cart className="menu-cart svg-color"></Cart>} link={"mart"} label="Cart" handleCart={props.cartOpen} user={props.user}></CartNav>
          {screenWidth > 700 && <NavItem svg={<Category className="menu-category svg-color"></Category>} link={"categories"} label="Categories & Products" ></NavItem>}
          {screenWidth > 1550 && <>
            <NavItem svg={<Info className="menu-info svg-color"></Info>} link={"about"} label="About Us"></NavItem>

            <Link href={`/`} style={{ textDecoration: 'none' }}>
              <button className="navitem">
                <Manage className="menu-manage svg-color"></Manage>
                <h3 className="heading-tertiary">Sign-Up to MyMart</h3></button>
            </Link>
          </>}

          {screenWidth > 900 && <div className="nav-sign">
            {typeof window !== 'undefined' && (<>
              {props.user === undefined && <DynamicComponent2 />}
              {props.user !== undefined && <DynamicComponent1 userHandler={props.userHandler} />}
            </>
            )}
          </div>}
        </div>
      </header>
    </Fragment>
  );
}

export default NavbarItems;
