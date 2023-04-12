import Link from "next/link"
import { motion } from "framer-motion";
import Image from "next/image";

function CategoryProducts(props) {

    const { productDescription, productName, productPrice, productStock, productImages } = props.items
    const MotionLink = motion(Link);

    return <MotionLink className="category" href={{ pathname: `/${props.id}/categories/${props.categName}/${productName}`, query: { shopid: props.id }, }}
        key={props.index}
        initial={!props.state ? { opacity: 0, x: -100 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}>

        <div className="image-container">
            <Image src={productImages[0]} className="category-img" layout="fill" unoptimized={false} alt={productName} priority={true}></Image>
        </div>

        {/* <img src={productImages[0]} className="category-img"></img> */}
        <div className="category-content">
            <div>
                <h2 className="heading-secondary category-name">{productName.length > 40 ? productName.substring(0, 37) + "..." : productName}</h2>
                <h3 className="heading-tertiary">{productDescription.length > 150 ? productDescription.substring(0, 147) + "..." : productDescription}</h3>
            </div>
            <div className="product-number-container">
                <h2 className="heading-secondary product-numbers product-price">${productPrice}</h2>
                <h2 className="heading-secondary product-numbers">{productStock.stockAmount} {productStock.stockUnit}</h2>
            </div>
        </div>
    </MotionLink>
}

export default CategoryProducts