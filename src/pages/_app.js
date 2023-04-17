import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  return <NavbarLayout><Component {...pageProps} /></NavbarLayout>;
}
