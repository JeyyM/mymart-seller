import { Fragment } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import CategoryProducts from "@/components/category-products/CategoryProducts";
import Link from "next/link";

function ProductsPage({ shopID }) {
  const router = useRouter()
  const queryCategoryName = router.query.categoryname

  const { shopData } = shopID;
  const contents = shopData.shopCategories;

  const chosenCategory = Object.values(contents).find(
    (c) => c.categoryName === queryCategoryName)

  const products = Object.entries(chosenCategory.categoryProducts).map(([key, value]) => {
    return {
      key: key,
      value: value,
    };
  });


  // console.log(products)
  // console.log(products[0].value.var1)

  return <Fragment>
    <span className="page-heading">
      <h1 className="heading-primary">{router.query.categoryname}</h1>
    </span>

    <section className="category-container">
      {products.map((prod, index) => (
        <Fragment key={index}>
          <CategoryProducts items={prod.value.var1} categName={queryCategoryName} id={router.query.shopid}></CategoryProducts>
        </Fragment>
      ))}
    </section>
  </Fragment>
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
