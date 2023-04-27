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

    const updatedShop = await db.collection("shops").findOne({ _id: id });

    const product = updatedShop.shopData.shopCategories[req.query.categorykey].categoryProducts[req.query.productkey];

    const filteredData = Object.keys(product)
  .filter(key => key !== 'productTags')
  .reduce((obj, key) => {
    obj[key] = product[key];
    return obj;
  }, {});

const varKeys = Object.keys(filteredData)

    const setTags = product.productTags

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

    const categoryProductKey = `shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}`;
    
    const updateResult1 = await db.collection("shops").updateOne(
      { _id: id },
      { $set: { [categoryProductKey]: newVars } }
    );
    
    const updateResult2 = await db.collection("shops").updateOne(
      { _id: id },
      { $set: { [`${categoryProductKey}.productTags`]: setTags } }
    );

    client.close();

    res.status(201).json({ message: "Variation Deleted" });
  }
}

export default handler


/////