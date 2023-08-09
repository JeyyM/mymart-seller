import { Fragment } from "react"
import { useEffect, useState, useRef } from "react"

let previousScrollPos = 0;

function HomeNavbar(props) {
  const [menuIsOn, setMenuIsOn] = useState(false)
//   const { screenWidth } = props

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

  const inputRef = useRef(null);

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
      {/* <NavMenu menuStatus={menuIsOn} onClick={showMenuToggler} function={showMenuToggler} user={props.user} userHandler={props.userHandler} screenWidth={screenWidth}
      changeColor={props.changeColor} currentColor={props.currentColor} transformedData={transformedData} ></NavMenu> */}
      <header className={`home-navbar ${isNavbarVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <img src="/light-2.png" className="home-nav-logo"></img>
        <a className="header-home-text">Features</a>
        <a className="header-home-text">Statistics</a>
        <a className="header-home-text">Pricing</a>
        <a className="header-home-text">Sign-Up</a>

      </header>
    </Fragment>
  );
}

export default HomeNavbar;
