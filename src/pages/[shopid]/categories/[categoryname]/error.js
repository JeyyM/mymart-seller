import { Fragment, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import { getServerSideProps } from "@/utilities/serversideProps"

function Catch({ shopID, screenWidth }){
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    const redirectToErrorPage = () => {
      if (!shopID) {
        router.push("/error");
      }
      setLoading(false);
    };
  
    useEffect(() => {
      redirectToErrorPage();
    }, [shopID]);
  
    if (loading) {
      return <p></p>;
    }
  
    if (!shopID) {
      return null;
    }

    const { shopid } = router.query;
    const shopData = shopID.shopData;
    const favicon = shopID.shopData.shopDetails.imageData.icons.icon

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
  <title>Page Does Not Exist</title>
  <link rel="icon" type="image/jpeg" href={favicon} />

</Head>
        <div className="empty-contents" style={{marginTop:"10vh"}}>
        <div className="empty-nonexist svg-color">&nbsp;</div>
        <h2 className="empty-text" style={{textAlign:"center"}}>404 Page Not Found</h2>
        <h3 className="heading-tertiary" style={{marginTop:"-10rem"}}>Category Does Not Exist, Was Deleted, Disabled, or Renamed</h3>
        <Link className="product-action-2" href={`/${router.query.shopid}`} style={{textDecoration:"none"}}>
        <div style={{marginTop:"1rem", marginLeft:"2.2rem"}}>Back to Home</div>
        </Link>
      </div>
    </Fragment>
}

export default Catch

export {getServerSideProps}

