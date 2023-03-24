import { Fragment } from "react"
import HomepageButton from "../components/homepage/Homepage-Button"
import Head from "next/head"
import Link from "next/link"

function HomePage(){
    return <Fragment>
    <Head>
        <title>Default Page</title>
    </Head>

        <h1 className="heading-primary">Default Page</h1>
        <main className="maincontainer">

        <Link href=""><div><h1>To home</h1></div></Link>

        </main>
    </Fragment>
}

export default HomePage



