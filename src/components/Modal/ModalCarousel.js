import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import Backdrop from '@/components/Modal/Backdrop';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ModalCarousel = ({ images, text, title, disable, modalStatus }) => {
  const appear = {
    hidden: {
      transform: 'scale(0)',
      opacity: 0,
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      transform: 'scale(0)',
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    draggable: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {modalStatus && (
        <Backdrop onClick={disable} className="categ-modals">
          <motion.div
            className="detail-slot-carousel"
            onClick={(e) => e.stopPropagation()}
            variants={appear}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ height: '80%' }}
          >
            <div className="carousel-buttons">
              <button className="carousel-button prev-button add-img prev-item" onClick={handlePrevClick}>
                <div
                  className="heading-icon-chevron svg-color"
                  style={{ transform: 'rotate(90deg)', marginRight: '10rem' }}
                ></div>
              </button>
              <button className="carousel-button next-button add-img next-item" onClick={handleNextClick}>
                <div
                  className="heading-icon-chevron svg-color"
                  style={{ transform: 'rotate(270deg)' }}
                ></div>
              </button>
            </div>
              <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                  <div key={index} className="glider-item">
                    <h2 className="heading-secondary">{title[index]}</h2>
                    <h3 className="heading-tertiary carousel-text">{text[index]}</h3>
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className="carousel-img round-borderer"
                    />
                  </div>
                ))}
              </Slider>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default ModalCarousel;
