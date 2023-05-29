import { useRouter } from "next/router";
import { Fragment, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProdImg from "@/components/Modal/Prod-Img";
import AddVariation from "@/components/Modal/Add-Variation"
import Confirmer2 from "@/components/Modal/Confirmer2";
import AddTags from "@/components/Modal/Add-Tags";
import { getServerSideProps } from "..";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { addToCart } from "@/components/store/cartactions";

function ProductPage({ shopID }) {
  const router = useRouter()
  const dispatch = useDispatch();

  const shopCurrency = shopID.shopData.shopDetails.paymentData.checkoutInfo.currency
  const favicon = shopID.shopData.shopDetails.imageData.icons.icon

  function waitSeconds() {
    return new Promise(resolve => setTimeout(resolve, 2500));
  }

  function waitSecondsShort() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  const queryProduct = router.query.productname
  const queryCategory = router.query.categoryname

  const allCategories = shopID.shopData.shopCategories
  const chosenCategory = allCategories.filter((value) => value.categoryName === queryCategory);
  const categoryIndex = allCategories.findIndex((value) => value.categoryName === queryCategory);

  const chosenProduct = chosenCategory[0].categoryProducts.filter(product => product.variations[0].productName === queryProduct);
  const productIndex = chosenCategory[0].categoryProducts.findIndex(product => product.variations[0].productName === queryProduct);

  const variationsList = chosenProduct[0].variations

  const variationRange = Array.from({ length: variationsList.length }, (_, index) => index);

  const productNames = allCategories[categoryIndex].categoryProducts.flatMap(product => product.variations.map(variation => encodeURIComponent(variation.productName)));
  const upperProductNames = productNames.map(name => name.toUpperCase());

  const routerData = [shopID._id, queryCategory]

  const [varState, setVarState] = useState(0)
  const [imgState, setImgState] = useState(0)

  const soldVar = []

  variationsList.forEach((variant, index) => {

    if (variant.productStock.stockAmount === "0") {
      soldVar.push(index);
    }
  })

  function varStateHandler(ind) {
    setVarState(ind)
    setImgState(0)
  }

  function imgStateHandler(ind) {
    setImgState(ind)
  }

  function imageGetter(n) {
    return variationsList[n].productImages[0];
  }

  const [nameValue, setNameValue] = useState(variationsList[varState].productName);
  const handleNameChange = (event) => {
    setNameValue(event.target.value);
    handleNameLength(event.target.value)
  };

  const [descValue, setDescValue] = useState(variationsList[varState].productDescription);
  const handleDescChange = (event) => {
    setDescValue(event.target.value);
    handleDescLength(event.target.value)
  };

  const [imgValue1, setImgValue1] = useState(variationsList[varState].productImages[0]);
  const handleImgChange1 = (event) => {
    setImgValue1(event.target.value);
  };

  const [imgValue2, setImgValue2] = useState(variationsList[varState].productImages[1]);
  const handleImgChange2 = (event) => {
    setImgValue2(event.target.value);
  };

  const [imgValue3, setImgValue3] = useState(variationsList[varState].productImages[2]);
  const handleImgChange3 = (event) => {
    setImgValue3(event.target.value);
  };

  const [imgValue4, setImgValue4] = useState(variationsList[varState].productImages[3]);
  const handleImgChange4 = (event) => {
    setImgValue4(event.target.value);
  };

  const [priceValue, setPriceValue] = useState(variationsList[varState].productPrice);
  const handlePriceChange = (event) => {
    if (event.target.value.length < 9) {
      setPriceValue(event.target.value);
    }
  };

  const [stockAmount, setStockAmount] = useState(variationsList[varState].productStock.stockAmount);
  const handleStockAmount = (event) => {
    if (event.target.value.length < 9) {
      setStockAmount(event.target.value);
    }
  };

  const [stockUnit, setStockUnit] = useState(variationsList[varState].productStock.stockUnit);
  const handleStockUnit = (event) => {
    setStockUnit(event.target.value);
  };

  const [activeValue, setActiveValue] = useState(variationsList[varState].active);
  const handleActive = () => {
    setActiveValue(!activeValue)
  };

  const [cartValue, setCartValue] = useState(0)
  function addStock() {
    if (cartValue < stockAmount)
    {setCartValue(parseInt(cartValue) + 1)}}

  function minusStock() {
    if (cartValue > 0) {
      setCartValue(parseInt(cartValue) - 1)
    }
  }

  function isEmpty(word) {
    word.trim() === ""
  }

  function startsImgur(word) {
    if (word) { return word.slice(0, 20) === "https://i.imgur.com/"; }
  }

  const [imgSet, setImgSet] = useState([imgValue1, imgValue2, imgValue3, imgValue4])
  const [validImgSet, setValidImgSet] = useState([])

  useEffect(() => {
    const img1Valid = startsImgur(imgValue1) && !isEmpty(imgValue1)
    const img2Valid = startsImgur(imgValue2) && !isEmpty(imgValue2)
    const img3Valid = startsImgur(imgValue3) && !isEmpty(imgValue3)
    const img4Valid = startsImgur(imgValue4) && !isEmpty(imgValue4)
    const validImgSet = [img1Valid && { image: imgValue1 }, img2Valid && { image: imgValue2 }, img3Valid && { image: imgValue3 }, img4Valid && { image: imgValue4 },].filter(Boolean)
    setValidImgSet(validImgSet)
  }, [imgValue1, imgValue2, imgValue3, imgValue4])


  function setAll(index) {
    setNameValue(variationsList[varState].productName)
    setDescValue(variationsList[varState].productDescription)
    setImgValue1(variationsList[varState].productImages[0])
    setImgValue2(variationsList[varState].productImages[1])
    setImgValue3(variationsList[varState].productImages[2])
    setImgValue4(variationsList[varState].productImages[3])
    setPriceValue(variationsList[varState].productPrice)
    setStockAmount(variationsList[varState].productStock.stockAmount)
    setStockUnit(variationsList[varState].productStock.stockUnit)

    setActiveValue(variationsList[varState].active)
  }

  useEffect(() => {
    setImgSet([imgValue1, imgValue2, imgValue3, imgValue4])
  }, [imgValue1, imgValue2, imgValue3, imgValue4])

  useEffect(() => {
    setAll(varState);
  }, [varState]);

  const submitCart = () => {
    const item = {
      name: nameValue,
      description: descValue,
      image: imgValue1,
      price: priceValue,
      stockUnit: stockUnit,
      cartValue: cartValue,
    };
    dispatch(addToCart(item));
  };

  return <Fragment>

    <Head>
      <title>{variationsList[0].productName}</title>
      <link rel="icon" type="image/jpeg" href={favicon} />
    </Head>

    <div className="product-container">
      <div className="main-img-container">

        <div className="sample">
          <img src={imgSet[imgState]} alt={variationsList[varState].productName} className="product-image">
          </img>
        </div>

        <motion.div className="side-img-container" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          key={varState}
        >
          {imgSet.map((i, index) => (
            i !== undefined && (
              <motion.img
                key={index}
                src={imgSet[index]}
                alt={index}
                className={`side-img ${index === imgState ? "active-var" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.2 }}
                onClick={() => imgStateHandler(index)}
              />)
          ))}
        </motion.div>
      </div>

      <div className="details-section">
        <form>
          <div>
            <h1 className="heading-primary" style={{ marginBottom: "2rem", whiteSpace: "pre-wrap" }}>{nameValue}</h1>
            <h1 className="heading-secondary product-currency">{shopCurrency} {priceValue} / {stockUnit}</h1>
          </div>

          <div className="item-setup" style={{ margin: "1rem 0" }}>
            <h2 className="heading-tertiary" style={{ whiteSpace: "pre-wrap" }}>{descValue}</h2>
          </div>

          <label className="heading-secondary variations-label">Variations</label>

          <motion.div className="varContainer" initial={{ opacity: 0 }} style={{ margin: "1rem 0" }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}>
            {variationsList.map((v, index) => (
              <motion.div className={`varItem-sub ${index === varState ? "active-var" : ""}`}
                onClick={() => { varStateHandler(index); }}
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.2 }}>

                {soldVar.includes(index) && <h2 className="heading-tertiary white sold-msg-sm">Sold Out</h2>}
                <img key={index}
                  className={`varItem ${soldVar.includes(index) ? "sold-img" : ""}`}
                  src={imageGetter(index)} alt={index}
                ></img>
              </motion.div>
            ))}
          </motion.div>

          <label className="heading-secondary product-currency">Stock: {stockAmount} {stockUnit}</label>

          <div className="add-buttons flex-row-spaceless" style={{ margin: "2rem 0", width: "30rem" }}>
            <button type="button" className="minus-button" onClick={minusStock}><div className="heading-icon-minus-act svg-color">&nbsp;</div></button>
            <input type="number" value={cartValue} className="text-small input-number" placeholder="Amount" required id='amount' onChange={handleStockAmount} style={{ borderRadius: "0", margin: "0" }}></input>
            <button type="button" onClick={addStock} className="add-button svg-color" style={{ marginRight: "2rem" }}><div className="heading-icon-plus-act svg-decolor">&nbsp;</div></button>
          </div>
        </form>

        <div className="product-action-buttons">
          <button className="product-action-1 heading-secondary" type="button" style={{width:"20rem"}} onClick={submitCart} >Add to Cart</button>
          <button className="product-action-2 heading-secondary" type="button">To Checkout</button>
        </div>
      </div>
    </div>

  </Fragment>
}

export default ProductPage

export { getServerSideProps }
