import Link from "next/link"

function CheckoutButton2(props){
    return <Link href={`/${props.route}/signup`}  className="product-action-2 heading-secondary flex-row-align" type="button" style={{width:"24rem", margin:"0", textDecoration:"none"}}>
    <h2 className="heading-secondary" style={{margin:"0 auto"}}>Sign-Up</h2>
    </Link>
}

export default CheckoutButton2