import { Fragment, useState, useEffect, useRef } from "react"
import HomepageButton from "../components/homepage/Homepage-Button"
import Head from "next/head"
import Link from "next/link"
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from "framer-motion";
import BannerCarouselHome from "@/components/home/BannerCarouselHome";
import Testimony from "@/components/home/Testimony";
// import HomeNavbar from "@/components/home/HomeNavbar";

let previousScrollPos = 0;

function HomePage() {

  const [screenWidth, setScreenWidth] = useState(0);
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

  const outRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outRef.current && !outRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
      const handleResize = () => {
        const newScreenWidth = window.innerWidth;
        setScreenWidth(newScreenWidth);
      };
  
      handleResize()
  
      if (typeof window !== 'undefined') {
        setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
      }
  
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
        }
      };
    }, []);

  const [sect1Ref, inView1] = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [sect4Ref, inView4] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [sect5Ref, inView5] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  const [sect6Ref, inView6] = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  const [sect8Ref, inView8] = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  const growAnimation = {
    scale: 1,
    opacity: 1,
  };

  const upAnimation = {
    y: inView1 ? 1 : 0,
    opacity: 1,
  };

  const leftAnimation = {
    x: inView6 ? 0 : -100,
    opacity: inView6 ? 1 : 0,
  };

  const sideAnimation = {
    x: inView4 ? 0 : -100,
    opacity: inView4 ? 1 : 0,
  };

  const screenVariants = {
    hidden: { y: 20 },
    visible: { y: 0 },
  };

  const [scrollState, setScrollState] = useState(0);
  const [section2Ref, inView] = useInView({ threshold: 0.2 });
  const [redPieceRef, redPieceInView] = useInView({ threshold: 0.8 });
  const [yellowPieceRef, yellowPieceInView] = useInView({ threshold: 0.8 });
  const [cyanPieceRef, cyanPieceInView] = useInView({ threshold: 0.8 });
  const [pinkPieceRef, pinkPieceInView] = useInView({ threshold: 0.7 });

  useEffect(() => {
    if (redPieceInView) {
      setScrollState(1);
    } else if (yellowPieceInView) {
      setScrollState(2)
    } else if (cyanPieceInView) {
      setScrollState(3)
    } else if (pinkPieceInView) {
      setScrollState(4)
    } else {
      if (!inView) { setScrollState(0) }
    }
  }, [redPieceInView, yellowPieceInView, cyanPieceInView, pinkPieceInView, inView]);

  const designImages = [
    'https://i.imgur.com/4JVTZw1.jpeg',
    'https://i.imgur.com/kRKrEzb.jpeg',
    'https://i.imgur.com/jLIck2a.jpeg',
    'https://i.imgur.com/I76LNw6.jpeg',
    'https://i.imgur.com/1n0xDHF.jpeg',
  ];

  const colors = [
    ["#0057FF", "#41644A"],
    ["#0057FF", "#CE5959"],
    ["#0057FF", "#E74646"],
    ["#0057FF", "#FFD93D"],
    ["#0057FF", "#734492"],
  ];

  const [IsFlipping, setIsFlipping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [designAutoOpacity, setDesignAutoOpacity] = useState(1);
  const [designHeadingWidth, setDesignHeadingWidth] = useState(68);

  const designColorSet = {
    backgroundImage: `linear-gradient(
            to bottom,
            ${colors[currentIndex][0]},
            ${colors[currentIndex][1]}
            )`
  }

  let brush1 = { backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, ${colors[currentIndex][0]} 80%)`}
let brush2 = { backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, ${colors[currentIndex][1]} 80%)`}
let cursorColor = { backgroundImage: `linear-gradient(to right, white, ${colors[currentIndex][1]})`}

  const handleCard = () => {
    if (!IsFlipping) {
      // brush1 = { backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, ${colors[currentIndex][0]} 80%)`}
      // brush2 = { backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, ${colors[currentIndex][1]} 80%)`}
      setIsFlipping(true);

      setDesignAutoOpacity(0);
      setDesignHeadingWidth(0);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % designImages.length);
        setIsFlipping(false);

        setDesignAutoOpacity(1);
        setDesignHeadingWidth(68);
      }, 400);
    }
  };


  // const scrollRef = useRef(null);
  // const [scrollPosition, setScrollPosition] = useState(0);

  // const scrollToBottom = () => {
  //   if (inView5 && scrollRef.current) {
  //     const containerHeight = scrollRef.current.scrollHeight;
  //     const maxScroll = containerHeight - window.innerHeight;
  //     setScrollPosition((prevPosition) => {
  //       const newPosition = (prevPosition + 0.5) % maxScroll;
  //       scrollRef.current.scrollTo(0, newPosition);
  //       return newPosition;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (inView5) {
  //     const scrollAnimation = () => {
  //       scrollToBottom();
  //       requestAnimationFrame(scrollAnimation);
  //     };
  //     const animationId = scrollAnimation();

  //     return () => {
  //       cancelAnimationFrame(animationId);
  //     };
  //   }
  // }, [inView5]);

  const statWave = <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    height="100vh" viewBox="0 0 1076.000000 659.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,659.000000) scale(0.100000,-0.100000)"
      fill="#e7f6fd" stroke="none">
      <path d="M0 3295 l0 -3295 4943 1 c4293 0 4937 2 4903 15 -54 20 -366 175
         -372 186 -3 4 -21 15 -39 23 -19 7 -40 19 -47 25 -7 6 -49 34 -93 62 -44 29
         -84 58 -88 65 -4 7 -14 13 -21 13 -7 0 -28 14 -47 31 -19 17 -47 40 -63 52
         -15 12 -38 31 -51 42 -13 11 -39 34 -60 50 -20 17 -54 46 -75 65 -22 19 -69
         62 -106 95 -37 33 -98 89 -135 125 -60 58 -131 122 -223 204 -16 14 -33 26
         -38 26 -5 0 -6 5 -3 10 3 6 2 10 -3 10 -5 0 -28 17 -50 38 -22 20 -61 56 -87
         80 -25 24 -101 86 -168 138 -67 52 -129 101 -138 109 -9 8 -20 15 -26 15 -5 0
         -22 11 -37 25 -15 14 -34 25 -42 25 -7 0 -14 4 -14 9 0 5 -25 24 -56 42 -31
         19 -62 40 -69 47 -8 7 -39 22 -69 33 -31 12 -56 25 -56 29 0 4 -37 23 -82 41
         -46 18 -85 36 -89 41 -8 12 -93 45 -379 148 -140 50 -311 112 -380 137 -69 25
         -143 55 -165 68 -22 12 -74 35 -115 50 -92 34 -400 184 -400 195 0 4 -12 12
         -28 18 -24 8 -90 48 -118 71 -5 4 -21 14 -34 21 -13 7 -29 17 -34 21 -21 17
         -84 64 -106 79 -13 8 -33 24 -46 35 -12 11 -32 27 -44 35 -12 8 -32 24 -44 35
         -12 11 -40 34 -62 52 -21 18 -63 54 -93 80 -58 53 -402 393 -396 393 2 0 -29
         33 -68 74 -40 41 -85 91 -102 111 -16 20 -43 52 -60 70 -40 43 -75 85 -105
         124 -13 18 -33 43 -45 55 -11 12 -31 37 -45 55 -13 18 -33 43 -45 55 -11 12
         -31 37 -45 56 -14 18 -29 38 -35 44 -5 6 -22 27 -36 46 -15 19 -35 44 -45 55
         -11 11 -39 47 -64 80 -25 33 -49 65 -55 71 -5 6 -23 28 -40 49 -16 21 -35 43
         -40 49 -6 6 -22 27 -35 46 -13 19 -35 45 -47 58 -13 12 -22 22 -19 22 4 0 -2
         8 -11 18 -10 10 -29 33 -43 52 -14 18 -29 38 -35 44 -5 6 -22 27 -36 46 -15
         19 -35 44 -46 55 -10 11 -29 36 -43 55 -13 19 -35 45 -47 58 -13 12 -22 22
         -19 22 3 0 -7 13 -22 29 -15 16 -40 45 -57 66 -68 85 -202 236 -315 354 -36
         38 -86 91 -111 117 -58 62 -225 215 -277 254 -41 31 -105 86 -120 103 -9 9
         -22 17 -29 17 -6 0 -16 6 -20 13 -4 7 -57 45 -118 85 -60 39 -115 76 -120 80
         -16 13 -158 86 -255 131 -107 50 -346 126 -428 136 -15 2 -72 10 -127 17 -106
         14 -304 16 -445 4 -47 -5 -87 -9 -91 -11 -3 -2 -27 -6 -53 -10 -27 -3 -51 -7
         -55 -9 -4 -3 -26 -7 -50 -11 -24 -3 -54 -10 -68 -16 -13 -5 -38 -11 -56 -14
         -18 -3 -122 -35 -232 -71 -205 -67 -457 -173 -597 -251 -43 -23 -80 -43 -83
         -43 -3 0 -5 209 -5 465 l0 465 233 3 232 2 -237 3 -238 2 0 -3295z"/>
    </g>
  </svg>


  const statWave2 = <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    height="100vh" viewBox="0 0 1076.000000 659.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,659.000000) scale(0.100000,-0.100000)"
      fill="#ffffff" stroke="none">
      <path d="M0 3295 l0 -3295 4943 1 c4293 0 4937 2 4903 15 -54 20 -366 175
