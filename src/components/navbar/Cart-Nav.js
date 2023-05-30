import Link from "next/link"
import { useRouter } from "next/router"

function CartNav(props) {
    const router = useRouter()
    // const localStorageKey = `mart_${router.query.shopid}`
    // const storedCartItems = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;


    return <button style={{border:"none"}}>
    <button className="navitem" style={{gap:"0rem"}}>
    <h3 className="heading-secondary">1</h3>
    <div style={{transform:"translateY(-1rem)"}}>{props.svg}
        <h3 className="heading-tertiary">{props.label}</h3>
    </div>
        </button>
    </button>
}

export default CartNav