import React, { useRef, useEffect } from 'react';
import 'glider-js/glider.min.css';
import Glider from 'glider-js';
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from '@/components/Modal/Backdrop';

const ModalCarousel = ({ images, text, title, disable, modalStatus }) => {
    const appear = {
        hidden: {
          transform: "scale(0)",
          opacity: 0,
        },
        visible: {
          transform: " scale(1)",
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        },
        exit: {
          transform: "scale(0)",
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        },
      };
  const gliderRef = useRef(null);

  useEffect(() => {
    const calculateItemWidth = () => {
        const containerWidth = gliderRef.current.offsetWidth;
        const itemWidthPercentage = 100;
        return (containerWidth * itemWidthPercentage) / 100;
      };

    if (gliderRef.current) {
      new Glider(gliderRef.current, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: '.carousel-dots',
        arrows: {
          prev: '.prev-button',
          next: '.next-button',
        },
        scrollLock: true,
        duration: 0.5,
        exactWidth: true,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              itemWidth: calculateItemWidth(),
              scrollLock: true,
              duration: 0.5,
              exactWidth: true
            }
          }
        ]
      });
    }
  }, []);

  return (
    <AnimatePresence
    initial={false}
    mode={"wait"}
    onExitComplete={() => null}
  >

    {modalStatus && (
        <Backdrop onClick={disable} className="categ-modals">
        <motion.div className='detail-slot-carousel' 
            onClick={(e) => e.stopPropagation()}
            variants={appear}
            initial="hidden"
            animate="visible"
            exit="exit">
      <div className='carousel-buttons'>
        <button className='carousel-button prev-button add-img prev-item'><div className='heading-icon-chevron svg-color' style={{transform: "rotate(90deg)", marginRight:"10rem"}}>&nbsp;</div></button>
        <button className='carousel-button next-button add-img next-item'><div className='heading-icon-chevron svg-color' style={{transform: "rotate(270deg)"}}>&nbsp;</div></button>
      </div>
      <div className='glider-contain'>
        <div ref={gliderRef} className='glider'>
          {images.map((image, index) => (
            <div key={index} className='glider-item'>
              <h2 className='heading-secondary'>{title[index]}</h2>
              <h3 className='heading-tertiary carousel-text'>{text[index]}</h3>
              <img src={image} alt={`Image ${index}`} className='carousel-img round-borderer' />
            </div>
          ))}
        </div>
        <div className='carousel-dots'></div>
      </div>
    </motion.div>
    </Backdrop>)}
    </AnimatePresence>
  );
};

export default ModalCarousel;
