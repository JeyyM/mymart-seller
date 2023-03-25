import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment, useState, useRef } from "react";
import Image from "next/image";

function ProductPage({shopID}){
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

    // console.log(resultingProduct)

    const varArray = Object.entries(categoryContents3[resultingProduct]).map(([key, value]) => ({
        [key]: value
      }));

      const [varState, setVarState] = useState(0)
      const varNum = varState + 1

      function ArrRange(min, max){
        let arr= []
        for (let i = min; i <= max; i ++)
        arr.push(i);
        return arr
    }

    const varRange = (ArrRange(0, varArray.length - 1))

    function varStateHandler(ind){
        console.log(ind)
        setVarState(ind)
    }

    function imageGetter(n) {
        return varArray[n][`var${n + 1}`].productImages[0];
      }

    return <Fragment>
      <div className="product-container">
      <div className="main-img-container">
    <img src={varArray[varState][`var${varNum}`].productImages[0]} alt={varArray[varState][`var${varNum}`].productName} className="product-image"></img>
    <div className="side-img-container">
    {varArray[varState][`var${varNum}`].productImages.map((v, index)=> (
        <img src={varArray[varState][`var${varNum}`].productImages[index]} alt={index} key={index} className="side-img"></img>
    ))}
    </div>
    </div>

    <div className="details-section">
    <form>
    <input type="text" defaultValue={varArray[varState][`var${varNum}`].productName} className="text-input" placeholder="Product Name" required id='name'></input>

    <div className="price-pair">
    <label className="heading-secondary product-currency">$</label>
    <input type="number" defaultValue={varArray[varState][`var${varNum}`].productPrice } className="text-input-sm input-number" placeholder="Price" required id='price'></input>
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
    <input type="number" defaultValue={varArray[varState][`var${varNum}`].productStock.stockAmount } className="text-input-sm input-number" placeholder="Amount" required id='amount'></input>
    <input type="text" defaultValue={varArray[varState][`var${varNum}`].productStock.stockUnit } className="text-input-sm" placeholder="Unit" required id='unit'></input>
    </div>

    </form>

    <label className="heading-secondary product-currency">Variations</label>
    <div className="varContainer">
    {varRange.map((v, index)=> (
        <img key={index} onClick={() => varStateHandler(index)} className="varItem" src={imageGetter(index)}></img>
    ))}
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