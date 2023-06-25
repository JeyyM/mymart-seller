import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
    if (req.method === "PATCH") {
        const data = req.body;
        console.log("apiffnb", data)

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
                $unset: {
                  [`shopData.shopSales.activeOrders.${orderId}`]: ""
                },
                $push: {
                  [`shopData.shopSales.finishedOrders.${orderId}`]: req.body.selectedOrder
                }
              }
        );

        const pullResult1 = await db.collection("shops").updateOne(
            { _id: id },
            { $pull: { [`shopData.shopSales.activeOrders.${orderId}`]: null } }
          );

        const shopAccounts = shop.shopData.shopAccounts
        const accIndex = shopAccounts.findIndex((account) => account.email ===  req.body.selectedOrder.user.email)
        const orderIndex = shopAccounts[accIndex].currentOrders.findIndex((order) => order.id ===  req.body.selectedOrder.id)

        // console.log("accs", orderIndex)

        const result2 = await db.collection("shops").updateOne(
            { _id: martId },
            {
                $unset: {
                    [`shopData.shopAccounts.${accIndex}.currentOrders.${orderIndex}`]: "",
                },
                $push: {
                    [`shopData.shopAccounts.${accIndex}.pastOrders.${orderIndex}`]: req.body.selectedOrder,
                },
                
            }
        );

        const pullResult2 = await db.collection("shops").updateOne(
            { _id: id },
            { $pull: { [`shopData.shopAccounts.${accIndex}.currentOrders.${orderIndex}`]: null } }
          );

        const updateQuery = {
            $set: {},
          };
          
          for (const order of req.body.productIds) {
            const stockAmountKey = `shopData.shopCategories.${order[0]}.categoryProducts.${order[1]}.variations.${order[2]}.productStock.stockAmount`;
            updateQuery.$set[stockAmountKey] = order[3];
          }

          const result3 = await db.collection("shops").updateOne({ _id: martId }, updateQuery);

        client.close();

        res.status(200).json({ message: "Category updated" });
    }
}

export default handler
