import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProdImg from "@/components/Modal/Prod-Img";

function ProductPage({ shopID }) {
  const router = useRouter()

  const queryProduct = router.query.productname
  const queryCategory = router.query.categoryname
  const categoryContents1 = shopID.shopData.shopCategories

  const categoryContents2 = Object.entries(categoryContents1).find(([key, value]) => {
    return value.categoryName === queryCategory
  })

  const categoryContents3 = categoryContents2[1].categoryProducts

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
  };

  const [descValue, setDescValue] = useState(varArray[varState][`var${varNum}`].productDescription);
  const handleDescChange = (event) => {
    setDescValue(event.target.value);
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
    setPriceValue(event.target.value);
  };

  const [stockAmount, setStockAmount] = useState(varArray[varState][`var${varNum}`].productStock.stockAmount);
  const handleStockAmount = (event) => {
    setStockAmount(event.target.value);
  };

  const [stockUnit, setStockUnit] = useState(varArray[varState][`var${varNum}`].productStock.stockUnit);
  const handleStockUnit = (event) => {
    setStockUnit(event.target.value);
  };

  console.log(nameValue, "|", descValue, "|", imgValue1, "|", imgValue2, "|", imgValue3, "|", imgValue4, "|", priceValue, "|", stockAmount, "|", stockUnit)

  function sendData () {
    console.log(nameValue, "|", descValue, "|", imgValue1, "|", imgValue2, "|", imgValue3, "|", imgValue4, "|", priceValue, "|", stockAmount, "|", stockUnit)
    console.log("over here", varState)
  }

  function setAll(index){
    setNameValue(varArray[index][`var${index + 1}`].productName)
    setDescValue(varArray[index][`var${index + 1}`].productDescription)
    setImgValue1(varArray[index][`var${index + 1}`].productImages[0])
    setImgValue2(varArray[index][`var${index + 1}`].productImages[1])
    setImgValue3(varArray[index][`var${index + 1}`].productImages[2])
    setImgValue4(varArray[index][`var${index + 1}`].productImages[3])
    setPriceValue(varArray[index][`var${index + 1}`].productPrice)
    setStockAmount(varArray[index][`var${index + 1}`].productStock.stockAmount)
    setStockUnit(varArray[index][`var${index + 1}`].productStock.stockUnit)
  }

  const [showImg, setShowImg] = useState(false)

  function handleShowImg(){
    setShowImg(!showImg)
    console.log(showImg)
  }

  const imgSet = [imgValue1, imgValue2, imgValue3, imgValue4]
  const imgHandlers = [setImgValue1, setImgValue2, setImgValue3, setImgValue4]

  console.log(varArray[varState][`var${varState + 1}`].productImages.length)

  return <Fragment>
    {showImg && <ProdImg disable={handleShowImg} msg="hello there" modalStatus={showImg} imgnumber={imgSet.length} imgs={imgSet} handlers={imgHandlers}></ProdImg>}

    <div className="product-container">
      <div className="main-img-container">

      <div className="sample">
      <button className="product-edit-button" onClick={handleShowImg} type="button"><div className="heading-icon-edit">&nbsp;</div></button>
        <img src={varArray[varState][`var${varNum}`].productImages[imgState]} alt={varArray[varState][`var${varNum}`].productName} className="product-image">
        </img>
      </div>

        <motion.div className="side-img-container" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          key={varState}
        >
          {varArray[varState][`var${varNum}`].productImages.map((v, index) => (
            <motion.img
              key={index}
              src={varArray[varState][`var${varNum}`].productImages[index]}
              alt={index}
              className={`side-img ${index === imgState ? "active-var" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.2 }}
              onClick={() => imgStateHandler(index)}
            />
          ))}
        </motion.div>
      </div>

      <div className="details-section">
        <form>
        <div>
          <input type="text" value={nameValue} className="text-full" placeholder="Product Name" required id='name' onChange={handleNameChange}></input>
        </div>

          <div className="price-pair">
            <label className="heading-secondary product-currency">$</label>
            <input type="number" value={priceValue} className="text-small input-number" placeholder="Price" required id='price' onChange={handlePriceChange}></input>
          </div>

          <textarea
            id='description'
            required
            rows='5'
            value={descValue}
            className="desc-text-area"
            placeholder="Description"
            onChange={handleDescChange}
          ></textarea>

          <div className="price-pair-2">
            <label className="heading-secondary product-currency">Stock</label>
            <input type="number" value={stockAmount} className="text-small input-number" placeholder="Amount" required id='amount' onChange={handleStockAmount}></input>
            <input type="text" value={stockUnit} className="text-small" placeholder="Unit" required id='unit' onChange={handleStockUnit}></input>
          </div>

        </form>

        <label className="heading-secondary product-currency">Variations</label>
        <motion.div className="varContainer" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}>
          {varRange.map((v, index) => (
            <motion.img key={index} onClick={() => {varStateHandler(index); setAll(index);}} className={`varItem ${index === varState ? "active-var" : ""}`} src={imageGetter(index)} alt={index} initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.2 }}></motion.img>
          ))}
        </motion.div>

        <div className="product-action-buttons">
          <button className="product-action-3 heading-secondary">Delete Variation</button>
          <button className="product-action-1 heading-secondary">Edit Search Tags</button>
          <button className="product-action-2 heading-secondary" onClick={sendData}>Submit Changes</button>
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