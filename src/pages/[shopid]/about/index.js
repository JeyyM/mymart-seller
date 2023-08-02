import { Fragment, useState, useEffect } from "react";
import { getServerSideProps } from "../categories";
import Head from "next/head";

function About({ shopID }) {
    const startingInfo = shopID.shopData.shopDetails.aboutData
    const favicon = shopID.shopData.shopDetails.imageData.icons.icon

    const [device, setDevice] = useState("desktop")
    const [screenPx, setScreenPx] = useState(1920)

    const desktopTextArray = startingInfo.text.desktop
    const desktopImgArray = startingInfo.img.desktop
    const desktopContainerArray = startingInfo.container.desktop

    const tabletTextArray = startingInfo.text.tablet
    const tabletImgArray = startingInfo.img.tablet
    const tabletContainerArray = startingInfo.container.tablet

    const phoneTextArray = startingInfo.text.phone
    const phoneImgArray = startingInfo.img.phone
    const phoneContainerArray = startingInfo.container.phone

    const [AllTexts, setAllTexts] = useState({
        desktop: desktopTextArray,
        tablet: tabletTextArray,
        phone: phoneTextArray
    })

    const [AllImg, setAllImg] = useState({
        desktop: desktopImgArray,
        tablet: tabletImgArray,
        phone: phoneImgArray
    })

    const [AllContainer, setAllContainer] = useState({
        desktop: desktopContainerArray,
        tablet: tabletContainerArray,
        phone: phoneContainerArray
    })


    const [TextArray, setTextArray] = useState(AllTexts[device]);
    const [ImgArray, setImgArray] = useState(AllImg[device]);
    const [ContainerArray, setContainerArray] = useState(AllContainer[device]);

    async function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    const [screenWidth, setScreenWidth] = useState(0);
    const [screenScale, setScreenScale] = useState(1)

    useEffect(() => {
        const handleResize = () => {
            let newScreenWidth = window.innerWidth;
            let newScale = (newScreenWidth / screenPx).toFixed(2);
            setScreenWidth(newScreenWidth);
            setScreenScale(newScale);
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
    }, [screenPx, device]);

    const textElements = TextArray.map((item, index) => (
        <h3
            key={index}
            className={item.type}
            style={{
        gridRow: `${item.row1}/${item.row2}`,
        gridColumn: `${item.col1}/${item.col2}`,
        maxHeight:"15rem",
        textAlign: item.align,
        zIndex: item.zInd,
        display:"inline",
        margin: "0",
        alignSelf: "center",
        transform: `scale(${item.scale * screenScale})`
      }}
            dangerouslySetInnerHTML={{ __html: item.content }}
        >
        </h3>
    ));

    const imgElements = ImgArray.map((item, index) => (
        <img
            src={item.img}
            key={index}
            className={item.border}
            style={{
        gridRow: `${item.row1}/${item.row2}`,
        gridColumn: `${item.col1}/${item.col2}`,
        zIndex: item.zInd,
        height: "100%",
        width: "100%",
        margin: "auto auto",
        transform: `scale(${item.scale})`,
        objectFit:"cover",
        borderRadius: `${item.tl}px ${item.tr}px ${item.br}px ${item.bl}px`,
        opacity: item.opacity,
      }}
        >
        </img>
    ));

    const containerElements = ContainerArray.map((item, index) => (
        <div
            key={index}
            className={item.border}
            style={{
        gridRow: `${item.row1}/${item.row2}`,
        gridColumn: `${item.col1}/${item.col2}`,
        zIndex: item.zInd,
        height: "100%",
        width: "100%",
        margin: "auto auto",
        transform: `scale(${item.scale})`,
        backgroundColor: `${item.color}`,
        opacity: item.opacity,
        borderRadius: `${item.tl}px ${item.tr}px ${item.br}px ${item.bl}px`,
      }}
        >
            &nbsp;
        </div>
    ));

    useEffect(() => {
        setTextArray(AllTexts[device]);
        setImgArray(AllImg[device]);
        setContainerArray(AllContainer[device]);
    }, [device]);

    let gridClass = `${device === "desktop" ? "about-grid-1" : device === "tablet" ? "about-grid-2" : "about-grid-3"}`;

    useEffect(() => {

        if (screenWidth > 1366) {
            setDevice("desktop");
            setScreenPx(1920)
        } else if (screenWidth >= 560 && screenWidth <= 1366) {
            setDevice("tablet");
            setScreenPx(1200)
        } else if (screenWidth < 560) {
            setDevice("phone");
            setScreenPx(560)
        }

        gridClass = device === "desktop" ? "about-grid-1" : device === "tablet" ? "about-grid-2" : "about-grid-3";
        console.log(gridClass)
        console.log("screenpx", screenPx)

    }, [screenWidth, screenPx, device])

    return <Fragment>
        <Head>
            <title>About Us</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
        </Head>
{/* 
        <h1 className="heading-secondary" style={{textAlign:"center"}}>Item</h1>
        <h1 className="heading-tertiary" style={{textAlign:"center"}}>Item</h1>
        <h1 className="heading-primary" style={{textAlign:"center"}}>Item</h1> */}


        <section className={gridClass}>

            {textElements}
            {imgElements}
            {containerElements}


        </section>

    </Fragment>
}

export default About
export { getServerSideProps }