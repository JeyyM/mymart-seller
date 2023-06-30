import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {

  if (req.method === "POST") {
    const data = req.body

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
      { $push: { [`shopData.shopAccounts`]: data } },
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

    res.status(201).json({ message: "Profile Inserted" })
  }

  if (req.method === "PATCH") {
    const data = req.body
    console.log("new data here", data)

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db()

    const id = new ObjectId(req.query.martid);
    const item = await db.collection("shops").findOne({ _id: id });

    item._id = item._id.toString();

    const shopAccounts = item.shopData.shopAccounts

    console.log(shopAccounts)

    const accIndex = shopAccounts.findIndex((account) => account.email ===  data.email)
    console.log(accIndex)

    const result = await db.collection("shops").updateOne(
      { _id: id },
      {
          $set: {
              [`shopData.shopAccounts.${accIndex}.card`]: data.newCard,
          },
          $set: {
            [`shopData.shopAccounts.${accIndex}.profile`]: data.newProfile,
        },
        $set: {
          [`shopData.shopAccounts.${accIndex}.location`]: data.newLocationName,
      },
      $set: {
        [`shopData.shopAccounts.${accIndex}.locationCoords`]: data.newCoords,
    },
      }
  );

    // const result = await db.collection("shops").updateOne(
    //   { _id: id },
    //   { $push: { [`shopData.shopAccounts`]: data } },
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log(`Updated document with _id: ${id}`);
    //     }
    //     client.close();
    //   }
    // );

    client.close();

    res.status(201).json({ message: "Profile Inserted" })
  }

}

export default handler
