import { Fragment } from "react";
import { getServerSideProps } from "../categories";
import Head from "next/head";

function About(shopID){
    return <Fragment>
    <Head>
      <title>Create About Page</title>
      <style>
        {`
        .div-preview{height:10rem !important;
            border: 2px dashed red;}
        `}
      </style>
    </Head>
    <span className="page-heading">
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-flag svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">Create About Page&nbsp;</h1>
    </span>

    <span className="page-heading">
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-preview svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">About Page Preview&nbsp;</h1>
    </span>
        <section className="about-grid-1">
            <div className="div-preview"></div>
            <div className="div-preview"></div>
            <div className="div-preview"></div>
            <div className="div-preview"></div>
            <div className="div-preview"></div>
            <div className="div-preview"></div>
            <div className="div-preview"></div>
            <div className="div-preview"></div>
        </section>
    </Fragment>
}

export default About
export {getServerSideProps}