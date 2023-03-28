import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

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

  return <Fragment>
    <div className="product-container">
      <div className="main-img-container">

        <img src={varArray[varState][`var${varNum}`].productImages[imgState]} alt={varArray[varState][`var${varNum}`].productName} className="product-image"></img>
 

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
          <input type="text" defaultValue={varArray[varState][`var${varNum}`].productName} className="text-full" placeholder="Product Name" required id='name'></input>

          <div className="price-pair">
            <label className="heading-secondary product-currency">$</label>
            <input type="number" defaultValue={varArray[varState][`var${varNum}`].productPrice} className="text-small input-number" placeholder="Price" required id='price'></input>
          </div>

          <textarea
            id='description'
            required
            rows='5'
            defaultValue={varArray[varState][`var${varNum}`].productDescription}
            className="desc-text-area"
            placeholder="Description"
          ></textarea>

          <div className="price-pair-2">
            <label className="heading-secondary product-currency">Stock</label>
            <input type="number" defaultValue={varArray[varState][`var${varNum}`].productStock.stockAmount} className="text-small input-number" placeholder="Amount" required id='amount'></input>
            <input type="text" defaultValue={varArray[varState][`var${varNum}`].productStock.stockUnit} className="text-small" placeholder="Unit" required id='unit'></input>
          </div>

        </form>

        <label className="heading-secondary product-currency">Variations</label>
        <motion.div className="varContainer" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}>
          {varRange.map((v, index) => (
            <motion.img key={index} onClick={() => varStateHandler(index)} className={`varItem ${index === varState ? "active-var" : ""}`} src={imageGetter(index)} alt={index} initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.2 }}></motion.img>
          ))}
        </motion.div>

        <div className="product-action-buttons">
          <button className="product-action-1 heading-secondary">Delete Variation</button>
          <button className="product-action-2 heading-secondary">Edit Search Tags</button>
          <button className="product-action-2 heading-secondary">Submit Changes</button>
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