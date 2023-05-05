import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res){
if (req.method === "PATCH"){
    const data = req.body;
    console.log("in handler", data)
    
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);
    
    const result = await db.collection("shops").updateOne(
      { _id: martId },
      { $set: {
          [`shopData.shopDetails.paymentData`]: data
        }
      }
    );
    
    client.close();
    
    res.status(200).json({ message: "Category updated" });
  }  
}

export default handler
