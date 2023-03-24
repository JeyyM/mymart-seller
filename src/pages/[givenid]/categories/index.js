// const dummycategs = {
//     categoryId:{
//         id:{},
//         categoryImage:{},
//         categoryName:{},
//         categoryDescription:{},
//         categoryProducts:{
//             productId:{
//                 variations:{
//                     variationId:{
//                         productName:{},
//                         productDescription:{},
//                         productPrice:{},
//                         productStock:{
//                             stockAmount:{},
//                             stockUnit:{},
//                         },
//                         productImages:{},
//                     },
//                 productTags:{}
//                 }
//             }
//         }
//     }
// }

const dummycategs = [
  {
    category: {
      categoryId: "c1",
      categoryImage:
        "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcS0OW59fckcsuYnklJTM7ntvoIiGQL2aqGigJ0gly1voISsq99FIdzWIgLFdSsX9lGwMMckeDIgjw5C0C4",
      categoryName: "Category1 - Stuff",
      categoryDescription: "Description of category 1",
      categoryProducts: {
        Product1: {
          variations: {
            var1: {
              productName: "clownfish",
              productDescription: "funny fish",
              productPrice: 1,
              productStock: {
                stockAmount: 5,
                stockUnit: "funnies",
              },
              productImages: [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg/640px-Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg",
                "https://i.natgeofe.com/n/9f5bf33c-df4f-430c-873d-83ced10cc289/3245010_square.jpg",
                "https://i.guim.co.uk/img/media/dd93cc7ce4a89b9d14abb0fb4beeea3510c855b1/0_267_4332_2599/master/4332.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5179c5718f3882ca51f7322306993ff8",
                "https://www.visitsealife.com/media/at0nwge4/1-all-clownfish-are-born-male-_cropped.jpg?center=0.22333333333333333,0.57166666666666666&mode=crop&format=webp&quality=80&width=600&height=345",
              ],
            },
            var2: {
              productName: "shark",
              productDescription: "bitey fish",
              productPrice: 2,
              productStock: {
                stockAmount: 10,
                stockUnit: "teeth",
              },
              productImages: [
                "https://www.nps.gov/caco/planyourvisit/images/WEF_7206181_2.jpg?maxwidth=1300&autorotate=false",
                "https://www.telegraph.co.uk/content/dam/news/2022/05/31/TELEMMGLPICT000279160270_trans_NvBQzQNjv4BqiOND6KT0zrIf1eMg2U21uVHwtdpQwyNje2OyIL7x97s.jpeg",
                "https://sharkangels.org/wp-content/uploads/2022/10/sharks-large-gh-1000x437.jpg",
              ],
            },
          },
          productTags: ["clownfish", "fish", "shark"],
        },
        Product2: {
          variations: {
            var1: {
              productName: "Trees",
              productDescription: "fruits are pog",
              productPrice: 3,
              productStock: {
                stockAmount: 15,
                stockUnit: "logs",
              },
              productImages: [
                "https://treenewal.com/wp-content/uploads/2020/11/oak-tree-care.png",
                "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
                "http://www.ecomatcher.com/wp-content/uploads/2021/09/Trees.jpg",
              ],
            },
            var2: {
              productName: "bush",
              productDescription: "fun plant",
              productPrice: 4,
              productStock: {
                stockAmount: 20,
                stockUnit: "berries",
              },
              productImages: [
                "https://www.plantsnap.com/wp-content/uploads/2020/12/shutterstock_329291891.jpg",
                "https://hips.hearstapps.com/hmg-prod/images/azalea-and-red-tip-photinia-royalty-free-image-1656520088.jpg",
              ],
            },
          },
          productTags: ["tree", "bush", "plant"],
        },
      },
    },
  },
];

const sample = [{ item1: { key: "pair" } }];

import Category from "@/components/category/Category";
import { Fragment } from "react";

function CategoryPage() {

  // console.log(props.shops)

  return (
    <Fragment>
      <span className="page-heading">
        <h1 className="heading-primary">Categories</h1>
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-category">&nbsp;</div>
        </div>
        <button>Add Category</button>
      </span>

      <section className="category-container">
        {dummycategs.map((categ, index) => {
          return (
            <Category
              items={categ.category}
              key={index}
            ></Category>
          );
        })}
      </section>
    </Fragment>
  );
}

export default CategoryPage;

// export async function getStaticProps(){
//   // "mongodb+srv://USERNAME:PASSWORD@cluster0.cln6x4h.mongodb.net/COLLECTIONNAME?retryWrites=true&w=majority"
//   const client = await MongoClient.connect(process.env.MONGODB_URI)
//   const db = client.db()
//   const shopsCollection = db.collection("shops")

//   const shops = await shopsCollection.find().toArray()

//   client.close()

//   return {
//       props: {
//           shops: shops.map(shop => ({
//               name: shop.name,
//               data: shop.shopData,
//               id: shop._id.toString()
//           }))
//       },
//       revalidate: 1
//   }
// }

