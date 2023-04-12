import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res){
    if (req.method === "POST"){
        console.log("is it working?")

        console.log(req.query.categorykey)
        console.log(req.query.varnum)
        const data = req.body
        console.log(data)

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

    res.status(201).json({message: "Variation Added"})
    console.log(result)
} 

// if (req.method === "DELETE"){
//     console.log("is it working?")

//     console.log(req.query.categorykey)
//     console.log(req.query.varnum)
//     const data = req.body
//     console.log(data)

// const client = await MongoClient.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
// const db = client.db()

// const id = new ObjectId(req.query.martid);
// const item = await db.collection("shops").findOne({ _id: id });

// item._id = item._id.toString();


// const result = await db.collection("shops").updateOne(
// { _id: id },
// { $unset: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.var${req.query.varnum}`]: data } },
// (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`Updated document with _id: ${id}`);
//     }
//     client.close();
// }
// );

// client.close();

// res.status(201).json({message: "Variation Deleted"})
// console.log(result)
// } 

if (req.method === "DELETE") {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();

    const id = new ObjectId(req.query.martid);
    const item = await db.collection("shops").findOne({ _id: id });
    item._id = item._id.toString();

    const result = await db.collection("shops").updateOne(
      { _id: id },
      {
        $unset: {
          [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.var${req.query.varnum}`]: "",
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updated document with _id: ${id}`);
        }
      }
    );

      const categKey = req.query.categorykey
      console.log(categKey)

      const updatedShop = await db.collection("shops").findOne({ _id: id });
  
      const product = updatedShop.shopData.shopCategories[req.query.categorykey].categoryProducts[req.query.productkey];
      console.log("updated shop bit", product)
      
      const varKeys = Object.keys(product)
      console.log("keys", varKeys)
      
      const sortedVarKeys = varKeys.sort((a, b) => {
        const aIndex = parseInt(a.replace("var", ""));
        const bIndex = parseInt(b.replace("var", ""));
        return aIndex - bIndex;
      });
      
      console.log(sortedVarKeys)
      
      const newVars = {};
      for (let i = 0; i < sortedVarKeys.length; i++) {
        const key = sortedVarKeys[i];
        const index = i;
        const newKey = `var${index + 1}`;
        newVars[newKey] = product[key];
      }
      
      console.log(newVars)
      
      const categoryProductKey = `shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}`;
      const updateResult = await db.collection("shops").updateOne(
        { _id: id },
        { $set: { [categoryProductKey]: newVars } }
      );
      
      console.log("updated result", updateResult)
      

    client.close();

    res.status(201).json({ message: "Variation Deleted" });
    console.log(result);
  }
}

export default handler