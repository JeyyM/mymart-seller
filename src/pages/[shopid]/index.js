import { Fragment, useState, useEffect } from "react"
import HomepageButton from "../../components/homepage/Homepage-Button"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import { getServerSideProps } from "@/utilities/serversideProps"
import { css } from "styled-jsx/css";


function HomePage({ shopID }){
    const router = useRouter();
    const { shopid } = router.query;
    const shopData = shopID.shopData;

    console.log(shopData)

    const [scssContent, setScssContent] = useState('');

    useEffect(() => {
      async function fetchScssFile() {
        const response = await fetch('../../api/scss-getter');
        const data = await response.json();

        console.log("data", data)
        setScssContent(data.content);
  //       const cssContent = css`
  //   :global {
  //     ${scssContent.replace(
  //       /(\$color-primary-dark):\s*(.*);/g,
  //       `$1: ${shopData.shopDesigns.lightDesign["color-primary-dark"]};`
  //     )}
  //     ${scssContent.replace(
  //       /(\$color-primary-light):\s*(.*);/g,
  //       `$1: ${shopData.shopDesigns.lightDesign["color-primary-light"]};`
  //     )}
  //   }
  // `;

  const cssContent = `
    :global {
      ${data.content.replace(
        /(\$color-primary-dark):\s*(.*);/g,
        (match, p1, p2, p3) => `${p1}: ${shopData.shopDesigns.lightDesign["color-primary-dark"]};`
      )}
    }
  `;

  console.log("css content", cssContent)
      }
      fetchScssFile();
    }, []);

    console.log ("scss content", scssContent)

    return <Fragment>
<Head>
  <title>Dashboard</title>
  <style> 
  { `h1 { color: ${shopData.shopDesigns.lightDesign["color-primary-light"]} !important; }` }
  </style>
</Head>
        <h1 className="heading-primary">Dashboard</h1>
        <main className="maincontainer">
            <HomepageButton item="home-category" label="Categories & Products" direction="categories" priority="eager"></HomepageButton>
            <HomepageButton item="home-ongoing" label="Ongoing Sales" priority="lazy"></HomepageButton>
            <HomepageButton item="home-manage" label="My Mart" priority="lazy"></HomepageButton>
            <HomepageButton item="home-insights" label="Mart Analytics" priority="eager"></HomepageButton>
            <HomepageButton item="home-receipt" label="Customer Records" priority="lazy"></HomepageButton>
            <HomepageButton item="home-brush" label="Mart Design" priority="lazy"></HomepageButton>
            <HomepageButton item="home-quiz" label="Frequently Asked Questions"></HomepageButton>
            <HomepageButton item="home-policy" label="Terms & Policies"></HomepageButton>
            <HomepageButton item="home-support" label="Customer Service"></HomepageButton>
            <HomepageButton item="home-power" label="Close or Open Mart"></HomepageButton>
        </main>
    </Fragment>
}

export default HomePage

export {getServerSideProps}

