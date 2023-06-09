import Link from "next/link"
import { useRouter } from "next/router"

function SignIn(){
    const router = useRouter( )
    const id = router.query.shopid
    return <>
    <button className="product-action-1 log-button"><h2 className="heading-tertiary">Log-In</h2></button>
    <Link className="product-action-2 sign-button flex-row-align" href={`/${id}/signup`} style={{ justifyContent: "center", textDecoration: "none" }}>
      <h2 className="heading-tertiary button-solid-text">Sign-Up</h2>
    </Link>
  </>
}

export default SignIn