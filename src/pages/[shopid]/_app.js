import "./main.scss";
import NavbarLayout from "@/components/navbar/Navbar-Layout";

export default function App({ Component, pageProps }) {
  return 
  <NavbarLayout><Component {...pageProps} /></NavbarLayout>;
}
