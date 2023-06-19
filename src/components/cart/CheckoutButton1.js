import Link from "next/link"
import { useRouter } from "next/router";

function CheckoutButton1(props){
    const router = useRouter()

    const handleClick = () => {
      props.click()
      router.push(`/${props.route}/checkout`);
    };

return <button onClick={handleClick} className="product-action-2 heading-secondary flex-row-align" type="button" style={{width:"24rem", margin:"0", textDecoration:"none"}}>
<div className="menu-checkout svg-solid-button">&nbsp;</div><h2 className="heading-secondary solid-button">To Checkout</h2>
</button>

}

export default CheckoutButton1