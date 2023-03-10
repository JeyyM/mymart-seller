import { useRouter } from "next/router"
import { Fragment } from "react"

function ProductsPage(){
    const router = useRouter()
    // const {categoryProducts} = router.query
    // console.log(categoryProducts)

    const {query: {givenProducts}} = router

    const props = { givenProducts }

    console.log(props.givenProducts)

    return <Fragment>
    <h1>Products page</h1>
    </Fragment>
}

export default ProductsPage