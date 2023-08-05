    import { Fragment, useState, useEffect } from "react"
    import HomepageButton from "../components/homepage/Homepage-Button"
    import Head from "next/head"
    import Link from "next/link"
    import { useInView } from 'react-intersection-observer';
    import { motion } from "framer-motion";

    function HomePage() {
        const [sect1Ref, inView1] = useInView({
            triggerOnce: true,
            threshold: 0,
        });

        const [sect4Ref, inView4] = useInView({
            triggerOnce: true,
            threshold: 0.5,
        });

        const growAnimation = {
            scale: 1,
            opacity: 1,
        };

        const upAnimation = {
            y: inView1 ? 1 : 0,
            opacity: 1,
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
          const [sectionRef, inView] = useInView({ threshold: 0.2 });
          const [redPieceRef, redPieceInView] = useInView({ threshold: 0.8 });
          const [yellowPieceRef, yellowPieceInView] = useInView({ threshold: 0.8 });
          const [cyanPieceRef, cyanPieceInView] = useInView({ threshold: 0.8 });
          const [pinkPieceRef, pinkPieceInView] = useInView({ threshold: 0.7 });
        
          useEffect(() => {
            if (redPieceInView) {
              setScrollState(1);
            } else if (yellowPieceInView){
                setScrollState(2)
            } else if (cyanPieceInView){
                setScrollState(3)
            } else if (pinkPieceInView){
                setScrollState(4)
            } else {
                if (!inView)
                {setScrollState(0)}
            }
          }, [redPieceInView, yellowPieceInView, cyanPieceInView, pinkPieceInView, inView]);

        return <Fragment>
            <Head>
                <title>Home - MyMart</title>
                <link rel="icon" type="image/jpeg" href="/light.png" />
            </Head>

            {scrollState > 0 && <div className="section-2-main" style={{ position: scrollState > 0 ? "fixed" : "absolute" }}>
            <motion.h1 className="sect-1-text gradient-a" style={{margin:"1rem"}}>Manage Your Mart with Ease</motion.h1>
            <div className="sect-2-container">
                <div className="sect-2-col1">
                    <div className="sect-2-info active-sect-2">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 1 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 2 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 3 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info" style={{marginBottom:"2rem"}}>
                    <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 4 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                </div>
                <div className="sect-2-col2">
                    {scrollState === 1 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{backgroundColor:"purple"}}></motion.div>}
                    {scrollState === 2 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{backgroundColor:"orange"}}></motion.div>}
                    {scrollState === 3 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{backgroundColor:"gray"}}></motion.div>}
                    {scrollState === 4 && <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="hidden" className="sect-2-screen" style={{backgroundColor:"blue"}}></motion.div>}
                </div>
            </div>
            </div>}

            <div className="section-1">
                <div className="section-1-col">
                    <motion.h3 ref={sect1Ref} className="adj-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0}}>INTUITIVE. DATA-DRIVEN. CUSTOMIZABLE.</motion.h3>
                    <motion.h1 ref={sect1Ref} className="sect-1-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2}}>Instantly Create an <span className="word-glue">E-Commerce</span> Site for Your Business</motion.h1>
                    <motion.h1 ref={sect1Ref} className="sect-1-text-2" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4}}>With <span className="gradient-orange">No Coding</span> or <span className="gradient-purple word-glue">Design Experience</span></motion.h1>
                    <motion.h3 ref={sect1Ref} style={{marginBottom:"3rem"}} className="paragraph-text" initial={{ y: "100px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0.6}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></motion.h3>
                    <motion.button ref={sect1Ref} className="cta-1" initial={{ y: "20px", opacity: 0 }} animate={upAnimation} transition={{ duration: 0.5, delay: 0.8}}>GET STARTED<div className="icon-next">&nbsp;</div></motion.button>
                </div>

                <motion.div className="section-1-col2"
                    initial={{ scale: 0, opacity: 0 }} 
                    animate={growAnimation} 
                    transition={{ duration: 1, ease: "easeOut"}}
                >
                    <img src="https://i.imgur.com/qlmYdJO.jpeg" className="sect-1-img"></img>
                </motion.div>
            </div>

            <div className="section-2-bg" ref={sectionRef}>
            <div className="section-2-main" style={{ position: "relative", zIndex:"0", height:"120vh" }} ref={redPieceRef}>
            <motion.h1 className="sect-1-text gradient-a" style={{margin:"1rem"}}>Manage Your Mart with Ease</motion.h1>
            <div className="sect-2-container">
                <div className="sect-2-col1">
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:"10rem", overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 20 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 30 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info" style={{marginBottom:"2rem"}}>
                    <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 40 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                </div>
                <div className="sect-2-col2">
                    <motion.div variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" style={{backgroundColor:"purple"}}></motion.div>
                </div>
            </div>
            </div>
                    <div className="section-2-piece" ref={yellowPieceRef}></div>
        <div className="section-2-piece" ref={cyanPieceRef}></div>
        <div className="section-2-main" style={{ position: "relative", zIndex:"0", height:"140vh" }} ref={pinkPieceRef}>
            <motion.h1 className="sect-1-text gradient-a" style={{margin:"1rem"}}>Manage Your Mart with Ease</motion.h1>
            <div className="sect-2-container">
                <div className="sect-2-col1">
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 20 ? "10rem" : "0px"}`, overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 20 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info">
                    <h1 className="sect-1-text-2" style={{marginBottom:"2rem"}}><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:`${scrollState === 30 ? "10rem" : "0px"}` , overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                    <div className="sect-2-info" style={{marginBottom:"2rem"}}>
                    <h1 className="sect-1-text-2"><span className="gradient-purple word-glue">Design Experience</span> Data here</h1>
                    <h3 className="paragraph-text" style={{height:"10rem", overflow:"hidden", transition:"all 0.5s"}}>Manage products and stocks, collect statistics on category and product performance, learn more about your customers, keep track of all orders, and customize the shop's design. Easily <span className="gradient-red">Create Your Mart</span> <span className="gradient-orangered">Today!</span></h3>
                    </div>
                </div>
                <div className="sect-2-col2">
                    <motion.div variants={screenVariants} initial="hidden" animate="visible" className="sect-2-screen" style={{backgroundColor:"blue"}}></motion.div>
                </div>
            </div>
            </div>      
            </div>

            <div className="section-3">
                <div className="design-heading-container">
                <div className="design-heading">&nbsp;</div>
                </div>
                <div className="design-card"></div>
            </div>

            <div className="section-4" ref={sect4Ref}>
                <motion.div className="section-4-img" initial={{ x: "-100px", opacity: 0 }} animate={sideAnimation} transition={{ duration: 0.8, ease: "easeOut", delay: 0}}>
                <div className="section-4-circle">
                <img src="https://i.imgur.com/qlmYdJO.jpeg" className="sect-4-img"></img>
                <img src="https://media.tenor.com/x_IgoSdRecYAAAAC/walking-walking-duck.gif" className="sect-4-gif"></img>
                </div>
                </motion.div>

                <div className="section-4-text">
                <h1 className="sect-4-text">Manage <span className="gradient-redviolet word-glue">at Home or On the Go</span></h1>
                <motion.h3 className="paragraph-text" style={{width: "55rem"}}>MyMart works on all devices, allowing you to be up to date with your mart's statistics, update your product catalogue, change prices and stocks, and manage at the office or on the way to work and so can your customers. Through  your shop's link, customers can view and make orders which you can then approve or refuse anytime, anywhere.</motion.h3>

                </div>
            </div>




            <div className="section-1">

            </div>

        </Fragment>
    }

    export default HomePage



