import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res){

    if (req.method === "POST"){
        const data = req.body

        console.log("Within the api")
        
        // console.log(req.query.param1)

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    const db = client.db()

    const id = new ObjectId(req.query.martid);
  const item = await db.collection("shops").findOne({ _id: id });
  console.log(item.shopData.shopCategories)

  item._id = item._id.toString();

  const categoryAmount = Object.keys(item.shopData.shopCategories).length
  console.log(categoryAmount)

const result = await db.collection("shops").updateOne(
    { _id: id },
    { $set: { [`shopData.shopCategories.category${categoryAmount + 1}`]: data } },
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

    res.status(201).json({message: "Category Inserted"})
    console.log(result)
}

if (req.method === "PATCH"){
    const data = req.body;
    const categoryName = req.query.categoryname;

    console.log(categoryName)
    console.log(typeof(categoryName))

    console.log("LOOK HERE")

    console.log(data)
    console.log("-----")
    console.log(categoryName)
    console.log("-----")
    console.log(req.query.martid)
    console.log("-----")
    console.log(req.query)
    console.log("-----")
    
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);

    console.log(martId)
    console.log("-----")
    
    const result = await db.collection("shops").updateOne(
      { _id: martId },
      { $set: {
          [`shopData.shopCategories.${categoryName}.categoryDescription`]: data.categoryDescription,
          [`shopData.shopCategories.${categoryName}.categoryImage`]: data.categoryImage,
          [`shopData.shopCategories.${categoryName}.categoryName`]: data.categoryName
        }
      }
    );

    console.log(result)
    console.log("-----")
    
    client.close();
    
    res.status(200).json({ message: "Category updated" });
  }
}

export default handler


// I have a nextjs and react app, Im trying to make a system that adds and edits items in a database.

// Lets say I have this data
// {
//   _id: new ObjectId("641a65c502908a55286b8173"),
//   name: 'Backup',
//   shopData: {
//     shopCategories: {
//       category1: [Object],
//       category2: [Object],
//       category3: [Object],
//       category4: [Object],
//       category5: [Object],
//       category6: [Object],
//       category7: [Object],
//       category8: [Object]
//     }
//   }
// }
// Where each category contains data like this:
// {
//   category1: {
//     categoryDescription: 'Description of Category1',
//     categoryId: 'id0',
//     categoryImage: 'https://i.imgur.com/kFAFOKF.jpeg',
//     categoryName: 'Category 1',
//     categoryProducts: { Product1: [Object], Product2: [Object] }
//   }}

// If I have a system for adding data through a POST request like this:
// if (req.method === "POST"){
//         const data = req.body

//         console.log("Within the api")
        
//         // console.log(req.query.param1)

//     const client = await MongoClient.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//     const db = client.db()

//     const id = new ObjectId(req.query.martid);
//   const item = await db.collection("shops").findOne({ _id: id });
//   console.log(item.shopData.shopCategories)

//   item._id = item._id.toString();

//   const categoryAmount = Object.keys(item.shopData.shopCategories).length
//   console.log(categoryAmount)

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
//     console.log(result)
// }

// Can you make a version of that as a PATCH request that edits these 3 pieces of data of a specific category:
// category1: {
//     categoryDescription: 'Description of Category',
//     categoryImage: 'https://i.imgur.com/kFAFOKF.jpeg',
//     categoryName: 'Category 1',
//   }


// I have a nextjs and react app, Im trying to make a system that adds and edits items in a database.

// Lets say I have this data
// {
//   _id: new ObjectId("641a65c502908a55286b8173"),
//   name: 'Backup',
//   shopData: {
//     shopCategories: {
//       category1: [Object],
//       category2: [Object],
//       category3: [Object],
//       category4: [Object],
//       category5: [Object],
//       category6: [Object],
//       category7: [Object],
//       category8: [Object]
//     }
//   }
// }
// Where each category contains data like this:
// {
//   category1: {
//     categoryDescription: 'Description of Category1',
//     categoryId: 'id0',
//     categoryImage: 'https://i.imgur.com/kFAFOKF.jpeg',
//     categoryName: 'Category 1',
//     categoryProducts: { Product1: [Object], Product2: [Object] }
//   }}

// If I have a system for adding data through a POST request like this:
// if (req.method === "POST"){
//         const data = req.body

//         console.log("Within the api")
        
//         // console.log(req.query.param1)

//     const client = await MongoClient.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//     const db = client.db()

//     const id = new ObjectId(req.query.martid);
//   const item = await db.collection("shops").findOne({ _id: id });
//   console.log(item.shopData.shopCategories)

//   item._id = item._id.toString();

//   const categoryAmount = Object.keys(item.shopData.shopCategories).length
//   console.log(categoryAmount)

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
//     console.log(result)
// }

// Can you make a version of that as a PATCH request that edits these 3 pieces of data of a specific category based on the req.body :
// category1: {
//     categoryDescription: 'Description of Category',
//     categoryImage: 'https://i.imgur.com/kFAFOKF.jpeg',
//     categoryName: 'Category 1',
//   }