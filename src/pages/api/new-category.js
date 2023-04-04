import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res){

    if (req.method === "POST"){
        const data = req.body

        // console.log("Within the api")
        
        // console.log(req.query.param1)

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    const db = client.db()

    const id = new ObjectId(req.query.martid);
  const item = await db.collection("shops").findOne({ _id: id });
  // console.log(item.shopData.shopCategories)

  item._id = item._id.toString();

  const categoryAmount = Object.keys(item.shopData.shopCategories).length
  // console.log(categoryAmount)

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
    // console.log(result)
}

if (req.method === "PATCH"){
    const data = req.body;
    const categoryName = req.query.categoryname;
    
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);
    
    const result = await db.collection("shops").updateOne(
      { _id: martId },
      { $set: {
          [`shopData.shopCategories.${categoryName}.categoryDescription`]: data.categoryDescription,
          [`shopData.shopCategories.${categoryName}.categoryImage`]: data.categoryImage,
          [`shopData.shopCategories.${categoryName}.categoryName`]: data.categoryName
        }
      }
    );
    
    client.close();
    
    res.status(200).json({ message: "Category updated" });
  }

  if (req.method === "DELETE") {
    const categoryName = req.query.categoryname;
  
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);
  
    const result = await db.collection("shops").updateOne(
      { _id: martId },
      { $unset: { [`shopData.shopCategories.${categoryName}`]: "" } }
    );
  
    // Get updated document after deletion
    const updatedShop = await db.collection("shops").findOne({ _id: martId });
  
    // Renumber categories
    const categories = updatedShop.shopData.shopCategories;
    const categoryKeys = Object.keys(categories);
    const sortedCategoryKeys = categoryKeys.sort((a, b) => {
      const aIndex = parseInt(a.replace("category", ""));
      const bIndex = parseInt(b.replace("category", ""));
      return aIndex - bIndex;
    });
  
    const newCategories = {};
    for (let i = 0; i < sortedCategoryKeys.length; i++) {
      const key = sortedCategoryKeys[i];
      const index = i;
      const newKey = `category${index}`;
      newCategories[newKey] = categories[key];
    }
  
    const updateResult = await db.collection("shops").updateOne(
      { _id: martId },
      { $set: { "shopData.shopCategories": newCategories } }
    );
  
    client.close();
  }
  
  
}

export default handler


// {
// 	"_id": {
// 		"$oid": "641a677600f16eb98cf58922"
// 	},
// 	"name": "Backup 2",
// 	"shopData": {
// 		"shopCategories": {
// 			"category1": {
// 				"categoryDescription": "Description of Category1 Description of Category1 Description of Category1",
// 				"categoryId": "id0",
// 				"categoryImage": "https://i.imgur.com/kFAFOKF.jpeg",
// 				"categoryName": "Category 1",
// 				"categoryProducts": {}
// 			},
// 			"category2": {
// 				"categoryDescription": "Description2",
// 				"categoryId": "id1",
// 				"categoryImage": "https://i.imgur.com/H2yPygc.jpeg",
// 				"categoryName": "Category 2",
// 				"categoryProducts": {}
// 			},
// 		}
// 	}
// }