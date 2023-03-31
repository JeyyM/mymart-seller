import Category from "../../../components/category/Category";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import AddCategory from "@/components/Modal/Add-Category";


function CategoryPage({ shopID }) {
  const router = useRouter();

  const { shopData } = shopID;
  const contents = shopData.shopCategories;

  const result = Object.keys(contents).map((key, index) => {
    return {
      key: key,
      value: contents[key],
    };
  });

  // console.log(contents, "mofjdfjnfgjk")
  const categoryAmount = Object.keys(shopID.shopData.shopCategories).length

  const [addCateg, setAddCateg] = useState(false)
  const [defaultValues, setDefaultValues] = useState(["", "", ""])
  console.log("defaults", defaultValues)

  function addCategHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setAddCateg(!addCateg)
  }

  function editCategHandler(data) {
    setDefaultValues([data[0], data[1], data[2]])
    console.log(defaultValues)
  }

  function defClearer(){
    setDefaultValues(["", "", ""])
  }

  async function completeForm(formdata) {

    const response = await fetch(
      `../../api/new-category?martid=${router.query.shopid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }
  
  async function editForm(formdata, key) {

    const chosenCateg = formdata.categoryName
    // console.log(key)
    // console.log(typeof(key))
    // console.log("BAZINGA")

    const test = "category4"

    const response = await fetch(
      `../../api/new-category?martid=${router.query.shopid}&categoryname=${key}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }

  const [indexData, setIndexData] = useState(0)

  function passDef(i){
    console.log(i)
    setIndexData(i)
    // return (i)
  }

  return (
    <Fragment>
      <AddCategory modalStatus={addCateg} disable={addCategHandler} finish={completeForm} edit={editForm} total={categoryAmount} defs={defaultValues} clear={defClearer} categIndexes={contents}></AddCategory>
      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-category">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">Categories</h1>
        <button onClick={addCategHandler} className="add-categ-init heading-tertiary">
          <div className="heading-icon-plus">&nbsp;</div>Add Category</button>
      </span>

      <section className="category-container">
        {result.map((categ, index) => {
          return (
            <Category
              setDef={passDef}
              items={categ.value}
              id={router.query.shopid}
              key={index}
              state={addCateg}
              length={result.length}
              edit={addCategHandler}
              edit2={editCategHandler}
              categIndex = {index}
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

// I tried to do what you gave

// props.categIndexes is :
// {
//     "category1": {
//         "categoryDescription": "Description of Category1 Description of Category1 Description of Category1",
//         "categoryId": "id0",
//         "categoryImage": "https://i.imgur.com/kFAFOKF.jpeg",
//         "categoryName": "Category 1",
//         "categoryProducts": {
//             "Product1": {
//                 "var1": {
//                     "productName": "clownfish",
//                     "productDescription": "funny fish",
//                     "productPrice": "1",
//                     "productStock": {
//                         "stockAmount": "5",
//                         "stockUnit": "funnies"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/kFAFOKF.jpeg",
//                         "https://i.imgur.com/BNQzfT1.jpeg",
//                         "https://i.imgur.com/BNQzfT1.jpeg",
//                         "https://i.imgur.com/t3aI5Fm.jpeg"
//                     ]
//                 },
//                 "var2": {
//                     "productName": "shark",
//                     "productDescription": "bitey fish",
//                     "productPrice": "2",
//                     "productStock": {
//                         "stockAmount": "10",
//                         "stockUnit": "Teeth"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/qlmYdJO.jpeg",
//                         "https://i.imgur.com/m7RWh74.jpeg",
//                         "https://i.imgur.com/Au9MIWw.jpeg"
//                     ]
//                 },
//                 "var3": {
//                     "productName": "big fish",
//                     "productDescription": "new var fish",
//                     "productPrice": "321",
//                     "productStock": {
//                         "stockAmount": "213",
//                         "stockUnit": "balls"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/HHtLcqI.jpeg",
//                         "https://i.imgur.com/HHtLcqI.jpeg"
//                     ]
//                 },
//                 "var4": {
//                     "productName": "Blocks",
//                     "productDescription": "blocks desc",
//                     "productPrice": "890",
//                     "productStock": {
//                         "stockAmount": "890",
//                         "stockUnit": "balls"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/kFAFOKF.jpeg"
//                     ]
//                 }
//             },
//             "Product2": {
//                 "var1": {
//                     "productName": "Trees",
//                     "productDescription": "trees are pog",
//                     "productPrice": "3",
//                     "productStock": {
//                         "stockAmount": "15",
//                         "stockUnit": "logs"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/E0Y307M.jpeg",
//                         "https://i.imgur.com/iGRPdHz.jpeg",
//                         "https://i.imgur.com/XPTlTmW.jpeg"
//                     ]
//                 }
//             }
//         }
//     },
//     "category2": {
//         "categoryDescription": "Description2",
//         "categoryId": "id1",
//         "categoryImage": "https://i.imgur.com/H2yPygc.jpeg",
//         "categoryName": "Category 2",
//         "categoryProducts": {
//             "Product1": {
//                 "var1": {
//                     "productName": "Bush",
//                     "productDescription": "fun plant",
//                     "productPrice": "4",
//                     "productStock": {
//                         "stockAmount": "20",
//                         "stockUnit": "berries"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/H2yPygc.jpeg",
//                         "https://i.imgur.com/u0R6uS7.jpeg"
//                     ]
//                 }
//             }
//         }
//     },
//     "category3": {
//         "categoryName": "category 3",
//         "categoryImage": "https://i.imgur.com/vKb4qnU.jpeg",
//         "categoryDescription": "frog category",
//         "categoryId": "id3",
//         "categoryProducts": {
//             "Product1": {
//                 "var1": {
//                     "productName": "Bruh pls",
//                     "productDescription": "dawghfgjhfeg",
//                     "productPrice": "123",
//                     "productStock": {
//                         "stockAmount": "456",
//                         "stockUnit": "balls"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/kFAFOKF.jpeg",
//                         "https://i.imgur.com/kFAFOKF.jpeg"
//                     ]
//                 }
//             },
//             "Product2": {
//                 "var1": {
//                     "productName": "big ounce",
//                     "productDescription": "praireier",
//                     "productPrice": "123",
//                     "productStock": {
//                         "stockAmount": "321",
//                         "stockUnit": "balls"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/HHtLcqI.jpeg"
//                     ]
//                 }
//             }
//         }
//     },
//     "category4": {
//         "categoryName": "Category 4",
//         "categoryImage": "https://i.imgur.com/vKb4qnU.jpeg",
//         "categoryDescription": "Ctage 4 descr",
//         "categoryId": "id4",
//         "categoryProducts": {
//             "Product1": {
//                 "var1": {
//                     "productName": "New productz",
//                     "productDescription": "descriptionz",
//                     "productPrice": "123",
//                     "productStock": {
//                         "stockAmount": "321",
//                         "stockUnit": "balls"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/HHtLcqI.jpeg",
//                         "https://i.imgur.com/kFAFOKF.jpeg"
//                     ]
//                 },
//                 "var2": {
//                     "productName": "Variation 2",
//                     "productDescription": "var 2",
//                     "productPrice": "678",
//                     "productStock": {
//                         "stockAmount": "78",
//                         "stockUnit": "Bundles"
//                     },
//                     "productImages": [
//                         "https://i.imgur.com/HHtLcqI.jpeg",
//                         "https://i.imgur.com/kFAFOKF.jpeg"
//                     ]
//                 }
//             }
//         }
//     },
//     "category5": {
//         "categoryName": "Newest",
//         "categoryImage": "https://i.imgur.com/qlmYdJO.jpeg",
//         "categoryDescription": "fuckucj",
//         "categoryId": "id5",
//         "categoryProducts": {}
//     },
//     "category6": {
//         "categoryName": "Categoru",
//         "categoryImage": "https://i.imgur.com/qlmYdJO.jpeg",
//         "categoryDescription": "pls still work",
//         "categoryId": "id6",
//         "categoryProducts": {}
//     }
// }

//         const categoryContents = Object.entries(props.categIndexes)

//         const chosenKey = categoryContents.find(([key, value]) => {value.categoryName === incomingData.categoryName})?.map(([key, value]) => key).toString()

// Yet I get undefined and not "category1" for example.