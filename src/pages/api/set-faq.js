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

        const shop = await db.collection("shops").findOne({ _id: martId });

        const result1 = await db.collection("shops").updateOne(
            { _id: martId },
            {
              $set: {
                "shopData.shopFaq.answers": data.a,
                "shopData.shopFaq.questions": data.q
              }
            }
          );
          
        
        client.close();

        res.status(200).json({ message: "Category updated" });
    }
}

export default handler
