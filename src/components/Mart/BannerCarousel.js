import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import Backdrop from '@/components/Modal/Backdrop';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerCarousel = ({ images }) => {
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
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(activeSlide);
    }
  }, [activeSlide]);

  const settings = {
    dots: true,
    arrows: false,
    draggable: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    initialSlide: 0,
    autoplay: true,
    beforeChange: (current, next) => setActiveSlide(next),
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
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={appear}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="banner-carousel"
      >
        <div className="carousel-buttons">
          <button className="carousel-button prev-button add-img prev-item-2" onClick={handlePrevClick}>
            <div
              className="heading-icon-chevron svg-color"
              style={{ transform: 'rotate(90deg)', marginRight: '10rem' }}
            ></div>
          </button>
          <button className="carousel-button next-button add-img next-item-2" onClick={handleNextClick}>
            <div className="heading-icon-chevron svg-color" style={{ transform: 'rotate(270deg)' }}></div>
          </button>
        </div>

        <Slider ref={sliderRef} {...settings} className="center">
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index}`}
                className={`round-borderer banner-item ${activeSlide === index ? 'active' : ''}`}
              />
            </div>
          ))}
        </Slider>
      </motion.div>
    </AnimatePresence>
  );
};

export default BannerCarousel;
