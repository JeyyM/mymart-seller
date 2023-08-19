import { Fragment, useState } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import Link from "next/link"
import AdminData from "@/components/Mart/AdminData"
import { useRouter } from "next/router"
import pako from "pako";

function Mart({ shopID, screenWidth }) {
    const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
    const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    const final = JSON.parse(decompressedBytes);

    const router = useRouter()
    const id = final._id
    const favicon = final.shopData.shopDetails.imageData.icons.icon

    const [settings, setSettings] = useState(false)
    function handleSettings(){
        setSettings(!settings)
    }

    let chosenMode = {}

    if (final.shopData.shopDesigns.defaultMode === true) {
        chosenMode = final.shopData.shopDesigns.lightDesign
    } else if (final.shopData.shopDesigns.defaultMode === false) {
        chosenMode = final.shopData.shopDesigns.darkDesign
    }

    async function submitChanges(formdata) {

        const response = await fetch(
          `../../api/edit-admin?martid=${router.query.shopid}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
          }
        );
        const data = await response.json();
      }

    return <Fragment>
        <Head>
            <title>Mart Details</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
        </Head>

        <AdminData modalStatus={settings} disable={handleSettings} name={final.name} email={final.email} description={final.description} data={final.adminData} chosenMode={chosenMode} screenWidth={screenWidth} finish={submitChanges}></AdminData>

        <span className="page-heading">
            <div className="heading-icon-dropshadow">
                <div className="heading-icon-manage svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin">My Mart</h1>
        </span>

        <div className="setting-grid">
            <Link className="mymart-button x item-setup flex-col-center" href={`/${id}/mart/details`} style={{ textDecoration: "none" }}>
                <div className={`${screenWidth > 350 ? "about-button-pin" : "about-button-pin-2"} svg-down`}></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Contact Details & Footer</h2>
            </Link>
            <Link className="mymart-button x item-setup flex-col-center" href={`/${id}/mart/payment`} style={{ textDecoration: "none" }}>
                <div className={`${screenWidth > 350 ? "about-button-credit" : "about-button-credit-2"} svg-down`}></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Payment & Fees</h2>
            </Link>
            <Link className="mymart-button x item-setup flex-col-center" href={`/${id}/mart/about`} style={{ textDecoration: "none" }}>
                <div className={`${screenWidth > 350 ? "about-button-flag" : "about-button-flag-2"} svg-down`}></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Create About Page</h2>
            </Link>
            <Link className="mymart-button x item-setup flex-col-center" href={`/${id}/mart/images`} style={{ textDecoration: "none" }}>
                <div className={`${screenWidth > 350 ? "about-button-pop-up" : "about-button-pop-up-2"} svg-down`}></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Images & Pop-up</h2>
            </Link>
            <button className="mymart-button x item-setup flex-col-center" onClick={handleSettings}>
                <div className={`${screenWidth > 350 ? "about-button-settings" : "about-button-settings-2"} svg-down`}></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Mart Settings</h2>
            </button>
            {/* <Link className="mymart-button x item-setup flex-col-center" href={`/${id}/mart/about`} style={{ textDecoration: "none" }}>
                <div className="about-button-messenger svg-down"></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Messenger Plugin</h2>
            </Link> */}


        </div>
    </Fragment>
}

export default Mart

export { getServerSideProps }