import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSideProps } from "..";
import { motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import OrderOngoing from "@/components/orders/OrderOngoing";
import OrderDetails from "@/components/orders/OrderDetails";
import CancelOrder from "@/components/orders/CancelOrder";
import ShopInformation from "@/components/orders/ShopInformation";
import pako from "pako";

function MyOrders({ shopID, user, currency, screenWidth }) {
  const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
  const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
  const final = JSON.parse(decompressedBytes);

  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [details, setDetails] = useState(false)
  const handleDetails = () => {
    setDetails(!details)
  }

  function changeOrder(order){
    setSelectedOrder(order)
    setDetails(!details)
  }

  useEffect(() => {
    setShouldRender(true);
  }, []);

  const [cancel, setCancel] = useState(false)
  const handleCancel = () => {
    setCancel(!cancel)
  }

  const [Info, setInfo] = useState(false)
  const handleInfo = () => {
    setInfo(!Info)
  }

  if (typeof window !== 'undefined') {
    if (user === undefined) {
      window.location.href = `/${router.query.shopid}/signup`;
    }
  }

  return (
    <>
      {shouldRender && (
        typeof window !== 'undefined' && user !== undefined && shopID && (
          <>
            {renderOrders()}
          </>
        )
      )}
    </>
  );

  function renderOrders() {
    const shopCurrency = final.shopData.shopDetails.paymentData.checkoutInfo.currency
    const shopCategories = final.shopData.shopCategories
    const paymentDetails = final.shopData.shopDetails.paymentData
    const footerData = final.shopData.shopDetails.footerData
    const coords = final.shopData.shopDetails.footerData.shopCoords

    const currentAccount = final.shopData.shopAccounts.filter((acc) => acc.email === user.email)
    const ongoingOrders = currentAccount[0].currentOrders
    const pastOrders = currentAccount[0].pastOrders.slice().reverse();

    const favicon = final.shopData.shopDetails.imageData.icons.icon

    const orderAmount = Object.keys(pastOrders).length

    const totalItems = ongoingOrders.length;
    const itemsPerSlide = 12;
    const itemsPerSlide2 = 8;

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

    const totalItems2 = pastOrders.length;
    const totalSlides2 = Math.ceil(totalItems2 / itemsPerSlide2);
    const lastSlideItems2 = totalItems2 % itemsPerSlide2 || itemsPerSlide2;
    const slideIndexes2 = Array.from(Array(totalSlides2).keys());

    const approved = []
    const edited = []

    ongoingOrders.forEach((order, index) => {
      if (order.status === "accepted") {
        approved.push(index)
      } else if (order.status === "edited") {
        edited.push(index)
      }
    })

    function findItem(category, varName) {
      let chosenCateg = shopCategories.find((categ) => categ.categoryName === category)

      if (chosenCateg) {
          let chosenVariation = chosenCateg.categoryProducts.flatMap((prod) => prod.variations).find((variation) => variation.productName === varName);
          if (chosenVariation) {
              return chosenVariation
          } else {
              return "Missing Product"
          }
      } else {
          return "Category Missing"
      }
  }

    async function submitCancel(given){
      let updatedItem = given
      updatedItem.status = "cancelled"

      const today = new Date();
      updatedItem.finishedOn = today

      let ProductIdentifiers = []

      const newStocks = updatedItem.order.map((prod) => {
        const originalStocks = findItem(prod.category, prod.name)
        const newData = {
            ...originalStocks,
            productStock: {
                ...originalStocks.productStock,
                stockAmount: originalStocks.productStock.stockAmount + prod.cartValue
            }
        };

        const categId = shopCategories.findIndex(category => category.categoryName === prod.category);

        const productId = shopCategories[categId].categoryProducts.findIndex(
            (product) => product.variations.some((variation) => variation.productName === prod.name)
        );

        const variationId = shopCategories[categId].categoryProducts[productId].variations.findIndex(
            (variation) => variation.productName === prod.name
        );

        let newProductIdentifiers = [categId, productId, variationId, newData.productStock.stockAmount]
        ProductIdentifiers.push(newProductIdentifiers)

        return newData
    })
            await refuseApi(selectedOrder, ProductIdentifiers)
    }

        async function refuseApi(newOrder, productIds){
        const requestBody = {
            selectedOrder: selectedOrder,
            productIds: productIds
          };
        
        const response = await fetch(
            `../../api/order-refuse?martid=${router.query.shopid}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestBody)
            }
          );
          const data = await response.json();
    }
    
    if (orderAmount + ongoingOrders.length > 0) {
      return (
        <Fragment>
          <Head>
            <title>My Orders</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
          </Head>
          <OrderDetails modalStatus={details} disable={handleDetails} order={selectedOrder} shopCategories={shopCategories} currency={shopCurrency} initiateCancel={handleCancel}></OrderDetails>
          <CancelOrder modalStatus={cancel} order={selectedOrder} disable={handleCancel}  currency={shopCurrency} finish={submitCancel}></CancelOrder>
          <ShopInformation modalStatus={Info} disable={handleInfo} user={user} currency={shopCurrency} martCoords={coords} details={footerData} payment={paymentDetails} screenWidth={screenWidth}></ShopInformation>

          <div className="past-container">
            <header className="page-heading">
              <div className="heading-icon-dropshadow">
                <div className="heading-icon-receipt svg-color">&nbsp;</div>
              </div>
              <h1 className="heading-primary no-margin">Ongoing Orders</h1>
              <button className="help-button" onClick={handleInfo}>
                <div className="heading-icon-question svg-color">&nbsp;</div>
              </button>
            </header>

            <Slider {...sliderSettings}>
              {slideIndexes.map((slideIndex) => {
                const startIndex = slideIndex * itemsPerSlide;
                const endIndex = startIndex + (slideIndex === totalSlides - 1 ? lastSlideItems : itemsPerSlide);

                const slideItems = ongoingOrders.slice(startIndex, endIndex);

                return (
                  <div className="slide" key={slideIndex}>
                    <div className="category-container">
                      {slideItems.map((order, index) => {
                        const relativeIndex = startIndex + index;
                        if (order.order.length > 0) {
                          return (
                            <div className="warning-container" key={relativeIndex} onClick={() => changeOrder(order)}>
                            {approved.includes(relativeIndex) && (
                                <motion.div
                                  className="approved-warning svg-sold"
                                  key={order}
                                  initial={{ opacity: 1, translateX: -25, translateY: -25, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2, type: "spring", damping: 0 }}
                                >
                                  &nbsp;
                                </motion.div>
                              )}
                              {edited.includes(relativeIndex) && (
                                <motion.div
                                  className="edited-warning svg-edited"
                                  key={order}
                                  initial={{ opacity: 1, translateX: -25, translateY: -25, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2, type: "spring", damping: 0 }}
                                >
                                  &nbsp;
                                </motion.div>
                              )}
                              <OrderOngoing item={order} index={index} key={index} currency={shopCurrency}></OrderOngoing>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </Slider>

            <header className="page-heading">
              <div className="heading-icon-dropshadow">
                <div className="heading-icon-ongoing svg-color">&nbsp;</div>
              </div>
              <h1 className="heading-primary no-margin">Past Orders</h1>
            </header>

            <Slider {...sliderSettings}>
              {slideIndexes2.map((slideIndex) => {
                const startIndex = slideIndex * itemsPerSlide2;
                const endIndex = startIndex + (slideIndex === totalSlides2 - 1 ? lastSlideItems2 : itemsPerSlide2);

                const slideItems = pastOrders.slice(startIndex, endIndex);

                return (
                  <div className="slide" key={slideIndex}>
                    <div className="category-container">
                      {slideItems.map((order, index) => {
                        const relativeIndex = startIndex + index;    
                        if (slideItems.length > 0) {
                          return (
                            <div className="warning-container" key={relativeIndex} onClick={() => changeOrder(order)}>
                              <OrderOngoing item={order} index={index} key={index} currency={shopCurrency}></OrderOngoing>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Head>
            <title>Categories</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
          </Head>
          <ShopInformation modalStatus={Info} disable={handleInfo} user={user} currency={shopCurrency} martCoords={coords} details={footerData} payment={paymentDetails} screenWidth={screenWidth}></ShopInformation>

          <header className="page-heading">
            <div className="heading-icon-dropshadow">
              <div className="heading-icon-category svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin">Past Orders</h1>
            <button className="help-button" onClick={handleInfo}>
                <div className="heading-icon-question svg-color">&nbsp;</div>
              </button>
          </header>
          <div className="empty-contents">
            <div className="empty-receipt svg-color">&nbsp;</div>
            <h2 className="empty-text">There seems to be no orders yet</h2>
          </div>
        </Fragment>
      );
    }
  }
}

export default MyOrders;
export { getServerSideProps };
