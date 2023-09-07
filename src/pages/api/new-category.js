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
      { $push: { [`shopData.shopCategories`]: data } },
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

    res.status(201).json({ message: "Category Inserted" })
  }

  if (req.method === "PATCH") {
    const data = req.body;
    const catKey = req.query.categoryindex

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);

    const result = await db.collection("shops").updateOne(
      { _id: martId },
      {
        $set: {
          [`shopData.shopCategories.${catKey}.categoryDescription`]: data.categoryDescription,
          [`shopData.shopCategories.${catKey}.categoryImage`]: data.categoryImage,
          [`shopData.shopCategories.${catKey}.categoryName`]: data.categoryName,
          [`shopData.shopCategories.${catKey}.active`]: data.active
        }
      }
    );

    client.close();

    res.status(200).json({ message: "Category updated" });
  }

  if (req.method === "DELETE") {
    const categoryIndex = req.query.categoryindex;

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);

    const result = await db.collection("shops").updateOne(
      { _id: martId },
      { $unset: { [`shopData.shopCategories.${categoryIndex}`]: "" } }
    );
    const pullResult = await db.collection("shops").updateOne(
      { _id: martId },
      { $pull: { "shopData.shopCategories": null } }
    );
    client.close();
  }


}

export default handler
