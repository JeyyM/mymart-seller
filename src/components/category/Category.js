import Link from "next/link"
import { useRouter } from "next/router"

function Category(props){
    const {categoryName, categoryImage, categoryDescription} = props.items
    const router = useRouter()
    const shopId = router.query.givenid

    return <Link className="category" href="#">
    
        <img src={categoryImage} className="category-img"></img>
        <h2 className="heading-secondary">{categoryName}</h2>
        <h1>{categoryDescription}</h1>
        <h1>{categoryDescription}</h1>
        <h1>{categoryDescription}</h1>
        <h1>{categoryDescription}</h1>
        <h1>{categoryDescription}</h1>
        <h1>{categoryDescription}</h1>
    </Link>
}

export default Category