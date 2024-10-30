import Category from "../../../components/category/Category";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSideProps } from "..";
import { AnimatePresence, motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import pako from "pako";

function CategoryPage({ shopID, screenWidth }) {
  const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
  const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
  const final = JSON.parse(decompressedBytes);
  const router = useRouter();

  const contents = final.shopData.shopCategories;

  const activeContents = contents.filter((categ) => categ.active === true)

  const filteredContents = activeContents.filter((categ) =>
  categ.categoryProducts.some((prod) =>
    prod.variations.some((variation) => variation.active)
  )
)

  const favicon = final.shopData.shopDetails.imageData.icons.icon

  const categNamesList = Object.keys(filteredContents).map(key => (encodeURIComponent(filteredContents[key].categoryName)))
  const upperCategNames = categNamesList.map(name => name.toUpperCase());

  const categoryAmount = Object.keys(final.shopData.shopCategories).length

  const [addCateg, setAddCateg] = useState(false)
  const [defaultValues, setDefaultValues] = useState(["", "", "", 0, true])

  function addCategHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setAddCateg(!addCateg)
  }

  function editCategHandler(data) {
    setDefaultValues([data[0], data[1], data[2], data[3], data[4]])
  }

  function defClearer() {
    setDefaultValues(["", "", "", 0, true])
  }

  async function completeForm(formdata) {

    const response = await fetch(
      `../../api/new-category?martid=${router.query.shopid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }

  async function editForm(formdata, key) {

    const response = await fetch(
      `../../api/new-category?martid=${router.query.shopid}&categoryindex=${key}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }

  async function deleteForm(key) {

    const response = await fetch(
      `../../api/new-category?martid=${router.query.shopid}&categoryindex=${key}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
  }

  const totalItems = filteredContents.length;
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


  if (categoryAmount > 0) {
    return (

      <Fragment>
        <Head>
          <title>Categories</title>
          <link rel="icon" type="image/jpeg" href={favicon} />
          <meta name="description" content={shopID.description} />

        </Head>
        <header className="page-heading" style={{ width: "min-content" }}>
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-category svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-primary no-margin">Categories</h1>
        </header>


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
                        <Category
                          index={index}
                          items={categ}
                          id={router.query.shopid}
                          key={index}
                          state={addCateg}
                          edit={addCategHandler}
                          edit2={editCategHandler}
                        ></Category>
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
      <header className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-category svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">Categories</h1>
      </header>
      <div className="empty-contents">
        <div className="empty-logo svg-color">&nbsp;</div>
        <h2 className="empty-text">There seems to be no categories yet</h2>
      </div>
    </Fragment>
  }
}

export default CategoryPage;

export { getServerSideProps }
