import { Fragment, useState, useEffect } from "react"
import HomepageButton from "../../components/homepage/Homepage-Button"
import HomepageButtonBlank from "@/components/homepage/Homepage-Button-Blank"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import { getServerSideProps } from "@/utilities/serversideProps"
import BannerCarousel from "@/components/Mart/BannerCarousel"
import { AnimatePresence, motion } from "framer-motion"
import ActiveNotifs from "@/components/Mart/ActiveNotifs"
import PopModal from "@/components/Mart/PopModal"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CategoryBuyer from "@/components/category/CategoryBuyer"
import CategoryProductsBuyer from "@/components/category-products/CategoryProductsBuyer"

function HomePage({ shopID }) {
  const router = useRouter();
  const slide = {
    hidden: {
      x: "-10rem",
      opacity: 0,
    },
    visible: (index) => ({
      x: "0px",
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0.2,
        delay: index * 0.2,
      },
    }),
    exit: {
      x: "-10rem",
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const { shopid } = router.query;
  const shopData = shopID.shopData;
  const imageData = shopID.shopData.shopDetails.imageData
  const favicon = shopID.shopData.shopDetails.imageData.icons.icon

  const categoryData = shopData.shopCategories
  const shopCurrency = shopData.shopDetails.paymentData.checkoutInfo.currency

  const activeNotifs = imageData.notifications.filter((notif) => notif.active)

  const popupInfo = imageData.popups
  const [startPop, setStartPop] = useState(popupInfo.active)
  const handleStart = () => {
    setStartPop(!startPop)
  }

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    draggable: true,
    infinite: false,
    speed: 500,
  };

  const addCateg = false

  return <Fragment>
    <Head>
      <title>{shopID.name}</title>
      <link rel="icon" type="image/jpeg" href={favicon} />

    </Head>
    {activeNotifs.length > 0 && <ActiveNotifs notifs={activeNotifs}></ActiveNotifs>}
    <BannerCarousel data={imageData.banners}></BannerCarousel>
    <PopModal modalStatus={startPop} disable={handleStart} image={popupInfo.image} link={popupInfo.link}></PopModal>

    {categoryData
  .filter((categ) =>
    categ.categoryProducts.some((prod) =>
      prod.variations.some((variation) => variation.active)
    )
  )
  .map((categ, index) => {
    const activeItems = categ.categoryProducts.filter((prod) =>
      prod.variations.some((variation) => variation.active)
    );
    const totalItems = activeItems.length;
    const itemsPerSlide = 4;
    const itemsPerLine = 4;
    const linesPerSlide = Math.ceil(itemsPerSlide / itemsPerLine);
    const totalSlides = Math.ceil(totalItems / itemsPerSlide);
    const slideIndexes = Array.from(Array(totalSlides).keys());
    const lastSlideItems = totalItems % itemsPerSlide || itemsPerSlide;

    return (
      <>
        <Link
          className="heading-primary"
          href={{
            pathname: `/${shopid}/categories/${encodeURIComponent(
              categ.categoryName
            )}`,
          }}
          style={{ textDecoration: "none" }}
        >
          {categ.categoryName}
        </Link>

        <Slider {...sliderSettings}>
          {slideIndexes.map((slideIndex) => {
            const startIndex = slideIndex * itemsPerSlide;
            const endIndex = startIndex + itemsPerSlide;
            const slideItems = activeItems.slice(startIndex, endIndex);

            if (slideItems.length === 0) {
              return null;
            }

            return (
              <div className="slide" key={slideIndex}>
                <div className="category-container" style={{ minHeight: "min-content" }}>
                  {slideItems.map((prod, index) => {
                    const relativeIndex = startIndex + index;

                    return (
                      <CategoryProductsBuyer
                        items={prod.variations}
                        categName={encodeURIComponent(categ.categoryName)}
                        id={router.query.shopid}
                        index={index}
                        currency={shopCurrency}
                        key={relativeIndex}
                      ></CategoryProductsBuyer>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Slider>
          </>
        );
      })}

  </Fragment>
}

export default HomePage

export { getServerSideProps }

