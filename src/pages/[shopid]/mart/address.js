import { Fragment } from "react"
import { getServerSideProps } from "../categories"

function Address(martID){
    return <Fragment>
        <section className="location-container">
        <span className="page-heading">
            <div className="heading-icon-dropshadow">
                <div className="heading-icon-home svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin">Address Details</h1>
        </span>
        
        </section>
    </Fragment>
}

export default Address

export {getServerSideProps}