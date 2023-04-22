import { Fragment, useState } from "react";
import { getServerSideProps } from "../../../utilities/serversideProps"
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";

import { ChromePicker } from "react-color";
import chroma from 'chroma-js';

import ThemePack from "@/components/design/ThemePack";
import ThemePack2 from "@/components/design/ThemePack2";

import FontOptions from "@/components/design/FontOptions";

import CopyNotifier from "@/components/Modal/Copy-Notifier";


function Designing({ shopID }) {
  const router = useRouter()
  const designs = shopID.shopData.shopDesigns

  const [loading, setLoading] = useState(false)
  const [completion, setCompletion] = useState(false)

  function waitSeconds() {
    return new Promise(resolve => setTimeout(resolve, 2500));
  }

  const checkmark = (
    <svg viewBox="0 0 100 100" width="7rem" height="7rem">
      <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
        strokeDasharray="200" strokeDashoffset="200">
        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
      </path>
    </svg>
  )

  async function finishForm(formdata, state) {
    console.log("formadata", formdata)
    console.log("state", state)
    const response = await fetch(
      `../../api/set-designs?martid=${router.query.shopid}&state=${state}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }

  const [chromaItems, setChroma] = useState([])

  useEffect(() => {fetchChroma()}, [])
  
  const fetchChroma = () => {
    const baseColor1 = chroma.random();
    const colorScale1 = chroma.scale([baseColor1, "white"]);
    const colorTheme1 = colorScale1.colors(4);

    const baseColor3 = chroma.random();
    const colorScale2 = chroma.scale([baseColor3, "black"]);
    const colorTheme2 = colorScale2.colors(4);

        const colors = [];
    for (let i = 0; i < 8; i++) {
      colors.push(chroma.random());
    }

    const finalSet =  colorTheme1.concat(colorTheme2, colors);
    setChroma(finalSet)
  }
  
  const [notification, setNotification] = useState(null);

  function handleFocus(event) {
    event.target.select();
  }

  function copyHex(event) {
    event.target.select();
    document.execCommand('copy');

      setNotification(true)
  }

  const [currentMode, setCurrentMode] = useState(true)

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

  async function onSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const data = { "color-primary-dark": DarkColor, "color-primary-light": LightColor, "bg-body": bgBody, "bg-item": bgItem, "text-primary-color": textPrimary, "text-secondary-color": textSecondary,
  "text-tertiary-color": textTertiary, "text-primary-font": textPrimaryFont, "text-secondary-font": textSecondaryFont, "text-tertiary-font": textTertiaryFont, "button-outline-dark": outlineDark,
  "button-outline-light": outlineLight, "button-solid-dark": solidDark, "button-solid-light": solidLight, "border-tl": borderTL + "px", "border-tr": borderTR + "px", "border-bl": borderBL + "px",
"border-br": borderBR + "px", "button-solid-text": solidText, "button-outline-text": outlineText}
    console.log(data)

    console.log(currentMode)

    finishForm(data, currentMode)
    await waitSeconds();
    setLoading(false)
    setCompletion(true)
    router.reload()
  }

  const [color, setColor] = useState("#fff")

  const themeSet1 = ["#FF6000", "#FFD93D", "#2D2727", "#454545", "#F9F5EB", "#F9F5EB", "#FE6244", "#F7DB6A", 10, 10, 10, 10, "Neon Orange"]

  const themeSet2 = ["#070A52", "#D21312", "#2A2F4F", "#2B3467", "#F3E8FF", "#FDF4F5", "#E74646", "#E11299", 30, 0, 30, 30, "Sunset Purple"]

  const themeSet3 = ["#454545", "#FFFFFF", "#000000", "#292929", "#BEBEBE", "#DDDDDD", "#FFFFFF", "#3B3B3B", 0, 0, 0, 0, "Steel Gray"]

  const themeSet4 = ["#001253", "#6EBF8B", "#292C6D", "#151D3B", "#CFFFDC", "#7CD1B8", "#39A388", "#6EBF8B", 20, 20, 0, 0, "Inky Teal"]

  const setAllTheme = (payload) => {
    setDarkColor(payload[0])
    setLightColor(payload[1])
    setBgBody(payload[2])
    setBgItem(payload[3])
    setTextPrimary(payload[4])
    setTextSecondary(payload[5])
    setTextTertiary(payload[5])
    setOutlineDark(payload[6])
    setOutlineLight(payload[7])
    setSolidDark(payload[6])
    setSolidLight(payload[7])
    setBorderTL(payload[8])
    setBorderTR(payload[9])
    setBorderBL(payload[10])
    setBorderBR(payload[11])
    setSolidText(payload[5])
    setOutlineText(payload[5])
  }

  const softReset = () => {
    setDarkColor(activeMode["color-primary-dark"])
    setLightColor(activeMode["color-primary-light"])
    setBgBody(activeMode["bg-body"])
    setBgItem(activeMode["bg-item"])
    setTextPrimary(activeMode["text-primary-color"])
    setTextSecondary(activeMode["text-secondary-color"])
    setTextTertiary(activeMode["text-tertiary-color"])
    setTextPrimaryFont(activeMode["text-primary-font"])
    setTextSecondaryFont(activeMode["text-secondary-font"])
    setTextTertiaryFont(activeMode["text-tertiary-font"])
    setOutlineDark(activeMode["button-outline-dark"])
    setOutlineLight(activeMode["button-outline-light"])
    setSolidDark(activeMode["button-solid-dark"])
    setSolidLight(activeMode["button-solid-light"])
    setBorderTL(activeMode["border-tl"].slice(0,-2))
    setBorderTR(activeMode["border-tr"].slice(0,-2))
    setBorderBL(activeMode["border-bl"].slice(0,-2))
    setBorderBR(activeMode["border-br"].slice(0,-2))
    setSolidText(activeMode["button-solid-text"])
    setOutlineText(activeMode["button-outline-text"])
  }

  const hardReset = (payload) => {
    setDarkColor(payload[0])
    setLightColor(payload[1])
    setBgBody(payload[2])
    setBgItem(payload[3])
    setTextPrimary(payload[4])
    setTextSecondary(payload[5])
    setTextTertiary(payload[5])
    setOutlineDark(payload[6])
    setOutlineLight(payload[7])
    setSolidDark(payload[6])
    setSolidLight(payload[7])
    setBorderTL(payload[8])
    setBorderTR(payload[9])
    setBorderBL(payload[10])
    setBorderBR(payload[11])
    setSolidText(payload[5])
    setOutlineText(payload[5])
    setTextPrimaryFont("Roboto")
    setTextSecondaryFont("Roboto")
    setTextTertiaryFont("Roboto")
  }
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const categorySampleHover = {
    transform: 'translateY(-0.6rem) translateX(1rem)',
    filter: `drop-shadow(-6px 6px 0px ${DarkColor})`,
  };  

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  const categorySampleClick = {
      transform: "translateY(0rem) translateX(0rem)",
      filter: `drop-shadow(-1px 1px 0px ${DarkColor}) brightness(120%) drop-shadow(0px 0px 10px ${bgItem})`
    }

    const ActionDemo1 = {
      filter: "brightness(120%)",
      boxShadow: `0 0 0 2px ${solidDark}, 0 0 0 4px ${bgItem}`
    };

    const ActionDemo2 = {
      filter: "brightness(120%)",
      boxShadow: `inset 0 0 0 10px ${bgItem}, 0 0 0 2px ${outlineDark},
        0 0 0 4px ${bgItem}`
    };
    

  const categSample = `category-sample ${isHovered ? "category-sample-hover" : ""}`;

  function copyItem(color){
    navigator.clipboard.writeText(color)
    setNotification(true)
  }
  
  return <Fragment>
  <Head>
    <title>Design Mart</title>
    <style>
    {`::placeholder {color: ${bgItem}; opacity: 0.8; filter: brightness(150%)};`}
    </style>
  </Head>

  
        <CopyNotifier
          status={notification}
          disable={() => {setNotification(false)}}
        />
    

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
          <a className="theme-button x" href="light"><div className="button-theme-moon svg-color">&nbsp;</div></a>
          <button className="product-action-2-small heading-secondary">Set Default</button>
        </div>

      <div style={{height: "22em", overflow: "hidden" }}>
        <ChromePicker color={color} onChange={updatedColor => setColor(updatedColor)} className="color-picker" disableAlpha={true} renderers={{hex: ChromePicker}}></ChromePicker>
      </div>
      {/* <input value={color.hex} className="text-small input-number"></input> */}
      <input onFocus={copyHex} onTouchStart={copyHex} type="text" placeholder="HEXCODE" className="text-small input-number" autoComplete="off" style={{ width: "50%", margin: "0 auto" }}  value={color.hex}></input>


        <div className="design-conf-buttons">
        <div className="text-group" style={{ marginBottom: "1rem" }}>
            <button className="product-action-3 heading-secondary white" type="button" style={{ margin: "0rem", width: "100%" }} onClick={() => {hardReset(themeSet1)}}>Hard Reset</button>
            <button className="product-action-1 heading-secondary" type="button" style={{ margin: "0rem", width: "100%" }} onClick={softReset}>Reset</button>
          </div>
          <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0rem", width: "100%" }} onClick={onSubmit} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? checkmark : "Submit")}</button>
        </div>
      </div>

      <div className="design-col-2">
        <span className="page-heading flex-row-align">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-moon svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-secondary no-margin">Dark Themes</h1>
        </span>

        <ThemePack themeSet={themeSet1} set={setAllTheme}></ThemePack>

        <ThemePack themeSet={themeSet2} set={setAllTheme}></ThemePack>

        <ThemePack themeSet={themeSet3} set={setAllTheme}></ThemePack>

        <ThemePack themeSet={themeSet4} set={setAllTheme}></ThemePack>

        <span className="page-heading flex-row-align">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-dice svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-secondary no-margin">Random Colors</h1>
        </span>
        <button className="product-action-1" onClick={fetchChroma} style={{ margin: "0rem auto", width: "20rem", height: "6rem" }}>Randomize</button>

        <ThemePack2 themeSet={chromaItems} copy={copyItem}></ThemePack2>

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
            <input onFocus={handleFocus} type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}  value={DarkColor} onChange={handleDarkColorChange}></input>
            <input onFocus={handleFocus} type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={LightColor} onChange={handleLightColorChange}></input>
          </div>

          <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Background Colors</h3>
          <div className="text-group">
            <input onFocus={handleFocus} type="text" placeholder="Body Bg" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={bgBody} onChange={handleBgBody}></input>
            <input onFocus={handleFocus} type="text" placeholder="Item Bg" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={bgItem} onChange={handleBgItem}></input>
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
            <input onFocus={handleFocus} type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={outlineDark} onChange={handleOutlineDark}></input>
            <input onFocus={handleFocus} type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={outlineLight} onChange={handleOutlineLight}></input>
            <input onFocus={handleFocus} type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={outlineText} onChange={handleOutlineText}></input>
          </div>

          <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Button Solid</h3>
          <div className="text-group-3">
            <input onFocus={handleFocus} type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={solidDark} onChange={handleSolidDark}></input>
            <input onFocus={handleFocus} type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={solidLight} onChange={handleSolidLight}></input>
            <input onFocus={handleFocus} type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={solidText} onChange={handleSolidText}></input>
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
            <input onFocus={handleFocus} type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={textPrimary} onChange={handleTextPrimary}></input>
          </div>
          <div className="text-group-3" style={{ marginTop: "1rem" }}>
          <FontOptions defaultFont={textSecondaryFont} type={"heading-secondary-select"} effect={setTextSecondaryFont}></FontOptions>
            <input onFocus={handleFocus} type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={textSecondary} onChange={handleTextSecondary}></input>
          </div>
          <div className="text-group-3" style={{ marginTop: "1rem" }}>
          <FontOptions defaultFont={textTertiaryFont} type={"heading-tertiary-select"} effect={setTextTertiaryFont}></FontOptions>
            <input onFocus={handleFocus} type="text" placeholder="Text Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }} value={textTertiary} onChange={handleTextTertiary}></input>
          </div>
        </div>
      </div>

      <div className="design-col-4">
        <div className="design-demo item-setup-dark" style={{backgroundImage: `linear-gradient( to right, ${bgBody}, ${bgBody}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgBody}`}}>
          <span className="page-heading flex-row-align">
            <div className="heading-icon-dropshadow-demo" style={{filter: `drop-shadow(-2px 2px 0px ${textPrimary})`}}>
              <div className="heading-icon-preview" style={{backgroundImage: `linear-gradient( to right, ${DarkColor}, ${LightColor} )`}}>&nbsp;</div>
            </div>
            
            <h1 className="heading-primary-demo" style={{ color: `${textPrimary}`, fontFamily: `${textPrimaryFont}`, marginTop: "-1rem", marginLeft:"-0.5rem"}}>Main Preview</h1>
    
          </span>

        <div style={{filter: `drop-shadow(-4px 4px 0px ${DarkColor})`, margin: "0 auto"}}>
          <div className={categSample} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseUp={() => setIsClicked(false)} onMouseDown={() => setIsClicked(true)}
          style={{borderRadius: `${borderTL}px ${borderTR}px ${borderBR}px ${borderBL}px`, cursor: "pointer",
    backgroundImage: `linear-gradient(${bgItem}, ${bgItem}), linear-gradient(${LightColor}, ${DarkColor})`, ... (isHovered ? categorySampleHover : {}), ...(isClicked ? categorySampleClick : {}),
  }}>

                     <div className="image-container-demo" style={{borderImage: `linear-gradient(45deg, ${DarkColor}, ${LightColor}) 1`, backgroundColor: `${bgItem}`}}>
              <img src="/categories.jpg" className="category-img" alt="Sample Image"></img>
            </div>

            <div className="category-content-demo" style={{backgroundColor: `${bgItem}`}}>
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
        </div>

          <div className="text-group" style={{ marginTop: "1rem" }}>
            <button className="product-action-1-demo heading-secondary-demo" type="button" onMouseUp={() => setIsClicked3(false)} onMouseDown={() => setIsClicked3(true)} style={{ margin: "0rem", width: "100%", color: `${outlineText}`, fontFamily: `${textSecondaryFont}`, 
            backgroundImage: `linear-gradient(${bgItem}, ${bgItem}), linear-gradient(${outlineDark}, ${outlineLight})`, boxShadow: `inset 0 0 0 2rem ${bgItem}`, ...(isClicked3 ? ActionDemo2 : {})}}>Outline</button>
            <button className="product-action-2-demo heading-secondary-demo" type="button" onMouseUp={() => setIsClicked2(false)} onMouseDown={() => setIsClicked2(true)} style={{ margin: "0rem", width: "100%", color: `${solidText}`, 
            fontFamily: `${textSecondaryFont}`, backgroundImage: `linear-gradient(${solidLight}, ${solidDark})`, ...(isClicked2 ? ActionDemo1 : {}) }}>Solid</button>
          </div>

        </div>
        <div className="demo-typography item-setup" style={{ padding: "0rem" }}>
          <span className="page-heading flex-row-align" style={{ padding: "1rem" }}>
            <div className="heading-icon-dropshadow">
              <div className="heading-icon-typography svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-secondary no-margin">Typography Preview</h1>
          </span>

          <div className="typo-prev-1 item-setup-2-b" style={{backgroundImage: `linear-gradient( to right, ${bgBody}, ${bgBody}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgBody}`}}>
          <button className="contrast-init"><h2 className="heading-tertiary">O 5.5</h2></button><h1 className="heading-primary-demo" style={{ color: `${textPrimary}`, fontFamily: `${textPrimaryFont}`, marginLeft:"1rem"}}>Lorem Ipsum</h1>
          </div>
          <div className="typo-prev-2 item-setup-2" style={{backgroundImage: `linear-gradient( to right, ${bgItem}, ${bgItem}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgItem}`}}>
          <button className="contrast-init"><h2 className="heading-tertiary">O 5.5</h2></button><h2 className="heading-secondary-demo" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}`, marginLeft:"1rem"}}>Lorem Ipsum Dolor</h2>
          </div>
          <div className="typo-prev-3 item-setup-2" style={{backgroundImage: `linear-gradient( to right, ${bgItem}, ${bgItem}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgItem}` }}>
          <button className="contrast-init"><h2 className="heading-tertiary">O 5.5</h2></button><h2 className="heading-tertiary-demo" style={{ color: `${textTertiary}`, fontFamily: `${textTertiaryFont}`, marginLeft:"1rem"}}>Lorem Ipsum Dolor</h2>
          </div>



        </div>
      </div>

    </div>
  </Fragment>
}

