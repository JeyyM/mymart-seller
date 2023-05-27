import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

function CategoryProductsBuyer(props) {
  const { productName, productDescription, productPrice, productStock, productImages } = activeCheck(props.items);
  const id = props.id;
  const MotionLink = motion(Link);

  console.log(props.items);

  const encodedName = encodeURIComponent(props.items[0].productName);

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

  return (
    <MotionLink
      className="category"
      href={{ pathname: `/${props.id}/categories/${props.categName}/${encodedName}` }}
      key={props.index}
      initial={!isDragging ? { opacity: 0, x: -100 } : false}
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

      <div className="category-content">
        <div>
          <h2 className="heading-secondary category-name">{productName.length > 40 ? productName.substring(0, 37) + "..." : productName}</h2>
          <h3 className="heading-tertiary">{productDescription.length > 150 ? productDescription.substring(0, 147) + "..." : productDescription}</h3>
        </div>
        <div className="product-number-container">
          <h2 className="heading-secondary product-numbers product-price">{props.currency} {productPrice}</h2>
          <h2 className="heading-secondary product-numbers">{productStock.stockAmount} {productStock.stockUnit}</h2>
        </div>
      </div>
    </MotionLink>
  );
}

function activeCheck(items) {
  for (const item of items) {
    if (item.active) {
      return item;
    }
  }

  return {
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: {
      stockAmount: "",
      stockUnit: ""
    },
    productImages: []
  };
}

export default CategoryProductsBuyer;
