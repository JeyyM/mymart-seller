import { Fragment, useState, useEffect, useMemo } from "react"
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

function HomePage({ shopID, screenWidth }) {  
  const router = useRouter();


  
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     alert(
  //       `Images are loaded in using Lorem Picsum to have non-copyright random image. Due to this, images may load slower.  Thank you for your understanding.`
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (!shopID) {
      router.push(`/${router.query.shopid}/error`);
    }
  }, []);

  useEffect(() => {
    if (shopID){
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  
  const viewsList = shopID && shopID.shopData.shopViews
  
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

  const shopData = shopID && shopID.shopData;
  const imageData = shopID && shopID.shopData.shopDetails.imageData
  const favicon = shopID && shopID.shopData.shopDetails.imageData.icons.icon

  const categoryData = shopData && shopData.shopCategories
  const shopCurrency = shopData && shopData.shopDetails.paymentData.checkoutInfo.currency

  const activeNotifs = imageData && imageData.notifications.filter((notif) => notif.active)

  const popupInfo = imageData && imageData.popups
  const [startPop, setStartPop] = useState(false)

  useEffect(() => {
    if (popupInfo){
      setStartPop(popupInfo.active)
    }
  },[])

  const handleStart = () => {
    setStartPop(!startPop)
  }

  async function addView(time) {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    const existsIndex = viewsList.findIndex(item => item.key === formattedDate);
    let viewCount = 0
    if (existsIndex !== -1) {
      viewCount = parseInt(viewsList[existsIndex].count) + 1
    }

    if (existsIndex === -1) {
      const response = await fetch(
        `../../api/add-view?martid=${router.query.shopid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: formattedDate, count: 1 })
        }
      );
      const data = await response.json();
    } else {
      const response = await fetch(
        `../../api/add-view?martid=${router.query.shopid}&exists=${existsIndex}&count=${viewCount}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && shopID) {
      const currentTime = new Date();
      const storedTime = localStorage.getItem(`${router.query.shopid}_view`);

      const hourDifference = ((currentTime.getTime() - new Date(storedTime).getTime()) / (1000 * 60 * 60) >= 1)

      if (!hourDifference) {
        localStorage.setItem(`${router.query.shopid}_view`, currentTime);
      } else {
        localStorage.setItem(`${router.query.shopid}_view`, currentTime);
        addView(currentTime)
      }
    }
  }, [])

  if (!shopID) {
    return null;
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
      <meta name="description" content={shopID.description} />

    </Head>
    <div className="homepage-container">
    {activeNotifs.length > 0 && <ActiveNotifs notifs={activeNotifs}></ActiveNotifs>}
    <BannerCarousel data={imageData.banners} screenWidth={screenWidth}></BannerCarousel>
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
        const itemsPerSlide = screenWidth < 400 ? 1 : screenWidth < 600 ? 2 : screenWidth < 1000 ? 3 : 4;
        const itemsPerLine = screenWidth < 400 ? 1 : screenWidth < 600 ? 2 : screenWidth < 1000 ? 3 : 4;
        const linesPerSlide = Math.ceil(itemsPerSlide / itemsPerLine);
        const totalSlides = Math.ceil(totalItems / itemsPerSlide);
        const slideIndexes = Array.from(Array(totalSlides).keys());
        const lastSlideItems = totalItems % itemsPerSlide || itemsPerSlide;

        {/* const viewMart = useMemo(() => {
          if (typeof window !== "undefined") {
            const currentTime = new Date();
            const storedTime = localStorage.getItem(`${router.query.shopid}_view`);

            const hourDifference = ((currentTime.getTime() - new Date(storedTime).getTime()) / (1000 * 60 * 60) >= 1)

            if (!hourDifference) {
              localStorage.setItem(`${router.query.shopid}_view`, currentTime);
            } else {
              localStorage.setItem(`${router.query.shopid}_view`, currentTime);
              addView(currentTime)
            }
          }
        }, []); */}

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
</div>
  </Fragment>
}

export default HomePage

export { getServerSideProps }