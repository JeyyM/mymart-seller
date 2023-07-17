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
                $push: {
                  [`shopData.shopSales.finishedOrders`]: req.body.selectedOrder
                }
              }
        );
        
        const result1a = await db.collection("shops").updateOne(
            { _id: martId },
            {
              $unset: {
                [`shopData.shopSales.activeOrders.${orderId}`]: ""
              }
            }
          );

          const pullResult1 = await db.collection("shops").updateOne(
            { _id: martId },
            { $pull: { [`shopData.shopSales.activeOrders`]: null } },
            { $pull: { [`shopData.shopSales.finishedOrders`]: null } }
          );
          

        const shopAccounts = shop.shopData.shopAccounts
        const accIndex = shopAccounts.findIndex((account) => account.email ===  req.body.selectedOrder.user.email)
        const orderIndex = shopAccounts[accIndex].currentOrders.findIndex((order) => order.id ===  req.body.selectedOrder.id)

        const result2 = await db.collection("shops").updateOne(
            { _id: martId },
            {
                $unset: {
                    [`shopData.shopAccounts.${accIndex}.currentOrders.${orderIndex}`]: "",
                },
            }
        );

        const result2a = await db.collection("shops").updateOne(
            { _id: martId },
            {
                $push: {
                    [`shopData.shopAccounts.${accIndex}.pastOrders`]: req.body.selectedOrder,
                },
                
            }
        );

        const pullResult2 = await db.collection("shops").updateOne(
            { _id: martId },
            { $pull: { [`shopData.shopAccounts.${accIndex}.currentOrders`]: null } },
            { $pull: { [`shopData.shopAccounts.${accIndex}.pastOrders`]: null } },
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
