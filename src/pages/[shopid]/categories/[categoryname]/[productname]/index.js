import { useRouter } from "next/router";
import { Fragment, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProdImg from "@/components/Modal/Prod-Img";
import AddVariation from "@/components/Modal/Add-Variation"
import Confirmer2 from "@/components/Modal/Confirmer2";
import AddTags from "@/components/Modal/Add-Tags";
import { getServerSideProps } from "..";
import Head from "next/head";

function ProductPage({ shopID }) {
  const router = useRouter()

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

  console.log(upperProductNames)

  const routerData = [shopID._id, queryCategory]

  const [varState, setVarState] = useState(0)
  const [imgState, setImgState] = useState(0)

  const chosenTags = chosenCategory[0].categoryProducts[productIndex].productTags

  const soldVar = []

  variationsList.forEach((variant, index) => {

      if (variant.productStock.stockAmount === "0"){
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

  function addPrice() {
    setPriceValue(parseInt(priceValue) + 1)
  }

  function minusPrice() {
    if (priceValue > 0) {
      setPriceValue(parseInt(priceValue) - 1)
    }
  }

  function addStock() {
    setStockAmount(parseInt(stockAmount) + 1)
  }

  function minusStock() {
    if (stockAmount > 0) {
      setStockAmount(parseInt(stockAmount) - 1)
    }
  }

  const [nameLength, setNameLength] = useState(variationsList[varState].productName.length)
  const handleNameLength = (event) => {
    setNameLength(event.length)
  }

  const [descLength, setDescLength] = useState(variationsList[varState].productDescription.length)
  const handleDescLength = (event) => {
    setDescLength(event.length)
  }

  const nameLengthClasses = `${nameLength > 40 ? "overlength" : ""}`;
  const descLengthClasses = `${descLength > 150 ? "overlength" : ""}`;

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

  const [loading, setLoading] = useState(false)
  const [completion, setCompletion] = useState(false)

  const checkmark = (
    <svg viewBox="0 0 100 100" width="7rem" height="7rem">
      <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
        strokeDasharray="200" strokeDashoffset="200">
        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
      </path>
    </svg>
  )

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    img: true,
    desc: true,
    price: true,
    amount: true,
    unit: true,
    images: true,
    exist: false,
  });

  const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"
    }`;

  const imgClasses = `${formInputValidity.images ? "text-full" : "invalid-form"
    }`;

  const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"
    }`;

  const priceClasses = `${formInputValidity.price ? "text-small input-number shortener-25" : "invalid-form-2 shortener-25"
    }`;

  const amountClasses = `${formInputValidity.amount ? "text-small input-number" : "invalid-form-2"
    }`;

  const unitClasses = `${formInputValidity.unit ? "text-small input-number" : "invalid-form-2"
    }`;

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

    setNameLength(variationsList[varState].productName.length)
    setDescLength(variationsList[varState].productDescription.length)
    setActiveValue(variationsList[varState].active)

    setFormInputValidity({
      name: true,
      img: true,
      desc: true,
      price: true,
      amount: true,
      unit: true,
      images: true,
    });
  }

  useEffect(() => {
    setImgSet([imgValue1, imgValue2, imgValue3, imgValue4])
  }, [imgValue1, imgValue2, imgValue3, imgValue4])

  const [showImg, setShowImg] = useState(false)
  function handleShowImg() {
    setShowImg(!showImg)
  }

  const [addVar, setAddVar] = useState()
  function handleAddVar() {
    setAddVar(!addVar)
  }

  const [deletion, setDeletion] = useState(false)
  function handleDelete() {
    setDeletion(!deletion)
  }

  const imagePayload = (payload) => {
    if (payload[0]) { setImgValue1(payload[0].image) } else { setImgValue1(undefined) }
    if (payload[1]) { setImgValue2(payload[1].image) } else { setImgValue2(undefined) }
    if (payload[2]) { setImgValue3(payload[2].image) } else { setImgValue3(undefined) }
    if (payload[3]) { setImgValue4(payload[3].image) } else { setImgValue4(undefined) }
  }

  let upcoming = null

  if (variationsList.length > 1) {
    const next = variationsList[1].productName
    if (next) {
      upcoming = next
    }
  }

  const [tagsValue, setTagsValue] = useState(chosenTags);
  const handleTagsChange = (event) => {
    setTagsValue(event)
  };

    const [tagStatus, setTagStatus] = useState(false)
  function handleTags() {
    setTagStatus(!tagStatus)
  }


  /////////////////////
  const productFixer = (test) => {

    const deleteProduct = async () => {
      const response = await fetch(
        `../../../../api/new-product?martid=${router.query.shopid}&categorykey=${categoryIndex}&productkey=${productIndex}&currentvar=${varState}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    deleteProduct()
  }
  //////////

  const handleClick = async (event) => {
    await handleSubmit(event);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const img1Valid = startsImgur(imgValue1) && !isEmpty(imgValue1)
    const img2Valid = startsImgur(imgValue2) && !isEmpty(imgValue2)
    const img3Valid = startsImgur(imgValue3) && !isEmpty(imgValue3)
    const img4Valid = startsImgur(imgValue4) && !isEmpty(imgValue4)

    const givenImages = [
      img1Valid && { image: imgValue1 },
      img2Valid && { image: imgValue2 },
      img3Valid && { image: imgValue3 },
      img4Valid && { image: imgValue4 },
    ].filter(Boolean)

    let nameValid = nameValue.trim() !== "" && !upperProductNames.includes(encodeURIComponent(nameValue.toUpperCase()))
    let nameExist = upperProductNames.includes(encodeURIComponent(nameValue.toUpperCase()))
    if (encodeURIComponent(nameValue.toUpperCase()) === encodeURIComponent(variationsList[varState].productName.toUpperCase())) { nameExist = false; nameValid = true }
    const descValid = descValue !== ""
    const priceValid = priceValue !== "" && priceValue >= 0
    const amountValid = stockAmount !== "" && stockAmount >= 0
    const unitValid = stockUnit !== ""
    const imgValid = givenImages.length > 0

    console.log(nameValid, nameExist)
    console.log("here", upperProductNames)

    const submissionValid = nameValid && imgValid && descValid && priceValid && unitValid && amountValid && imgValid && !nameExist

    setFormInputValidity({
      name: nameValid,
      img: imgValid,
      desc: descValid,
      price: priceValid,
      amount: amountValid,
      unit: unitValid,
      images: imgValid,
      exist: nameExist,
    });

    const incomingData = {
      productName: nameValue,
      productDescription: descValue,
      productPrice: priceValue,
      productStock: { stockAmount: stockAmount, stockUnit: stockUnit },
      productImages: givenImages.map((imageObject) => imageObject.image),
      active: activeValue
    }

    if (submissionValid) {
      setLoading(true)

      const response = await fetch(
        `../../../../api/new-product?martid=${router.query.shopid}&categorykey=${categoryIndex}&productkey=${productIndex}&varnum=${varState}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(incomingData)
        }
      );

      await waitSeconds();

      setLoading(false)
      setCompletion(true)

      if (varState === 0) {
        router.push(`/${shopID._id}/categories/${encodeURIComponent(queryCategory)}/${encodeURIComponent(nameValue)}`)
        await waitSecondsShort()
        setCompletion(false)
      } else {
        router.push(`/${shopID._id}/categories/${encodeURIComponent(queryCategory)}/${encodeURIComponent(variationsList[0].productName)}`)
        await waitSecondsShort()
        setCompletion(false)
      }
    }
  }
  /////////////////////////////////////

  const addVariation = async (payload) => {
    const response = await fetch(
      `../../../../api/new-variation?martid=${router.query.shopid}&categorykey=${categoryIndex}&productkey=${productIndex}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
  }

  const delVariation = async (payload) => {
    const response = await fetch(
      `../../../../api/new-variation?martid=${router.query.shopid}&categorykey=${categoryIndex}&productkey=${productIndex}&varnum=${varState}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
  }

  const changeTags = async (payload) => {
    const response = await fetch(
      `../../../../api/new-tag?martid=${router.query.shopid}&categorykey=${categoryIndex}&productkey=${productIndex}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
  }
  
  function submitTags(data) {
    handleTagsChange(data)
    changeTags(data)
  }

  //////////

  useEffect(() => {
    setAll(varState);
  }, [varState]);


  return <Fragment>

    <Head>
      <title>{variationsList[0].productName}</title>
      <link rel="icon" type="image/jpeg" href={favicon} />
    </Head>
    <ProdImg disable={handleShowImg} modalStatus={showImg} imgnumber={validImgSet.length} imgs={imgSet} setImg={imagePayload}></ProdImg>
    <AddVariation modalStatus={addVar} disable={handleAddVar} names={upperProductNames} finish={addVariation} currency={shopCurrency}></AddVariation>
    <Confirmer2 modalStatus={deletion} disable={handleDelete} msg="Are you sure you want to delete the variation? This cannot be undone. However, the data from this variation's statistics will remain." action="Delete Variation?" label={`Will you delete ${variationsList[varState].productName}?`} load={() => { setLoading(true) }} default={varState} finish={delVariation} names={upcoming} routing={routerData} productFix={productFixer}></Confirmer2>
    <AddTags modalStatus={tagStatus} disable={handleTags} list={tagsValue} submit={submitTags}></AddTags>

    <div className="product-container">
      <div className="main-img-container">

        <div className="sample">
          <button className="product-edit-button" onClick={() => { handleShowImg() }} type="button" disabled={loading}><div className="heading-icon-edit svg-color">&nbsp;</div></button>
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
            <input type="text" value={nameValue} className={nameClasses} placeholder="Product Name" required id='name' autoComplete="off" onChange={handleNameChange}></input>
            {formInputValidity.name && !formInputValidity.exist ? <label className="form-label" title="Upon reaching 40 digits in length, an ellipsis (...) will be added.">Product Name <span><span className={nameLengthClasses}>{nameLength}</span>/40</span></label> : !formInputValidity.exist ? <label className="form-label inv" style={{ color: "red" }}>Enter a valid product name <span><span className={nameLengthClasses}>{nameLength}</span>/40</span></label> : <label className="form-label inv" style={{ color: "red" }}>Product name already exists in category <span><span className={nameLengthClasses}>{nameLength}</span>/40</span></label>}

          </div>

          <div className="price-pair">
            <label className="heading-secondary product-currency">{shopCurrency}</label>
            <div className="flex-col">
              <div className="add-buttons flex-row-spaceless">
                <button type="button" className="minus-button" onClick={minusPrice}><div className="heading-icon-minus-act svg-color">&nbsp;</div></button>
                <input type="number" value={priceValue} className={priceClasses} placeholder="Price" required id='price' onChange={handlePriceChange} style={{ borderRadius: "0", margin: "0" }}></input>
                <button type="button" onClick={addPrice} className="add-button svg-color"><div className="heading-icon-plus-act svg-decolor">&nbsp;</div></button>
                <div className="flex-row-align">
                <h1 className="heading-secondary" style={{marginLeft:"2rem"}}>Active:</h1> <div style={{transform:"translateY(-1rem) "}}><input checked={activeValue} onChange={handleActive} type="checkbox" id="switch" className="toggle-switch" /><label htmlFor="switch" className="toggle-label">Toggle</label></div>
                </div>
              </div>
              {formInputValidity.price ? <label className="form-label">Price</label> : <label className="form-label inv" style={{ color: "red" }}>Enter a valid price</label>}
            </div>
          </div>


          <textarea
            id='description'
            required
            rows='5'
            value={descValue}
            className={descClasses}
            placeholder="Description"
            onChange={handleDescChange}
          ></textarea>
          {formInputValidity.desc ? <label className="form-label" title="Upon reaching 150 digits in length, an ellipsis (...) will be added.">Description <span><span className={descLengthClasses}>{descLength}</span>/150</span></label> : <label className="form-label inv" style={{ color: "red" }}>Enter a valid description <span><span className={descLengthClasses}>{descLength}</span>/150</span></label>}


          <div className="price-pair">

            <label className="heading-secondary product-currency">Stock</label>

            <div className="flex-col">
              <div className="add-buttons flex-row-spaceless">
                <button type="button" className="minus-button" onClick={minusStock}><div className="heading-icon-minus-act svg-color">&nbsp;</div></button>
                <input type="number" value={stockAmount} className={amountClasses} placeholder="Amount" required id='amount' onChange={handleStockAmount} style={{ borderRadius: "0", margin: "0" }}></input>
                <button type="button" onClick={addStock} className="add-button svg-color" style={{ marginRight: "2rem" }}><div className="heading-icon-plus-act svg-decolor">&nbsp;</div></button>
              </div>
              {formInputValidity.amount ? <label className="form-label">Stock Amount</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid stock amount</label>}
            </div>
            <div className="flex-col">
              <input type="text" value={stockUnit} className={unitClasses} placeholder="Unit" required id='unit' onChange={handleStockUnit} autoComplete="off"></input>
              {formInputValidity.unit ? <label className="form-label">Stock Unit</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid stock unit</label>}
            </div>
          </div>
        </form>

        <label className="heading-secondary variations-label">Variations</label> <button className="add-img" type="button" onClick={handleAddVar} ><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>

        <motion.div className="varContainer" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}>
          {variationsList.map((v, index) => (
            <div className="warning-container" key={index}>
            {soldVar.includes(index) && 
                <motion.div className="sold-out-warning svg-sold"
                  key={v}
                  initial={{ opacity: 1, translateX: -25, translateY: -25, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, type: "spring", damping: 0 }}>&nbsp;</motion.div>}
            <motion.img key={index} onClick={() => { varStateHandler(index);}} className={`varItem ${index === varState ? "active-var" : ""}`} src={imageGetter(index)} alt={index} initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.2 }}></motion.img>
              </div>
          ))}
        </motion.div>

        <div className="product-action-buttons">
          <button className="product-action-3 heading-secondary white" disabled={loading} onClick={handleDelete} type="button">Delete Variation</button>
          <button className="product-action-1 heading-secondary" disabled={loading} onClick={handleTags} type="button">Edit Search Tags</button>
          <button className="product-action-2 heading-secondary" onClick={handleClick} disabled={loading} type="button">{loading ? <div className="spinner"></div> : (completion ? checkmark : "Submit Changes")}</button>
        </div>
      </div>
    </div>

  </Fragment>
}

export default ProductPage

export { getServerSideProps }