-372 186 -3 4 -21 15 -39 23 -19 7 -40 19 -47 25 -7 6 -49 34 -93 62 -44 29
-84 58 -88 65 -4 7 -14 13 -21 13 -7 0 -28 14 -47 31 -19 17 -47 40 -63 52
-15 12 -38 31 -51 42 -13 11 -39 34 -60 50 -20 17 -54 46 -75 65 -22 19 -69
62 -106 95 -37 33 -98 89 -135 125 -60 58 -131 122 -223 204 -16 14 -33 26
-38 26 -5 0 -6 5 -3 10 3 6 2 10 -3 10 -5 0 -28 17 -50 38 -22 20 -61 56 -87
80 -25 24 -101 86 -168 138 -67 52 -129 101 -138 109 -9 8 -20 15 -26 15 -5 0
-22 11 -37 25 -15 14 -34 25 -42 25 -7 0 -14 4 -14 9 0 5 -25 24 -56 42 -31
19 -62 40 -69 47 -8 7 -39 22 -69 33 -31 12 -56 25 -56 29 0 4 -37 23 -82 41
-46 18 -85 36 -89 41 -8 12 -93 45 -379 148 -140 50 -311 112 -380 137 -69 25
-143 55 -165 68 -22 12 -74 35 -115 50 -92 34 -400 184 -400 195 0 4 -12 12
-28 18 -24 8 -90 48 -118 71 -5 4 -21 14 -34 21 -13 7 -29 17 -34 21 -21 17
-84 64 -106 79 -13 8 -33 24 -46 35 -12 11 -32 27 -44 35 -12 8 -32 24 -44 35
-12 11 -40 34 -62 52 -21 18 -63 54 -93 80 -58 53 -402 393 -396 393 2 0 -29
33 -68 74 -40 41 -85 91 -102 111 -16 20 -43 52 -60 70 -40 43 -75 85 -105
124 -13 18 -33 43 -45 55 -11 12 -31 37 -45 55 -13 18 -33 43 -45 55 -11 12
-31 37 -45 56 -14 18 -29 38 -35 44 -5 6 -22 27 -36 46 -15 19 -35 44 -45 55
-11 11 -39 47 -64 80 -25 33 -49 65 -55 71 -5 6 -23 28 -40 49 -16 21 -35 43
-40 49 -6 6 -22 27 -35 46 -13 19 -35 45 -47 58 -13 12 -22 22 -19 22 4 0 -2
8 -11 18 -10 10 -29 33 -43 52 -14 18 -29 38 -35 44 -5 6 -22 27 -36 46 -15
19 -35 44 -46 55 -10 11 -29 36 -43 55 -13 19 -35 45 -47 58 -13 12 -22 22
-19 22 3 0 -7 13 -22 29 -15 16 -40 45 -57 66 -68 85 -202 236 -315 354 -36
38 -86 91 -111 117 -58 62 -225 215 -277 254 -41 31 -105 86 -120 103 -9 9
-22 17 -29 17 -6 0 -16 6 -20 13 -4 7 -57 45 -118 85 -60 39 -115 76 -120 80
-16 13 -158 86 -255 131 -107 50 -346 126 -428 136 -15 2 -72 10 -127 17 -106
14 -304 16 -445 4 -47 -5 -87 -9 -91 -11 -3 -2 -27 -6 -53 -10 -27 -3 -51 -7
-55 -9 -4 -3 -26 -7 -50 -11 -24 -3 -54 -10 -68 -16 -13 -5 -38 -11 -56 -14
-18 -3 -122 -35 -232 -71 -205 -67 -457 -173 -597 -251 -43 -23 -80 -43 -83
-43 -3 0 -5 209 -5 465 l0 465 233 3 232 2 -237 3 -238 2 0 -3295z"/>
    </g>
  </svg>

  const [showUser, setShowUser] = useState(false)

  useEffect(() => {
    if (inView6) {
      setTimeout(() => {
        setShowUser(true)
      }, 1000);
    }
  }, [inView6])


  const bannerData = [
    {
        "image": "https://picsum.photos/1000/1000",
    },
    {
        "image": "https://picsum.photos/1001/1001",
    },
    {
        "image": "https://picsum.photos/1002/1002",
    },
    {
        "image": "https://picsum.photos/1003/1003",
    }
]

