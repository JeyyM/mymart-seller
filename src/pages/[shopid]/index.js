import { Fragment, useState, useEffect } from "react"
import HomepageButton from "../../components/homepage/Homepage-Button"
import HomepageButtonBlank from "@/components/homepage/Homepage-Button-Blank"
import HomepageLater from "@/components/homepage/HomapageLater"
import { useRouter } from "next/router"
import Head from "next/head"
import { getServerSideProps } from "@/utilities/serversideProps"
import pako from "pako";

function HomePage({ shopID, screenWidth }){
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
    const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    const final = JSON.parse(decompressedBytes);

    useEffect(() => {
      if (typeof window !== "undefined") {
        alert(
          `WARNING: People may freely add text and images (limited to Imgur links). If you see crude imagery or slurs, I did not add those. The images set up are from Lorem Picsum to generate random images and avoid copyright problems. Since they are from this site, they may load slower. Be wary of links such as the banner slides and additional links in the footer. This can be customized and people may put malicious links.`
        );
      }
    }, []);
  
    const redirectToErrorPage = () => {
      if (!final) {
        router.push("/error");
      }
      setLoading(false);
    };
  
    useEffect(() => {
      redirectToErrorPage();
    }, [final]);
  
    if (loading) {
      return <p></p>;
    }
  
    if (!final) {
      return null;
    }

    const shopData = final.shopData;
    const favicon = final.shopData.shopDetails.imageData.icons.icon

    let mode = ""
    if (shopData.shopDesigns.defaultMode){mode = "/light"} else {
        mode = "/dark"
    }

    const colorState = shopData.shopDesigns.defaultMode

    let defaultColors = {}

    if (colorState){
        defaultColors = shopData.shopDesigns.lightDesign
    } else {defaultColors = shopData.shopDesigns.darkDesign}

    return <Fragment>
<Head>
  <title>Dashboard</title>
  <link rel="icon" type="image/jpeg" href={favicon} />

</Head>
        <h1 className="heading-primary">Dashboard</h1>
        <main className="maincontainer">
            <HomepageButton color={defaultColors} title={"Add and edit categories, products, and variations"} item="home-category" label="Categories & Products" direction="categories"></HomepageButton>
            {screenWidth < 650 && <HomepageButton color={defaultColors} item="home-insights" label="Mart Analytics" direction="analytics"></HomepageButton>}
            <HomepageButton color={defaultColors} item="home-ongoing" label="Ongoing Sales" direction="orders"></HomepageButton>
            {screenWidth >= 650 && screenWidth < 1000 && <HomepageButton color={defaultColors} item="home-insights" label="Mart Analytics" direction="analytics"></HomepageButton>}
            <HomepageButton color={defaultColors} title={"Set about page, descriptions, footers, and details of your mart"} item="home-manage" label="My Mart" direction="mart"></HomepageButton>
            {screenWidth > 1000 && <HomepageButton color={defaultColors} item="home-insights" label="Mart Analytics" direction="analytics"></HomepageButton>}
            <HomepageButton color={defaultColors} item="home-receipt" label="Customer Records" direction="records"></HomepageButton>
            <HomepageButton color={defaultColors} title={"Edit mart's colors and fonts"} item="home-brush" label="Mart Design" direction="design" extra={mode}></HomepageButton>
            <HomepageButtonBlank color={defaultColors} item="home-policy" label="Terms & Policies" direction="policies"></HomepageButtonBlank>
            <HomepageLater color={defaultColors} item="home-support" label="Customer Service" direction="toggle"></HomepageLater>
            <HomepageButtonBlank color={defaultColors} item="home-quiz" label={screenWidth > 450 ? "Frequently Asked Questions" : "FAQ"} direction="faq"></HomepageButtonBlank>
            <HomepageLater color={defaultColors} item="home-power" label="Close or Open Mart" direction="toggle"></HomepageLater>
        </main>
    </Fragment>
}

export default HomePage

export {getServerSideProps}

