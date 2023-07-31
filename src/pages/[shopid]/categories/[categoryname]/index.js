import { Fragment } from "react";
import { useRouter } from "next/router";
import CategoryProducts from "@/components/category-products/CategoryProducts";
import { useState, useEffect } from "react";
import AddProduct from "@/components/Modal/Add-Product";
import { getServerSideProps } from "..";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoryProductsBuyer from "@/components/category-products/CategoryProductsBuyer";


function ProductsPage({ shopID, screenWidth }) {
  const router = useRouter()
  const queryCategoryName = router.query.categoryname

  const { shopData } = shopID;

  const favicon = shopData.shopDetails.imageData.icons.icon

  const shopCurrency = shopData.shopDetails.paymentData.checkoutInfo.currency

  const contents = shopData.shopCategories;

  const chosenCategory = contents.find((c) => c.categoryName === queryCategoryName);

  useEffect(() => {
    if (!chosenCategory) {
      router.push(`/${router.query.shopid}/categories/error`);
    }
  }, []);

  if (!chosenCategory) {
    return null;
  }

  const chosenIndex = contents.findIndex((c) => c.categoryName === queryCategoryName);

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

  const upperProductNames = productNames.map((name) => encodeURIComponent(name.toUpperCase()));

  const [addProduct, setAddProduct] = useState(false)
  const [defaultValues, setDefaultValues] = useState(["", "", ""])

  function addProdHandler(event) {
    event.preventDefault()
    event.stopPropagation()

    setAddProduct(!addProduct)
  }

  async function completeForm(formdata) {

    const response = await fetch(
      `../../../api/new-product?martid=${router.query.shopid}&categorykey=${chosenIndex}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();

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

  if (filteredProducts.length > 0) {

    return <Fragment>
      <Head>
        <title>{queryCategoryName}</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
        <meta name="description" content={chosenCategory.categoryDescription} />
      </Head>

      <heading className="page-heading">
        <h1 className="heading-primary">{router.query.categoryname} &nbsp;</h1>
      </heading>
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
      <heading className="page-heading">
        <h1 className="heading-primary">{router.query.categoryname}&nbsp;</h1>
      </heading>
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
