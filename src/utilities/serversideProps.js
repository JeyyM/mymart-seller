import { MongoClient, ObjectId } from "mongodb"
import pako from "pako";

export async function getServerSideProps({ params }) {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const id = new ObjectId(params.shopid);
    const dbData = await db.collection("shops").findOne({ _id: id });

    dbData._id = dbData._id.toString();

    const jsonString = JSON.stringify(dbData);
    const compressedBytes = pako.deflate(jsonString, { level: 9 });
    const shopID = btoa(String.fromCharCode.apply(null, compressedBytes));

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
