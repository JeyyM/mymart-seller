import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
    if (req.method === "PATCH") {
        const data = req.body;

        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db();
        const martId = new ObjectId(req.query.martid);

        const shop = await db.collection("shops").findOne({ _id: martId });
        const activeOrders = shop.shopData.shopSales.activeOrders || [];

        const orderId = activeOrders.findIndex((order) => order.id ===  req.body.selectedOrder.id)

        const result1 = await db.collection("shops").updateOne(
            { _id: martId },
            {
                $set: {
                    [`shopData.shopSales.activeOrders.${orderId}`]: req.body.selectedOrder
                }
            }
        );

        const shopAccounts = shop.shopData.shopAccounts
        const accIndex = shopAccounts.findIndex((account) => account.email ===  req.body.selectedOrder.user.email)
        const orderIndex = shopAccounts[accIndex].currentOrders.findIndex((order) => order.id ===  req.body.selectedOrder.id)

        const result2 = await db.collection("shops").updateOne(
            { _id: martId },
            {
                $set: {
                    [`shopData.shopAccounts.${accIndex}.currentOrders.${orderIndex}`]: req.body.selectedOrder,
                }
            }
        );


        client.close();

        res.status(200).json({ message: "Category updated" });
    }
}

export default handler
