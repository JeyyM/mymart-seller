import Link from "next/link"
import { useRouter } from "next/router"
import { motion } from "framer-motion";
import Image from "next/image";

function Category(props) {
    const MotionLink = motion(Link);
    const { categoryName, categoryImage, categoryDescription, categoryProducts } = props.items

    return <>
        <MotionLink className="category marginer" href={{ pathname: `/${props.id}/categories/${categoryName}`}}
            initial={!props.state ? { opacity: 0, x: -100 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}>

            <button className="categ-edit-button" onClick={(event) => { props.edit2([categoryName, categoryImage, categoryDescription, props.index]); props.edit(event); }}><div className="heading-icon-edit svg-color">&nbsp;</div></button>
            <div className="image-container">
                <img src={categoryImage} className="category-img" alt={categoryName}></img>
            </div>
            <div className="category-content">
                <div>
                    <h2 className="heading-secondary category-name">{categoryName.length > 40 ? categoryName.substring(0, 37) + "..." : categoryName}</h2>
                    <h3 className="heading-tertiary">{categoryDescription.length > 150 ? categoryDescription.substring(0, 147) + "..." : categoryDescription}</h3>
                </div>
            </div>
        </MotionLink>
    </>
}

export default Category