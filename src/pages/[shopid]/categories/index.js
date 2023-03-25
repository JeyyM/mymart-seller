import Category from "../../../components/category/Category";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";

function CategoryPage({shopID}) {
  const router = useRouter();

  const { shopData } = shopID;
  const contents = shopData.shopCategories;
  
  const result = Object.keys(contents).map((key, index) => {
    return {
      key: key,
      value: contents[key],
    };
  });  

  // console.log(result)


  return (
    <Fragment>
      <span className="page-heading">
        <h1 className="heading-primary">Categories</h1>
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-category">&nbsp;</div>
        </div>
        <button>Add Category</button>
      </span>

      <section className="category-container">
        {result.map((categ, index) => {
          return (
            <Category
              items={categ.value}
              id={router.query.shopid}
              key={index}
            ></Category>
          );
        })}
      </section>
    </Fragment>
  );
}

export default CategoryPage;

export async function getServerSideProps({ params }) {
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

