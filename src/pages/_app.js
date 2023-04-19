import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";
import { getServerSideProps } from "../utilities/serversideProps";

export default function App({ Component, pageProps }) {
  let data = {}

  // console.log(pageProps.shopID)
  const database = pageProps.shopID.shopData.shopDesigns
  if (database.defaultMode){
    data = database.lightDesign
  } else {data = database.darkDesign}

  return <NavbarLayout color={data} mode={database.defaultMode}><Component {...pageProps} /></NavbarLayout>;
}

export {getServerSideProps}
