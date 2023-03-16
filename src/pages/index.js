import { Fragment } from "react"
import HomepageButton from "../components/homepage/Homepage-Button"
import Head from "next/head"

function HomePage(){
    return <Fragment>
    <Head>
        <title>Default Page</title>
    </Head>

        <h1 className="heading-primary">Default Page</h1>
        <main className="maincontainer">

        </main>
    </Fragment>
}

export default HomePage