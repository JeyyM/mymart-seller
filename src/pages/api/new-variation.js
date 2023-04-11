import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res){
    if (req.method === "POST"){
        console.log("is it working?")

        console.log(req.query.categorykey)
        console.log(req.query.varnum)
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


const result = await db.collection("shops").updateOne(
    { _id: id },
    { $set: { [`shopData.shopCategories.${req.query.categorykey}.categoryProducts.${req.query.productkey}.var${req.query.varnum}`]: data } },
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Updated document with _id: ${id}`);
        }
        client.close();
    }
);

  client.close();

    res.status(201).json({message: "Variation Added"})
    console.log(result)
} 
}

export default handler