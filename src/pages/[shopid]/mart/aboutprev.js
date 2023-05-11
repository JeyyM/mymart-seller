import { Fragment, useState, useEffect } from "react";
import { getServerSideProps } from "../categories";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

function AboutPrev({ shopID }) {
    const startingInfo = shopID.shopData.shopDetails.aboutData

    const desktopTextArray = startingInfo.text.desktop
    const desktopImgArray = startingInfo.img.desktop
    const desktopContainerArray = startingInfo.container.desktop
    
    const tabletTextArray = startingInfo.text.tablet
    const tabletImgArray = startingInfo.img.tablet
    const tabletContainerArray = startingInfo.container.tablet
  
    const phoneTextArray = startingInfo.text.phone
    const phoneImgArray = startingInfo.img.phone
    const phoneContainerArray = startingInfo.container.phone

    const [device, setDevice] = useState("tablet")
    const [screenPx, setScreenPx] = useState(1920)

    const [rowCount, setRowCount] = useState(20)
    const [colLimit, setColLimit] = useState(12)

    const prevBase = `${device === "desktop" ? "div-preview-1" : device === "tablet" ? "div-preview-2" : "div-preview-3"}`;
    const prevClasses = `${prevBase}`;


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
            transform: `scale(${item.scale})`
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

      const prevDivs = Array.from({ length: (rowCount * colLimit) }, (_, index) => (
        <div key={index}
          className={prevClasses}
          style={{
            gridColumn: `${index % colLimit + 1}/${index % colLimit + 2}`,
            gridRow: `${Math.floor(index / colLimit) + 1}/${Math.floor(index / colLimit) + 2}`
          }}></div>
      ));

    return <Fragment>
        <section className="about-grid-2">

            <>{prevDivs}</>

            {textElements}
            {imgElements}
            {containerElements}

        </section>
    </Fragment>
}

export default AboutPrev
export { getServerSideProps }