import { Fragment } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getServerSideProps } from "..";
import Head from "next/head";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoryProductsBuyer from "@/components/category-products/CategoryProductsBuyer";
import pako from "pako";

function ProductsPage({ shopID, screenWidth }) {
  const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
  const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
  const final = JSON.parse(decompressedBytes);

  const router = useRouter()
  const queryCategoryName = router.query.categoryname

  const { shopData } = final;

  const favicon = shopData.shopDetails.imageData.icons.icon

  const shopCurrency = shopData.shopDetails.paymentData.checkoutInfo.currency

  const contents = shopData.shopCategories.filter(c => c.active === true);

  const chosenCategory = contents.find((c) => c.categoryName === queryCategoryName);

  useEffect(() => {
    if (!chosenCategory) {
      router.push(`/${router.query.shopid}/categories/error`);
    }
  }, []);

  if (!chosenCategory) {
    return null;
  }

  const products = chosenCategory.categoryProducts

  const filteredProducts = products.filter((prod) => prod.variations.some((variant) => variant.active === true))

  let productNames = []

  if (filteredProducts.length > 0) {
    productNames = filteredProducts.flatMap((product) => {
      const { variations } = product;
      if (variations && Array.isArray(variations)) {
        return variations.map((variation) => variation.productName).filter(Boolean);
      }
      return [];
    });
  }

  const soldProds = []

  chosenCategory.categoryProducts.forEach((product, index) => {
    const vars = product.variations;
    if (vars.some((variant) => variant.productStock.stockAmount === "0")) {
      soldProds.push(index);
    }
  });

  const totalItems = filteredProducts.length;
  const itemsPerSlide =screenWidth < 400 ? 26 : screenWidth < 600 ? 20 : screenWidth < 1000 ? 15 : 12;
  const itemsPerLine = screenWidth < 400 ? 1 : screenWidth < 600 ? 2 : screenWidth < 1000 ? 3 : 4;
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

  if (filteredProducts.length > 0) {

    return <Fragment>
      <Head>
        <title>{queryCategoryName}</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
        <meta name="description" content={chosenCategory.categoryDescription} />
      </Head>

      <header className="page-heading">
        <h1 className="heading-primary">{router.query.categoryname} &nbsp;</h1>
      </header>
      <h2 className="category-description heading-tertiary">{chosenCategory.categoryDescription}</h2>

      <Slider {...sliderSettings}>
        {slideIndexes.map((slideIndex) => {
          const startIndex = slideIndex * itemsPerSlide;
          const endIndex = startIndex + (slideIndex === totalSlides - 1 ? lastSlideItems : itemsPerSlide);

          const slideItems = filteredProducts.slice(startIndex, endIndex);

          return (
            <div className="slide" key={slideIndex}>
              <div className="category-container">
                {slideItems.map((prod, index) => {
                  const relativeIndex = startIndex + index;

                  return (
                    <div className="warning-container" key={relativeIndex}>
                      <CategoryProductsBuyer
                        items={prod.variations}
                        categName={encodeURIComponent(chosenCategory.categoryName)}
                        id={router.query.shopid}
                        index={relativeIndex}
                        currency={shopCurrency}
                        key={relativeIndex}
                      ></CategoryProductsBuyer>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Slider>
    </Fragment>
  } else {
    return <Fragment>
      <Head>
        <title>{queryCategoryName}</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>
      <header className="page-heading">
        <h1 className="heading-primary">{router.query.categoryname}&nbsp;</h1>
      </header>
      <h2 className="category-description heading-tertiary">{chosenCategory.categoryDescription}</h2>
      <div className="empty-contents">
        <div className="empty-logo svg-color">&nbsp;</div>
        <h2 className="empty-text">There seems to be no products yet</h2>
      </div>
    </Fragment>
  }
}

export default ProductsPage

export { getServerSideProps }
