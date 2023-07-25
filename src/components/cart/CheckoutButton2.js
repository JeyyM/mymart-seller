import Link from "next/link"
import { useRouter } from "next/router";

function CheckoutButton2(props){
    const router = useRouter();
    const {screenWidth} = props

    const handleClick = () => {
      props.click()
      router.push(`/${props.route}/signup`);
    };

    return <button onClick={handleClick} className="product-action-2 heading-secondary flex-row-align" style={{width:`${screenWidth > 400 ? "24rem" : screenWidth > 300 ? "20rem" : "16rem"}`, margin:"0", textDecoration:"none"}}>
    <h2 className="heading-secondary solid-button" style={{margin:"0 auto"}}>Sign-Up</h2>
    <h2>{props.click}</h2>
    </button>
}

export default CheckoutButton2