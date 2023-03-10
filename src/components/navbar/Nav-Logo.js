import Image from "next/image"
import mainlogo from "../../assets/mainlogo.png"
import Link from "next/link"

function NavLogo(props){
    return <Link href="/id">
        <Image src={mainlogo} alt="company logo" className="company-logo-med"></Image>
    </Link>
    }
    
    export default NavLogo