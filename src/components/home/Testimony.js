import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Testimony = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    beforeChange: (currentSlide, nextSlide) => {
        setActiveSlide(nextSlide);
      },
  };

  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

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

  const images = [
    'https://picsum.photos/300/200',
    'https://picsum.photos/300/201',
    'https://picsum.photos/300/202',
  ];

  const imageClass = {width: "10%", height:"12rem", marginLeft: "0"}
  const imageClass2 = {width: "30rem", height:"100%", marginLeft:"10%"}

  return (
      <Slider {...settings} ref={sliderRef}>
        <div className="testimony">
        <div className='icon-quote'>&nbsp;</div>
        <div className='move-buttons'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
        </div>
        <img src={images[0]} className='testimony-img' style={activeSlide === 0 ? imageClass2 : imageClass}></img>
        <div className='testimony-data'>
        <h1 className="feature-heading" style={{marginLeft:"1rem", color:"white"}} >Alvin Adams, Owner of <span style={{textDecoration:"underline"}}><Link href="/64c84adf0cac7b00a22be359" className="gradient-testimony-1">Alvin's Artifacts</Link></span></h1>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap", color: "white"}}>    When I tried making an online store myself, It was really confusing. I didn't have the time to learn how to code so when I came across MyMart, I knew I had to give it a try. I love that I can design it to fit my brand. So far, no regrets!</h3>
        </div>
        </div>

        <div className="testimony">
        <div className='icon-quote'>&nbsp;</div>
        <div className='move-buttons'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
        </div>
        <img src={images[1]} className='testimony-img' style={activeSlide === 1? imageClass2 : imageClass}></img>
        <div className='testimony-data'>
        <h1 className="feature-heading" style={{marginLeft:"1rem", color:"white"}}>Bob Blake, Owner of <span style={{textDecoration:"underline"}}><Link href="/64c9a0fb66248cc084a3ae8f" className="gradient-testimony-2">Bright Boutique</Link></span></h1>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap", color: "white"}}>    MyMart made managing the orders and stocks so easy for me. When I first started, I didn't have any stock system so restocking accurately was impossible and logging all of the orders was cumbersome. Because of the map system, delivery is made easy too!</h3>
        </div>
        </div>

        <div className="testimony">
        <div className='icon-quote'>&nbsp;</div>
        <div className='move-buttons'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
        </div>

        <img src={images[2]} className='testimony-img' style={activeSlide === 2 ? imageClass2 : imageClass}></img>
        <div className='testimony-data'>
        <h1 className="feature-heading" style={{marginLeft:"1rem", color:"white"}}>Carla Charlie, Owner of <span style={{textDecoration:"underline"}}><Link href="/64cb36f20ba185ffcb7e0ba1" className="gradient-testimony-3">Creative Commerce</Link></span></h1>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap", color: "white"}}>    Thanks to the collected statistics and data, I was able to find out which products my store sold out the most! My customers love that everything is catalogued and everything is available. </h3>
        </div>
        </div>
      </Slider>
  );
};

export default Testimony;
