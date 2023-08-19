import { useRouter } from "next/router";
import { Fragment, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getServerSideProps } from "..";
import Head from "next/head";
import { useContext } from "react";
import { MyContext } from "@/components/store/MyProvider";
import Link from "next/link";
import pako from "pako";

function ProductPage({ shopID, user, screenWidth }) {
  const router = useRouter()
  const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
  const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
  const final = JSON.parse(decompressedBytes);

  const shopCurrency = final.shopData.shopDetails.paymentData.checkoutInfo.currency
  const favicon = final.shopData.shopDetails.imageData.icons.icon
  const localStorageKey = `mart_${shopID._id}`

  const { state, handleIncrement } = useContext(MyContext);

  const queryProduct = router.query.productname
  const queryCategory = router.query.categoryname

  const allCategories = final.shopData.shopCategories
  const chosenCategory = allCategories.filter((value) => value.categoryName === queryCategory);

  const [varState, setVarState] = useState(0)
  const [imgState, setImgState] = useState(0)

  const [nameValue, setNameValue] = useState("");

  const [descValue, setDescValue] = useState("");

  const [imgValue1, setImgValue1] = useState("");

  const [imgValue2, setImgValue2] = useState("");

  const [imgValue3, setImgValue3] = useState("");

  const [imgValue4, setImgValue4] = useState("");

  const [priceValue, setPriceValue] = useState(0);

  const [stockAmount, setStockAmount] = useState(0);

  const [stockUnit, setStockUnit] = useState("");

  const [activeValue, setActiveValue] = useState(false);

  const [cartContents, setCartContents] = useState([])
  const [cartValue, setCartValue] = useState(0)

  const [imgSet, setImgSet] = useState([])

  useEffect(() => {
    if (chosenCategory.length === 0) {
      router.push(`/${router.query.shopid}/categories/${chosenCategory.categoryName}error`);
    }
  }, []);

  const urlCateg = encodeURIComponent(chosenCategory[0].categoryName)

  const chosenProduct = chosenCategory.length > 0 && chosenCategory[0].categoryProducts.filter(product => product.variations[0].productName === queryProduct);

  useEffect(() => {
      if (!chosenProduct || chosenProduct.length === 0) {
        router.push(`/${router.query.shopid}/categories/${chosenCategory.categoryName}/error`);
      }
  }, []);

  const productContents = chosenProduct.length > 0 && chosenProduct[0].variations

  const variationsList = productContents && productContents.filter((product) => product.active === true);

  useEffect(() => {
    if (variationsList && variationsList.length > 0) {
      setNameValue(variationsList[varState].productName);
      setDescValue(variationsList[varState].productDescription);
      setImgValue1(variationsList[varState].productImages[0]);
      setImgValue2(variationsList[varState].productImages[1]);
      setImgValue3(variationsList[varState].productImages[2]);
      setImgValue4(variationsList[varState].productImages[3]);
      setPriceValue(variationsList[varState].productPrice);
      setStockAmount(variationsList[varState].productStock.stockAmount);
      setStockUnit(variationsList[varState].productStock.stockUnit);
      setActiveValue(variationsList[varState].active);

      setImgSet([imgValue1, imgValue2, imgValue3, imgValue4])
    }
  }, [varState]);  

  let storedCartItems
  let parsedCartItems

  useEffect(() => {
    storedCartItems = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;
    parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];  
  
    setCartContents(parsedCartItems)

}, [])

