import { Fragment, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

function ErrorPage() {
    const router = useRouter()
    function redirect(){
        router.push("/error");
    }

    return <Fragment>
        <Head>
        <link rel="icon" type="image/jpeg" href="/light.png" />
            <title>Mart Does Not Exist</title>
        </Head>

        <div className="empty-contents" style={{marginTop:"10vh"}}>
        <div className="empty-nonexist svg-color">&nbsp;</div>
        <h2 className="empty-text" style={{textAlign:"center"}}>Mart name does not exist, was renamed, or was deleted.</h2>
        <Link className="product-action-2" href="/" style={{marginTop:"-5rem", textDecoration:"none"}}>
        <div style={{marginTop:"1rem", marginLeft:"2.2rem"}}>Back to Home</div>
        </Link>
      </div>
    </Fragment>
}

export default ErrorPage
