import Link from "next/link"
import { useRouter } from "next/router"

function NavItem(props){
    const router = useRouter()

    return <Link href={`${router.query.shopid}/${props.link}`} style={{ textDecoration: 'none' }}><button className="navitem">{props.svg}
    <h3 className="heading-tertiary">{props.label}</h3></button>
    </Link>
}

export default NavItem