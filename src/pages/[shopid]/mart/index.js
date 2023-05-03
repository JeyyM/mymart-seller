import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import Link from "next/link"

function Mart(martID) {
    const id = martID.shopID._id

    return <Fragment>
        <Head>
            <title>Mart Details</title>
        </Head>

        <span className="page-heading">
            <div className="heading-icon-dropshadow">
                <div className="heading-icon-manage svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin">My Mart</h1>
        </span>

        <div className="setting-grid">
            <Link className="homepage-button x item-setup flex-col-center" href={`/${id}/mart/details`} style={{ textDecoration: "none" }}>
                <div className="about-button-pin svg-down"></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Contact Details & Footer</h2>
            </Link>
            <Link className="homepage-button x item-setup flex-col-center" href={`/${id}/mart/payment`} style={{ textDecoration: "none" }}>
                <div className="about-button-credit svg-down"></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Payment & Fees</h2>
            </Link>
            <Link className="homepage-button x item-setup flex-col-center" href={`/${id}/mart/about`} style={{ textDecoration: "none" }}>
                <div className="about-button-flag svg-down"></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Create About Page</h2>
            </Link>
            <Link className="homepage-button x item-setup flex-col-center" href={`/${id}/mart/about`} style={{ textDecoration: "none" }}>
                <div className="about-button-pop-up svg-down"></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Images & Pop-up</h2>
            </Link>
            <Link className="homepage-button x item-setup flex-col-center" href={`/${id}/mart/about`} style={{ textDecoration: "none" }}>
                <div className="about-button-messenger svg-down"></div>
                <h2 className="heading-primary" style={{ display: "inline", margin: "1rem auto", textAlign: "center" }}>Messenger Plugin</h2>
            </Link>


        </div>
    </Fragment>
}

export default Mart

export { getServerSideProps }