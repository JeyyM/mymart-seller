import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";


function Category(props) {
    const router = useRouter()
    const MotionLink = motion(Link);
    const { categoryName, categoryImage, categoryDescription, categoryProducts, active } = props.items;
    const encodedName = encodeURIComponent(categoryName)
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
      <>
        <MotionLink
          className="category"
          href={{ pathname: `/${props.id}/categories/${encodedName}` }}
          initial={!isDragging && !props.state ? { opacity: 0, x: -100 } : false}
          animate={!isDragging ? { opacity: 1, x: 0 } : false}
          transition={{ duration: 0.2 }}
          style={{ display: "relative" }}
          draggable={false}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
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
            <h2 className="heading-secondary category-name clamp-1">
              {categoryName}
            </h2>
            <h3 className="heading-tertiary clamp-5">
              {categoryDescription}
            </h3>
          </div>
        </div>
      </MotionLink>
    </>
  );
}

export default Category;
