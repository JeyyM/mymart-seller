
import { useRouter } from "next/router";


function Cart(props) {
    const router = useRouter()

    return (
        <>
          {props.children}
        </>
      );    
}

export default Cart;
