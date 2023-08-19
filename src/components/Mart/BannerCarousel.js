import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerCarousel = ({ data, screenWidth }) => {
  const filteredData = data.filter((item) => item.active);

  let itemLength = 0
  if (filteredData.length === 1) {
    itemLength = 1
  }
  if (filteredData.length === 2) {
    itemLength = 2
  }
  if (filteredData.length >= 3) {
    itemLength = 3
  }

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

  const [isInteracting, setIsInteracting] = useState(false);

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
    slidesToShow: screenWidth > 600 ? itemLength : 1,
    slidesToScroll: 1,
    centerMode: true,
    initialSlide: 0,
    autoplay: true,
    onSwipe: () => setIsInteracting(true),
    afterChange: () => setIsInteracting(false),
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const handleLinkClick = (index, link) => {
    if (filteredData.length >= 4) {
      if (!isInteracting && index === activeSlide) {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    } else { window.open(link, '_blank', 'noopener,noreferrer') }
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

  let bannerClass = ""
  if (filteredData.length <= 3) {
    bannerClass = "active"
  }

  return (
    <div>
      {filteredData.length > 0 && (
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={appear}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="banner-carousel"
          >
            {filteredData.length >= 4 || (screenWidth <= 600 && filteredData.length > 1) ? (
              <div className="carousel-buttons">
                <button className="carousel-button prev-button car-button prev-item round-borderer" onClick={handlePrevClick} style={{ marginLeft: "1rem" }}>
                  <div
                    className="heading-icon-chevron svg-color"
                    style={{ transform: 'rotate(90deg) scaleX(7)', marginLeft: "-1rem" }}
                  ></div>
                </button>
                <button className="carousel-button prev-button car-button next-item round-borderer" onClick={handleNextClick} style={{ marginRight: "1rem" }}>
                  <div
                    className="heading-icon-chevron svg-color"
                    style={{ transform: 'rotate(270deg) scaleX(7)', marginLeft: "-1rem" }}
                  ></div>
                </button>
              </div>
            ) : null}

            <Slider ref={sliderRef} {...settings} className="center">
              {filteredData.map((item, index) => (
                <div key={index}>
                  <img
                    onClick={() => handleLinkClick(index, item.link)}
                    src={item.image}
                    alt={`Image ${index}`}
                    className={`round-borderer banner-item ${activeSlide === index ? 'active' : bannerClass}`}
                  />
                </div>
              ))}
            </Slider>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );

};

export default BannerCarousel;
