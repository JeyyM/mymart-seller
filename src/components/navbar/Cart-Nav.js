import Link from "next/link"
import { useRouter } from "next/router"

function CartNav(props) {
    const router = useRouter()

    let extra = ""
    if (props.extension) { extra = props.extension }

    return <Link href={`/${router.query.shopid}/${props.link}${extra}`} title={props.title} style={{ textDecoration: 'none' }}>
    <button className="navitem" style={{gap:"0rem"}}>
    <h3 className="heading-secondary">1</h3>
    <div style={{transform:"translateY(-1rem)"}}>{props.svg}
        <h3 className="heading-tertiary">{props.label}</h3>
    </div>
        </button>
    </Link>
}

export default CartNav