import Link from "next/link"
import { useRouter } from "next/router"

function NavItem(props){
    const router = useRouter()

    let extra = ""
    if (props.extension){extra = props.extension}

    return <Link href={`/${router.query.shopid}/${props.link}${extra}`} style={{ textDecoration: 'none' }}><button className="navitem">{props.svg}
    <h3 className="heading-tertiary">{props.label}</h3></button>
    </Link>
}

export default NavItem