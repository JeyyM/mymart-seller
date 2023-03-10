import Link from "next/link"
import { useRouter } from "next/router"
import Router from "next/router"

function Category(props){
    const {categoryName, categoryImage, categoryDescription, categoryProducts} = props.items
    const router = useRouter()
    const shopId = router.query.givenid

    const value = JSON.stringify(categoryProducts)

    function sendData(){
        Router.push({
            pathname: "/[givenid]/categories/[categoryname]", query: { givenid: 'id', categoryname: categoryName, givenProducts: value}
        })
    }

    return <div className="category" onClick={sendData}>
    
        <img src={categoryImage} className="category-img"></img>
        <div className="category-content">
        <h2 className="heading-secondary category-name">{categoryName}</h2>
        <h3 className="heading-tertiary"> {categoryDescription}</h3>
        </div>
    </div>
}

export default Category