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
            tags: productTags.toLowerCase()
          };
        });
    }).flat();
    
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [isInputActive, setIsInputActive] = useState(false);
    
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      setSearch(event.target.value)
  
      const results = transformedData.filter((item) => {
        return item.tags.includes(searchTerm);
      });
  
      setSearchResults(results);
    };

    return (
      <Fragment>
        <NavMenu menuStatus={menuIsOn} onClick={showMenuToggler} function={showMenuToggler} user={props.user} userHandler={props.userHandler} changeColor={props.changeColor} currentColor={props.currentColor}></NavMenu>
        <header className={`navbar ${isNavbarVisible ? 'nav-visible' : 'nav-hidden'}`}>
          <NavButton menuHandler={showMenuToggler} status={menuIsOn}></NavButton>
          <NavLogo navicon={props.navicon}></NavLogo>

          <div className="margin-side" style={{width:"30%", position:"relative"}}>
          <input type="text" className="text-small input-number" style={{width:"100%"}} placeholder="Search" onChange={handleSearch} onFocus={() => setIsInputActive(true)} onBlur={() => setIsInputActive(false)}></input>
          <div className="search-magnifying svg-tertiary" style={{position:"absolute", top:"0", right:"2%", top:"20%"}}></div>
          {isInputActive && search.length > 0 && <div className="search-row">
          {searchResults.map((item) => {
            return <div className="search-item">
            <Link href={`/${router.query.shopid}/categories/${encodeURIComponent(item.category)}/${encodeURIComponent(item.name)}`}>
            <h1>{item.name}</h1>
            </Link>
            </div>
          })}
          </div>}
          </div>

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