const paintbrush = <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="12rem" height="21rem" viewBox="0 0 360.000000 630.000000"
preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,630.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M2114 6267 l-192 -32 42 -46 c43 -49 207 -311 320 -514 64 -114 67
-123 63 -174 -3 -46 -9 -59 -36 -83 -25 -22 -41 -28 -77 -28 -69 0 -93 19
-160 127 -97 156 -253 428 -291 510 l-36 75 22 45 c12 25 20 48 17 50 -11 11
-666 -150 -981 -242 -432 -125 -646 -210 -724 -285 -81 -78 -96 -152 -51 -240
23 -45 46 -65 147 -129 45 -29 100 -74 121 -99 179 -216 377 -648 523 -1136
29 -98 58 -180 65 -183 7 -2 124 25 261 62 390 104 1888 511 2091 568 l183 51
-6 34 c-10 52 -134 422 -204 612 -159 425 -354 854 -425 937 -20 23 -59 55
-86 72 -139 86 -288 98 -586 48z"/>
<path d="M3295 4410 c-950 -259 -1248 -340 -1705 -465 -294 -81 -562 -155
-595 -164 -58 -16 -60 -18 -57 -46 5 -35 48 -174 61 -193 9 -15 270 53 1726
449 872 238 796 214 789 247 -14 64 -58 193 -68 201 -7 5 -66 -6 -151 -29z"/>
<path d="M2845 3891 c-1559 -426 -1731 -474 -1744 -481 -8 -4 79 -38 215 -84
367 -124 462 -175 638 -346 137 -133 196 -209 255 -335 112 -234 172 -475 231
-923 37 -283 68 -457 120 -667 113 -458 275 -801 451 -952 114 -98 262 -128
367 -74 59 30 112 91 148 168 57 121 67 189 68 438 0 350 -6 373 -404 1515
-109 312 -165 491 -187 592 -26 120 -26 431 1 543 49 211 133 352 378 631 122
139 134 154 121 153 -4 0 -300 -81 -658 -178z"/>
</g>
</svg>

