import { Fragment } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import CategoryProducts from "@/components/category-products/CategoryProducts";
import Link from "next/link";
import { useState } from "react";
import AddProduct from "@/components/Modal/Add-Product";

function ProductsPage({ shopID }) {
  const router = useRouter()
  const queryCategoryName = router.query.categoryname

  // console.log(router.query.shopid)

  const { shopData } = shopID;
  const contents = shopData.shopCategories;

  const chosenCategory = Object.values(contents).find(
    (c) => c.categoryName === queryCategoryName)


  const keyContents = Object.entries(contents)

    const chosenKeyFind = keyContents.find(([key, value]) => {
      return value.categoryName === chosenCategory.categoryName
    })

    const chosenKey = chosenKeyFind[0]
    // console.log("chosen key here", chosenKey)

  const products = Object.entries(chosenCategory.categoryProducts).map(([key, value]) => {
    return {
      key: key,
      value: value,
    };
  });


  const productNames = products.map((product) => {
    const vars = Object.values(product.value);
    const names = vars.map((varObj) => varObj.productName);
    return names;
  }).flat();

  const [addProduct, setAddProduct] = useState(false)
  const [defaultValues, setDefaultValues] = useState(["", "", ""])

  function addProdHandler(event) {
    event.preventDefault()
    event.stopPropagation()

    setAddProduct(!addProduct)
  }

  async function completeForm(formdata, key, length){

    const nextProd = "Product" + (length + 1)
    console.log (nextProd)

    const response = await fetch(
      `../../../api/new-product?martid=${router.query.shopid}&categorykey=${key}&prodlength=${nextProd}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();

  }

if (products.length > 0){
  return <Fragment>
  <AddProduct modalStatus={addProduct} disable={addProdHandler} finish={completeForm} categKey={chosenKey} length={products.length} names={productNames}></AddProduct>
  <span className="page-heading">
    <h1 className="heading-primary">{router.query.categoryname}</h1>
    <button onClick={addProdHandler} className="add-prod-init heading-tertiary">
          <div className="heading-icon-plus">&nbsp;</div>Add Product</button>
  </span>
  <h2 className="category-description heading-tertiary">{chosenCategory.categoryDescription}</h2>

  <section className="category-container">
    {products.map((prod, index) => (
      <Fragment key={index}>
        <CategoryProducts items={prod.value.var1} categName={queryCategoryName} id={router.query.shopid} index={index} state={addProduct}></CategoryProducts>
      </Fragment>
    ))}
  </section>
</Fragment>
} else {
  return <Fragment>
   <AddProduct modalStatus={addProduct} disable={addProdHandler} finish={completeForm} categKey={chosenKey} length={products.length}></AddProduct>
  <span className="page-heading">
    <h1 className="heading-primary">{router.query.categoryname}</h1>
    <button onClick={addProdHandler} className="add-prod-init heading-tertiary">
          <div className="heading-icon-plus">&nbsp;</div>Add Product</button>
  </span>
  <h2 className="category-description heading-tertiary">{chosenCategory.categoryDescription}</h2>
  <div className="empty-contents">
        <div className="empty-logo">&nbsp;</div>
        <h2 className="empty-text">There seems to be no products yet</h2>
        </div>
  </Fragment>
}
}

export default ProductsPage

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