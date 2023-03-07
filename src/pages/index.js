import { Fragment } from "react"
import HomepageButton from "../components/homepage/Homepage-Button"

function HomePage(){
    return <Fragment>
        <h1 className="heading-primary">Dashboard</h1>
        <main className="maincontainer">
            <HomepageButton item="home-category" label="Category"></HomepageButton>
            <HomepageButton item="home-ongoing" label="Ongoing"></HomepageButton>
            <HomepageButton item="home-manage" label="manage"></HomepageButton>
            <HomepageButton item="home-insights" label="insight"></HomepageButton>
            <HomepageButton item="home-receipt" label="receipt"></HomepageButton>
            <HomepageButton item="home-brush" label="brush"></HomepageButton>
            <HomepageButton item="item7" label="faq"></HomepageButton>
            <HomepageButton item="item8" label="terms"></HomepageButton>
            <HomepageButton item="item9" label="customer service"></HomepageButton>
            <HomepageButton item="home-power" label="power"></HomepageButton>
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