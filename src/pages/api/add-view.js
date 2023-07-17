import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);

    const result = await db.collection("shops").updateOne(
      { _id: martId },
      {
        $push: {
          [`shopData.shopViews`]: data
        }
      }
    );

    client.close();

    res.status(200).json({ message: "views updated" });
  }

  if (req.method === "PATCH") {
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
          [`shopData.shopViews.${req.query.exists}.count`]: req.query.count
        }
      }
    );

    client.close();

    res.status(200).json({ message: "views updated" });
  }
}

export default handler
