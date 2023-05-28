import { Fragment, useState, useEffect } from "react";
import { getServerSideProps } from "../categories";
import Head from "next/head";
import 'glider-js/glider.min.css';

function About({ shopID }) {
    const startingInfo = shopID.shopData.shopDetails.aboutData
    const favicon = shopID.shopData.shopDetails.imageData.icons.icon

    // 1920  1366 360
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

    const [screenWidth, setScreenWidth] = useState(0);
    const [screenScale, setScreenScale] = useState(1)

    useEffect(() => {
        const handleResize = () => {
            const newScreenWidth = window.innerWidth;
            const newScale = (newScreenWidth / screenPx).toFixed(2);
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
    }, []);


    const textElements = TextArray.map((item, index) => (
        <h3
            key={index}
            className={item.type}
            style={{
                gridRow: `${item.row1}/${item.row2}`,
                gridColumn: `${item.col1}/${item.col2}`,
                textAlign: item.align,
                zIndex: item.zInd,
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
                maxHeight: "100%",
                maxWidth: "100%",
                margin: "auto auto",
                transform: `scale(${item.scale})`,
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

    const gridClass = `${device === "desktop" ? "about-grid-1" : device === "tablet" ? "about-grid-2" : "about-grid-3"}`;

    const [modal, showModal] = useState(false)
    function handleModal() {
        showModal(!modal)
    }
    return <Fragment>
        <Head>
            <title>Create About Page</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
        </Head>


        <h1>{screenWidth}</h1>
        <h1>{screenScale}</h1>

        <section className={gridClass}>

            {textElements}
            {imgElements}
            {containerElements}


        </section>
    </Fragment>
}

export default About
export { getServerSideProps }