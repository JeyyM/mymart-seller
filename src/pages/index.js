import { Fragment, useState, useEffect, useRef } from "react"
import Head from "next/head"
import Link from "next/link"
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import BannerCarouselHome from "@/components/home/BannerCarouselHome";
import Testimony from "@/components/home/Testimony";
// import HomeNavbar from "@/components/home/HomeNavbar";

const ImagePreloader = () => {
  useEffect(() => {
    const images = [
      '/home/phone1.webp',
      '/home/phone1-piece.webp',
      '/home/phone2.webp',
      '/home/phone2-piece.webp',
      '/home/phone3.webp',
      '/home/phone3-piece.webp',
      '/home/phone4.webp',
      '/home/phone4-piece.webp',
      '/home/stat1.webp',
      '/home/stat2.webp',
      '/home/stat3.webp',
      "/home/9.webp",
    ];

    images.forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  return null;
};

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

  const [sect3Ref, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.8,
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
    threshold: screenWidth > 400 ? 0.7 : 0,
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
    x: inView6 ? 0 : screenWidth > 800 ? -100 : 0,
    opacity: inView6 ? 1 : 0,
  };

  const sideAnimation = {
    x: inView4 ? 0 : -100,
    opacity: inView4 ? 1 : 0,
  };

  const screenVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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
    '/home/design1.webp',
    '/home/design2.webp',
    '/home/design3.webp',
    '/home/design4.webp',
    '/home/design5.webp',
  ];

  const colors = [
    ["#0057FF", "#7FC9FF"],
    ["#FF6000", "#FFD93D"],
    ["#E74646", "#E11299"],
    ["#001253", "#a1c2ff"],
    ["#89375F", "#CE5959"],
  ];

  const [IsFlipping, setIsFlipping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [designHeadingSetup, setDesignHeadingSetup] = useState(68)

  useEffect(() => {
    if (screenWidth > 900) {
      setDesignHeadingSetup(68)
    } else {
      setDesignHeadingSetup(54)
    }
  }, [screenWidth])

  const [designAutoOpacity, setDesignAutoOpacity] = useState(1);
  const [designHeadingWidth, setDesignHeadingWidth] = useState(designHeadingSetup);

  const designColorSet = {
    backgroundImage: `linear-gradient(
            to bottom,
            ${colors[currentIndex][0]},
            ${colors[currentIndex][1]}
            )`
  }

  let brush1 = { backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, ${colors[currentIndex][0]} 80%)` }
  let brush2 = { backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, ${colors[currentIndex][1]} 80%)` }
  let cursorColor = { backgroundImage: `linear-gradient(to right, white, ${colors[currentIndex][1]})` }

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
        setDesignHeadingWidth(designHeadingSetup);
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
      "image": "/home/slide1.webp",
    },
    {
      "image": "/home/slide2.webp",
    },
    {
      "image": "/home/slide3.webp",
    },
    {
      "image": "/home/slide4.webp",
    }
  ]

  const scrollToSection = (id) => {
    const ref = document.getElementById(id);
    ref.scrollIntoView({ behavior: 'smooth' });
  };

  const signupInputs = screenWidth > 750 ? "text-full" : "text-small"

  return <Fragment>
    <Head>
      <title>Home - MyMart</title>
      <link rel="icon" type="image/jpeg" href="/light.png" />
    </Head>

    {typeof window !== 'undefined' && <ImagePreloader></ImagePreloader>}

    <header className={`home-navbar ${isNavbarVisible ? 'nav-visible' : 'nav-hidden'}`}>
      <img src="/light-2.png" className="home-nav-logo" onClick={() => scrollToSection('section-1')}></img>
      <a onClick={() => scrollToSection('section-2')} className="header-home-text">Features</a>
      {screenWidth > 350 && <a onClick={() => scrollToSection('section-6')} className="header-home-text">Statistics</a>}
      <a onClick={() => scrollToSection('section-9')} className="header-home-text">Pricing</a>
      <a onClick={() => scrollToSection('section-10')} className="header-home-text">Sign-Up</a>
    </header>

    {scrollState > 0 && <section className="section-2-main" style={{ position: scrollState > 0 ? "fixed" : "absolute" }}>
      <motion.header className="sect-1-text landing-headline" style={{ margin: "1rem", fontWeight: "700" }}>Manage Your Mart with Ease</motion.header>
      <div className="sect-2-container">
        <div className="sect-2-col1">
          <div className={`${(scrollState === 1 || scrollState === 0) ? "sect-2-info active-sect-2" : "sect-2-info"}`}>
            <header className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-b word-glue">Create Categories</span></header>

            {screenWidth <= 450 && <motion.figure style={{ overflow: "hidden", position: "relative", height: `${scrollState === 1 ? "auto" : "0px"}`, width: "auto", margin: "auto" }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone1-piece.webp"></motion.img>
              <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.webp"></img>
            </motion.figure>}

            <div className="flex-row flex-row-align">
              <h3 className="paragraph-text" style={{ height: `${scrollState === 1 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 1s" }}>Be able to create any number of categories with the relevant details such as an image and description. You may disable categories too so that users can&apos;t access the page.</h3>
              {(screenWidth <= 700 && screenWidth > 450) && <motion.figure style={{ position: "relative", overflow: "hidden", width: `${screenWidth <= 500 ? "300vw" : screenWidth <= 600 ? "200vw" : "140vw"}`, height: `${scrollState === 1 ? "auto" : "0px"}` }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone1-piece.webp"></motion.img>
                <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.webp"></img>
              </motion.figure>}
            </div>
          </div>
          <div className={`${scrollState === 2 ? "sect-2-info active-sect-2" : "sect-2-info"}`}>
            <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-c word-glue">Create Products</span></h1>
            {screenWidth <= 450 && <motion.figure style={{ overflow: "hidden", position: "relative", height: `${scrollState === 2 ? "auto" : "0px"}`, width: "auto", margin: "auto" }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone2-piece.webp"></motion.img>
              <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone2.webp"></img>
            </motion.figure>}
            <div className="flex-row flex-row-align">
              <h3 className="paragraph-text" style={{ height: `${scrollState === 2 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 1s" }}>You may populate categories with any number of products. The products can be set with data such as their price, stock, and profits. The set data will be collected as users order to create statistics</h3>
              {(screenWidth <= 700 && screenWidth > 450) && <motion.figure style={{ position: "relative", overflow: "hidden", width: `${screenWidth <= 500 ? "340vw" : screenWidth <= 600 ? "220vw" : "160vw"}`, height: `${scrollState === 2 ? "auto" : "0px"}` }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone2-piece.webp"></motion.img>
                <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone2.webp"></img>
              </motion.figure>}
            </div>
          </div>
          <div className={`${scrollState === 3 ? "sect-2-info active-sect-2" : "sect-2-info"}`}>
            <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-d word-glue">Manage Prices and Stocks</span></h1>
            {screenWidth <= 450 && <motion.figure style={{ overflow: "hidden", position: "relative", height: `${scrollState === 3 ? "auto" : "0px"}`, width: "auto", margin: "auto" }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)", height: "80%" }} src="/home/phone3-piece.webp"></motion.img>
              <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone3.webp"></img>
            </motion.figure>}
            <div className="flex-row flex-row-align">
              <h3 className="paragraph-text" style={{ height: `${scrollState === 3 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 1s" }}>The names, images, prices. and stocks can be changed at anytime past their initialization and will update as users refresh the page. Products with no stock will be marked as sold out. You may disable products too so that users can&apos;t access them.</h3>
              {(screenWidth <= 700 && screenWidth > 450) && <motion.figure style={{ position: "relative", overflow: "hidden", width: `${screenWidth <= 500 ? "400vw" : screenWidth <= 600 ? "270vw" : "200vw"}`, height: `${scrollState === 3 ? "auto" : "0px"}` }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)", height: "80%" }} src="/home/phone3-piece.webp"></motion.img>
                <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone3.webp"></img>
              </motion.figure>}
            </div>
          </div>
          <div className={`${scrollState === 4 ? "sect-2-info active-sect-2" : "sect-2-info"}`} style={{ marginBottom: "2rem" }}>
            <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Add Variations</span></h1>
            {screenWidth <= 450 && <motion.figure style={{ overflow: "hidden", position: "relative", height: `${scrollState === 4 ? "auto" : "0px"}`, width: "auto", margin: "auto" }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone4-piece.webp"></motion.img>
              <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone4.webp"></img>
            </motion.figure>}
            <div className="flex-row flex-row-align">
              <h3 className="paragraph-text" style={{ height: `${scrollState === 4 ? "auto" : "0px"}`, overflow: "hidden", transition: "all 1s" }}>After product initialization, variations can be added with the same types of details. Each new variation will have their own statistics so that they can be compared with each other.</h3>
              {(screenWidth <= 700 && screenWidth > 450) && <motion.figure style={{ position: "relative", overflow: "hidden", width: `${screenWidth <= 500 ? "260vw" : screenWidth <= 600 ? "180vw" : "140vw"}`, height: `${scrollState === 4 ? "auto" : "0px"}` }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone4-piece.webp"></motion.img>
                <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone4.webp"></img>
              </motion.figure>}
            </div>
          </div>
        </div>
        {screenWidth > 700 && <div className="sect-2-col2">
          {scrollState === 1 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
            <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone1-piece.webp"></motion.img>
            <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.webp"></img>
          </motion.figure>}
          {scrollState === 2 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
            <motion.img className="sect-2-piece" style={{ height: `${screenWidth > 1500 ? "45rem" : screenWidth > 950 ? "36rem" : screenWidth > 850 ? "27rem" : "23rem"}`, top: "50%", transform: `translateY(-50%) ${screenWidth > 1500 ? "translateX(-15%)" : screenWidth > 950 ? "translateX(0%)" : "translateX(15%)"}` }} src="/home/phone2-piece.webp"></motion.img>
            <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone2.webp"></img>
          </motion.figure>}
          {scrollState === 3 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
            <motion.img className="sect-2-piece" style={{ height: "90%" }} src="/home/phone3-piece.webp"></motion.img>
            <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone3.webp"></img>
          </motion.figure>}
          {scrollState === 4 && <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
            <motion.img className="sect-2-piece" style={{ height: `${screenWidth > 1500 ? "40rem" : screenWidth > 950 ? "32rem" : screenWidth > 850 ? "26rem" : "24rem"}`, top: "50%", transform: `translateY(-50%) ${screenWidth > 1500 ? "translateX(-15%)" : screenWidth > 950 ? "translateX(0%)" : "translateX(15%)"}` }} src="/home/phone4-piece.webp"></motion.img>
            <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone4.webp"></img>
          </motion.figure>}
        </div>}
      </div>
    </section>}

    <section className="section-1" id="section-1">
      <div className="section-1-col">
        <motion.h3 ref={sect1Ref} className="adj-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>INTUITIVE. DATA-DRIVEN. CUSTOMIZABLE.</motion.h3>
        <motion.header ref={sect1Ref} className="sect-1-text landing-headline" style={{ fontWeight: "700" }} initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>Instantly Create an <span className="word-glue">E-Commerce</span> Site for Your Business</motion.header>
        <motion.h1 ref={sect1Ref} className="sect-1-text-2" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}>With <span className="gradient-orange">No Coding</span> or <span className="gradient-purple word-glue">Design Experience</span></motion.h1>
        {screenWidth <= 600 && <motion.figure className="section-1-col2"
          initial={{ scale: 0, opacity: 0 }}
          animate={growAnimation}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="sect-1-imageset">
            <img src="/home/1.webp" className="hero-laptop" style={{ zIndex: "2", height: `${screenWidth > 1100 ? "40rem" : screenWidth > 750 ? "32rem" : screenWidth > 350 ? "25.6rem" : "20.38rem"}` }}></img>
            <motion.img src="/home/2.webp" style={{ zIndex: "3", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : screenWidth > 350 ? "9.6rem" : "7.68rem"}`, bottom: "0", left: "0", transform: "translateX(-25%)", marginBottom: "1rem" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}></motion.img>
            <motion.img src="/home/3.webp" style={{ zIndex: "3", position: "absolute", height: `${screenWidth > 1100 ? "10rem" : screenWidth > 750 ? "8rem" : screenWidth > 350 ? "6.4rem" : "5.12rem"}`, bottom: "5%", right: "0", transform: "translateX(25%)", marginBottom: "1rem" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}></motion.img>
            <motion.img src="/home/4.webp" style={{ zIndex: "1", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : screenWidth > 350 ? "9.6rem" : "7.68rem"}`, left: "0", top: "30%", margin: "1rem" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}></motion.img>
            <div style={{ position: "absolute" }}>
              <motion.img src="/home/5.webp" style={{ zIndex: "3", position: "absolute", height: `${screenWidth > 1100 ? "3rem" : screenWidth > 750 ? "2.4rem" : screenWidth > 350 ? "1.92rem" : "1.46rem"}`, top: "0", left: "0" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}></motion.img>
              <motion.img src="/home/6.webp" style={{ zIndex: "1", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : screenWidth > 350 ? "9.6rem" : "7.68rem"}`, top: "0", left: "30px", transform: "translateY(-50px)" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}></motion.img>
            </div>
            <motion.img src="/home/7.webp" style={{ zIndex: "1", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : screenWidth > 350 ? "9.6rem" : "7.68rem"}`, top: "40%", right: "-10%" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}></motion.img>
            <motion.img src="/home/8.webp" style={{ zIndex: "0", position: "absolute", height: `${screenWidth > 1100 ? "23rem" : screenWidth > 750 ? "18.4rem" : screenWidth > 350 ? "14.72rem" : "11.78rem"}`, top: "-10%", right: "10%" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}></motion.img>
          </div>
        </motion.figure>}
        <motion.h3 ref={sect1Ref} style={{ marginBottom: "3rem", marginRight: "5rem" }} className="paragraph-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize designs and colors. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></motion.h3>
        <motion.button onClick={() => scrollToSection('section-10')} ref={sect1Ref} className="cta-1" initial={{ y: "20px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.5, delay: 0.8 }}>GET STARTED<div className="icon-next">&nbsp;</div></motion.button>
      </div>

      {screenWidth > 600 && <motion.figure className="section-1-col2"
        initial={{ scale: 0, opacity: 0 }}
        animate={growAnimation}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="sect-1-imageset">
          <img src="/home/1.webp" className="hero-laptop" style={{ zIndex: "2", height: `${screenWidth > 1100 ? "40rem" : screenWidth > 750 ? "32rem" : "25.6rem"}` }}></img>
          <motion.img src="/home/2.webp" style={{ zIndex: "3", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : "9.6rem"}`, bottom: "0", left: "0", transform: "translateX(-25%)", marginBottom: "1rem" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}></motion.img>
          <motion.img src="/home/3.webp" style={{ zIndex: "3", position: "absolute", height: `${screenWidth > 1100 ? "10rem" : screenWidth > 750 ? "8rem" : "6.4rem"}`, bottom: "5%", right: "0", transform: "translateX(25%)", marginBottom: "1rem" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}></motion.img>
          <motion.img src="/home/4.webp" style={{ zIndex: "1", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : "9.6rem"}`, left: "0", top: "30%", margin: "1rem" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}></motion.img>
          <div style={{ position: "absolute" }}>
            <motion.img src="/home/5.webp" style={{ zIndex: "3", position: "absolute", height: `${screenWidth > 1100 ? "3rem" : screenWidth > 750 ? "2.4rem" : "1.92rem"}`, top: "0", left: "0" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}></motion.img>
            <motion.img src="/home/6.webp" style={{ zIndex: "1", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : "9.6rem"}`, top: "0", left: "30px", transform: "translateY(-50px)" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}></motion.img>
          </div>
          <motion.img src="/home/7.webp" style={{ zIndex: "1", position: "absolute", height: `${screenWidth > 1100 ? "15rem" : screenWidth > 750 ? "12rem" : "9.6rem"}`, top: "40%", right: "-10%" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}></motion.img>
          <motion.img src="/home/8.webp" style={{ zIndex: "0", position: "absolute", height: `${screenWidth > 1100 ? "23rem" : screenWidth > 750 ? "18.4rem" : "14.72rem"}`, top: "-10%", right: "10%" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}></motion.img>
        </div>
      </motion.figure>}
    </section>

    <section className="section-2-bg" ref={section2Ref} id="section-2">
      <div className="section-2-main" style={{ position: "relative", zIndex: "0", height: "120vh" }} ref={redPieceRef}>
        <motion.header className="sect-1-text landing-headline" style={{ margin: "1rem", fontWeight: "700" }}>Manage Your Mart with Ease</motion.header>

        <div className="sect-2-container">
          <div className="sect-2-col1">
            <div className="sect-2-info active-sect-2">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-b word-glue">Create Categories</span></h1>
              {screenWidth <= 450 && <motion.figure style={{ overflow: "hidden", position: "relative", height: "auto", width: "auto", margin: "auto" }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone1-piece.webp"></motion.img>
                <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.webp"></img>
              </motion.figure>}

              <div className="flex-row flex-row-align">
                <h3 className="paragraph-text" style={{ height: "auto", overflow: "hidden", transition: "all 1s" }}>Be able to create any number of categories with the relevant details such as an image and description. You may disable categories too so that users can&apos;t access the page.</h3>
                {(screenWidth <= 700 && screenWidth > 450) && <motion.figure style={{ position: "relative", overflow: "hidden", width: `${screenWidth <= 500 ? "300vw" : screenWidth <= 600 ? "200vw" : "140vw"}`, height: "auto" }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                  <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone1-piece.webp"></motion.img>
                  <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.webp"></img>
                </motion.figure>}
              </div>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-c word-glue">Create Products</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 20 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop&apos;s design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-d word-glue">Manage Prices and Stocks</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 30 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop&apos;s design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info" style={{ marginBottom: "2rem" }}>
              <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Add Variations</span></h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 40 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop&apos;s design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
          </div>
          {screenWidth > 700 && <div className="sect-2-col2">
            <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone1-piece.webp"></motion.img>
              <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone1.webp"></img>
            </motion.figure>
          </div>}
        </div>
      </div>
      <div className="section-2-piece" ref={yellowPieceRef}></div>
      <div className="section-2-piece" ref={cyanPieceRef}></div>
      <div className="section-2-main" style={{ position: "relative", zIndex: "0", height: "140vh" }} ref={pinkPieceRef}>
        <motion.header className="sect-1-text landing-headline" style={{ margin: "1rem", fontWeight: "700" }}>Manage Your Mart with Ease</motion.header>
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

            <div className={"sect-2-info active-sect-2"} style={{ marginBottom: "2rem" }}>
              <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Add Variations</span></h1>
              {screenWidth <= 450 && <motion.figure style={{ overflow: "hidden", position: "relative", height: `auto`, width: "auto", margin: "auto" }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone4-piece.webp"></motion.img>
                <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone4.webp"></img>
              </motion.figure>}
              <div className="flex-row flex-row-align">
                <h3 className="paragraph-text" style={{ height: `auto`, overflow: "hidden", transition: "all 1s" }}>After product initialization, variations can be added with the same types of details. Each new variation will have their own statistics so that they can be compared with each other.</h3>
                {(screenWidth <= 700 && screenWidth > 450) && <motion.figure style={{ position: "relative", overflow: "hidden", width: `${screenWidth <= 500 ? "260vw" : screenWidth <= 600 ? "180vw" : "140vw"}`, height: `auto` }} variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
                  <motion.img className="sect-2-piece" style={{ top: "55%", transform: "translateY(-50%)" }} src="/home/phone4-piece.webp"></motion.img>
                  <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone4.webp"></img>
                </motion.figure>}
              </div>
            </div>
          </div>
          {screenWidth > 700 && <div className="sect-2-col2">
            <motion.figure variants={screenVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.img className="sect-2-piece" style={{ height: `${screenWidth > 1500 ? "40rem" : screenWidth > 950 ? "32rem" : screenWidth > 850 ? "26rem" : "24rem"}`, top: "50%", transform: `translateY(-50%) ${screenWidth > 1500 ? "translateX(-15%)" : screenWidth > 950 ? "translateX(0%)" : "translateX(15%)"}` }} src="/home/phone4-piece.webp"></motion.img>
              <img variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" src="/home/phone4.webp"></img>
            </motion.figure>
          </div>}
        </div>
      </div>
    </section>

    <section className="section-3">
      {screenWidth > 730 && <div className="design-auto" style={{ opacity: designAutoOpacity }}>
        <div className="design-brush-1"><div className="home-paintbrush" style={{ ...brush1 }}></div></div>
        <div className="design-brush-2"><div className="home-paintbrush-2" style={{ ...brush2 }}></div></div>
        <div className="design-heading-container" style={{ width: `${screenWidth > 730 ? designHeadingWidth + "rem" : "48rem"}` }}>
          <div className="design-heading" style={{ ...designColorSet }}>&nbsp;</div>
        </div>
      </div>}

      {screenWidth <= 730 && <div className="design-auto" style={{ opacity: designAutoOpacity }}>
        <div className="design-brush-1"><div className="home-paintbrush" style={{ backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, #0057FF 80%)` }}></div></div>
        <div className="design-brush-2"><div className="home-paintbrush-2" style={{ backgroundImage: `linear-gradient(-15deg, #A9885C 57%, silver 56%, silver 60%, white 64%, #FFD93D 80%)` }}></div></div>
        <div className="design-heading-container-2">
          <div className="design-heading-2" style={{ backgroundImage: `linear-gradient(to right, #001253, #7FC9FF, #E11299 , #FF6000)` }}>&nbsp;</div>
        </div>
      </div>}

      {screenWidth > 730 && <div className="flip-card" onClick={handleCard}>
        <div className="design-click">

        </div>
        <div className={`flip-card-inner ${IsFlipping ? 'flipping' : ''}`} style={{ transform: `rotateY(${currentIndex * 180}deg)` }}>
          <div className="flip-card-front">
            <div className="flip-cursor-container">
              <img src={designImages[currentIndex]} className="flip-card-img"></img>

              <motion.div className="logo-click" style={{ ...cursorColor, opacity: designAutoOpacity }}
                initial={{ opacity: 1, translateX: -25, translateY: -25, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, type: "spring", damping: 0 }}
              ></motion.div>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="flip-cursor-container">
              <img src={designImages[currentIndex]} className="flip-card-img"></img>

              <motion.div className="logo-click" style={{ ...cursorColor, opacity: designAutoOpacity }}
                initial={{ opacity: 1, translateX: -25, translateY: -25, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, type: "spring", damping: 0 }}
              ></motion.div>
            </div>
          </div>
        </div>
      </div>}

      {/* {screenWidth <= 730 && <motion.img src="/home/design-group.webp" className="design-set" ref={sect3Ref} initial={{ y: "-100px", opacity: 0 }} animate={{ y: inView3 ? 0 : "-100px", opacity: inView3 ? 1 : 0 }} transition={{ duration: 0.5, ease: "easeOut" }}></motion.img>} */}
      {screenWidth <= 730 && <motion.div  ref={sect3Ref} initial={{ y: "-100px", opacity: 0 }} animate={{ y: inView3 ? 0 : "-100px", opacity: inView3 ? 1 : 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>

        <div className="flex-row-spaceless" style={{width:"100%", justifyContent:"space-between", padding:"0 5%", margin:"3rem 0"}}>
        <img src="/home/design1.webp" style={{width:"100%"}}></img>
</div>
        <div className="flex-row-spaceless" style={{width:"100%", justifyContent:"space-between", padding:"0 5%"}}>
        <img src="/home/design4.webp" style={{width:"35%", objectFit:"cover"}}></img>
        <img src="/home/design5.webp" style={{width:"63%", objectFit:"cover"}}></img>
        </div>

        <div className="flex-row-spaceless" style={{width:"100%", justifyContent:"space-between", padding:"0 5%", margin:"3rem 0"}}>
        <img src="/home/design3.webp" style={{width:"48%", objectFit:"cover"}}></img>
        <img src="/home/design2.webp" style={{width:"48%", objectFit:"cover"}}></img>
        </div>

        {/* <img src="/home/design2.webp" style={{width:"60%", margin:"3rem auto", borderRadius:"15px"}}></img>
        <img src="/home/design3.webp" style={{width:"60%", margin:"3rem auto", borderRadius:"15px"}}></img>
        <img src="/home/design4.webp" style={{width:"60%", margin:"3rem auto", borderRadius:"15px"}}></img>
        <img src="/home/design5.webp" style={{width:"60%", margin:"3rem auto", borderRadius:"15px"}}></img> */}

      </motion.div>}

    </section>

    <section className="section-4" ref={sect4Ref}>
      {screenWidth <= 510 && <header style={{ fontWeight: "700", margin: "0 1rem", marginBottom: "2rem", textAlign: "center" }} className="sect-4-text landing-headline">Manage <span className="gradient-redviolet word-glue">at Home or On the Go</span></header>}

      <div className="flex-row-spaceless flex-row-align">
        <motion.figure className="section-4-img" initial={{ x: "-100px", opacity: 0 }} animate={sideAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>
          <div className="section-4-circle">
            <img src="/home/9.webp" className="sect-4-img"></img>
            {screenWidth > 0 && <video controls className="sect-4-gif" autoPlay loop muted playsInline>
              <source src="/home/vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>}

          </div>
        </motion.figure>

        {screenWidth > 450 && <div className="section-4-text">
          {screenWidth > 510 && <header style={{ fontWeight: "700" }} className="sect-4-text landing-headline">Manage <span className="gradient-redviolet word-glue">at Home or On the Go</span></header>}
          <motion.h3 className="paragraph-text" style={{ width: `${screenWidth > 850 ? "55rem" : "auto"}` }}>MyMart works on all devices, allowing you to be up to date with your mart&apos;s statistics, update your product catalogue, change prices and stocks, and manage at the office or on the way to work and so can your customers. Through  your shop&apos;s link, customers can view and make orders which you can then approve or refuse anytime, anywhere.</motion.h3>
        </div>}
      </div>
      {screenWidth <= 450 && <motion.h3 className="paragraph-text" style={{ width: `${screenWidth > 850 ? "55rem" : screenWidth > 450 ? "auto" : "80%"}`, marginTop: `${screenWidth > 450 ? "0" : "5rem"}` }}>MyMart works on all devices, allowing you to be up to date with your mart&apos;s statistics, update your product catalogue, change prices and stocks, and manage at the office or on the way to work and so can your customers. Through  your shop&apos;s link, customers can view and make orders which you can then approve or refuse anytime, anywhere.</motion.h3>}

    </section>

    <section className="section-5" ref={sect5Ref}>
      <article className="scrolling-image-container">
        <img src="/home/scroll1.webp" className="scrolling-image"></img>
        <div className="gradient-cover">
        </div>

        {screenWidth <= 550 && <div className="order-alt">
          <motion.header className="sect-5-text gradient-e landing-headline" style={{ margin: "1rem", fontWeight: "700", textAlign: "center" }}>Collect - <span className="gradient-g">Edit</span> - <span className="word-glue"><span className="gradient-f">Approve</span> / <span className="gradient-h">Refuse</span></span></motion.header>

          <div className="round-borderer round-borderer-extra" style={{ padding: "1rem", margin: "0 2rem" }}>
            <h3 className="paragraph-text" style={{ margin: "1rem", textAlign: "left", whiteSpace: "pre-wrap" }}>    Instantly receive orders upon customer checkout. From there you can see the list of their orders. You may even edit them which will alert the user. From there you can view the user&apos;s contact information and location to see if you can finish the order.</h3>
            <h3 className="paragraph-text" style={{ margin: "1rem", textAlign: "left", whiteSpace: "pre-wrap" }}>    Upon review, you may then choose to approve or refuse an order. When approved, you can set a date when a user can expect their products to arrive. You may even enable cancellations and set penalties.</h3>
          </div>

          <div className="order-alt-row" style={{ justifyContent: "space-between", width: "100%" }}>

            <div className="scrolling-image-container-sm-2 round-borderer">
              <img src="/home/scroll2.webp" className="scrolling-image-2"></img>
            </div>
          </div>
        </div>}

        {screenWidth > 550 && <summary className="scrolling-image-container-sm round-borderer">
          <img src="/home/scroll2.webp" className="scrolling-image-2"></img>
        </summary>
        }
      </article>

      {screenWidth > 550 && <div className="order-text">
        <motion.header className="sect-5-text gradient-e landing-headline" style={{ margin: "1rem", fontWeight: "700", textAlign: "center" }}>Collect - <span className="gradient-g">Edit</span> - <span className="word-glue"><span className="gradient-f">Approve</span> / <span className="gradient-h">Refuse</span></span></motion.header>
        <h3 className="paragraph-text" style={{ margin: "1rem 5rem", textAlign: "left", whiteSpace: "pre-wrap" }}>    Instantly receive orders upon customer checkout. From there you can see the list of their orders. You may even edit them which will alert the user. From there you can view the user&apos;s contact information and location to see if you can finish the order.</h3>
        <h3 className="paragraph-text" style={{ margin: "1rem 5rem", textAlign: "left", whiteSpace: "pre-wrap" }}>    Upon review, you may then choose to approve or refuse an order. When approved, you can set a date when a user can expect their products to arrive. You may even enable cancellations and set penalties.</h3>

        <img src="/home/10.webp" className="order-img" style={{height:"auto", width:"80%", marginTop:"2rem"}}></img>
      </div>}

    </section>

    <section className="section-6" id="section-6">
      <div className="svg-container" style={{transform: `${screenWidth > 1000 ? "translateY(0%) translateX(0%)" : "translateY(10%) translateX(-2%)"}`}}>
        {statWave}
      </div>
      <div className="section-6-2">
        <div className="svg-container-2" style={{transform: `${screenWidth > 1000 ? "translateY(0%)" : screenWidth > 800 ? "translateY(10%) translateX(-2%)" : screenWidth > 500 ? "translateY(28%) translateX(-2%)" : "translateY(37%) translateX(-2%)"}`}}>
          {statWave2}
        </div>
        <div className="stat-text">
          <header style={{ fontWeight: "700" }} className="sect-6-text gradient-orangered landing-headline">Work with Performance Statistics</header>
          <h3 className="paragraph-text" style={{ marginTop: "1rem" }}>Collect data on how your mart performs. Collect metrics on views and new users, compare categories and products by their profits and their sales, as well as viewing their ranks relative to a time period. Observe your mart&apos;s performance across the day as orders are finished!</h3>
        </div>

        <img src={`${screenWidth > 1000 ? "/home/stat1.webp" : screenWidth > 800 ? "/home/stat1-2.webp" : screenWidth > 400 ? "/home/stat1-3.webp" : "/home/stat1-4.webp"}`} className="stat-img"></img>
      </div>
    </section>

    <section className="section-7" ref={sect6Ref}>
      <motion.header style={{ marginTop: `${showUser ? "5%" : `${screenWidth > 1200 ? "20%" : screenWidth > 600 ? "30%" : screenWidth > 500 ? "40%" : "50%" }`}`, fontWeight: "700", textAlign:"center" }} className="sect-7-text gradient-green landing-headline" initial={{ x: `${screenWidth > 800 ? "-100px" : "0px"}`, opacity: 0 }} animate={leftAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>The Customer is (12 mins) Away</motion.header>

      <div style={{ height: "80%", opacity: `${showUser ? "1" : "0"}` }} className="user-data">
        <img src={`${screenWidth > 700 ? "/home/stat2.webp" : screenWidth > 500 ? "/home/stat2-1.webp" : "/home/stat2-2.webp"}`} className="user-stats"></img>
        <div className="user-stat-text">
          <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-c">Gain Data on Your Users</span></h1>
          <h3 className="paragraph-text" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>    Besides data on products and categories, you can collect statistics of your users. Collate user demographics such as age and gender together with lifetime statistics such as average profit and bought products. Users are ranked along with the companies they belong to allowing you to find your corporate clients.</h3>
          <h3 className="paragraph-text" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>    User locations and coordinates are included in account creation where you can find prime locations where your mart is most popular. Powered by Google Maps, the users&apos; locations can be found and an estimate of the travel duration to deliver products with precision.</h3>
        
          {screenWidth > 700 && <img src="/home/stat3.webp" className="user-stats-2"></img>}
        </div>
      </div>

    </section>

    <section className="section-8">
      <header style={{ fontWeight: "700", marginLeft: "3rem", marginBottom: "1rem" }} className="sect-6-text gradient-purple landing-headline">Even More Customizables</header>

      <BannerCarouselHome screenWidth={screenWidth} data={bannerData}></BannerCarouselHome>

      <div className="feature-cards" ref={sect8Ref}>
        <div className="feature-item feature-1" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "4vw" : "2vw"}` : "100vw"}` }}>
          <div className="feature-intuitive" >&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-orange">Simple & Intuitive</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>MyMart strives to allow you to create a simple and functional online store without needing to learn how to code or hire a designer. Simply input your shop details, choose colors, and populate your catalogue and your shop can fly!</h3>
        </div>

        {screenWidth > 400 && <div className="feature-item feature-2" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "28vw" : screenWidth > 900 ? "26vw" : "50vw"}` : "100vw"}` }}>
          <div className="feature-receipt">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-green">Straightforward Management</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>Manage prices, profits, products, and stocks to keep your data collection up to date. Cleanly keep track and finish orders with dynamically updating stocks and statistics.</h3>
        </div>}

      {screenWidth > 900 && <>
        <div className="feature-item feature-3" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "52vw" : "50vw"}` : "100vw"}` }}>
          <div className="feature-data-driven">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-purple">Data Driven</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>Be up to speed with the performance of your Mart in all fronts. From the performance of products and categories and creation of an image of who your users are through demographic data and bought products.</h3>
        </div>

        <div className="feature-item feature-4" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "76vw" : "74vw"}` : "100vw"}` }}>
          <div className="feature-familiar">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-orangered">Customer Familiarity</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>MyMart is built with customers in mind. The structure of each mart is similar to the standard e-commerce website. Helping users and admins to navigate with ease.</h3>
        </div>
        </>}

      </div>

      {(screenWidth <= 900 && screenWidth > 400) && <div className="feature-cards" style={{marginBottom:`${screenWidth > 400 ? "5rem" : "0rem"}`}}>
        <div className="feature-item feature-3" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "4vw" : "2vw"}` : "100vw"}` }}>
          <div className="feature-data-driven">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-purple">Data Driven</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>Be up to speed with the performance of your Mart in all fronts. From the performance of products and categories and creation of an image of who your users are through demographic data and bought products.</h3>
        </div>

        <div className="feature-item feature-4" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "28vw" : screenWidth > 900 ? "26vw" : "50vw"}` : "100vw"}` }}>
          <div className="feature-familiar">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-orangered">Customer Familiarity</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>MyMart is built with customers in mind. The structure of each mart is similar to the standard e-commerce website. Helping users and admins to navigate with ease.</h3>
        </div>

      </div>}

      {screenWidth <= 400 && <>
        <div className="feature-cards">
        <div className="feature-item feature-2" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "4vw" : "2vw"}` : "100vw"}` }}>
          <div className="feature-receipt">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-green">Straightforward Management</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>Manage prices, profits, products, and stocks to keep your data collection up to date. Cleanly keep track and finish orders with dynamically updating stocks and statistics.</h3>
        </div>
      </div>

      <div className="feature-cards">
      <div className="feature-item feature-3" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "4vw" : "2vw"}` : "100vw"}` }}>
          <div className="feature-data-driven">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-purple">Data Driven</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>Be up to speed with the performance of your Mart in all fronts. From the performance of products and categories and creation of an image of who your users are through demographic data and bought products.</h3>
        </div>
      </div>

      <div className="feature-cards" style={{marginBottom: "5rem"}}>
      <div className="feature-item feature-4" style={{ marginLeft: `${inView8 ? `${screenWidth > 1400 ? "4vw" : "2vw"}` : "100vw"}` }}>
          <div className="feature-familiar">&nbsp;</div>
          <h1 className="feature-heading" style={{ marginLeft: "1rem" }}><span className="gradient-orangered">Customer Familiarity</span></h1>
          <h3 className="feature-description" style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>MyMart is built with customers in mind. The structure of each mart is similar to the standard e-commerce website. Helping users and admins to navigate with ease.</h3>
        </div>
      </div>
      </>}

      <header style={{ fontWeight: "700" }} className="sect-8-text gradient-orangered landing-headline">Customer Testimonies</header>

      <div className="testimony-container">
        <Testimony screenWidth={screenWidth}></Testimony>
      </div>
    </section>

    <section className="section-9" id="section-9">
      <motion.header className="sect-1-text landing-headline price-heading" style={{ transform: "scale(1.5)", fontWeight: "700" }}>Pricing</motion.header>

      <div className="prices">
        <div className="price-card">
          <h1 className="price-text-name">Basic Plan</h1>
          <h2 className="price-text-main">FREE</h2>
          <h3 className="price-text-info">No Statistics</h3>
          <h3 className="price-text-info">Default Colors Only</h3>
          <h3 className="price-text-info" style={{ borderBottom: "0px solid white" }}>No Pop-ups & Promos</h3>
        </div>

        <div className="price-card-2">
          <h1 className="price-text-name" style={{ color: "#0a2647" }}>Pro Plan</h1>
          <h2 className="price-text-main"><sup style={{ fontSize: "3rem" }}>$</sup>4.99</h2>
          <h3 className="price-text-info-2">Full Package</h3>
          <h3 className="price-text-info-2">Mart Statistics</h3>
          <h3 className="price-text-info-2">Full Color Customization</h3>
          <h3 className="price-text-info-2" style={{ borderBottom: "0px solid white" }}>Includes Popups & Promos</h3>
        </div>
      </div>
    </section>

    <section className="section-10" id="section-10">
      <div className="signup-box">
        <div className="signup-input">
          <motion.header className="sect-10-text" style={{ margin: "1rem", fontWeight: "700" }}>YOUR DREAM MART AWAITS&nbsp;&nbsp;&nbsp;</motion.header>

          <div className="flex-row" style={{ width: `${screenWidth > 330 ? "82%" : "100%"}` }}>
            <div className="form-group">
              <input type="text" placeholder="First Name" className={signupInputs} style={{ width: "100%" }}></input>
              <label style={{color:"white"}} className="form-label">First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Last Name" className={signupInputs} style={{ width: "100%" }}></input>
              <label style={{color:"white"}} className="form-label">Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            </div>
          </div>

          <div className="form-group">
            <input type="text" placeholder="Mart Name" className={signupInputs} style={{ width: `${screenWidth > 330 ? "82%" : "100%"}` }}></input>
            <label style={{color:"white"}} className="form-label">Mart Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          </div>

          <div className="form-group">
            <input type="text" placeholder="Email" className={signupInputs} style={{ width: `${screenWidth > 330 ? "82%" : "100%"}` }}></input>
            <label style={{color:"white"}} className="form-label">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          </div>
          <Link href="/create" className="cta-2">{screenWidth > 600 ? "CONTINUE CREATION" : "CONTINUE"}<div className="icon-next">&nbsp;</div></Link>

        </div>
      </div>
    </section>


    <footer className="footer-home">
      <div className="footer-icon-box">
        <img className="footer-icon" src="/light-2.png" alt="Footer Logo"></img>
      </div>

      <div className="footer-details-row">
        <div className="footer-details-1">
          <h3 className="paragraph-text" style={{ fontWeight: "900" }}>Github</h3>
          <h3 className="paragraph-text" style={{ fontWeight: "900" }}>Personal Site</h3>

          {screenWidth > 330 && <>
          <h3 className="paragraph-text" style={{ fontWeight: "900" }}>LinkedIn</h3>
          <h3 className="paragraph-text" style={{ fontWeight: "900" }}>Admin Sites</h3>
          </>}
        </div>

        {screenWidth <= 330 && <div className="footer-details-1">
          <h3 className="paragraph-text" style={{ fontWeight: "900" }}>LinkedIn</h3>
          <h3 className="paragraph-text" style={{ fontWeight: "900" }}>Admin Sites</h3>
        </div>}

        <div className="footer-details-2">
          <h3 className="paragraph-text" style={{ margin: `${screenWidth > 1400 ? "0 4rem" : "0 0rem"}`, textAlign:"justify" }}>Built by JM Miranda for my online portfolio. To access the 3 sample websites, click on the shop name links found in the testimonials or go back to <span style={{ fontWeight: "900" }}>My Personal Site</span>. Contact me at <span style={{ fontWeight: "900" }}>jeymson9000@gmail.com</span>. Thank you for stopping by!</h3>
        </div>
      </div>
    </footer>

  </Fragment>
}

export default HomePage



