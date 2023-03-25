import Image from "next/image"
import mainlogo from "../../assets/mainlogo.png"
import Link from "next/link"
import { useRouter } from "next/router"

function NavLogo(props){
    const router = useRouter()

    return <Link href={`/${router.query.shopid}`}>
        <Image src={mainlogo} alt="company logo" className="company-logo-med"></Image>
    </Link>
    }
    
    export default NavLogo