const scrollToSection = (id) => {
  const ref = document.getElementById(id);
    ref.scrollIntoView({ behavior: 'smooth' });
};

  return <Fragment>
    <Head>
      <title>Home - MyMart</title>
      <link rel="icon" type="image/jpeg" href="/light.png" />
    </Head>

    <header className={`home-navbar ${isNavbarVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <img src="/light-2.png" className="home-nav-logo" onClick={() => scrollToSection('section-1')}></img>
        <a onClick={() => scrollToSection('section-2')} className="header-home-text">Features</a>
        <a onClick={() => scrollToSection('section-6')} className="header-home-text">Statistics</a>
        <a onClick={() => scrollToSection('section-9')} className="header-home-text">Pricing</a>
        <a onClick={() => scrollToSection('section-10')} className="header-home-text">Sign-Up</a>

      </header>
    {scrollState > 0 && <section className="section-2-main" style={{ position: scrollState > 0 ? "fixed" : "absolute" }}>
      <motion.header className="sect-1-text" style={{ margin: "1rem", fontWeight:"700" }}>Manage Your Mart with Ease</motion.header>
      <div className="sect-2-container">
        <div className="sect-2-col1">
          <div className={`${(scrollState === 1 || scrollState === 0) ? "sect-2-info active-sect-2" : "sect-2-info"}`}>
            <header className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-b word-glue">Create Categories</span></header>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 1 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Be able to create any number of categories with the relevant details such as an image and description. You may disable categories too so that users can't access the page.</h3>
          </div>
          <div className={`${scrollState === 2 ? "sect-2-info active-sect-2" : "sect-2-info"}`}>
            <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-c word-glue">Create Products</span></h1>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 2 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>You may populate categories with any number of products. The products can be set with data such as their price, stock, and profits. The set data will be collected as users order to create statistics</h3>
          </div>
          <div className={`${scrollState === 3 ? "sect-2-info active-sect-2" : "sect-2-info"}`}>
            <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-d word-glue">Manage Prices and Stocks</span></h1>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 3 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>The names, images, prices. and stocks can be changed at anytime past their initialization and will update as users refresh the page. Products with no stock will be marked as sold out.</h3>
          </div>
          <div className={`${scrollState === 4 ? "sect-2-info active-sect-2" : "sect-2-info"}`} style={{ marginBottom: "2rem" }}>
            <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Add Variations</span></h1>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 4 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>After product initialization, variations can be added with the same types of details. Each new variation will have their own statistics so that they can be compared with each other.</h3>
          </div>
        </div>
        <div className="sect-2-col2">
        {/* <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{ backgroundColor: "purple" }}></motion.figure> */}
          {scrollState === 1 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
            <motion.img className="sect-2-piece" style={{top:"50%", transform:"translateY(-50%)"}} src="/home/phone1-piece.png"></motion.img>
            <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.png"></img>
          </motion.figure>}
          {scrollState === 2 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
            <motion.img className="sect-2-piece" style={{height:"45rem", top:"50%", transform:"translateY(-50%) translateX(-15%)"}} src="/home/phone2-piece.png"></motion.img>
            <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone2.png"></img>
          </motion.figure>}
          {scrollState === 3 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{ backgroundColor: "gray" }}></motion.figure>}
          {scrollState === 4 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{ backgroundColor: "blue" }}></motion.figure>}
        </div>
      </div>
    </section>}

    <section className="section-1" id="section-1">
      <div className="section-1-col">
        <motion.h3 ref={sect1Ref} className="adj-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>INTUITIVE. DATA-DRIVEN. CUSTOMIZABLE.</motion.h3>
        <motion.header ref={sect1Ref} className="sect-1-text" style={{fontWeight:"700"}} initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>Instantly Create an <span className="word-glue">E-Commerce</span> Site for Your Business</motion.header>
        <motion.h1 ref={sect1Ref} className="sect-1-text-2" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}>With <span className="gradient-orange">No Coding</span> or <span className="gradient-purple word-glue">Design Experience</span></motion.h1>
        <motion.h3 ref={sect1Ref} style={{ marginBottom: "3rem" }} className="paragraph-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></motion.h3>
        <motion.button onClick={() => scrollToSection('section-10')} ref={sect1Ref} className="cta-1" initial={{ y: "20px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.5, delay: 0.8 }}>GET STARTED<div className="icon-next">&nbsp;</div></motion.button>
      </div>

      <motion.figure className="section-1-col2"
        initial={{ scale: 0, opacity: 0 }}
        animate={growAnimation}
        transition={{ duration: 1, ease: "easeOut" }}
      >
      <div className="sect-1-imageset">
      <img src="/home/1.png" className="hero-laptop" style={{zIndex:"2"}}></img>
      <motion.img src="/home/2.png" style={{zIndex:"3", position:"absolute", height:"15rem", bottom:"0", left:"0", transform:"translateX(-25%)", marginBottom:"1rem"}} initial={{y:50, opacity:0}} animate={{y: 0, opacity:1}} transition={{duration:0.5, ease: "easeOut", delay: 0.5}}></motion.img>
      <motion.img src="/home/3.png" style={{zIndex:"3", position:"absolute", height:"10rem", bottom:"5%", right:"0", transform:"translateX(25%)", marginBottom:"1rem"}} initial={{y:50, opacity:0}} animate={{y: 0, opacity:1}} transition={{duration:0.5, ease: "easeOut", delay: 0.5}}></motion.img>
      <motion.img src="/home/4.png" style={{zIndex:"1", position:"absolute", height:"15rem", left:"0", top:"30%", margin:"1rem"}} initial={{y:50, opacity:0}} animate={{y: 0, opacity:1}} transition={{duration:0.5, ease: "easeOut", delay:1}}></motion.img>
      <div style={{position:"absolute"}}>
      <motion.img src="/home/5.png" style={{zIndex:"3", position:"absolute", height:"3rem", top:"0", left:"0"}} initial={{y:50, opacity:0}} animate={{y: 0, opacity:1}} transition={{duration:0.5, ease: "easeOut", delay: 0.5}}></motion.img>
      <motion.img src="/home/6.png" style={{zIndex:"1", position:"absolute", height:"15rem", top:"0", left:"30px", transform:"translateY(-50px)"}} initial={{y:50, opacity:0}} animate={{y: 0, opacity:1}} transition={{duration:0.5, ease: "easeOut", delay: 0.7}}></motion.img>
      </div>
      <motion.img src="/home/7.png" style={{zIndex:"1", position:"absolute", height:"15rem", top:"40%", right:"-10%"}} initial={{y:50, opacity:0}} animate={{y: 0, opacity:1}} transition={{duration:0.5, ease: "easeOut", delay:0.7}}></motion.img>
      <motion.img src="/home/8.png" style={{zIndex:"0", position:"absolute", height:"23rem", top:"-10%", right:"10%"}} initial={{y:50, opacity:0}} animate={{y: 0, opacity:1}} transition={{duration:0.5, ease: "easeOut", delay:1}}></motion.img>
      {/* <motion.h1 initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:2, ease: "easeOut", delay: 5}}>Hello</motion.h1> */}
      </div>
      </motion.figure>
    </section>

    <section className="section-2-bg" ref={section2Ref} id="section-2">
      <div className="section-2-main" style={{ position: "relative", zIndex: "0", height: "120vh" }} ref={redPieceRef}>
        <motion.header className="sect-1-text" style={{ margin: "1rem", fontWeight:"700" }}>Manage Your Mart with Ease</motion.header>

        <div className="sect-2-container">
          <div className="sect-2-col1">
            <div className="sect-2-info active-sect-2">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-b word-glue">Create Categories</span></h1>
              <h3 className="paragraph-text" style={{ height: "auto", overflow: "hidden", transition: "all 0.5s" }}>Be able to create any number of categories with the relevant details such as an image and description. You may disable categories too so that users can't access the page.</h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-c word-glue">Create Products</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 20 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-d word-glue">Manage Prices and Stocks</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 30 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info" style={{ marginBottom: "2rem" }}>
              <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Add Variations</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 40 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
          </div>
          <div className="sect-2-col2">
          <img className="sect-2-piece" style={{top:"50%", transform:"translateY(-50%)"}} src="/home/phone1-piece.png"></img>
            <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.png"></img>
          </div>
        </div>
      </div>
      <div className="section-2-piece" ref={yellowPieceRef}></div>
      <div className="section-2-piece" ref={cyanPieceRef}></div>
      <div className="section-2-main" style={{ position: "relative", zIndex: "0", height: "140vh" }} ref={pinkPieceRef}>
        <motion.h1 className="sect-1-text gradient-a" style={{ margin: "1rem" }}>Manage Your Mart with Ease</motion.h1>
        <div className="sect-2-container">
          <div className="sect-2-col1">
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-b word-glue">Create Categories</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 20 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-c word-glue">Create Products</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 20 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-d word-glue">Manage Prices and Stocks</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 30 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}></h3>
            </div>
            <div className="sect-2-info active-sect-2" style={{ marginBottom: "2rem" }}>
              <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Add Variations</span></h1>
              <h3 className="paragraph-text" style={{ height: "auto", overflow: "hidden", transition: "all 0.5s" }}>After product initialization, variations can be added with the same types of details. Each new variation will have their own statistics so that they can be compared with each other.</h3>
            </div>
          </div>
          <div className="sect-2-col2">
            <motion.div variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" style={{ backgroundColor: "blue" }}></motion.div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-3">
      <div className="design-auto" style={{ opacity: designAutoOpacity }}>
        <div className="design-brush-1"><div className="home-paintbrush" style={{...brush1}}></div></div>
        <div className="design-brush-2"><div className="home-paintbrush-2" style={{...brush2}}></div></div>
        <div className="design-heading-container" style={{ width: `${designHeadingWidth}rem` }}>
          <div className="design-heading" style={{ ...designColorSet }}>&nbsp;</div>
        </div>
      </div>

      <div className="flip-card" onClick={handleCard}>
      <div className="design-click">
      <motion.div className="logo-click" style={{...cursorColor, opacity: designAutoOpacity}}
                                initial={{ opacity: 1, translateX: -25, translateY: -25, scale: 2 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, type: "spring", damping: 0 }}
      ></motion.div>
      </div>
        <div className={`flip-card-inner ${IsFlipping ? 'flipping' : ''}`} style={{ transform: `rotateY(${currentIndex * 180}deg)` }}>
          <div className="flip-card-front">
            <img src={designImages[currentIndex]} className="flip-card-img" />
          </div>
          <div className="flip-card-back">
            <img src={designImages[currentIndex]} className="flip-card-img" />
          </div>
        </div>
      </div>

    </section>

    <section className="section-4" ref={sect4Ref}>
      <motion.figure className="section-4-img" initial={{ x: "-100px", opacity: 0 }} animate={sideAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>
        <div className="section-4-circle">
          <img src="https://i.imgur.com/qlmYdJO.jpeg" className="sect-4-img"></img>
          <img src="https://media.tenor.com/x_IgoSdRecYAAAAC/walking-walking-duck.gif" className="sect-4-gif"></img>
        </div>
      </motion.figure>

      <div className="section-4-text">
        <header style={{fontWeight:"700"}} className="sect-4-text">Manage <span className="gradient-redviolet word-glue">at Home or On the Go</span></header>
        <motion.h3 className="paragraph-text" style={{ width: "55rem" }}>MyMart works on all devices, allowing you to be up to date with your mart's statistics, update your product catalogue, change prices and stocks, and manage at the office or on the way to work and so can your customers. Through  your shop's link, customers can view and make orders which you can then approve or refuse anytime, anywhere.</motion.h3>
      </div>
    </section>

    <section className="section-5" ref={sect5Ref}>
      <figure className="orders-container">
        <img src="/scrolling-test.png" className="tall-image" />
      </figure>

      <div className="sample-container">
        <div className="sample-orders"></div>
      </div>

      <div className="order-text">
      <motion.header className="sect-5-text gradient-e" style={{ margin: "1rem", fontWeight:"700" }}>Collect - <span className="gradient-g">Edit</span> - <span className="gradient-f">Approve</span> / <span className="gradient-h">Refuse</span></motion.header>
      <h3 className="paragraph-text" style={{margin:"1rem 5rem", textAlign:"left", whiteSpace:"pre-wrap"}}>    Instantly receive orders upon customer checkout. From there you can see the list of their orders. You may even edit them which will alert the user. From there you can view the user's contact information and location to see if you can finish the order.</h3>
      <h3 className="paragraph-text" style={{margin:"1rem 5rem", textAlign:"left", whiteSpace:"pre-wrap"}}>    Upon review, you may then choose to approve or refuse an order. When approved, you can set a date when a user can expect their products to arrive. You may even enable cancellations and set penalties.</h3>

      <div className="order-img">

      </div>
      </div>

    </section>

    <section className="section-6" id="section-6">
      <div className="svg-container">
        {statWave}
      </div>
      <div className="section-6-2">
        <div className="svg-container-2">
          {statWave2}
        </div>
        <div className="stat-text">
        <header style={{fontWeight:"700"}} className="sect-6-text gradient-orangered">Work with Performance Statistics</header>
        <h3 className="paragraph-text" style={{marginTop:"1rem"}}>Collect data on how your mart performs. Collect metrics on views and new users, compare categories and products by their profits and their sales, as well as viewing their ranks relative to a time period. Observe your mart's performance across the day as orders are finished!</h3>
        </div>

        <div className="stat-img">

        </div>
      </div>
    </section>

    <section className="section-7" ref={sect6Ref}>
      <motion.header style={{ marginTop: `${showUser ? "5%" : "20%"}`, fontWeight:"700" }} className="sect-7-text gradient-green" initial={{ x: "-100px", opacity: 0 }} animate={leftAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>The Customer is (12 mins) Away</motion.header>

      <div style={{ height: `${showUser ? "80%" : "0"}`, opacity: `${showUser ? "1" : "0"}` }} className="user-data">
        <div className="user-stats"></div>
        <div className="user-stat-text">
        <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-c">Gain Data on Your Users</span></h1>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap"}}>    Besides data on products and categories, you can collect statistics of your users. Collate user demographics such as age and gender together with lifetime statistics such as average profit and bought products. Users are ranked along with the companies they belong to allowing you to find your corporate clients.</h3>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap"}}>    User locations and coordinates are included in account creation where you can find prime locations where your mart is most popular. Powered by Google Maps, the users' price locations can be found and an estimate of the travel duration to deliver products with precision.</h3>
        </div>
      </div>

    </section>

<section className="section-8">
<header style={{fontWeight:"700", marginLeft:"3rem", marginBottom:"1rem"}} className="sect-6-text gradient-purple">Even More Customizables</header>

<BannerCarouselHome screenWidth={screenWidth} data={bannerData}></BannerCarouselHome>

<div className="feature-cards" ref={sect8Ref}>
<div className="feature-item feature-1" style={{marginLeft:`${inView8 ? "4vw" : "100vw"}`}}>
<div className="feature-intuitive">&nbsp;</div>
<h1 className="feature-heading" style={{marginLeft:"1rem"}}><span className="gradient-orange">Simple & Intuitive</span></h1>
<h3 className="feature-description" style={{marginTop:"1rem", whiteSpace:"pre-wrap"}}>MyMart strives to allow you to create a simple and functional online store without needing to learn how to code or hire a designer. Simply input your shop details, choose colors, and populate your catalogue and your shop can fly!</h3>
</div>

<div className="feature-item feature-2" style={{marginLeft:`${inView8 ? "28vw" : "100vw"}`}}>
<div className="feature-receipt">&nbsp;</div>
<h1 className="feature-heading" style={{marginLeft:"1rem"}}><span className="gradient-green">Straightforward Management</span></h1>
<h3 className="feature-description" style={{marginTop:"1rem", whiteSpace:"pre-wrap"}}>Manage prices, profits, products, and stocks to keep your data collection up to date. Cleanly keep track and finish orders with dynamically updating stocks and statistics.</h3>
</div>

<div className="feature-item feature-3" style={{marginLeft:`${inView8 ? "52vw" : "100vw"}`}}>
<div className="feature-data-driven">&nbsp;</div>
<h1 className="feature-heading" style={{marginLeft:"1rem"}}><span className="gradient-purple">Data Driven</span></h1>
<h3 className="feature-description" style={{marginTop:"1rem", whiteSpace:"pre-wrap"}}>Be up to speed with the performance of your Mart in all fronts. From the performance of products and categories up against each other. Create an image of who your users are through demographic data and bought products.</h3>
</div>

<div className="feature-item feature-4" style={{marginLeft:`${inView8 ? "76vw" : "100vw"}`}}>
<div className="feature-familiar">&nbsp;</div>
<h1 className="feature-heading" style={{marginLeft:"1rem"}}><span className="gradient-orangered">Customer Familiarity</span></h1>
<h3 className="feature-description" style={{marginTop:"1rem", whiteSpace:"pre-wrap"}}>MyMart is built with customers in mind. The design of the mart in the user's perspective is similar to the standard e-commerce website. Helping users and admins to navigate with ease.</h3>
</div>

</div>
  <header style={{fontWeight:"700"}} className="sect-8-text gradient-orangered">Customer Testimonies</header>

<div className="testimony-container">
  <Testimony></Testimony>
</div>
</section>

<section className="section-9" id="section-9">
<motion.header className="sect-1-text" style={{ margin: "1rem", transform:"scale(1.5)", fontWeight:"700" }}>Pricing</motion.header>

<div className="prices">
<div className="price-card">
<h1 className="price-text-name">Basic Plan</h1>
<h2 className="price-text-main">FREE</h2>
<h3 className="price-text-info">No Statistics</h3>
<h3 className="price-text-info">Default Colors Only</h3>
<h3 className="price-text-info" style={{borderBottom:"0px solid white"}}>No Pop-ups & Promos</h3>
</div>

<div className="price-card-2">
  <h1 className="price-text-name" style={{color:"#0a2647"}}>Pro Plan</h1>
  <h2 className="price-text-main"><sup style={{fontSize:"3rem"}}>$</sup>4.99</h2>
  <h3 className="price-text-info-2">Full Package</h3>
<h3 className="price-text-info-2">Mart Statistics</h3>
<h3 className="price-text-info-2">Full Color Customization</h3>
<h3 className="price-text-info-2" style={{borderBottom:"0px solid white"}}>Includes Popups & Promos</h3>
</div>
</div>
</section>

<section className="section-10" id="section-10">
    <div className="signup-box">
    <div className="signup-input">
    <motion.header className="sect-10-text" style={{ margin: "1rem", fontWeight:"700" }}>YOUR DREAM MART AWAITS</motion.header>

    <div className="flex-row" style={{width:"82%"}}>
    <div className="form-group">
    <input type="text" placeholder="First Name" className="text-full" style={{width:"100%"}}></input>
    <label className="form-label">First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>    
    </div>
    <div className="form-group">
    <input type="text" placeholder="Last Name" className="text-full" style={{width:"100%"}}></input>
    <label className="form-label">Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>    
    </div>
    </div>

    <div className="form-group">
    <input type="text" placeholder="Mart Name" className="text-full" style={{width:"82%"}}></input>
    <label className="form-label">Mart Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>    
    </div>

    <div className="form-group">
    <input type="text" placeholder="Email" className="text-full" style={{width:"82%"}}></input>
    <label className="form-label">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>    
    </div>
    <Link href="/create" className="cta-2">CONTINUE CREATION<div className="icon-next">&nbsp;</div></Link>

    </div>
    </div>
</section>


<div className="footer-home">
<div className="footer-icon-box">
  <img className="footer-icon" src="/light-2.png"></img>
</div>

<div className="footer-details-row">
  <div className="footer-details-1">
    <h3 className="paragraph-text" style={{fontWeight:"900"}}>Github</h3>
    <h3 className="paragraph-text" style={{fontWeight:"900"}}>Personal Site</h3>
    <h3 className="paragraph-text" style={{fontWeight:"900"}}>LinkedIn</h3>
    <h3 className="paragraph-text" style={{fontWeight:"900"}}>Github</h3>
    <h3 className="paragraph-text" style={{fontWeight:"900"}}>Admin Page</h3>
  </div>

  <div className="footer-details-2">
    <h3 className="paragraph-text" style={{margin:"0 4rem"}}>Built by JM Miranda for my online portfolio. To access the 3 sample websites, click on the shop name links found in the testimonials or go back to <span style={{fontWeight:"900"}}>My Personal Site</span>. Contact me at <span style={{fontWeight:"900"}}>sdfggfd0000@gmail.com</span>. Please don't steal my code, thank you!</h3>
  </div> 
</div>
</div>

  </Fragment>
}

export default HomePage



