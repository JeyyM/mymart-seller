import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getServerSideProps } from "../_app";
import Ongoing from "@/components/orders/OrderOngoing";

function Orders({ shopID }) {
  const router = useRouter();

  const { shopData } = shopID;
  const activeOrders = shopData.shopSales.activeOrders

  const contents = shopData.shopCategories;

  const activeContents = contents.filter((categ) => categ.active === true)

  const filteredContents = activeContents.filter((categ) =>
  categ.categoryProducts.some((prod) =>
    prod.variations.some((variation) => variation.active)
  )
)

  const favicon = shopData.shopDetails.imageData.icons.icon

  const categNamesList = Object.keys(filteredContents).map(key => (encodeURIComponent(filteredContents[key].categoryName)))

  const categoryAmount = Object.keys(shopID.shopData.shopCategories).length

  const totalItems = filteredContents.length;
  const itemsPerSlide = 12;
  const itemsPerLine = 4;
  const linesPerSlide = Math.ceil(itemsPerSlide / itemsPerLine);
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);
  const slideIndexes = Array.from(Array(totalSlides).keys());
  
  const lastSlideItems = totalItems % itemsPerSlide || itemsPerSlide;

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    draggable: true,
    infinite: false,
    speed: 500,
  };


  if (categoryAmount > 0) {
    return (

      <Fragment>
        <Head>
          <title>Categories</title>
          <link rel="icon" type="image/jpeg" href={favicon} />
        </Head>
        <span className="page-heading">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-receipt svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-primary no-margin">My Orders</h1>
        </span>


        <Slider {...sliderSettings}>
          {slideIndexes.map((slideIndex) => {
            const startIndex = slideIndex * itemsPerSlide;
            const endIndex = startIndex + (slideIndex === totalSlides - 1 ? lastSlideItems : itemsPerSlide);

            const slideItems = filteredContents.slice(startIndex, endIndex);

            return (
              <div className="slide" key={slideIndex}>
                <div className="category-container">
                  {slideItems.map((categ, index) => {
                    const relativeIndex = startIndex + index;

                    return (
                      <div className="warning-container" key={relativeIndex}>
                        {/* <Ongoing
                          index={index}
                          items={categ}
                          id={router.query.shopid}
                          key={index}
                          state={addCateg}
                          edit={addCategHandler}
                          edit2={editCategHandler}
                        ></Ongoing> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Slider>

        

      </Fragment>
    );
  } else {
    return <Fragment>
      <Head>
        <title>Categories</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>
      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-category svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">Categories</h1>
      </span>
      <div className="empty-contents">
        <div className="empty-logo svg-color">&nbsp;</div>
        <h2 className="empty-text">There seems to be no categories yet</h2>
      </div>
    </Fragment>
  }
}

export default Orders;

export { getServerSideProps }
