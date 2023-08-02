import Link from "next/link"
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

function CategoryProducts(props) {

    const { productDescription, productName, productPrice, productStock, productImages } = props.items[0]
    const id = props.id
    const MotionLink = motion(Link);

    const encodedName = encodeURIComponent(productName)

    const [isDragging, setIsDragging] = useState(false);
    const holdTimeoutRef = useRef(null);

    const handleMouseDown = () => {
        holdTimeoutRef.current = setTimeout(() => {
            setIsDragging(true);
        }, 200);
    };

    const handleMouseUp = () => {
        clearTimeout(holdTimeoutRef.current);
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleWindowMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mouseup", handleWindowMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleWindowMouseUp);
        };
    }, []);


    return <MotionLink
        className="category"
        href={{ pathname: `/${props.id}/categories/${props.categName}/${encodedName}` }}
        key={props.index}
        initial={!isDragging && !props.state ? { opacity: 0, x: -100 } : false}
          animate={!isDragging ? { opacity: 1, x: 0 } : false}
        transition={{ duration: 0.2 }}
        draggable={false}
        onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          >

        <div className="image-container">
            <img src={productImages[0]} className="category-img" alt={productName}></img>
        </div>

        {/* <img src={productImages[0]} className="category-img"></img> */}
        <div className="category-content">
            <div>
                <h2 className="heading-secondary category-name clamp-1">{productName}</h2>
                <h3 className="heading-tertiary clamp-4">{productDescription}</h3>
            </div>
            <div className="product-number-container">
                <h2 className="heading-secondary product-numbers product-price">{props.currency} {productPrice} / {productStock.stockUnit}</h2>
                <h2 className="heading-secondary product-numbers">Stock: {productStock.stockAmount}</h2>
            </div>
        </div>
    </MotionLink>
}

export default CategoryProducts