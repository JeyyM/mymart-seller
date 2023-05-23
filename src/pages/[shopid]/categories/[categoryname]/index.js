import { Fragment } from "react";
import { useRouter } from "next/router";
import CategoryProducts from "@/components/category-products/CategoryProducts";
import { useState } from "react";
import AddProduct from "@/components/Modal/Add-Product";
import { getServerSideProps } from "..";
import Head from "next/head";

function ProductsPage({ shopID }) {
  const router = useRouter()
  const queryCategoryName = router.query.categoryname

  const { shopData } = shopID;

  const favicon = shopData.shopDetails.imageData.icons.icon

  const shopCurrency = shopData.shopDetails.paymentData.checkoutInfo.currency

  const contents = shopData.shopCategories;

  // console.log(contents)

  // const chosenCategory = Object.values(contents).find(
  //   (c) => c.categoryName === queryCategoryName)
  const chosenCategory = contents.find((c) => c.categoryName === queryCategoryName);
  const chosenIndex = contents.findIndex((c) => c.categoryName === queryCategoryName);

  // console.log(chosenCategory.categoryProducts)


  // const keyContents = Object.entries(contents)

  // const chosenKeyFind = keyContents.find(([key, value]) => {
  //   return value.categoryName === chosenCategory.categoryName
  // })

  // const chosenKey = chosenKeyFind[0]

  // const products = Object.entries(chosenCategory.categoryProducts).map(([key, value]) => {
  //   return {
  //     key: key,
  //     value: value,
  //   };
  // });

  const products = chosenCategory.categoryProducts
  console.log(products)

  // const productNames = products.map((product) => {
  //   const vars = Object.entries(product.value);
  //   const names = vars.map(([key, varObj]) => {
  //     if (key !== "productTags") {
  //       return varObj.productName;
  //     } else {
  //       return null;
  //     }
  //   });
  //   return names.filter((name) => name !== null);
  // }).flat();


  const productNames = products.flatMap((product) => {
    const { variations } = product;
    if (variations && Array.isArray(variations)) {
      return variations.map((variation) => variation.productName).filter(Boolean);
    }
    return [];
  });

  // console.log(products)

  const upperProductNames = productNames.map((name) => name.toUpperCase());

  const [addProduct, setAddProduct] = useState(false)
  const [defaultValues, setDefaultValues] = useState(["", "", ""])

  function addProdHandler(event) {
    event.preventDefault()
    event.stopPropagation()

    setAddProduct(!addProduct)
  }

  async function completeForm(formdata) {
    // console.log(formdata)

    // const nextProd = "Product" + (length + 1)

    const response = await fetch(
      `../../../api/new-product?martid=${router.query.shopid}&categorykey=${chosenIndex}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();

  }

  if (products.length > 0) {

    return <Fragment>
      <Head>
        <title>{queryCategoryName}</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>

      <AddProduct modalStatus={addProduct} disable={addProdHandler} finish={completeForm} names={upperProductNames} currency={shopCurrency}></AddProduct>
      <span className="page-heading">
        <h1 className="heading-primary">{router.query.categoryname}</h1>
        <button onClick={addProdHandler} className="add-prod-init heading-tertiary">
          <div className="heading-icon-plus svg-color">&nbsp;</div>Add Product</button>
      </span>
      <h2 className="category-description heading-tertiary">{chosenCategory.categoryDescription}</h2>

      <section className="category-container">
        {products.map((prod, index) => (
          <Fragment key={index}>
            <CategoryProducts items={prod.variations} categName={queryCategoryName} id={router.query.shopid} index={index} state={addProduct} currency={shopCurrency} ></CategoryProducts>
          </Fragment>
        ))}
      </section>
    </Fragment>
  } else {
    return <Fragment>
      <Head>
        <title>{queryCategoryName}</title>
        <link rel="icon" type="image/jpeg" href={favicon} />
      </Head>
      <AddProduct modalStatus={addProduct} disable={addProdHandler} finish={completeForm}></AddProduct>
      <span className="page-heading">
        <h1 className="heading-primary">{router.query.categoryname}</h1>
        <button onClick={addProdHandler} className="add-prod-init heading-tertiary">
          <div className="heading-icon-plus svg-color">&nbsp;</div>Add Product</button>
      </span>
      <h2 className="category-description heading-tertiary">{chosenCategory.categoryDescription}</h2>
      <div className="empty-contents">
        <div className="empty-logo svg-color">&nbsp;</div>
        <h2 className="empty-text">There seems to be no products yet</h2>
      </div>
    </Fragment>
  }
}

export default ProductsPage

export { getServerSideProps }
