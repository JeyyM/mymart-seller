import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
    if (req.method === "PATCH") {
        const data = req.body
        console.log(data)

        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = client.db()

        const id = new ObjectId(req.query.martid);
        const item = await db.collection("shops").findOne({ _id: id });

        item._id = item._id.toString();

        console.log(req.query)

        const result = await db.collection("shops").updateOne(
            { _id: id },
            { $set: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.productTags.0`]: data } },
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Updated document with _id: ${id}`);
                }
                client.close();
            }
        );
        console.log(result)
    }
}
export default handler