import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
  if (req.method === "PATCH") {

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);

    console.log(martId)

    const result = await db.collection("shops").updateOne(
      { _id: martId },
      {
        $set: {
          [`shopData.shopDesigns.defaultMode`]: JSON.parse(req.query.state)
        }
      }
    );

    console.log(result)

    client.close();

    res.status(200).json({ message: "Category updated" });
  }
}

export default handler
