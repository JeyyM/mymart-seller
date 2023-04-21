import { Fragment, useState } from "react";
import { getServerSideProps } from "../../../utilities/serversideProps"
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import CategoryProducts from "@/components/category-products/CategoryProducts";

import { ChromePicker } from "react-color";

import Image from "next/image";

import dynamic from "next/dynamic";
import ThemePack from "@/components/design/ThemePack";

import FontOptions from "@/components/design/FontOptions";

function Designing({ shopID }) {
  const router = useRouter()
  const designs = shopID.shopData.shopDesigns

  async function finishForm(formdata) {
    const response = await fetch(
      `../../api/set-designs?martid=${router.query.shopid}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }

  const [currentMode, setCurrentMode] = useState(designs.defaultMode)
  const handleCurrentMode = () => {
    setCurrentMode(!currentMode)
  }

  let activeMode = {}

  if (currentMode){
    activeMode = designs.lightDesign
  } else {activeMode = designs.darkDesign}

  const [LightColor, setLightColor] = useState(activeMode["color-primary-light"]);
  const handleLightColorChange = (event) => {
    setLightColor(event.target.value);
  };

  const [DarkColor, setDarkColor] = useState(activeMode["color-primary-dark"]);
  const handleDarkColorChange = (event) => {
    setDarkColor(event.target.value);
  };

  const [bgBody, setBgBody] = useState(activeMode["bg-body"]);
  const handleBgBody = (event) => {
    setBgBody(event.target.value);
  };

  const [bgItem, setBgItem] = useState(activeMode["bg-item"]);
  const handleBgItem = (event) => {
    setBgItem(event.target.value);
  };

  const [textPrimary, setTextPrimary] = useState(activeMode["text-primary-color"]);
  const handleTextPrimary = (event) => {
    setTextPrimary(event.target.value);
  };
  const [textPrimaryFont, setTextPrimaryFont] = useState(activeMode["text-primary-font"]);
  const handleTextPrimaryFont = (event) => {
    setTextPrimaryFont(event.target.value);
  };

  const [textSecondary, setTextSecondary] = useState(activeMode["text-secondary-color"]);
  const handleTextSecondary = (event) => {
    setTextSecondary(event.target.value);
  };
  const [textSecondaryFont, setTextSecondaryFont] = useState(activeMode["text-secondary-font"]);
  const handleTextSecondaryFont = (event) => {
    setTextSecondaryFont(event.target.value);
  };

  const [textTertiary, setTextTertiary] = useState(activeMode["text-tertiary-color"]);
  const handleTextTertiary = (event) => {
    setTextTertiary(event.target.value);
  };
  const [textTertiaryFont, setTextTertiaryFont] = useState(activeMode["text-tertiary-font"]);
  const handleTextTertiaryFont = (event) => {
    setTextTertiaryFont(event.target.value);
  };

  const [borderTL, setBorderTL] = useState(activeMode["border-tl"].slice(0,-2))
  const handleBorderTL = (event) => {
    setBorderTL(event.target.value);
  };
  const [borderTR, setBorderTR] = useState(activeMode["border-tr"].slice(0,-2))
  const handleBorderTR = (event) => {
    setBorderTR(event.target.value);
  };
  const [borderBL, setBorderBL] = useState(activeMode["border-bl"].slice(0,-2))
  const handleBorderBL = (event) => {
    setBorderBL(event.target.value);
  };
  const [borderBR, setBorderBR] = useState(activeMode["border-br"].slice(0,-2))
  const handleBorderBR = (event) => {
    setBorderBR(event.target.value);
  };

  console.log(borderTL)

  const [outlineDark, setOutlineDark] = useState(activeMode["button-outline-dark"])
  const handleOutlineDark = (event) => {
    setOutlineDark(event.target.value);
  };
  const [outlineLight, setOutlineLight] = useState(activeMode["button-outline-light"])
  const handleOutlineLight = (event) => {
    setOutlineLight(event.target.value);
  };
  const [outlineText, setOutlineText] = useState(activeMode["button-outline-text"])
  const handleOutlineText = (event) => {
    setOutlineText(event.target.value);
  };

  const [solidDark, setSolidDark] = useState(activeMode["button-solid-dark"])
  const handleSolidDark = (event) => {
    setSolidDark(event.target.value);
  };
  const [solidLight, setSolidLight] = useState(activeMode["button-solid-light"])
  const handleSolidLight = (event) => {
    setSolidLight(event.target.value);
  };
  const [solidText, setSolidText] = useState(activeMode["button-solid-text"])
  const handleSolidText = (event) => {
    setSolidText(event.target.value);
  };



  useEffect(() => {
    setLightColor(LightColor)
  }, [LightColor, DarkColor])










  function onSubmit(event) {
    event.preventDefault()
    // const data = { "color-primary-dark": Light_DarkColor, "color-primary-light": Light_LightColor }
    // console.log(data)
    finishForm(data)
  }

  const [color, setColor] = useState("#fff")

  const themeSet = ["#89375F", "#CE5959", "#BACDDB", "#F3E8FF", "#2A2F4F", "#4F4557", "#BA90C6", "#E8A0BF", 30, 30, 30, 30, "Coolors Random"]

  const themeSet1 = ["#0057FF", "#7FC9FF", "#C1EFFF", "#D5E8FC", "#0A2647", "#003F76", "#004DFF", "#3974FF", 10, 10, 10, 10, "Cool Blue"]

  const themeSet2 = ["#263A29", "#41644A", "#E8D2A6", "#B3E5BE", "#3C2317", "#665A48", "#367E18", "#BFDB38", 20, 10, 20, 10, "Forest Green"]

  const themeSet3 = ["#89375F", "#CE5959", "#BACDDB", "#F3E8FF", "#2A2F4F", "#4F4557", "#BA90C6", "#E8A0BF", 30, 30, 30, 30, "Floral Pink"]

  const themeSet4 = ["#A84448", "#F2CD5C", "#FFF2CC", "#FFAFB2", "#FFD966", "#F6F1E9", "#E74646", "#FFD93D", 0, 30, 30, 30, "Brick Red"]


  return <Fragment>
  <Head>
    <title>Design Mart</title>
  </Head>

    <div className="design-grid">
      <div className="design-col-1">
        <span className="page-heading">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-brush svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-primary no-margin">Design Mart</h1>
        </span>

        <div className="color-moder item-setup">
          <h2 className="heading-secondary">Color Theme</h2>
          <button className="theme-button x"><div className="button-theme-sun svg-color">&nbsp;</div></button>
          <button className="product-action-2-small heading-secondary">Set Default</button>
        </div>

        <ChromePicker color={color} onChange={updatedColor => setColor(updatedColor)} className="color-picker" disableAlpha={true}></ChromePicker>

        <div className="design-conf-buttons">
        <div className="text-group" style={{ marginBottom: "1rem" }}>
            <button className="product-action-3 heading-secondary" type="button" style={{ margin: "0rem", width: "100%" }}>Hard Reset</button>
            <button className="product-action-1 heading-secondary" type="button" style={{ margin: "0rem", width: "100%" }}>Reset</button>
          </div>
          <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0rem", width: "100%" }}>Submit</button>
        </div>
      </div>

      <div className="design-col-2">
        <span className="page-heading flex-row-align">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-sun svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-secondary no-margin">Light Themes</h1>
        </span>

        <ThemePack themeSet={themeSet1}></ThemePack>

        <ThemePack themeSet={themeSet2}></ThemePack>

        <ThemePack themeSet={themeSet3}></ThemePack>

        <ThemePack themeSet={themeSet4}></ThemePack>

        <span className="page-heading flex-row-align">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-dice svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-secondary no-margin">Random Themes</h1>
        </span>
        <button className="product-action-1" style={{ margin: "0rem auto", width: "20rem", height: "6rem" }}>Randomize</button>

        <ThemePack themeSet={themeSet}></ThemePack>

      </div>

      <div className="design-col-3">
        <div className="design-primary item-setup">
          <span className="page-heading flex-row-align">
            <div className="heading-icon-dropshadow">
              <div className="heading-icon-brush svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-secondary no-margin">Primary Designs</h1>
          </span>

          <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Main Colors</h3>
          <div className="text-group">
            <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}  value={DarkColor} onChange={handleDarkColorChange}></input>
            <input type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={LightColor} onChange={handleLightColorChange}></input>
          </div>

          <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Background Colors</h3>
          <div className="text-group">
            <input type="text" placeholder="Body Bg" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={bgBody} onChange={handleBgBody}></input>
            <input type="text" placeholder="Item Bg" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={bgItem} onChange={handleBgItem}></input>
          </div>

          <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Border Radius (px)</h3>
          <div className="text-group-4">
            <input type="number" placeholder="T L" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={borderTL} onChange={handleBorderTL}></input>
            <input type="number" placeholder="T R" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={borderTR} onChange={handleBorderTR}></input>
            <input type="number" placeholder="B L" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={borderBL} onChange={handleBorderBL}></input>
            <input type="number" placeholder="B R" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={borderBR} onChange={handleBorderBR}></input>
          </div>

          <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Button Outline</h3>
          <div className="text-group-3">
            <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={outlineDark} onChange={handleOutlineDark}></input>
            <input type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={outlineLight} onChange={handleOutlineLight}></input>
            <input type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={outlineText} onChange={handleOutlineText}></input>
          </div>

          <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Button Solid</h3>
          <div className="text-group-3">
            <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={solidDark} onChange={handleSolidDark}></input>
            <input type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={solidLight} onChange={handleSolidLight}></input>
            <input type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={solidText} onChange={handleSolidText}></input>
          </div>

        </div>
        <div className="design-typography item-setup">
          <span className="page-heading flex-row-align">
            <div className="heading-icon-dropshadow">
              <div className="heading-icon-typography svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-secondary no-margin">Typography</h1>
          </span>

          <div className="text-group-3" style={{ marginTop: "1rem" }}>
            <FontOptions defaultFont={textPrimaryFont} type={"heading-primary-select"} effect={setTextPrimaryFont}></FontOptions>
            <input type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={textPrimary} onChange={handleTextPrimary}></input>
          </div>
          <div className="text-group-3" style={{ marginTop: "1rem" }}>
          <FontOptions defaultFont={textSecondaryFont} type={"heading-secondary-select"} effect={setTextSecondaryFont}></FontOptions>
            <input type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={textSecondary} onChange={handleTextSecondary}></input>
          </div>
          <div className="text-group-3" style={{ marginTop: "1rem" }}>
          <FontOptions defaultFont={textTertiaryFont} type={"heading-tertiary-select"} effect={setTextTertiaryFont}></FontOptions>
            <input type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={textTertiary} onChange={handleTextTertiary}></input>
          </div>
        </div>
      </div>

      <div className="design-col-4">
        <div className="design-demo item-setup-dark">
          <span className="page-heading flex-row-align">
            <div className="heading-icon-dropshadow">
              <div className="heading-icon-preview svg-color" style={{backgroundImage: `linear-gradient( to right, red, yellow ) !important`}}>&nbsp;</div>
            </div>
            <h1 className="heading-primary-demo" style={{ color: `${textPrimary}`, fontFamily: `${textPrimaryFont}`}}>Main Preview</h1>
          </span>

          <div className="category-sample" style={{borderRadius: `${borderTL}px ${borderTR}px ${borderBR}px ${borderBL}px`}}>
                     <div className="image-container">
              <img src="/categories.jpg" className="category-img" alt="Sample Image"></img>
            </div>

            <div className="category-content">
              <div>
                <h2 className="heading-secondary-demo category-name" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}`, marginLeft:"1rem"}}>Heading Secondary</h2>
                <h3 className="heading-tertiary-demo" style={{ color: `${textTertiary}`, fontFamily: `${textTertiaryFont}`, marginLeft:"1rem"}}>Sample Heading Tertiary Sample Heading Tertiary Sample Heading Tertiary</h3>
              </div>
              <div className="product-number-container">
                <h2 className="heading-secondary-demo product-numbers product-price" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}` }}>$123</h2>
                <h2 className="heading-secondary-demo product-numbers" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}` }}>456 Units</h2>
              </div>
            </div>
          </div>


          <div className="text-group" style={{ marginTop: "1rem" }}>
            <button className="product-action-1-demo heading-secondary-demo" type="button" style={{ margin: "0rem", width: "100%", color: `${textSecondary}`, fontFamily: `${textSecondaryFont}` }}>Outline</button>
            <button className="product-action-2-demo heading-secondary-demo" type="button" style={{ margin: "0rem", width: "100%", color: `${textSecondary}`, fontFamily: `${textSecondaryFont}` }}>Solid</button>
          </div>

        </div>
        <div className="demo-typography item-setup" style={{ padding: "0rem" }}>
          <span className="page-heading flex-row-align" style={{ padding: "1rem" }}>
            <div className="heading-icon-dropshadow">
              <div className="heading-icon-typography svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-secondary no-margin">Typography Preview</h1>
          </span>
          <div className="typo-prev-1 item-setup-2-b">
          <button className="contrast-init"><h2 className="heading-tertiary">O 5.5</h2></button><h1 className="heading-primary-demo" style={{ color: `${textPrimary}`, fontFamily: `${textPrimaryFont}`, marginLeft:"1rem"}}>Lorem Ipsum</h1>
          </div>
          <div className="typo-prev-2 item-setup-2">
          <button className="contrast-init"><h2 className="heading-tertiary">O 5.5</h2></button><h2 className="heading-secondary-demo" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}`, marginLeft:"1rem"}}>Lorem Ipsum Dolor</h2>
          </div>
          <div className="typo-prev-3 item-setup-2">
          <button className="contrast-init"><h2 className="heading-tertiary">O 5.5</h2></button><h2 className="heading-tertiary-demo" style={{ color: `${textTertiary}`, fontFamily: `${textTertiaryFont}`, marginLeft:"1rem"}}>Lorem Ipsum Dolor</h2>
          </div>



        </div>
      </div>

    </div>
  </Fragment>
}

export default Designing

export { getServerSideProps }
