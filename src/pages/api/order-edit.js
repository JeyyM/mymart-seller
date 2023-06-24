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
        console.log("active here", activeOrders)
        console.log("id here", orderId)

        // const finishedOrders = shop.shopData.shopSales.finishedOrders || [];

        // const newOrderId = (activeOrders.length + finishedOrders.length + 1)
        //     .toString()
        //     .padStart(7, "0");

        // const updatedActiveOrders = [
        //     ...activeOrders,
        //     { id: newOrderId, ...data },
        // ];

        // const users = shop.shopData.shopAccounts

        // const shopAccountWithEmail = users.find(account => account.email === data.user.email);
        // const shopAccountIndex = users.findIndex(account => account.email === data.user.email);

        // let currentOrders = []

        // if (shopAccountWithEmail) {
        //   currentOrders = shopAccountWithEmail.currentOrders;
        // } else {
        //   console.log("Shop account not found");
        //   return
        // }


        // const newOrders = [...currentOrders, { id: newOrderId, ...data }]

        const result1 = await db.collection("shops").updateOne(
            { _id: martId },
            {
                $set: {
                    [`shopData.shopSales.activeOrders.${orderId}`]: req.body.selectedOrder
                    // [`shopData.shopSales.activeOrders`]: []
                }
            }
        );

        // const result2 = await db.collection("shops").updateOne(
        //     { _id: martId },
        //     {
        //         $set: {
        //             [`shopData.shopAccounts.${shopAccountIndex}.currentOrders`]: newOrders,
        //             // [`shopData.shopAccounts.${shopAccountIndex}.currentOrders`]: [],
        //             [`shopData.shopAccounts.${shopAccountIndex}.currentCart`]: []
        //         }
        //     }
        // );

        // const categsId = shop.shopData.shopCategories.map((categ, index) => {
        //     return {cname: categ.categoryName, id: index, products: categ.categoryProducts}
        // })
        // const ordersList = data.order.map((order) => {
        //     return { name: order.name, category: order.category, cart: order.cartValue };
        //   });

        // const orderSequence = [];

        // for (const order of ordersList) {
        //     const categoryId = categsId.findIndex((categ) => categ.cname === order.category);
        //     if (categoryId === -1) {
        //       continue;
        //     }
        //     const categoryProducts = categsId[categoryId].products;
        //     const productId = categoryProducts.findIndex(
        //       (product) => product.variations.some((variation) => variation.productName === order.name)
        //     );
        //     if (productId === -1) {
        //       continue;
        //     }
        //     const variationId = categoryProducts[productId].variations.findIndex(
        //       (variation) => variation.productName === order.name
        //     );
        //     if (variationId === -1) {
        //       continue;
        //     }
        //     orderSequence.push({ categoryId, productId, variationId, stock: categoryProducts[productId].variations[variationId].productStock.stockAmount, cartValue: order.cart });
        //   }
          
    // const updateQuery = {
    //     $set: {},
    //   };
      
    //   for (const orderItem of orderSequence) {
    //     const { categoryId, productId, variationId } = orderItem;
    //     const stockAmountKey = `shopData.shopCategories.${categoryId}.categoryProducts.${productId}.variations.${variationId}.productStock.stockAmount`;
    //     updateQuery.$set[stockAmountKey] = orderItem.stock - orderItem.cartValue;
    //   }

    //       const result3 = await db.collection("shops").updateOne({ _id: martId }, updateQuery);


        client.close();

        res.status(200).json({ message: "Category updated" });
    }
}

export default handler
