import { Fragment, useState } from "react"
import HomepageButton from "../components/homepage/Homepage-Button"
import Head from "next/head"
import Link from "next/link"

function HomePage() {
    const [idInput, setIdInput] = useState("64b7787af81c8adaa29eae4b")

    const idChangeHandler = (event) => {
        setIdInput(event.target.value);
    };

    return <Fragment>
        <Head>
            <title>Default Page</title>
        </Head>

        <h1 className="heading-primary">Default Page</h1>
        <a href="/64c84adf0cac7b00a22be359" className="heading-secondary" style={{marginTop:"1rem"}}>Shop 1</a>
                        <a href="/64c97d5cc0920367fad4222b" className="heading-secondary" style={{marginTop:"1rem"}}>Shop 2</a>
                        <a href="/64c9a0fb66248cc084a3ae8f" className="heading-secondary" style={{marginTop:"1rem"}}>Shop 3</a>
        <main className="maincontainer">

            <input type="text" value={idInput} onChange={idChangeHandler}></input>
            <Link href={`/${idInput}`}>
                To Home
            </Link>

        </main>
    </Fragment>
}

export default HomePage



