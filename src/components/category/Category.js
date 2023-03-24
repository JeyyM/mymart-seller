import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"



function Category(props){

    const {categoryName, categoryImage, categoryDescription, categoryProducts} = props.items
    const router = useRouter()
    const shopId = router.query.shopid

    const value = JSON.stringify(categoryProducts)
    // console.log(value)

    // function sendData(){
    //     Router.push({
    //         pathname: "/[givenid]/categories/[categoryname]", query: { givenid: 'id', categoryname: categoryName, givenProducts: value}
    //     })
    // }

    return <Link className="category" href={{pathname: `/${shopId}/${categoryName}`, query: { shopid: shopId },}}>
    
        <img src={categoryImage} className="category-img"></img>
        <div className="category-content">
        <h2 className="heading-secondary category-name">{categoryName}</h2>
        <h3 className="heading-tertiary"> {categoryDescription}</h3>
        </div>
    </Link>
}

export default Category