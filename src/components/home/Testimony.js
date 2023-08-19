import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useRef } from 'react';
import Link from 'next/link';

const Testimony = (props) => {
  const {screenWidth} = props

  const settings = {
    dots: false,
    infinite: true,
    speed: screenWidth > 500 ? 1200 : 800,
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
    '/home/person1.webp',
    '/home/person3.jpg',
    '/home/person2.webp',
  ];

  const imageClass = {width: "10%", height:"12rem", marginLeft: "0"}
  const imageClass2 = {width: `${screenWidth > 700 ? "30rem" : "20rem"}`, height:"100%", marginLeft:`${screenWidth > 650 ? "10%" : "0"}`}

  return (
      <Slider {...settings} ref={sliderRef}>
        <div className="testimony">
        {screenWidth <= 650 && <div className='move-buttons-2'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
          </div>}
        
        <div className='icon-quote'>&nbsp;</div>
        {screenWidth > 650 && <div className='move-buttons'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
        </div>}
        {screenWidth > 450 && <img alt="Alvin Adams" src={images[0]} className='testimony-img' style={activeSlide === 0 ? imageClass2 : imageClass}></img>}
        <div className='testimony-data'>
        {screenWidth <= 450 && <img alt="Alvin Adams" src={images[0]} className='testimony-img-2'></img>}
        <h1 className="testimony-heading" style={{marginLeft:"1rem", color:"white"}} >Alvin Adams, <span className='word-glue'>Owner of <span style={{textDecoration:"underline"}}><Link href="/64c84adf0cac7b00a22be359" className="gradient-testimony-1" target="_blank" rel="noopener noreferrer">Alvin&apos;s Artifacts</Link></span></span></h1>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap", color: "white"}}>    When I tried making an online store myself, It was really confusing. I didn&apos;t have the time to learn how to code so when I came across MyMart, I knew I had to give it a try. I love that I can design it to fit my brand. So far, no regrets!</h3>
        </div>
        </div>

        <div className="testimony">
        {screenWidth <= 650 && <div className='move-buttons-2'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
          </div>}

        <div className='icon-quote'>&nbsp;</div>
        {screenWidth > 650 && <div className='move-buttons'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
        </div>}
        {screenWidth > 450 && <img alt="Bob Blake" src={images[1]} className='testimony-img' style={activeSlide === 1? imageClass2 : imageClass}></img>}
        <div className='testimony-data'>
        {screenWidth <= 450 && <img alt="Bob Blake" src={images[1]} className='testimony-img-2'></img>}
        <h1 className="testimony-heading" style={{marginLeft:"1rem", color:"white"}}>Bob Blake, <span className='word-glue'>Owner of <span style={{textDecoration:"underline"}}><Link href="/64c9a0fb66248cc084a3ae8f" className="gradient-testimony-2" target="_blank" rel="noopener noreferrer">Bright Boutique</Link></span></span></h1>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap", color: "white"}}>    MyMart made managing the orders and stocks so easy for me. When I first started, I didn&apos;t have any stock system so restocking accurately was impossible and logging all of the orders was cumbersome. Because of the map system, delivery is made easy too!</h3>
        </div>
        </div>

        <div className="testimony">
        {screenWidth <= 650 && <div className='move-buttons-2'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
          </div>}
          
        <div className='icon-quote'>&nbsp;</div>
        {screenWidth > 650 && <div className='move-buttons'>
        <button className='move-item' onClick={handleNextClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(90deg)"}}></div></button>
          <button className='move-item' onClick={handlePrevClick}><div className='heading-icon-chevron svg-bg' style={{transform:"rotate(-90deg)"}}></div></button>
        </div>}

        {screenWidth > 450 && <img alt="Carla Charlie" src={images[2]} className='testimony-img' style={activeSlide === 2 ? imageClass2 : imageClass}></img>}
        <div className='testimony-data'>
        {screenWidth <= 450 && <img alt="Carla Charlie" src={images[2]} className='testimony-img-2'></img>}
        <h1 className="testimony-heading" style={{marginLeft:"1rem", color:"white"}}>Carla Charlie, <span className='word-glue'>Owner of <span style={{textDecoration:"underline"}}><Link href="/64cb36f20ba185ffcb7e0ba1" className="gradient-testimony-3" target="_blank" rel="noopener noreferrer">Creative Commerce</Link></span></span></h1>
        <h3 className="paragraph-text" style={{marginTop:"1rem", whiteSpace:"pre-wrap", color: "white"}}>    Thanks to the collected statistics and data, I was able to find out which products my store sold out the most! My customers love that everything is catalogued and everything is available. </h3>
        </div>
        </div>
      </Slider>
  );
};

export default Testimony;
