import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {

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

    const shopAccounts = item.shopData.shopAccounts

    const accIndex = shopAccounts.findIndex((account) => account.email ===  data.email)

    console.log("wtf dman", data)
    console.log("wtf", req.query.newmode)
    console.log(JSON.parse(req.query.newmode))
    const result = await db.collection("shops").updateOne(
      { _id: id },
      {
        $set: {
          [`shopData.shopAccounts.${accIndex}.preferredColor`]: JSON.parse(req.query.newmode)
        },
      }
    );

    client.close();

    res.status(201).json({ message: "Profile Inserted" })
  }

}

export default handler
