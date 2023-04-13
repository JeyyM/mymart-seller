import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db()

    const id = new ObjectId(req.query.martid);
    const item = await db.collection("shops").findOne({ _id: id });

    item._id = item._id.toString();


    const result = await db.collection("shops").updateOne(
      { _id: id },
      { $set: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.var${req.query.varnum}`]: data } },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updated document with _id: ${id}`);
        }
        client.close();
      }
    );

    client.close();

    res.status(201).json({ message: "Variation Added" })
    console.log(result)
  }

  if (req.method === "DELETE") {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();

    const id = new ObjectId(req.query.martid);
    const item = await db.collection("shops").findOne({ _id: id });
    item._id = item._id.toString();

    ////////////////////////////////////////////////////////////REALLLLLLL

    // const result = await db.collection("shops").updateOne(
    //   { _id: id },
    //   {
    //     $unset: {
    //       [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.var${req.query.varnum}`]: "",
    //     },
    //   },
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log(`Updated document with _id: ${id}`);
    //     }
    //   }
    // );

      //////////////////////////////////////////////////////////////////////////

    const categKey = req.query.categorykey

    const updatedShop = await db.collection("shops").findOne({ _id: id });

    const product = updatedShop.shopData.shopCategories[req.query.categorykey].categoryProducts[req.query.productkey];

    console.log("PRODUCT HERE", product)


    const filteredData = Object.keys(product)
  .filter(key => key !== 'productTags')
  .reduce((obj, key) => {
    obj[key] = product[key];
    return obj;
  }, {});

console.log("filtered data", filteredData);

const varKeys = Object.keys(filteredData)

    const setTags = product.productTags

    console.log("varKeys", varKeys)
    



    const sortedVarKeys = varKeys.sort((a, b) => {
      const aIndex = parseInt(a.replace("var", ""));
      const bIndex = parseInt(b.replace("var", ""));
      return aIndex - bIndex;
    });

    const newVars = {};
    for (let i = 0; i < sortedVarKeys.length; i++) {
      const key = sortedVarKeys[i];
      const index = i;
      const newKey = `var${index + 1}`;
      newVars[newKey] = product[key];
    }

    console.log("newVars", newVars)

    const categoryProductKey = `shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}`;

    /////////////////////////////////////// Warning
    // const updateResult = await db.collection("shops").updateOne(
    //   { _id: id },
    //   { $set: { [categoryProductKey]: newVars, [${categoryProductKey}.productTags]: setTags } }
    // );      
    
    // const updateResult = await db.collection("shops").updateOne(
    //   { _id: id },
    //   { $set: { [categoryProductKey]: newVars, [`${categoryProductKey}.productTags`]: setTags } }
    // );      

///////////////////////////////////////////////

    console.log("Important", categoryProductKey.productTags)


  //   const result = await db.collection("shops").updateOne(
  //     { _id: id },
  //     { $set: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.prodlength}.var1`]: data,
  //     [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.prodlength}.productTags`]: [] } },
  //     (err, result) => {
  //         if (err) {
  //             console.log(err);
  //         } else {
  //             console.log(`Updated document with _id: ${id}`);
  //         }
  //         client.close();
  //     }
  // );


    console.log("category product key", categoryProductKey)

    client.close();

    res.status(201).json({ message: "Variation Deleted" });
  }
}

export default handler


/////