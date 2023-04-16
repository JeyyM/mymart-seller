import { Fragment } from "react"
import HomepageButton from "../../components/homepage/Homepage-Button"
import Link from "next/link"
import { useRouter } from "next/router"
import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"

function HomePage({ shopID }){
    const router = useRouter();
    const { shopid } = router.query;
    console.log(shopid)
    
    return <Fragment>
    <Head>
      <title>Dashboard</title>
    </Head>
        <h1 className="heading-primary">Dashboard</h1>
        <main className="maincontainer">
            <HomepageButton item="home-category" label="Categories & Products" direction="categories" priority="eager"></HomepageButton>
            <HomepageButton item="home-ongoing" label="Ongoing Sales" priority="lazy"></HomepageButton>
            <HomepageButton item="home-manage" label="My Mart" priority="lazy"></HomepageButton>
            <HomepageButton item="home-insights" label="Mart Analytics" priority="eager"></HomepageButton>
            <HomepageButton item="home-receipt" label="Customer Records" priority="lazy"></HomepageButton>
            <HomepageButton item="home-brush" label="Mart Design" priority="lazy"></HomepageButton>
            <HomepageButton item="home-quiz" label="Frequently Asked Questions"></HomepageButton>
            <HomepageButton item="home-policy" label="Terms & Policies"></HomepageButton>
            <HomepageButton item="home-support" label="Customer Service"></HomepageButton>
            <HomepageButton item="home-power" label="Close or Open Mart"></HomepageButton>
        </main>
    </Fragment>
}

export default HomePage

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

