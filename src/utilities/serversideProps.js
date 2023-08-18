import { MongoClient, ObjectId } from "mongodb"

export async function getServerSideProps({ params }) {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const id = new ObjectId(params.shopid);
    const shopID = await db.collection("shops").findOne({ _id: id });

    shopID._id = shopID._id.toString();

    client.close();

    return {
      props: { shopID },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
