import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res){
    console.log("new prod api")

    if (req.method === "POST"){
        const data = req.body
        console.log(data)

        console.log("Within the api")
        
        console.log(req.query.martid)
    }

//     const client = await MongoClient.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//     const db = client.db()

//     const id = new ObjectId(req.query.martid);
//   const item = await db.collection("shops").findOne({ _id: id });
//   // console.log(item.shopData.shopCategories)

//   item._id = item._id.toString();

//   const categoryAmount = Object.keys(item.shopData.shopCategories).length
//   // console.log(categoryAmount)

// const result = await db.collection("shops").updateOne(
//     { _id: id },
//     { $set: { [`shopData.shopCategories.category${categoryAmount + 1}`]: data } },
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(`Updated document with _id: ${id}`);
//         }
//         client.close();
//     }
// );

//   client.close();

//     res.status(201).json({message: "Category Inserted"})
//     // console.log(result)
// } 
  
}

export default handler