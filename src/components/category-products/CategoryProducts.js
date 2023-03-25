import Link from "next/link"

function CategoryProducts(props){

    const {productDescription, productName, productPrice, productStock, productImages} = props.items

    return <Link className="category" href={{pathname: `/${props.id}/categories/${props.categName}/${productName}`, query: { shopid: props.id },}}>
    
        <img src={productImages[0]} className="category-img"></img>
        <div className="category-content">
        <div>
        <h2 className="heading-secondary category-name">{productName}</h2>
        <h3 className="heading-tertiary"> {productDescription}</h3>
        </div>
        <div className="product-number-container">
            <h2 className="heading-secondary product-numbers product-price">${productPrice}</h2>
            <h2 className="heading-secondary product-numbers">{productStock.stockAmount} {productStock.stockUnit}</h2>
        </div>
        </div>
    </Link>
}

export default CategoryProducts