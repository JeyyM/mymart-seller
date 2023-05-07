import { Fragment, useState } from "react";
import { getServerSideProps } from "../categories";
import Head from "next/head";

function About(shopID){
  const [rowCount, setRowCount] = useState(10)
  const [rowHeight, setRowHeight] = useState(10)

  // const prevDivs = []
  // for (let i = 0; i < rowCount; i++) {
  //   prevDivs.push(<div className="div-preview" key={i}>Div {i + 1}</div>);
  // }

const prevDivs = Array.from({ length: (rowCount * 10) }, (_, index) => (
  <div key={index} className="div-preview" style={{ gridColumn: `${index % 10 + 1}/${index % 10 + 2}`, gridRow: `${Math.floor(index / 10) + 1}/${Math.floor(index / 10) + 2}`}}>Div {index + 1}</div>
));


    return <Fragment>
    <Head>
      <title>Create About Page</title>
      <style>

      </style>
    </Head>
    <span className="page-heading">
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-flag svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">Create About Page&nbsp;</h1>
    </span>

    <label>Row count</label> <input value={rowCount} onChange={event => {setRowCount(event.target.value)}} type="number"></input>
    <label>height count</label> <input value={rowHeight} onChange={event => {setRowHeight(event.target.value)}} type="number"></input>

    <span className="page-heading">
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-preview svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">About Page Preview&nbsp;</h1>
    </span>
        <section className="about-grid-1">
      
        <>{prevDivs}</>  

        </section>  
    </Fragment>
}

export default About
export {getServerSideProps}