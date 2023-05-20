import { Fragment, useState } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import Link from "next/link"

function Mart(martID) {
    const id = martID.shopID._id
    const [favicon, setFavicon] = useState("https://i.imgur.com/qlmYdJO.jpeg")
    const handleFaviconChange = (event) => {
        setFavicon(event.target.value);
      };

    return <Fragment>
        <Head>
            <title>Images</title>

            <link rel="icon" type="image/jpeg" href={favicon} />

        </Head>

        <span className="page-heading">
            <div className="heading-icon-dropshadow">
                <div className="heading-icon-pop-up svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin">&nbsp;Images</h1>
        </span>

        <div className="images-container">
            <div className="images-column">
                <span className="page-heading flex-row-align">
                    <div className="heading-icon-favicon svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin">Set Shop Icon</h1>
                </span>
                <h3 className="heading-tertiary" style={{ margin: "1rem" }}>Input an Imgur jpeg link</h3>

                <div className="flex-row-align">
                <input className="text-small input-number" type="text"  onChange={handleFaviconChange} value={favicon}></input>
                <img src={favicon} style={{height:"16px", width:"16px"}}></img>
                </div>

                <span className="page-heading flex-row-align" style={{marginTop:"1rem"}}>
                    <div className="heading-icon-navbar-logo svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin">Set Navbar Logo</h1>
                </span>
                <h3 className="heading-tertiary" style={{ margin: "1rem" }}>Input an Imgur jpeg link</h3>

                <input className="text-small input-number" type="text"  onChange={handleFaviconChange} value={favicon}></input>

            </div>








            <div className="images-column">
                <span className="page-heading flex-row-align" style={{ padding: "1rem" }}>
                    <div className="heading-icon-typography svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin">Typography Preview</h1>
                </span>
            </div>
        </div>
    </Fragment>
}

export default Mart

export { getServerSideProps }