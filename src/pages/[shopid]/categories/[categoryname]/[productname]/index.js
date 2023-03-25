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
        setVarState(ind)
    }

    return <Fragment>
          <span className="page-heading">
        <h1 className="heading-primary">{varArray[varState][`var${varNum}`].productName}</h1>
      </span>
    <h2>{varArray[varState][`var${varNum}`].productDescription}</h2>
    <img src={varArray[varState][`var${varNum}`].productImages[0]} width={500} height={500} alt={varArray[varState][`var${varNum}`].productName}></img>
    <h3>{varArray[varState][`var${varNum}`].productPrice}</h3>
    <h3>{varArray[varState][`var${varNum}`].productStock.stockAmount} {varArray[varState][`var${varNum}`].productStock.stockUnit}</h3>
    {varArray[varState][`var${varNum}`].productImages.map((v, index)=> (
        <img src={varArray[varState][`var${varNum}`].productImages[index]} width={100} height={100} alt={index} key={index}></img>
    ))}
    {varRange.map((v, index)=> (
        <button key={index} onClick={() => varStateHandler(index)}>{index}</button>
    ))}

    {/* <form onSubmit={prodSubmitHandler}>
        <h2>Add New Variation</h2>
        <div>
          <label htmlFor='name'>Product Name</label>
          <input type='text' required id='name' ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor='description'>Product Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div>
          <label htmlFor='image1'>Product Images - Imgur Links Only</label>
          <input type='url' required id='image1' ref={imagesInputRef1} />
          <input type='url' id='image2' ref={imagesInputRef2} />
          <input type='url' id='image3' ref={imagesInputRef3} />
          <input type='url' id='image4' ref={imagesInputRef4} />
        </div>
        <div>
          <label htmlFor='price'>Product Price</label>
          <input type='number' required id='price' ref={priceInputRef} />
        </div>
        <div>
          <label htmlFor='amount'>Stock Amount</label>
          <input type='number' required id='amount' ref={stockAmountInputRef} />
        </div>
        <div>
          <label htmlFor='unit'>Stock Unit</label>
          <input type='text' required id='unit' ref={stockUnitInputRef} />
        </div>
        <div>
          <button>Add Product</button>
        </div>
      </form> */}
    
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