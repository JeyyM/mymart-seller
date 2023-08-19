import "./main.scss";
import "../sass/base/fonts.css"
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";
import pako from "pako";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  let compressedBytes
  let decompressedBytes
  let final

  if (pageProps.shopID){
    compressedBytes = new Uint8Array(atob(pageProps.shopID).split("").map((c) => c.charCodeAt(0)));
    decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    final = JSON.parse(decompressedBytes);
  }

  let data = {}
  let database = {}
  let colormode = ""
  let details = {}
  let iconInfo = {}
  let adminInfo = {}
  let accEmail

  if (final) {
    iconInfo = final.shopData.shopDetails.imageData.icons
    database = final.shopData.shopDesigns
    details = final.shopData.shopDetails.footerData
    adminInfo = final.adminData
    
    if (database.defaultMode) {
      data = database.lightDesign

    } else { data = database.darkDesign }

    if (router.asPath === `/${router.query.shopid}/design/light`) {
      data = database.lightDesign
      colormode = true
    }

    if (router.asPath === `/${router.query.shopid}/design/dark`) {
      data = database.darkDesign
      colormode = false
    }
  }

  if (router. asPath === "/" || !final){
    return <Component {...pageProps} />
  } else {
  return <NavbarLayout color={data} mode={colormode} contents={details} icons={iconInfo} adminInfo={adminInfo} defaultMode={database.defaultMode}><Component {...pageProps} /></NavbarLayout>;
  }
}

export { getServerSideProps }