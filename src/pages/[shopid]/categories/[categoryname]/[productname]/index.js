import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProdImg from "@/components/Modal/Prod-Img";
import AddVariation from "@/components/Modal/Add-Variation"
import Confirmer from "@/components/Modal/Confirmer";

function ProductPage({ shopID }) {
  const router = useRouter()

  const queryProduct = router.query.productname
  const queryCategory = router.query.categoryname
  const categoryContents1 = shopID.shopData.shopCategories

  const categoryContents2 = Object.entries(categoryContents1).find(([key, value]) => {
    return value.categoryName === queryCategory
  })

  const categoryContents3 = categoryContents2[1].categoryProducts

  console.log("checking for the list", categoryContents3)

  const productNames = Object.values(categoryContents3).map((product) => {
    const vars = Object.values(product);
    const names = vars.map((varObj) => varObj.productName);
    return names;
  }).flat();

  const upperProductNames = productNames.map(name => name.toUpperCase());

  const resulting = Object.keys(categoryContents3).reduce((acc, curr) => {
    const foundProduct = Object.keys(categoryContents3[curr].var1).find(
      (key) => categoryContents3[curr].var1.productName === queryProduct
    );

    if (foundProduct) {
      acc[curr] = categoryContents3[curr].var1[foundProduct];
    }
    return acc;
  }, {});

  const resultingProduct = Object.keys(resulting)[0];

  const varArray = Object.entries(categoryContents3[resultingProduct]).map(([key, value]) => ({
    [key]: value
  }));

  const [varState, setVarState] = useState(0)
  const [imgState, setImgState] = useState(0)
  const varNum = varState + 1

  function ArrRange(min, max) {
    let arr = []
    for (let i = min; i <= max; i++)
      arr.push(i);
    return arr
  }

  const varRange = (ArrRange(0, varArray.length - 1))

  function varStateHandler(ind) {
    setVarState(ind)
    setImgState(0)
  }

  function imgStateHandler(ind) {
    setImgState(ind)
  }

  function imageGetter(n) {
    return varArray[n][`var${n + 1}`].productImages[0];
  }


  const [nameValue, setNameValue] = useState(varArray[varState][`var${varNum}`].productName);
  const handleNameChange = (event) => {
    setNameValue(event.target.value);
    handleNameLength(event.target.value)
  };

  const [descValue, setDescValue] = useState(varArray[varState][`var${varNum}`].productDescription);
  const handleDescChange = (event) => {
    setDescValue(event.target.value);
    handleDescLength(event.target.value)
  };

  const [imgValue1, setImgValue1] = useState(varArray[varState][`var${varNum}`].productImages[0]);
  const handleImgChange1 = (event) => {
    setImgValue1(event.target.value);
  };

  const [imgValue2, setImgValue2] = useState(varArray[varState][`var${varNum}`].productImages[1]);
  const handleImgChange2 = (event) => {
    setImgValue2(event.target.value);
  };

  const [imgValue3, setImgValue3] = useState(varArray[varState][`var${varNum}`].productImages[2]);
  const handleImgChange3 = (event) => {
    setImgValue3(event.target.value);
  };

  const [imgValue4, setImgValue4] = useState(varArray[varState][`var${varNum}`].productImages[3]);
  const handleImgChange4 = (event) => {
    setImgValue4(event.target.value);
  };

  const [priceValue, setPriceValue] = useState(varArray[varState][`var${varNum}`].productPrice);
  const handlePriceChange = (event) => {
    if (event.target.value.length < 9){
    setPriceValue(event.target.value);}
  };
  

  const [stockAmount, setStockAmount] = useState(varArray[varState][`var${varNum}`].productStock.stockAmount);
  const handleStockAmount = (event) => {
    if (event.target.value.length < 9){
    setStockAmount(event.target.value);}
  };

  const [stockUnit, setStockUnit] = useState(varArray[varState][`var${varNum}`].productStock.stockUnit);
  const handleStockUnit = (event) => {
    setStockUnit(event.target.value);
  };

  // console.log(nameValue, "|", descValue, "|", imgValue1, "|", imgValue2, "|", imgValue3, "|", imgValue4, "|", priceValue, "|", stockAmount, "|", stockUnit)

  const [nameLength, setNameLength] = useState(varArray[varState][`var${varNum}`].productName.length)
  const handleNameLength = (event) => {
    setNameLength(event.length)
  }

  const [descLength, setDescLength] = useState(varArray[varState][`var${varNum}`].productDescription.length)
  const handleDescLength = (event) => {
    setDescLength(event.length)
    // console.log(descLength)
  }

  // console.log(" ayp nbrjn", descLength)

  const nameLengthClasses = `${nameLength > 40 ? "overlength" : ""}`;
  const descLengthClasses = `${descLength > 150 ? "overlength" : ""}`;

  const [imgSet, setImgSet] = useState([imgValue1, imgValue2, imgValue3, imgValue4])
  const [validImgSet, setValidImgSet] = useState([])

  useEffect(() => {
    const img1Valid = startsImgur(imgValue1) && !isEmpty(imgValue1)
    const img2Valid = startsImgur(imgValue2) && !isEmpty(imgValue2)
    const img3Valid = startsImgur(imgValue3) && !isEmpty(imgValue3)
    const img4Valid = startsImgur(imgValue4) && !isEmpty(imgValue4)
    const validImgSet = [img1Valid && { image: imgValue1 }, img2Valid && { image: imgValue2 }, img3Valid && { image: imgValue3 }, img4Valid && { image: imgValue4 },].filter(Boolean)
    // console.log("valid img set", validImgSet)
    setValidImgSet(validImgSet)
  }, [imgValue1, imgValue2, imgValue3, imgValue4])

  // console.log("valid length here", validImgSet)

  // console.log("imsetherer", imgSet)

  function isEmpty(word) {
    word.trim() === ""
  }

  function startsImgur(word) {
    if (word) { return word.slice(0, 20) === "https://i.imgur.com/"; }
  }

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

  function waitSeconds() {
    // console.log("wait 2.5 sec")
    return new Promise(resolve => setTimeout(resolve, 2500));
  }

  function waitSecondsShort() {
    // console.log("wait 2.5 sec")
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

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

  function setAll(index) {
    setNameValue(varArray[index][`var${index + 1}`].productName)
    setDescValue(varArray[index][`var${index + 1}`].productDescription)
    setImgValue1(varArray[index][`var${index + 1}`].productImages[0])
    setImgValue2(varArray[index][`var${index + 1}`].productImages[1])
    setImgValue3(varArray[index][`var${index + 1}`].productImages[2])
    setImgValue4(varArray[index][`var${index + 1}`].productImages[3])
    setPriceValue(varArray[index][`var${index + 1}`].productPrice)
    setStockAmount(varArray[index][`var${index + 1}`].productStock.stockAmount)
    setStockUnit(varArray[index][`var${index + 1}`].productStock.stockUnit)

    setNameLength(varArray[index][`var${index + 1}`].productName.length)
    setDescLength(varArray[index][`var${index + 1}`].productDescription.length)

    // setImgSet([imgValue1, imgValue2, imgValue3, imgValue4])
    // console.log("set all imgset", imgSet)

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
    // console.log(showImg)
  }

  // console.log(varArray[varState][`var${varState + 1}`].productImages.length)

  const handleClick = async (event) => {
    await handleSubmit(event);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("submitting")

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

    let nameValid = nameValue !== "" && !upperProductNames.includes(nameValue.toUpperCase())
    let nameExist = upperProductNames.includes(nameValue.toUpperCase())
    if (nameValue.toUpperCase() === varArray[varState][`var${varNum}`].productName.toUpperCase()) {nameExist = false; nameValid = true}
    const descValid = descValue !== ""
    const priceValid = priceValue !== ""
    const amountValid = stockAmount !== ""
    const unitValid = stockUnit !== ""
    const imgValid = givenImages.length > 0

    console.log("status checks")
    console.log(nameValid)
    console.log(nameExist)

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
      productImages: givenImages.map((imageObject) => imageObject.image)
    }

    if (submissionValid){
      setLoading(true)
      console.log("valid")

        // const nextVar = "var" + (varArray.length + 1)
        // console.log("nextvar", nextVar)

        console.log(varNum)
    
        const response = await fetch(
          `../../../../api/new-product?martid=${router.query.shopid}&categorykey=${categoryContents2[0]}&productkey=${resultingProduct}&varnum=${varNum}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(incomingData)
          }
        );

      await waitSeconds();

      // console.log(nameValue, "|", descValue, "|", givenImages, "|", priceValue, "|", stockAmount, "|", stockUnit)

      setLoading(false)
      setCompletion(true)

      if (varNum === 1){router.push(`/${shopID._id}/categories/${encodeURIComponent(queryCategory)}/${encodeURIComponent(nameValue)}`)
      await waitSecondsShort()
      setCompletion(false)
    } else {router.push(`/${shopID._id}/categories/${encodeURIComponent(queryCategory)}/${encodeURIComponent(varArray[0][`var${1}`].productName)}`)
    await waitSecondsShort()
    setCompletion(false)}
    }
  }

  const addVariation = async (payload) => {
    console.log(payload)
    const response = await fetch(
      `../../../../api/new-variation?martid=${router.query.shopid}&categorykey=${categoryContents2[0]}&productkey=${resultingProduct}&varnum=${varArray.length + 1}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
  }

  const delVariation = async (payload) => {
    console.log(payload)
    const response = await fetch(
      `../../../../api/new-variation?martid=${router.query.shopid}&categorykey=${categoryContents2[0]}&productkey=${resultingProduct}&varnum=${varNum}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
  }

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


    // console.log("later valid check", validImgSet.length)


    const imagePayload = (payload) => {
      // console.log("payload here", payload[0].image)
      if (payload[0]) {setImgValue1(payload[0].image)} else {setImgValue1(undefined)}
      if (payload[1]) {setImgValue2(payload[1].image)} else {setImgValue2(undefined)}
      if (payload[2]) {setImgValue3(payload[2].image)} else {setImgValue3(undefined)}
      if (payload[3]) {setImgValue4(payload[3].image)} else {setImgValue4(undefined)}
    }
  

    const [addVar, setAddVar] = useState()
    function handleAddVar(){
      setAddVar(!addVar)
      console.log(addVar)
    }
    // console.log("current image values here", imgValue1, imgValue2, imgValue3, imgValue4)
    // console.log("this is the imgset rn", imgSet)

    const [deletion, setDeletion] = useState(false)
    function handleDelete(){
      setDeletion(!deletion)
    }
  return <Fragment>
    <ProdImg disable={handleShowImg} msg="hello there" modalStatus={showImg} imgnumber={validImgSet.length} imgs={imgSet} setImg={imagePayload}></ProdImg>
    <AddVariation modalStatus={addVar} disable={handleAddVar} names={upperProductNames} finish={addVariation}></AddVariation>
    <Confirmer modalStatus={deletion} disable={handleDelete} msg="Are you sure you want to delete the variation? This cannot be undone. However, the data from this variation's statistics will remain." action="Delete Variation?" label={`Will you delete ${varArray[varState][`var${varNum}`].productName}?`} load={() => { setLoading(true) }} default={varNum} finish={delVariation}></Confirmer>
    {/* <Confirmer modalStatus={delCateg} disable={delCategHandler} clear={props.clear} delete={delCategHandler} default={setDefaultName} finish={handleDelete} chosenItem={props.defs[0]} msg="Are you sure you want to delete the category? This cannot be undone. However, the data from this category's statistics will remain." label={`Will you delete ${setDefaultName}?`} load={() => { setLoading(true) }}></Confirmer> */}

    
    {/* <AddVariation modalStatus={addVar} disable={handleAddVar} finish={completeForm} categKey={chosenKey} length={products.length}></AddVariation> */}


    <div className="product-container">
      <div className="main-img-container">

        <div className="sample">
          <button className="product-edit-button" onClick={() => { handleShowImg() }} type="button" disabled={loading}><div className="heading-icon-edit">&nbsp;</div></button>
          <img src={imgSet[imgState]} alt={varArray[varState][`var${varNum}`].productName} className="product-image">
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
            {formInputValidity.name && !formInputValidity.exist ? <label className="form-label" title="Upon reaching 40 digits in length, an ellipsis (...) will be added.">Product Name <span><span className={nameLengthClasses}>{nameLength}</span>/40</span></label> : !formInputValidity.exist ? <label className="form-label" style={{ color: "red" }}>Enter a valid product name <span><span className={nameLengthClasses}>{nameLength}</span>/40</span></label> : <label className="form-label" style={{ color: "red" }}>Product name already exists in category <span><span className={nameLengthClasses}>{nameLength}</span>/40</span></label>}

          </div>

          <div className="price-pair">
            <label className="heading-secondary product-currency">$</label>
            <div className="flex-col">
              <input type="number" value={priceValue} className={priceClasses} placeholder="Price" required id='price' onChange={handlePriceChange}></input>
              {formInputValidity.price ? <label className="form-label">Price</label> : <label className="form-label" style={{ color: "red" }}>Enter a valid price</label>}
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
          {formInputValidity.desc ? <label className="form-label" title="Upon reaching 150 digits in length, an ellipsis (...) will be added.">Description <span><span className={descLengthClasses}>{descLength}</span>/150</span></label> : <label className="form-label" style={{ color: "red" }}>Enter a valid description <span><span className={descLengthClasses}>{descLength}</span>/150</span></label>}


          <div className="price-pair">

            <label className="heading-secondary product-currency">Stock</label>
            <div className="flex-col">
              <input type="number" value={stockAmount} className={amountClasses} placeholder="Amount" required id='amount' onChange={handleStockAmount}></input>
              {formInputValidity.amount ? <label className="form-label">Stock Amount</label> : <label className="form-label" style={{ color: "red" }}>Invalid stock amount</label>}
            </div>

            <div className="flex-col">
              <input type="text" value={stockUnit} className={unitClasses} placeholder="Unit" required id='unit' onChange={handleStockUnit}></input>
              {formInputValidity.unit ? <label className="form-label">Stock Unit</label> : <label className="form-label" style={{ color: "red" }}>Invalid stock unit</label>}
            </div>

          </div>

        </form>

        <label className="heading-secondary variations-label">Variations</label> <button className="add-img" type="button" onClick={handleAddVar} ><div className="heading-icon-plus-marginless">&nbsp;</div></button>
        
       <motion.div className="varContainer" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}>
          {varRange.map((v, index) => (
            <motion.img key={index} onClick={() => { varStateHandler(index); setAll(index); }} className={`varItem ${index === varState ? "active-var" : ""}`} src={imageGetter(index)} alt={index} initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.2 }}></motion.img>
          ))}
        </motion.div>

        <div className="product-action-buttons">
          <button className="product-action-3 heading-secondary" disabled={loading} onClick={handleDelete}>Delete Variation</button>
          <button className="product-action-1 heading-secondary" disabled={loading}>Edit Search Tags</button>
          <button className="product-action-2 heading-secondary" onClick={handleClick} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? checkmark : "Submit Changes")}</button>
        </div>
      </div>
    </div>

  </Fragment>
}

export default ProductPage

export async function getServerSideProps({ params }) {
  // console.log(params)

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const id = new ObjectId(params.shopid);
  const shopID = await db.collection("shops").findOne({ _id: id });

  shopID._id = shopID._id.toString();

  client.close();

  return {
    props: { shopID },
  };
}