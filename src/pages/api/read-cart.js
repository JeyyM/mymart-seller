import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {

    if (req.method === "GET") {
        const email = req.query.email;
        const password = req.query.password;
      
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        const db = client.db();
      
        const id = new ObjectId(req.query.martid);
        const item = await db.collection("shops").findOne({ _id: id });
      
        item._id = item._id.toString();
      
        const shopAccount = item.shopData.shopAccounts.find(
          (account) => account.email === email && account.password === password
        );
      
        if (shopAccount) {
        //   res.status(200).json({ item, shopAccount });
        res.status(200).json({ shopAccount });
        } else {
          res.status(404).json({ message: "No matching shopAccount found." });
        }
      
        client.close();
      }

      if (req.method === "PATCH") {
        const data = req.body;
        const email = req.query.email;
        const password = req.query.password;

        console.log("in read cart", data)
      
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        const db = client.db();
      
        const id = new ObjectId(req.query.martid);
        const item = await db.collection("shops").findOne({ _id: id });
      
        item._id = item._id.toString();
      
        const shopAccountIndex = item.shopData.shopAccounts.findIndex(
          (account) => account.email === email && account.password === password
        );
      
        if (shopAccountIndex !== -1) {
          item.shopData.shopAccounts[shopAccountIndex].currentCart = data;
      
          const result = await db.collection("shops").updateOne(
            { _id: id },
            { $set: { "shopData.shopAccounts": item.shopData.shopAccounts } }
          );
      
          console.log(`Updated document with _id: ${id}`);
        } else {
          console.log("No matching shopAccount found.");
        }
      
        client.close();
      
        res.status(201).json({ message: "Category Inserted" });
      }

}

export default handler