useEffect(() => {
  if (variationsList && variationsList.length > 0) {
  setImgSet([imgValue1, imgValue2, imgValue3, imgValue4])
  }
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
  setCartValue(0)

  setActiveValue(variationsList[varState].active)
}

useEffect(() => {
  if (variationsList && variationsList.length > 0){
    setAll(varState);
  }
}, [varState]);

useEffect(() => {
  const storedCartItems = localStorage.getItem(localStorageKey);
  const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
  setCartContents(parsedCartItems);
}, [state.count]);

  if (chosenProduct.length === 0){
    return null
  }

  const urlProduct = encodeURIComponent(chosenProduct[0].variations[0].productName)

  async function updateData() {
    if ( typeof window !== 'undefined'){
      storedCartItems = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;

    const response = await fetch(
      `../../../api/read-cart?martid=${router.query.shopid}&email=${user.email}&password=${user.password}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSON.parse(storedCartItems))
      }
    );
    const data = await response.json();
    }
  }

  const soldVar = []

  variationsList.forEach((variant, index) => {

    if (variant.productStock.stockAmount <= 0) {
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

  const handleCartAmount = (event) => {
    const enteredValue = event.target.value.trim();
    const numericEnteredValue = parseInt(enteredValue);
  
    if (isNaN(numericEnteredValue) || numericEnteredValue <= stockAmount) {
      setCartValue(numericEnteredValue);
    } else {
      setCartValue(stockAmount);
    }
  };
  
  
  function addStock() {
    if (cartValue < stockAmount)
    {setCartValue(parseInt(cartValue) + 1)}}

  function minusStock() {
    if (cartValue > 0) {
      setCartValue(parseInt(cartValue) - 1)
    }
  }

  const changeCart = async (items) => {
    storedCartItems = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;
    parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];  
    setCartContents(parsedCartItems)

    const existingItem = cartContents.find((item) => item.name === items.name);
  
    if (items.cartValue === 0 || isNaN(items.cartValue)) {
      return;
    } else if (existingItem) {
      const updatedCartContents = cartContents.map((product) => {
        handleIncrement()
        if (product.name === items.name) {
          const newCartValue = parseInt(product.cartValue) + parseInt(items.cartValue);
          const chosenCartValue = newCartValue <= items.amount ? newCartValue : items.amount;
  
          return { ...product, cartValue: parseInt(chosenCartValue) };
        }
        return product;
      });
  
      setCartContents(updatedCartContents);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedCartContents));

    } else {
      handleIncrement()
      setCartContents([...cartContents, items]);
      localStorage.setItem(localStorageKey, JSON.stringify([...cartContents, items]));
    }

    if (user !== undefined){
      updateData()
    }
  };

  const submitCart = () => {
    const item = {
      name: nameValue,
      description: descValue,
      category: queryCategory,
      image: imgValue1,
      price: priceValue,
      profit: variationsList[varState].productProfit,
      unit: stockUnit,
      amount: stockAmount,
      cartValue: cartValue,
      url: `${shopID._id}/categories/${urlCateg}/${urlProduct}`,
      router: `${shopID._id}`
    };

    changeCart(item)
  };

  return <Fragment>

    <Head>
      <title>{variationsList[0].productName}</title>
      <link rel="icon" type="image/jpeg" href={favicon} />
      <meta name="description" content={descValue} />
    </Head>

    {screenWidth <= 650 && <div className="product-container">
    <div className="main-img-container">

<div className="new-main-img" style={{position:"relative", margin:"auto 0"}}>
  <img src={imgSet[imgState]} alt={variationsList[varState].productName} className="product-image">
  </img>
</div>

<motion.div className="new-side-img-container" initial={{ opacity: 0 }}
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
    </div>}

    <div className="product-container">
      {screenWidth > 650 && <div className="main-img-container">

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
      </div>}
      

      <div className="details-section">
        <form>
          <div>
            <header className="heading-primary" style={{ whiteSpace: "pre-wrap" }}>{nameValue}</header>
            <h1 className="heading-secondary product-currency" style={{marginTop:"1rem"}}>{shopCurrency} {priceValue} / {stockUnit}</h1>
          </div>

          <div className="item-setup" style={{ margin: "1rem 0", width:"100%" }}>
            <h2 className="heading-tertiary" style={{ whiteSpace: "pre-wrap", overflowWrap:"break-word" }}>{descValue}</h2>
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
            <input type="number" value={cartValue} className="text-small input-number" placeholder="Amount" required id='amount' onChange={handleCartAmount} style={{ borderRadius: "0", margin: "0" }}></input>
            <button type="button" onClick={addStock} className="add-button svg-color" style={{ marginRight: "2rem" }}><div className="heading-icon-plus-act svg-decolor">&nbsp;</div></button>
          </div>
        </form>

        <div className="product-action-buttons">
          <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{width:"max-content"}} onClick={submitCart}><div className="menu-cart-add svg-outline-button">&nbsp;</div><h2 className="heading-secondary outline-button">Add to Cart</h2></button>
          <Link href={`/${shopID._id}/checkout`} className="product-action-2 heading-secondary flex-row-align" style={{width:"max-content", textDecoration:"none"}}><div className="menu-checkout svg-solid-button">&nbsp;</div><h2 className="heading-secondary solid-button" style={{textAlign:"center"}}>To Checkout</h2></Link>
        </div>
      </div>
    </div>

  </Fragment>
}

export default ProductPage

export { getServerSideProps }
