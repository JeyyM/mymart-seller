import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    data._id = new ObjectId()

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();

    const result = await db.collection("shops").insertOne(data);

    client.close();

    res.status(201).json({ message: "Mart Inserted" });
  }
}

export default handler;
