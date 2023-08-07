import { Fragment, useState, useEffect, useRef } from "react"
import HomepageButton from "../components/homepage/Homepage-Button"
import Head from "next/head"
import Link from "next/link"
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from "framer-motion";
import BannerCarouselHome from "@/components/home/BannerCarouselHome";

function HomePage() {

  const [screenWidth, setScreenWidth] = useState(0);

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

  const handleCard = () => {
    if (!IsFlipping) {
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


  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const containerHeight = scrollRef.current.scrollHeight;
      const maxScroll = containerHeight - window.innerHeight;
      setScrollPosition((prevPosition) => {
        const newPosition = (prevPosition + 1) % maxScroll;
        scrollRef.current.scrollTo(0, newPosition);
        return newPosition;
      });
    }
  };

  useEffect(() => {
    const scrollAnimation = () => {
      scrollToBottom();
      requestAnimationFrame(scrollAnimation);
    };
    const animationId = scrollAnimation();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

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

  return <Fragment>
    <Head>
      <title>Home - MyMart</title>
      <link rel="icon" type="image/jpeg" href="/light.png" />
    </Head>

    {scrollState > 0 && <div className="section-2-main" style={{ position: scrollState > 0 ? "fixed" : "absolute" }}>
      <motion.h1 className="sect-1-text gradient-a" style={{ margin: "1rem" }}>Manage Your Mart with Ease</motion.h1>
      <div className="sect-2-container">
        <div className="sect-2-col1">
          <div className="sect-2-info active-sect-2">
            <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 1 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
          </div>
          <div className="sect-2-info">
            <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 2 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
          </div>
          <div className="sect-2-info">
            <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 3 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
          </div>
          <div className="sect-2-info" style={{ marginBottom: "2rem" }}>
            <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
            <h3 className="paragraph-text" style={{ height: `${scrollState === 4 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
          </div>
        </div>
        <div className="sect-2-col2">
          {scrollState === 1 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{ backgroundColor: "purple" }}></motion.div>}
          {scrollState === 2 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{ backgroundColor: "orange" }}></motion.div>}
          {scrollState === 3 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{ backgroundColor: "gray" }}></motion.div>}
          {scrollState === 4 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{ backgroundColor: "blue" }}></motion.div>}
        </div>
      </div>
    </div>}

    <div className="section-1">
      <div className="section-1-col">
        <motion.h3 ref={sect1Ref} className="adj-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>INTUITIVE. DATA-DRIVEN. CUSTOMIZABLE.</motion.h3>
        <motion.h1 ref={sect1Ref} className="sect-1-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>Instantly Create an <span className="word-glue">E-Commerce</span> Site for Your Business</motion.h1>
        <motion.h1 ref={sect1Ref} className="sect-1-text-2" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}>With <span className="gradient-orange">No Coding</span> or <span className="gradient-purple word-glue">Design Experience</span></motion.h1>
        <motion.h3 ref={sect1Ref} style={{ marginBottom: "3rem" }} className="paragraph-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></motion.h3>
        <motion.button ref={sect1Ref} className="cta-1" initial={{ y: "20px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.5, delay: 0.8 }}>GET STARTED<div className="icon-next">&nbsp;</div></motion.button>
      </div>

      <motion.div className="section-1-col2"
        initial={{ scale: 0, opacity: 0 }}
        animate={growAnimation}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src="https://i.imgur.com/qlmYdJO.jpeg" className="sect-1-img"></img>
      </motion.div>
    </div>

    <div className="section-2-bg" ref={section2Ref}>
      <div className="section-2-main" style={{ position: "relative", zIndex: "0", height: "120vh" }} ref={redPieceRef}>
        <motion.h1 className="sect-1-text gradient-a" style={{ margin: "1rem" }}>Manage Your Mart with Ease</motion.h1>
        <div className="sect-2-container">
          <div className="sect-2-col1">
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: "10rem", overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 20 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 30 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info" style={{ marginBottom: "2rem" }}>
              <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 40 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
          </div>
          <div className="sect-2-col2">
            <motion.div variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" style={{ backgroundColor: "purple" }}></motion.div>
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
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 20 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 20 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info">
              <h1 className="sect-1-text-2" style={{ marginBottom: "2rem" }}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: `${scrollState === 30 ? "10rem" : "0px"}`, overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
            <div className="sect-2-info" style={{ marginBottom: "2rem" }}>
              <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
              <h3 className="paragraph-text" style={{ height: "10rem", overflow: "hidden", transition: "all 0.5s" }}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
            </div>
          </div>
          <div className="sect-2-col2">
            <motion.div variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" style={{ backgroundColor: "blue" }}></motion.div>
          </div>
        </div>
      </div>
    </div>

    <div className="section-3">
      <div className="design-auto" style={{ opacity: designAutoOpacity }}>
        <div className="design-brush-1" style={{ ...designColorSet }}></div>
        <div className="design-brush-2" style={{ ...designColorSet }} ></div>
        <div className="design-heading-container" style={{ width: `${designHeadingWidth}rem` }}>
          <div className="design-heading" style={{ ...designColorSet }}>&nbsp;</div>
        </div>
      </div>

      <div className="flip-card" onClick={handleCard}>
        <div className={`flip-card-inner ${IsFlipping ? 'flipping' : ''}`} style={{ transform: `rotateY(${currentIndex * 180}deg)` }}>
          <div className="flip-card-front">
            <img src={designImages[currentIndex]} className="flip-card-img" />
          </div>
          <div className="flip-card-back">
            <img src={designImages[currentIndex]} className="flip-card-img" />
          </div>
        </div>
      </div>

    </div>

    <div className="section-4" ref={sect4Ref}>
      <motion.div className="section-4-img" initial={{ x: "-100px", opacity: 0 }} animate={sideAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>
        <div className="section-4-circle">
          <img src="https://i.imgur.com/qlmYdJO.jpeg" className="sect-4-img"></img>
          <img src="https://media.tenor.com/x_IgoSdRecYAAAAC/walking-walking-duck.gif" className="sect-4-gif"></img>
        </div>
      </motion.div>

      <div className="section-4-text">
        <h1 className="sect-4-text">Manage <span className="gradient-redviolet word-glue">at Home or On the Go</span></h1>
        <motion.h3 className="paragraph-text" style={{ width: "55rem" }}>MyMart works on all devices, allowing you to be up to date with your mart's statistics, update your product catalogue, change prices and stocks, and manage at the office or on the way to work and so can your customers. Through  your shop's link, customers can view and make orders which you can then approve or refuse anytime, anywhere.</motion.h3>
      </div>
    </div>

    {/* <div className="section-5">
      <div className="orders-container" ref={scrollRef}>
        <img src="/scrolling-test.png" className="tall-image" />
      </div>

      <div className="sample-container">
        <div className="sample-orders"></div>
      </div>
    </div> */}

    <div className="section-6">
      <div className="svg-container">
        {statWave}
      </div>
      <div className="section-6-2">
        <div className="svg-container-2">
          {statWave2}
        </div>
      </div>
    </div>

    <div className="section-7" ref={sect6Ref}>
      <motion.h1 style={{ marginTop: `${showUser ? "5%" : "20%"}` }} className="sect-7-text" initial={{ x: "-100px", opacity: 0 }} animate={leftAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>Manage Your Mart with Ease</motion.h1>

      <div style={{ height: `${showUser ? "70%" : "0"}`, opacity: `${showUser ? "1" : "0"}` }} className="user-data">
        <h1>test</h1>
      </div>

    </div>

<div className="section-8">
<BannerCarouselHome screenWidth={screenWidth} data={bannerData}></BannerCarouselHome>

<div className="feature-cards" ref={sect8Ref}>
<div className="feature-item" style={{marginLeft:`${inView8 ? "4vw" : "100vw"}`}}><h1>1</h1></div>
<div className="feature-item" style={{marginLeft:`${inView8 ? "28vw" : "100vw"}`}}><h1>2</h1></div>
<div className="feature-item" style={{marginLeft:`${inView8 ? "52vw" : "100vw"}`}}><h1>3</h1></div>
<div className="feature-item" style={{marginLeft:`${inView8 ? "76vw" : "100vw"}`}}><h1>4</h1></div>
</div>

<div className="testimony">

</div>
</div>

<div className="section-9">
<motion.h1 className="sect-1-text gradient-a" style={{ margin: "1rem" }}>Manage Your Mart with Ease</motion.h1>

<div className="prices">
<div className="price-card">

</div>

<div className="price-card">
  
</div>
</div>
</div>

<div className="section-10">
    <div className="signup-box">

    </div>
</div>


<div className="footer-home">

</div>
  </Fragment>
}

export default HomePage



