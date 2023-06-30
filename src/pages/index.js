import { Fragment, useState } from "react"
import HomepageButton from "../components/homepage/Homepage-Button"
import Head from "next/head"
import Link from "next/link"

function HomePage() {
    const [idInput, setIdInput] = useState("64980be9831cd7b17ccde9f8")

    const idChangeHandler = (event) => {
        setIdInput(event.target.value);
    };

    return <Fragment>
        <Head>
            <title>Default Page</title>
        </Head>

        <h1 className="heading-primary">Default Page</h1>
        <main className="maincontainer">

            <input type="text" value={idInput} onChange={idChangeHandler}></input>
            <Link href={`/${idInput}`}>
                To Home
            </Link>

        </main>
    </Fragment>
}

export default HomePage



