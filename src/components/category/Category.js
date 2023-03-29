import Link from "next/link"
import { useRouter } from "next/router"
import { motion } from "framer-motion";

function Category(props) {
    const MotionLink = motion(Link);
    const { categoryName, categoryImage, categoryDescription, categoryProducts } = props.items
    // console.log(props.length)

    return <>
    <MotionLink className="category" href={{ pathname: `/${props.id}/categories/${categoryName}`, query: { shopid: props.id }, }}
        initial={!props.state ? { opacity: 0, x: -100 } : false}   
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 * props.index, duration: 0.2 }}>

        <button className="categ-edit-button" onClick={(event) => {props.edit2([categoryName, categoryImage, categoryDescription]); props.edit(event);}}><div className="heading-icon-edit">&nbsp;</div></button>

        <img src={categoryImage} className="category-img"></img>
        <div className="category-content">
            <div>
                <h2 className="heading-secondary category-name">{categoryName}</h2>
                <h3 className="heading-tertiary"> {categoryDescription}</h3>
            </div>
        </div>
    </MotionLink>
    </>
}

export default Category