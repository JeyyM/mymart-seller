import { Fragment, useState } from "react";
import { getServerSideProps } from "../../../utilities/serversideProps"
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";

import { ChromePicker } from "react-color";

import dynamic from "next/dynamic";
import ThemePack from "@/components/design/ThemePack";

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

  const [Light_LightColor, setLight_LightColor] = useState(designs.lightDesign["color-primary-light"]);
  const handleLight_LightColorChange = (event) => {
    setLight_LightColor(event.target.value);
  };

  const [Light_DarkColor, setLight_DarkColor] = useState(designs.lightDesign["color-primary-dark"]);
  const handleLight_DarkColorChange = (event) => {
    setLight_DarkColor(event.target.value);
  };

  function onSubmit(event) {
    event.preventDefault()
    const data = { "color-primary-dark": Light_DarkColor, "color-primary-light": Light_LightColor }
    console.log(data)
    finishForm(data)
  }

  const [color, setColor] = useState("#fff")

  const themeSet = ["#89375F", "#CE5959", "#BACDDB", "#F3E8FF", "#2A2F4F", "#4F4557", "#BA90C6", "#E8A0BF", 30, 30, 30, 30, "Coolors Random"]

  const themeSet1 = ["#0057FF", "#7FC9FF", "#C1EFFF", "#D5E8FC", "#0A2647", "#003F76", "#004DFF", "#3974FF", 10, 10, 10, 10, "Cool Blue"]

  const themeSet2 = ["#263A29", "#41644A", "#E8D2A6", "#B3E5BE", "#3C2317", "#665A48", "#367E18", "#BFDB38", 20, 10, 20, 10, "Forest Green"]

  const themeSet3 = ["#89375F", "#CE5959", "#BACDDB", "#F3E8FF", "#2A2F4F", "#4F4557", "#BA90C6", "#E8A0BF", 30, 30, 30, 30, "Floral Pink"]

  const themeSet4 = ["#A84448", "#F2CD5C", "#FFF2CC", "#FFAFB2", "#FFD966", "#F6F1E9", "#E74646", "#FFD93D", 0, 30, 30, 30, "Brick Red"]
  return <Fragment>

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

        <div className="design-conf-buttons"></div>
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
      <button className="product-action-1" style={{margin: "0rem auto", width:"20rem", height: "6rem"}}>Randomize</button>
      
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

      <h3 className="heading-tertiary" style={{margin: "0.5rem 0"}}>Main Colors</h3>
      <div className="text-group">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      <input type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      </div>

      <h3 className="heading-tertiary" style={{margin: "0.5rem 0"}}>Background Colors</h3>
      <div className="text-group">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      <input type="text" placeholder="Light Color" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      </div>

      <h3 className="heading-tertiary" style={{margin: "0.5rem 0"}}>Border Radius (px)</h3>
      <div className="text-group-4">
      <input type="text" placeholder="T L" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      <input type="text" placeholder="T R" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      <input type="text" placeholder="B L" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      <input type="text" placeholder="B R" className="text-small input-number" autoComplete="off" style={{width:"100%"}}></input>
      </div>

      </div>
      <div className="design-typography"></div>
      <div className="design-buttons"></div>
      </div>

      <div className="design-col-4">
      <div className="design-demo"></div>
      <div className="demo-typography"></div>
      </div>
      
    </div>

    {/* <form onSubmit={onSubmit}>
            <h3>dark color</h3>
            <input value={Light_DarkColor} onChange={handleLight_DarkColorChange}></input>
            <h3>light color</h3>
            <input value={Light_LightColor} onChange={handleLight_LightColorChange}></input>
            <button type="submit">Enter</button>
        </form> */}
  </Fragment>
}

export default Designing

export { getServerSideProps }