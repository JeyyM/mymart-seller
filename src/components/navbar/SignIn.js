import Link from "next/link"
import { useRouter } from "next/router"

function SignIn(){
    const router = useRouter( )
    const id = router.query.shopid
    return <>
    <Link className="product-action-1 log-button flex-row-align" href={`/${id}/login`} style={{textDecoration:"none", justifyContent: "center"}}><h2 className="heading-tertiary outline-button">Log-In</h2></Link>
    <Link className="product-action-2 sign-button flex-row-align" href={`/${id}/signup`} style={{ justifyContent: "center", textDecoration: "none" }}>
      <h2 className="heading-tertiary button-solid-text solid-button">Sign-Up</h2>
    </Link>
  </>
}

export default SignIn