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

    const result = await db.collection("shops").updateOne(
      { _id: martId },
      {
        $set: {
            [`name`]: data.name,
            [`description`]: data.desc,
          [`adminData`]: data.admin
        }
      }
    );

    client.close();

    res.status(200).json({ message: "Admin updated" });
  }
}

export default handler
