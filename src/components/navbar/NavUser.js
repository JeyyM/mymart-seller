import Link from "next/link"
import { useRouter } from "next/router"

function NavUser(props){
    const router = useRouter()

    return <Link href={`/${router.query.shopid}`} title={props.title} style={{ textDecoration: 'none' }}>
    <button className="navitem">
    <div className="heading-icon-profile svg-color">&nbsp;</div>
        <h3 className="heading-tertiary">My Profile</h3></button>
    </Link>
}

export default NavUser