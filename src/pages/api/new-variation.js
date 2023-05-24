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
      { $push: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.variations`]: data } },
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
          [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.variations.${req.query.varnum}`]: "",
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
    const pullResult = await db.collection("shops").updateOne(
      { _id: id },
      { $pull: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.variations`]: null } }
    );

    client.close();

    res.status(201).json({ message: "Variation Deleted" });
  }
}

export default handler


/////