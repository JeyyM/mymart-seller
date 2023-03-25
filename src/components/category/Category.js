import Link from "next/link"
import { useRouter } from "next/router"
// import Image from "next/image"

function Category(props){

    const {categoryName, categoryImage, categoryDescription, categoryProducts} = props.items

    return <Link className="category" href={{pathname: `/${props.id}/categories/${categoryName}`, query: { shopid: props.id },}}>
    
        <img src={categoryImage} className="category-img"></img>
        <div className="category-content">
        <div>
        <h2 className="heading-secondary category-name">{categoryName}</h2>
        <h3 className="heading-tertiary"> {categoryDescription}</h3>
        </div>
        </div>
    </Link>
}

export default Category