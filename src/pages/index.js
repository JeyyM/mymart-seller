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
            {/* <HomepageButton item="home-category" label="Categories & Products"></HomepageButton>
            <HomepageButton item="home-ongoing" label="Ongoing Sales"></HomepageButton>
            <HomepageButton item="home-manage" label="My Mart"></HomepageButton>
            <HomepageButton item="home-insights" label="Mart Analytics"></HomepageButton>
            <HomepageButton item="home-receipt" label="Customer Records"></HomepageButton>
            <HomepageButton item="home-brush" label="Mart Design"></HomepageButton>
            <HomepageButton item="home-quiz" label="Frequently Asked Questions"></HomepageButton>
            <HomepageButton item="home-policy" label="Terms & Policies"></HomepageButton>
            <HomepageButton item="home-support" label="Customer Service"></HomepageButton>
            <HomepageButton item="home-power" label="Close or Open Mart"></HomepageButton> */}
        </main>
    </Fragment>
}


// <div className="item1"><h1>1</h1></div>
//             <div className="item2"><h1>2</h1></div>
//             <div className="item3"><h1>3</h1></div>
//             <div className="item4"><h1>4</h1></div>
//             <div className="item5"><h1>5</h1></div>
//             <div className="item6"><h1>6</h1></div>
//             <div className="item7"><h1>7</h1></div>
//             <div className="item8"><h1>8</h1></div>
//             <div className="item9"><h1>9</h1></div>
//             <div className="item10"><h1>10</h1></div>

export default HomePage