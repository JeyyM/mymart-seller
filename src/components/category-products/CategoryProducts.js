import Link from "next/link"
import { motion } from "framer-motion";

function CategoryProducts(props) {

    const { productDescription, productName, productPrice, productStock, productImages } = props.items
    const MotionLink = motion(Link);

    return <MotionLink className="category" href={{ pathname: `/${props.id}/categories/${props.categName}/${productName}`, query: { shopid: props.id }, }}
    key={props.index}
        alt={productName}
        initial={{ opacity: 0, x: -25, scale: 0.90 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        whileHover={{ translateY: "-0.5rem", translateX: "0.9rem" }}
        whiletap={{ translateY: "0.5rem" , translateX:"-0.9rem" }}
        transition={{ duration: 0.1 }}>
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
        </MotionLink>

}

export default CategoryProducts

// @mixin button-style() {
//     @include border-round;
//     height: 22rem;
//     position: relative;
//     display: flex;
//     justify-items: center;
//     align-items: center;
//     transition: all 0.2s;
//     background-image: $theme-bg,
//       linear-gradient(45deg, $color-primary-dark, $color-primary-light);
  
//     &:hover {
//       transform: translateY(-0.6rem) translateX(1rem);
//       filter: drop-shadow(-6px 6px 0px $color-primary-dark);
//     }
//     &:active {
//       transform: translateY(0rem) translateX(0rem);
//       filter: drop-shadow(-1px 1px 0px $color-primary-dark);
//     }
//   }

{/* <motion.div className="side-img-container" initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.2 }}
key={varState}
>
{varArray[varState][`var${varNum}`].productImages.map((v, index) => (
  <motion.img
    key={index}
    src={varArray[varState][`var${varNum}`].productImages[index]}
    alt={index}
    className={`side-img ${index === imgState ? "active-var" : ""}`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 * index, duration: 0.2 }}
    onClick={() => imgStateHandler(index)}
  />
))}
</motion.div> */}