export default Designing

export { getServerSideProps }

/////////////////
// theme-button
// <a className="theme-button x" href="dark"><div className="button-theme-sun svg-color">&nbsp;</div></a>

//<h1 className="heading-secondary no-margin">Light Themes</h1>

// const [color, setColor] = useState("#fff")

// const themeSet = ["#89375F", "#CE5959", "#BACDDB", "#F3E8FF", "#2A2F4F", "#4F4557", "#BA90C6", "#E8A0BF", 30, 30, 30, 30, "Coolors Random"]

// const themeSet1 = ["#0057FF", "#7FC9FF", "#E7F6FD", "#FFFFFF", "#0A2647", "#003F76", "#004DFF", "#3974FF", 10, 10, 10, 10, "Cool Blue"]

// const themeSet2 = ["#263A29", "#41644A", "#E8D2A6", "#B3E5BE", "#3C2317", "#665A48", "#367E18", "#BFDB38", 50, 10, 10, 50, "Forest Green"]

// const themeSet3 = ["#89375F", "#CE5959", "#BACDDB", "#F3E8FF", "#2A2F4F", "#4F4557", "#BA90C6", "#E8A0BF", 30, 30, 30, 30, "Floral Pink"]

// const themeSet4 = ["#A84448", "#F2CD5C", "#FFAFB2", "#FFF2CC", "#570000", "#570000", "#E74646", "#FFD93D", 0, 30, 30, 30, "Brick Red"]