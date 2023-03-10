import { useRouter } from "next/router"

function ProductsPage(){
    const router = useRouter()
    // const {categoryname} = router.query
    return <h1>Products page</h1>
}

export default ProductsPage