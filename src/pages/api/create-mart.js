import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    // const data = req.body;

    const newID = new ObjectId("HELlo")

    const sample = {
        _id: newID,
        name: "Sample Mart",
        location: "Some Place",
      };    


    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();

    const result = await db.collection("shops").insertOne(sample);

    client.close();

    res.status(201).json({ message: "Mart Inserted" });
    console.log("it worked")
  }
}

export default handler;
