import Link from "next/link"

function Category(props){
    const {categoryName, categoryImage, categoryDescription} = props.items

    return <Link className="category" href="#">
        <h1>{categoryDescription}</h1>
    </Link>
}

export default Category