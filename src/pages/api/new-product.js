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
      {
        $set: {
          [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.prodlength}.var1`]: data,
          [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.prodlength}.productTags`]: data.productName
        }
      },
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

    res.status(201).json({ message: "Product Inserted" })
    console.log(result)
  }

  if (req.method === "PATCH") {
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

    res.status(201).json({ message: "Product Added" })
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
      { $unset: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}`]: "" } }
    );

    client.close();

    res.status(201).json({ message: "Product Deleted" });
    console.log(result)

  }
}

export default handler