import { Fragment, useState } from "react";
import { getServerSideProps } from "../../../utilities/serversideProps"
import { useRouter } from "next/router";

function Designing ({ shopID }){
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

  function onSubmit(event){
    event.preventDefault()
    const data = {"color-primary-dark": Light_DarkColor, "color-primary-light": Light_LightColor}
    console.log(data)
    finishForm(data)
  }

    return <Fragment>
        <form onSubmit={onSubmit}>
            <h3>dark color</h3>
            <input value={Light_DarkColor} onChange={handleLight_DarkColorChange}></input>
            <h3>light color</h3>
            <input value={Light_LightColor} onChange={handleLight_LightColorChange}></input>
            <button type="submit">Enter</button>
        </form>
    </Fragment>
}

export default Designing

export {getServerSideProps}