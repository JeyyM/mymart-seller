import Image from "next/image"
import mainlogo from "../../assets/mainlogo.png"

function NavLogo(props){
    return <a href="#">
        <Image src={mainlogo} alt="company logo" className="company-logo-med"></Image>
    </a>
    }
    
    export default NavLogo