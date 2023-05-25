import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

function Category(props) {
    const MotionLink = motion(Link);
    const { categoryName, categoryImage, categoryDescription, categoryProducts, active } = props.items;
    const [isDragging, setIsDragging] = useState(false);

    const handleSwipeStart = (event) => {
        if (event.touches) {
            setIsDragging(true);
        }
    };

    const handleSwipeEnd = (event) => {
        if (event.touches) {
            setIsDragging(false);
        }
    };

    const handleMouseDragStart = (event) => {
        if (event.movementX !== 0 || event.movementY !== 0) {
            setIsDragging(true);
            event.preventDefault();
        }
    };


    const handleMouseDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <>
            <MotionLink
                className="category"
                href={{ pathname: `/${props.id}/categories/${categoryName}` }}
                initial={!props.state && !isDragging ? { opacity: 0, x: -100 } : false}
                animate={!isDragging ? { opacity: 1, x: 0 } : false}
                transition={{ duration: 0.2 }}
                style={{ display: "relative" }}
                draggable={false}
                onTouchStart={handleSwipeStart}
                onTouchEnd={handleSwipeEnd}
                onMouseDown={handleMouseDragStart}
                onMouseUp={handleMouseDragEnd}
            >
                <button
                    className="categ-edit-button"
                    onClick={(event) => {
                        props.edit2([categoryName, categoryImage, categoryDescription, props.index, active]);
                        props.edit(event);
                    }}
                >
                    <div className="heading-icon-edit svg-color">&nbsp;</div>
                </button>
                <div className="image-container">
                    <img src={categoryImage} className="category-img" alt={categoryName}></img>
                </div>
                <div className="category-content">
                    <div>
                        <h2 className="heading-secondary category-name">
                            {categoryName.length > 40 ? categoryName.substring(0, 37) + "..." : categoryName}
                        </h2>
                        <h3 className="heading-tertiary">
                            {categoryDescription.length > 150 ? categoryDescription.substring(0, 147) + "..." : categoryDescription}
                        </h3>
                    </div>
                </div>
            </MotionLink>
        </>
    );
}

export default Category;
