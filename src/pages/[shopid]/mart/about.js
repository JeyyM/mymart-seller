import { Fragment, useState, useEffect } from "react";
import { getServerSideProps } from "../categories";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { GliderComponent } from 'react-glider';
import 'glider-js/glider.min.css';
import ModalCarousel from "../../../components/Modal/ModalCarousel";

function About({ shopID }) {
  const startingInfo = shopID.shopData.shopDetails.aboutData
  const rowInfo = shopID.shopData.shopDetails.aboutData.rows

  const router = useRouter()
  const slide = {
    hidden: {
      x: "-10rem",
      opacity: 0,
    },
    visible: {
      x: "0px",
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0.2,
      },
    },
    exit: {
      x: "-10rem",
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

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

  const [DeskRowCount, setDeskRowCount] = useState(rowInfo.desktop)
  const [TabRowCount, setTabRowCount] = useState(rowInfo.tablet)
  const [PhoneRowCount, setPhoneRowCount] = useState(rowInfo.phone)

  const [rowCount, setRowCount] = useState(DeskRowCount)

  const [AllRows, setAllRows] = useState({
    desktop: DeskRowCount,
    tablet: TabRowCount,
    phone: PhoneRowCount
  })

  const [colLimit, setColLimit] = useState(12)

  const [grid, setGrid] = useState(true)
  function handleGrid() { setGrid(!grid) }

  const [TextArray, setTextArray] = useState(AllTexts[device]);
  const [ImgArray, setImgArray] = useState(AllImg[device]);
  const [ContainerArray, setContainerArray] = useState(AllContainer[device]);

  function handleAddTextArray(link, type) {
    const newTextArray = [...TextArray, { type: "heading-primary", row1: "1", row2: "2", col1: "1", col2: "2", align: "center", zInd: "1", content: "Item", scale: "1" }];
    setTextArray(newTextArray);
  }

  function handleTextArrayTypeChange(index) {
    const newTextArray = [...TextArray];
    newTextArray[index].type = event.target.value;
    setTextArray(newTextArray)
  }

  function handleTextArrayR1Change(index) {
    const newTextArray = [...TextArray];
    newTextArray[index].row1 = event.target.value;
    setTextArray(newTextArray)
  }

  function handleTextArrayR2Change(index) {
    const newTextArray = [...TextArray];
    newTextArray[index].row2 = event.target.value;
    setTextArray(newTextArray)
  }

  function handleTextArrayC1Change(index) {
    const newTextArray = [...TextArray];
    newTextArray[index].col1 = event.target.value;
    setTextArray(newTextArray)
  }

  function handleTextArrayC2Change(index) {
    const newTextArray = [...TextArray];
    newTextArray[index].col2 = event.target.value;
    setTextArray(newTextArray)
  }

  function handleTextArrayAlignChange(index) {
    const newTextArray = [...TextArray];
    newTextArray[index].align = event.target.value;
    setTextArray(newTextArray)
  }

  function handleTextArrayZChange(index) {
    const newTextArray = [...TextArray];
    newTextArray[index].zInd = event.target.value;
    setTextArray(newTextArray)
  }

  function handleTextArrayContentChange(event, index) {
    const newTextArray = [...TextArray];
    newTextArray[index].content = event.target.value
      .replace(/ /g, "\u00A0")
      .replace(/\n/g, "<br>");
    setTextArray(newTextArray);
  }

  function handleTextArrayScaleChange(event, index) {
    const newTextArray = [...TextArray];
    newTextArray[index].scale = event.target.value
    setTextArray(newTextArray);
  }


  function handleAddImgArray() {
    const newImgArray = [...ImgArray, { img: "https://i.imgur.com/qlmYdJO.jpeg", row1: "1", row2: "2", col1: "1", col2: "2", zInd: "1", border: "", scale: "1" }];
    setImgArray(newImgArray);
  }

  function handleImgArrayImageChange(event, index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].img = event.target.value
    setImgArray(newImgArray);
  }

  function handleImgArrayR1Change(index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].row1 = event.target.value;
    setImgArray(newImgArray)
  }

  function handleImgArrayR2Change(index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].row2 = event.target.value;
    setImgArray(newImgArray)
  }

  function handleImgArrayC1Change(index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].col1 = event.target.value;
    setImgArray(newImgArray)
  }

  function handleImgArrayC2Change(index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].col2 = event.target.value;
    setImgArray(newImgArray)
  }

  function handleImgArrayZChange(index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].zInd = event.target.value;
    setImgArray(newImgArray)
  }

  function handleImgArrayBorderChange(index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].border = event.target.value;
    setImgArray(newImgArray)
  }

  function handleImgArrayScaleChange(event, index) {
    const newImgArray = [...ImgArray];
    newImgArray[index].scale = event.target.value
    setImgArray(newImgArray);
  }



  function handleAddContArray() {
    const newContArray = [...ContainerArray, { color: "#FF0000", border: "", scale: "1", zInd: "1", opacity: "1", row1: "1", row2: "2", col1: "1", col2: "2", tl: "0", tr: "0", bl: "0", br: "0" }];
    setContainerArray(newContArray);
  }

  function handleContArrayColorChange(event, index) {
    const newContArray = [...ContainerArray];
    newContArray[index].color = event.target.value
    setContainerArray(newContArray);
  }

  function handleContArrayR1Change(index) {
    const newContArray = [...ContainerArray];
    newContArray[index].row1 = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayR2Change(index) {
    const newContArray = [...ContainerArray];
    newContArray[index].row2 = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayC1Change(index) {
    const newContArray = [...ContainerArray];
    newContArray[index].col1 = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayC2Change(index) {
    const newContArray = [...ContainerArray];
    newContArray[index].col2 = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayTLChange(event, index) {
    const newContArray = [...ContainerArray];
    newContArray[index].tl = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayTRChange(event, index) {
    const newContArray = [...ContainerArray];
    newContArray[index].tr = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayBLChange(event, index) {
    const newContArray = [...ContainerArray];
    newContArray[index].bl = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayBRChange(event, index) {
    const newContArray = [...ContainerArray];
    newContArray[index].br = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayZChange(index) {
    const newContArray = [...ContainerArray];
    newContArray[index].zInd = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayOpacityChange(event, index) {
    const newContArray = [...ContainerArray];
    newContArray[index].opacity = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayBorderChange(index) {
    const newContArray = [...ContainerArray];
    newContArray[index].border = event.target.value;
    setContainerArray(newContArray)
  }

  function handleContArrayScaleChange(event, index) {
    const newContArray = [...ContainerArray];
    newContArray[index].scale = event.target.value
    setContainerArray(newContArray);
  }

  const [confirmDelete1, setConfirmDelete1] = useState(null);
  const [confirmDelete2, setConfirmDelete2] = useState(null);
  const [confirmDelete3, setConfirmDelete3] = useState(null);

  function handleDeleteText(index) {
    if (confirmDelete1 === index) {
      let newTextArray = TextArray.filter((item, i) => i !== index);
      setTextArray(newTextArray);
      setConfirmDelete1(null);
    } else {
      setConfirmDelete1(index);
      setTimeout(() => {
        setConfirmDelete1(null);
      }, 2000);
    }
  }

  function handleDeleteImg(index) {
    if (confirmDelete2 === index) {
      let newImgArray = ImgArray.filter((item, i) => i !== index);
      setImgArray(newImgArray);
      setConfirmDelete2(null);
    } else {
      setConfirmDelete2(index);
      setTimeout(() => {
        setConfirmDelete2(null);
      }, 2000);
    }
  }

  function handleDeleteCont(index) {
    if (confirmDelete3 === index) {
      let newContArray = ContainerArray.filter((item, i) => i !== index);
      setContainerArray(newContArray);
      setConfirmDelete3(null);
    } else {
      setConfirmDelete3(index);
      setTimeout(() => {
        setConfirmDelete3(null);
      }, 2000);
    }
  }

  const [loading, setLoading] = useState(false)
  const [completion, setCompletion] = useState(false)

  const checkmark = (
    <svg viewBox="0 0 100 100" width="7rem" height="7rem">
      <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
        strokeDasharray="200" strokeDashoffset="200">
        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
      </path>
    </svg>
  )

  async function waitSeconds() {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  async function submitChanges(formdata) {

    const response = await fetch(
      `../../api/edit-about?martid=${router.query.shopid}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }

  async function handleSubmit() {
    setLoading(true)

    const updatedAllTexts = {
      ...AllTexts,
      [device]: TextArray
    };

    const updatedAllImg = {
      ...AllImg,
      [device]: ImgArray
    };

    const updatedAllCont = {
      ...AllContainer,
      [device]: ContainerArray
    };

    const updatedRow = {
      ...AllRows,
      [device]: rowCount
    };

    const payload = { text: updatedAllTexts, img: updatedAllImg, container: updatedAllCont, rows: updatedRow }
    submitChanges(payload)

    await waitSeconds()

    setLoading(false)
    setCompletion(true)
    router.reload()
  }

  function handleReset() {
    router.reload()
  }

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

  const textScaler = `${device === "desktop" ? 1 : device === "tablet" ? 0.44 : 0.15}`;

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
        transform: `scale(${device === "desktop" ? item.scale * screenScale : item.scale})`
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

  const [MinimizedText, setMinimizedText] = useState([]);

  const toggleTextMin = (index) => {
    if (MinimizedText.includes(index)) {
      setMinimizedText(MinimizedText.filter((minIndex) => minIndex !== index));
    } else {
      setMinimizedText([...MinimizedText, index]);
    }
  };

  const [MinimizedImg, setMinimizedImg] = useState([]);

  const toggleImgMin = (index) => {
    if (MinimizedImg.includes(index)) {
      setMinimizedImg(MinimizedImg.filter((minIndex) => minIndex !== index));
    } else {
      setMinimizedImg([...MinimizedImg, index]);
    }
  };

  const [MinimizedCont, setMinimizedCont] = useState([]);

  const toggleContMin = (index) => {
    if (MinimizedCont.includes(index)) {
      setMinimizedCont(MinimizedCont.filter((minIndex) => minIndex !== index));
    } else {
      setMinimizedCont([...MinimizedCont, index]);
    }
  };

  useEffect(() => {
    setTextArray(AllTexts[device]);
    setImgArray(AllImg[device]);
    setContainerArray(AllContainer[device]);
  }, [device]);

  const gridClass = `${device === "desktop" ? "about-grid-1" : device === "tablet" ? "about-grid-2" : "about-grid-3"}`;
  const prevBase = `${device === "desktop" ? "div-preview-1" : device === "tablet" ? "div-preview-2" : "div-preview-3"}`;

  const modeButton = "product-action-1 heading-secondary"
  const modeButtonActive = "product-action-2 heading-secondary"

  const prevClasses = `${grid ? "div-preview grided" : prevBase}`;

  const prevDivs = Array.from({ length: (rowCount * colLimit) }, (_, index) => (
    <div key={index}
      className={prevClasses}
      style={{
        gridColumn: `${index % colLimit + 1}/${index % colLimit + 2}`,
        gridRow: `${Math.floor(index / colLimit) + 1}/${Math.floor(index / colLimit) + 2}`
      }}></div>
  ));

  const titles = ["The Grid System", "Cell Limitation", "Screen Versions", "Z-Index, Opacity, and Scale", "Containers", "Switch Warning"]
  const images = ['/about/about-1.png', '/about/about-2.png', '/about/about-3.png', '/about/about-4.png', '/about/about-5.png', '/about/about-6.png'];
  const text = ['In the about page maker, you can make your own layout of your about page through the grid system. The grid system works by making lines that start from 1 up until the end. The grid columns specify where an item is placed horizontally, and the grid row specifies where it is placed vertically.',
    'Mix and match the 2 properties to set how big the space an item occupies. Each item will be limited to their sides and are set to be centered. For example, tall images will be limited to their ceiling and floor while wide images are limited by their sides and will be centered. This applies to text as well. Set their positions to be between a range to put them in between grids.',
    'There are different column amounts for different screen sizes. The preview is an approximation of the screen sizes. There are 12 columns for desktops, 8 columns for tablets, and 4 for phones. You will need to make a version of the about page for all 3 so that it is accessible wherever the user accesses your page. Edit the row count to expand the height of your page.',
    "There are properties such as Z-Index that specifies which items appear on top. Opacity that sets the transparency of item, as well as scale. Scale multiplies the size of an item. When opacity and scale are at 1, it means 100%, so other decimal places mean their percentages such as 0.5 being 50%. Make sure you use the grid system to set the sizes of your items first because it and scale are multiplicative and may grow too big.",
    "Containers are used for creating text boxes and other figures. They may even be set to Body Mode to make it look like a foreground. However, be mindful of which colors you pick as the light mode and dark mode designs are different and may make your about page inaccessible at certain color modes.",
    "Data will be lost upon switching modes. Make sure to save your changes before changing to another device. Save often to protect your progress. Should you need to use other screen designs as references, it is recommended to open this page in another tab to compare. You may also open up the designing page to check both color modes and access the color picker."];

  const [modal, showModal] = useState(false)
  function handleModal() {
    showModal(!modal)
    console.log(modal)
  }
  return <Fragment>
    <Head>
      <title>Create About Page</title>
    </Head>
    <span className="page-heading">
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-flag svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">Create About Page&nbsp;</h1>
      <button className="help-button" onClick={handleModal}><div className="heading-icon-question svg-color">&nbsp;</div></button>
    </span>

    <ModalCarousel images={images} text={text} title={titles} modalStatus={modal} disable={handleModal} />

    <div className="flex-row" style={{ padding: "1rem" }}>
      <div className="flex-col">
        <div className="detail-slot-about">
          <span className="page-heading" style={{ marginBottom: "1rem" }}>

            <div className="heading-icon-settings svg-color">&nbsp;</div>
            <h1 className="heading-secondary no-margin">&nbsp;Settings &nbsp;</h1>
          </span>

          <div className="flex-row-align">
            <label className="heading-tertiary">Row count</label>
            <input value={rowCount} onChange={event => { setRowCount(event.target.value) }} type="number" className="text-small input-number" style={{ width: "15rem" }}></input>

            <div className="flex-row-align">
              <h3 className="heading-tertiary">Show Grid</h3>
              <input checked={grid} onChange={handleGrid} type="checkbox" id="switch" className="toggle-switch" /><label htmlFor="switch" className="toggle-label">Toggle</label>
            </div>

          </div>
          <div className="flex-row" style={{ marginTop: "1rem", width: "100%", justifyContent: "space-around" }}>
            <button className="product-action-2 heading-secondary" style={{ width: "15rem", margin: "0" }} onClick={handleSubmit} disabled={loading} >{loading ? <div className="spinner"></div> : (completion ? checkmark : "Save")}</button>
            <button className="product-action-3 white heading-secondary" style={{ width: "15rem", margin: "0" }} onClick={handleReset} disabled={loading} >Reset</button>
          </div>

          <div className="flex-row" style={{ marginTop: "1rem", width: "100%", justifyContent: "space-around" }}>
            <button className={device === "desktop" ? modeButtonActive : modeButton} style={{ maxWidth: "15rem" }} onClick={() => { setDevice("desktop"); setColLimit(12); setRowCount(DeskRowCount) }}>Desktop</button>
            <button className={device === "tablet" ? modeButtonActive : modeButton} style={{ maxWidth: "15rem" }} onClick={() => { setDevice("tablet"); setColLimit(8); setRowCount(TabRowCount) }}>Tablet</button>
            <button className={device === "phone" ? modeButtonActive : modeButton} style={{ maxWidth: "15rem" }} onClick={() => { setDevice("phone"); setColLimit(4); setRowCount(PhoneRowCount) }}>Phone</button>
          </div>

        </div>
        <span className="page-heading" style={{ margin: "1rem" }}>
          <div className="heading-icon-typography svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin" title="Fees that customers will pay if they choose for their items to be delivered.">&nbsp;Text Items &nbsp;</h1>
          <button className="add-img" type="button" onClick={handleAddTextArray} ><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
        </span>
        <div>
          <div className="detail-inputs">

            <AnimatePresence>
              {TextArray.map((item, index) => (
                <div className="detail-row-about" key={index}>
                  {!MinimizedText.includes(index) && (
                    <motion.div className="detail-row-about" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">

                      <div className="flex-col set-container" style={{ gap: "1rem" }}>
                        <button className="min-button rotater" onClick={() => toggleTextMin(index)}>
                          {MinimizedText.includes(index) ? <div className="heading-icon-chevron svg-color">&nbsp;</div> : <div className="heading-icon-chevron svg-color">&nbsp;</div>}
                        </button>
                        <div className="flex-row" >
                          <div className="flex-col">
                            <label className="heading-tertiary">Heading Type: &nbsp;</label>
                            <select value={item.name} onChange={(event) => handleTextArrayTypeChange(index, event.target.value)} className="text-options text-span" style={{ width: "100%", marginTop: "1rem" }}>
                              <option value="heading-primary">Primary Heading</option>
                              <option value="heading-secondary">Secondary Heading</option>
                              <option value="heading-tertiary">Tertiary heading</option>
                            </select>
                          </div>

                          <div className="flex-col">
                            <label className="heading-tertiary">Text Align: &nbsp;</label>
                            <select value={item.align} onChange={(event) => handleTextArrayAlignChange(index, event.target.value)} className="text-options text-span" style={{ width: "100%", marginTop: "1rem" }}>
                              <option value="center">Center</option>
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                            </select>
                          </div>

                          <div className="flex-col">
                            <label className="heading-tertiary" title="For stacking priority. If the number is higher, it will appear on top of the other items.">Z-Index: &nbsp;</label>
                            <select
                              value={item.zInd}
                              onChange={(event) => handleTextArrayZChange(index, event.target.value)}
                              className="text-options text-span"
                              style={{ width: "100%", marginTop: "1rem" }}
                            >

                              {Array.from({ length: 10 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-col">
                            <label className="heading-tertiary" style={{ marginBottom: "1rem" }} title="Increase or decrease an element's size. 1 for 100%, 1.2 for 120%, etc.">Scale: &nbsp;</label>
                            <div className="flex-row-align">
                              <input
                                type="number"
                                placeholder="Scale"
                                className="text-small input-number"
                                autoComplete="off"
                                style={{ width: "100%", margin: "0" }}
                                value={item.scale}
                                onChange={(event) => handleTextArrayScaleChange(event, index)}
                              ></input>
                            </div>
                          </div>
                        </div>


                        <div className="flex-row" style={{ marginBottom: "1rem" }}>

                          <div className="flex-col">
                            <label className="heading-tertiary">Grid Column: &nbsp;</label>
                            <div className="flex-row-align">
                              <select
                                value={item.col1}
                                onChange={(event) => handleTextArrayC1Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: colLimit + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                              <h2 className="heading-secondary">/</h2>
                              <select
                                value={item.col2}
                                onChange={(event) => handleTextArrayC2Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: colLimit + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex-col">
                            <label className="heading-tertiary">Grid Row: &nbsp;</label>
                            <div className="flex-row-align">
                              <select
                                value={item.row1}
                                onChange={(event) => handleTextArrayR1Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: rowCount + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                              <h2 className="heading-secondary">/</h2>
                              <select
                                value={item.row2}
                                onChange={(event) => handleTextArrayR2Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: rowCount + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="flex-col">
                          <label className="heading-tertiary" style={{ marginBottom: "1rem" }}>Text Content: &nbsp;</label>
                          <div className="flex-row-align">
                            <input
                              type="text"
                              placeholder="Content"
                              className="text-small input-number"
                              autoComplete="off"
                              style={{ width: "100%", margin: "0" }}
                              value={item.content}
                              onChange={(event) => handleTextArrayContentChange(event, index)}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <button className="add-img" type="button" onClick={() => handleDeleteText(index)}>
                        {confirmDelete1 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                      </button>
                    </motion.div>)}
                  {MinimizedText.includes(index) && (
                    <motion.div className="detail-row-about" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">

                      <div className="flex-col set-container" style={{ gap: "1rem" }}>
                        <button className="min-button" onClick={() => toggleTextMin(index)}>
                          {MinimizedText.includes(index) ? <div className="heading-icon-chevron svg-color">&nbsp;</div> : <div className="heading-icon-chevron svg-color">&nbsp;</div>}
                        </button>

                        <div className="flex-row" style={{ marginBottom: "1rem" }}>
                          <div className="flex-col">
                            <label className="heading-tertiary" style={{ marginBottom: "1rem" }}>Text Content: &nbsp;</label>
                            <div className="flex-row-align">
                              <input
                                type="text"
                                placeholder="Content"
                                className="text-small input-number"
                                autoComplete="off"
                                style={{ width: "100%", margin: "0" }}
                                value={item.content}
                                onChange={(event) => handleTextArrayContentChange(event, index)}
                              ></input>
                            </div>
                          </div>

                          <div className="flex-col">
                            <label className="heading-tertiary">Grid Column: &nbsp;</label>
                            <div className="flex-row-align">
                              <select
                                value={item.col1}
                                onChange={(event) => handleTextArrayC1Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: colLimit + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                              <h2 className="heading-secondary">/</h2>
                              <select
                                value={item.col2}
                                onChange={(event) => handleTextArrayC2Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: colLimit + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex-col">
                            <label className="heading-tertiary">Grid Row: &nbsp;</label>
                            <div className="flex-row-align">
                              <select
                                value={item.row1}
                                onChange={(event) => handleTextArrayR1Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: rowCount + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                              <h2 className="heading-secondary">/</h2>
                              <select
                                value={item.row2}
                                onChange={(event) => handleTextArrayR2Change(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: rowCount + 1 + 1 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>

                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="add-img" type="button" onClick={() => handleDeleteText(index)}>
                        {confirmDelete1 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                      </button>
                    </motion.div>)}
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex-col">


        <div className="flex-col">
          <span className="page-heading" style={{ margin: "1rem 0" }}>
            <div className="heading-icon-add-img svg-color">&nbsp;</div>
            <h1 className="heading-secondary no-margin">&nbsp;Image Items &nbsp;</h1>
            <button className="add-img" type="button" onClick={handleAddImgArray} ><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
          </span>
          <div>
            <div className="detail-inputs">



              <AnimatePresence>
                {ImgArray.map((item, index) => (
                  <div className="detail-row-about" key={index}>
                    {MinimizedImg.includes(index) && (
                      <motion.div className="detail-row-about" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                        <div className="flex-col set-container" style={{ gap: "1rem" }}>
                          <button className="min-button" onClick={() => toggleImgMin(index)}>
                            {MinimizedImg.includes(index) ? <div className="heading-icon-chevron svg-color">&nbsp;</div> : <div className="heading-icon-chevron svg-color">&nbsp;</div>}
                          </button>

                          <div className="flex-row" style={{ marginBottom: "1rem" }}>

                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }}>Imgur Link: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="text"
                                  placeholder="Imgur Link"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.img}
                                  onChange={(event) => handleImgArrayImageChange(event, index)}
                                ></input>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Column: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.col1}
                                  onChange={(event) => handleImgArrayC1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.col2}
                                  onChange={(event) => handleImgArrayC2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Row: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.row1}
                                  onChange={(event) => handleImgArrayR1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.row2}
                                  onChange={(event) => handleImgArrayR2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                        </div>
                        <button className="add-img" type="button" onClick={() => handleDeleteImg(index)}>
                          {confirmDelete1 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                        </button>
                      </motion.div>
                    )}

                    {!MinimizedImg.includes(index) && (
                      <motion.div className="detail-row-about" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                        <div className="flex-col set-container" style={{ gap: "1rem" }}>
                          <button className="min-button rotater" onClick={() => toggleImgMin(index)}>
                            {MinimizedImg.includes(index) ? <div className="heading-icon-chevron svg-color">&nbsp;</div> : <div className="heading-icon-chevron svg-color">&nbsp;</div>}
                          </button>
                          <div className="flex-row">
                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }}>Imgur Link: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="text"
                                  placeholder="Imgur Link"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.img}
                                  onChange={(event) => handleImgArrayImageChange(event, index)}
                                ></input>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Border: &nbsp;</label>
                              <select value={item.border} onChange={(event) => handleImgArrayBorderChange(index, event.target.value)} className="text-options text-span" style={{ width: "100%", marginTop: "1rem" }}>
                                <option value="round-borderer">On</option>
                                <option value="">Off</option>
                              </select>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary" title="For stacking priority. If the number is higher, it will appear on top of the other items.">Z-Index: &nbsp;</label>
                              <select
                                value={item.zInd}
                                onChange={(event) => handleImgArrayZChange(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: 10 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }} title="Increase or decrease an element's size. 1 for 100%, 1.2 for 120%, etc. The main method of sizing should be the grid system.">Scale: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="number"
                                  placeholder="Scale"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.scale}
                                  onChange={(event) => handleImgArrayScaleChange(event, index)}
                                ></input>
                              </div>
                            </div>
                          </div>

                          <div className="flex-row" style={{ marginBottom: "1rem" }}>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Column: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.col1}
                                  onChange={(event) => handleImgArrayC1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.col2}
                                  onChange={(event) => handleImgArrayC2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Row: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.row1}
                                  onChange={(event) => handleImgArrayR1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.row2}
                                  onChange={(event) => handleImgArrayR2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                        </div>
                        <button className="add-img" type="button" onClick={() => handleDeleteImg(index)}>
                          {confirmDelete1 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                        </button>
                      </motion.div>
                    )}
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>


          <span className="page-heading" style={{ margin: "1rem 0" }}>
            <div className="heading-icon-cube svg-color">&nbsp;</div>
            <h1 className="heading-secondary no-margin">&nbsp;Container Items &nbsp;</h1>
            <button className="add-img" type="button" onClick={handleAddContArray} ><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
          </span>
          <div>
            <div className="detail-inputs">
              <AnimatePresence>
                {ContainerArray.map((item, index) => (
                  <div className="detail-row-about" key={index}>
                    {MinimizedCont.includes(index) && (
                      <motion.div className="detail-row-about" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                        <div className="flex-col set-container" style={{ gap: "1rem" }}>
                          <button className="min-button" onClick={() => toggleContMin(index)}>
                            {MinimizedCont.includes(index) ? <div className="heading-icon-chevron svg-color">&nbsp;</div> : <div className="heading-icon-chevron svg-color">&nbsp;</div>}
                          </button>

                          <div className="flex-row" style={{ marginBottom: "1rem" }}>

                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }}>Color Hex: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="text"
                                  placeholder="#HEXCODE"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.color}
                                  onChange={(event) => handleContArrayColorChange(event, index)}
                                ></input>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Column: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.col1}
                                  onChange={(event) => handleContArrayC1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.col2}
                                  onChange={(event) => handleContArrayC2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Row: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.row1}
                                  onChange={(event) => handleContArrayR1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >
                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.row2}
                                  onChange={(event) => handleContArrayR2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >
                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                        </div>
                        <button className="add-img" type="button" onClick={() => handleDeleteCont(index)}>
                          {confirmDelete3 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                        </button>
                      </motion.div>
                    )}




                    {!MinimizedCont.includes(index) && (
                      <motion.div className="detail-row-about" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                        <div className="flex-col set-container" style={{ gap: "1rem" }}>
                          <button className="min-button rotater" onClick={() => toggleContMin(index)}>
                            {MinimizedCont.includes(index) ? <div className="heading-icon-chevron svg-color">&nbsp;</div> : <div className="heading-icon-chevron svg-color">&nbsp;</div>}
                          </button>
                          <div className="flex-row">
                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }}>Color Hex: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="text"
                                  placeholder="#HEXCODE"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.color}
                                  onChange={(event) => handleContArrayColorChange(event, index)}
                                ></input>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Body: &nbsp;</label>
                              <select value={item.border} onChange={(event) => handleContArrayBorderChange(index, event.target.value)} className="text-options text-span" style={{ width: "100%", marginTop: "1rem" }}>
                                <option value="round-borderer">On</option>
                                <option value="">Off</option>
                              </select>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary" title="For stacking priority. If the number is higher, it will appear on top of the other items.">Z-Index: &nbsp;</label>
                              <select
                                value={item.zInd}
                                onChange={(event) => handleContArrayZChange(index, event.target.value)}
                                className="text-options text-span"
                                style={{ width: "100%", marginTop: "1rem" }}
                              >

                                {Array.from({ length: 10 }, (_, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }} title="Increase or decrease an element's size. 1 for 100%, 1.2 for 120%, etc. The main method of sizing should be the grid system.">Scale: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="number"
                                  placeholder="Scale"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.scale}
                                  onChange={(event) => handleContArrayScaleChange(event, index)}
                                ></input>
                              </div>
                            </div>
                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }} title="Makes containers transparent, goes from 0 to 1. 0 Means invisible, 1 means fully visible. 0.8 means 80% visible.">Opacity: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="number"
                                  placeholder="Opacity"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.opacity}
                                  onChange={(event) => handleContArrayOpacityChange(event, index)}
                                ></input>
                              </div>
                            </div>
                          </div>

                          <div className="flex-row" style={{ marginBottom: "1rem" }}>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Column: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.col1}
                                  onChange={(event) => handleContArrayC1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.col2}
                                  onChange={(event) => handleContArrayC2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >

                                  {Array.from({ length: colLimit + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex-col">
                              <label className="heading-tertiary">Grid Row: &nbsp;</label>
                              <div className="flex-row-align">
                                <select
                                  value={item.row1}
                                  onChange={(event) => handleContArrayR1Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >
                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                                <h2 className="heading-secondary">/</h2>
                                <select
                                  value={item.row2}
                                  onChange={(event) => handleContArrayR2Change(index, event.target.value)}
                                  className="text-options text-span"
                                  style={{ width: "100%", marginTop: "1rem" }}
                                >
                                  {Array.from({ length: rowCount + 1 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="flex-col">
                              <label className="heading-tertiary" style={{ marginBottom: "1rem" }}>Border Radius: &nbsp;</label>
                              <div className="flex-row-align">
                                <input
                                  type="number"
                                  placeholder="TL"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.tl}
                                  onChange={(event) => handleContArrayTLChange(event, index)}
                                ></input>
                                <input
                                  type="number"
                                  placeholder="TR"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.tr}
                                  onChange={(event) => handleContArrayTRChange(event, index)}
                                ></input>
                                <input
                                  type="number"
                                  placeholder="BL"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.bl}
                                  onChange={(event) => handleContArrayBLChange(event, index)}
                                ></input>
                                <input
                                  type="number"
                                  placeholder="BR"
                                  className="text-small input-number"
                                  autoComplete="off"
                                  style={{ width: "100%", margin: "0" }}
                                  value={item.br}
                                  onChange={(event) => handleContArrayBRChange(event, index)}
                                ></input>
                              </div>
                            </div>
                          </div>

                        </div>
                        <button className="add-img" type="button" onClick={() => handleDeleteCont(index)}>
                          {confirmDelete3 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                        </button>
                      </motion.div>
                    )}
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>



    <span className="page-heading" style={{ marginBottom: "1rem" }}>
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-preview svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">About Page Preview</h1>
      <div className="heading-icon-warning svg-color" title="Warning, the preview is an approximation for different screen sizes and may not be perfectly accurate depending on which screen size you are on.">&nbsp;</div>
    </span>
    <section className={gridClass}>

      <>{prevDivs}</>

      {textElements}
      {imgElements}
      {containerElements}


    </section>
  </Fragment>
}

export default About
export { getServerSideProps }