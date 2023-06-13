import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
  if (req.method === "PATCH") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);

    if (req.query.state === "true") {
      const result = await db.collection("shops").updateOne(
        { _id: martId },
        {
          $set: {
            [`shopData.shopDesigns.lightDesign`]: data
          }
        }
      );
    } else {
      const result = await db.collection("shops").updateOne(
        { _id: martId },
        {
          $set: {
            [`shopData.shopDesigns.darkDesign`]: data
          }
        }
      );
    }

    client.close();

    res.status(200).json({ message: "Category updated" });
  }
}

export default handler
