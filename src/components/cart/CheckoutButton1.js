import Link from "next/link"

function CheckoutButton1(props){
return <Link href={`/${props.route}/checkout`} className="product-action-2 heading-secondary flex-row-align" type="button" style={{width:"24rem", margin:"0", textDecoration:"none"}}>
<div className="menu-checkout svg-solid-button">&nbsp;</div><h2 className="heading-secondary solid-button">To Checkout</h2>
</Link>

}

export default CheckoutButton1