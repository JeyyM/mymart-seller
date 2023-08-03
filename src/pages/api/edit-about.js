import { MongoClient, ObjectId } from "mongodb"

async function handler(req, res) {
  if (req.method === "PATCH") {
    // const data = req.body;

    const data = {
        "text": {
          "desktop": [
            {
              "type": "heading-primary-2",
              "row1": "1",
              "row2": "3",
              "col1": "1",
              "col2": "13",
              "align": "center",
              "zInd": "2",
              "content": "About Us",
              "scale": "3"
            },
            {
              "type": "heading-tertiary",
              "row1": "2",
              "row2": "6",
              "col1": "2",
              "col2": "7",
              "align": "left",
              "zInd": "3",
              "content": "Praesent convallis metus a nisi vestibulum accumsan. Quisque elit eros, vulputate ac dictum in, lobortis sed tellus. Sed in mi id massa lacinia sagittis. Fusce cursus erat ac purus tristique,",
              "scale": "0.9"
            },
            {
              "type": "heading-tertiary",
              "row1": "4",
              "row2": "6",
              "col1": "2",
              "col2": "7",
              "align": "left",
              "zInd": "2",
              "content": "Aenean id vulputate lectus. Sed accumsan, metus id laoreet sollicitudin, sem sem vestibulum risus, et consectetur ex magna ut neque. Quisque quam justo, faucibus et vehicula in, efficitur non est In sed augue a lectus eleifend maximus. Duis sollicitudin ac leo sed maximus.",
              "scale": "0.9"
            },
            {
              "type": "heading-secondary",
              "row1": "11",
              "row2": "15",
              "col1": "2",
              "col2": "7",
              "align": "left",
              "zInd": "2",
              "content": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque odio metus, gravida ultrices nisl quis, iaculis egestas quam. Curabitur suscipit sapien vel lectus cursus fermentum. Fusce lacinia in dui eu laoreet. Donec vitae imperdiet nunc. In eu ultricies orci.",
              "scale": "0.9"
            }
          ],
          "tablet": [
            {
              "type": "heading-primary-2",
              "row1": "1",
              "row2": "2",
              "col1": "1",
              "col2": "9",
              "align": "center",
              "zInd": "1",
              "content": "About us",
              "scale": "1.5"
            },
            {
              "type": "heading-secondary",
              "row1": "2",
              "row2": "4",
              "col1": "3",
              "col2": "7",
              "align": "left",
              "zInd": "1",
              "content": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque odio metus, gravida ultrices nisl quis, iaculis egestas quam. Curabitur suscipit sapien vel lectus cursus fermentum. Fusce lacinia in dui eu laoreet. Donec vitae imperdiet nunc. In eu ultricies orci.",
              "scale": "1"
            },
            {
              "type": "heading-tertiary",
              "row1": "5",
              "row2": "7",
              "col1": "5",
              "col2": "8",
              "align": "left",
              "zInd": "1",
              "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet tellus eu elit consequat rhoncus. Etiam sollicitudin pulvinar imperdiet",
              "scale": "0.9"
            },
            {
              "type": "heading-tertiary",
              "row1": "7",
              "row2": "9",
              "col1": "1",
              "col2": "4",
              "align": "left",
              "zInd": "1",
              "content": "Quisque elit eros, vulputate ac dictum in, lobortis sed tellus. Sed in mi id massa lacinia sagittis",
              "scale": "0.9"
            }
          ],
          "phone": [
            {
              "type": "heading-primary-2",
              "row1": "1",
              "row2": "4",
              "col1": "1",
              "col2": "5",
              "align": "center",
              "zInd": "3",
              "content": "About Us",
              "scale": "1"
            },
            {
              "type": "heading-secondary",
              "row1": "4",
              "row2": "7",
              "col1": "1",
              "col2": "5",
              "align": "center",
              "zInd": "1",
              "content": "Fusce non aliquet mi. Morbi faucibus posuere elit vitae lobortis. Quisque pharetra vitae neque id laoreet. Donec id lacus sodales, viverra quam non",
              "scale": "0.8"
            },
            {
              "type": "heading-tertiary",
              "row1": "10",
              "row2": "12",
              "col1": "1",
              "col2": "5",
              "align": "right",
              "zInd": "1",
              "content": "Sed accumsan, metus id laoreet sollicitudin, sem sem vestibulum risus",
              "scale": "0.9"
            },
            {
              "type": "heading-tertiary",
              "row1": "12",
              "row2": "14",
              "col1": "1",
              "col2": "5",
              "align": "left",
              "zInd": "1",
              "content": "Nunc nec tincidunt eros. Integer tristique semper consectetur.",
              "scale": "0.9"
            }
          ]
        },
        "img": {
          "desktop": [
            {
              "img": "https://picsum.photos/3000/100",
              "row1": "1",
              "row2": "3",
              "col1": "1",
              "col2": "13",
              "zInd": "1",
              "border": "",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/200",
              "row1": "3",
              "row2": "6",
              "col1": "8",
              "col2": "12",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "0.9",
              "tl": "150",
              "tr": "150",
              "bl": "150",
              "br": "150",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/200",
              "row1": "7",
              "row2": "10",
              "col1": "1",
              "col2": "4",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/201",
              "row1": "7",
              "row2": "10",
              "col1": "4",
              "col2": "7",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/202",
              "row1": "7",
              "row2": "10",
              "col1": "7",
              "col2": "10",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/204",
              "row1": "7",
              "row2": "10",
              "col1": "10",
              "col2": "13",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/207",
              "row1": "11",
              "row2": "16",
              "col1": "8",
              "col2": "11",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "1",
              "tl": "150",
              "tr": "150",
              "bl": "150",
              "br": "150",
              "opacity": "1"
            }
          ],
          "tablet": [
            {
              "img": "https://picsum.photos/300/200",
              "row1": "1",
              "row2": "5",
              "col1": "1",
              "col2": "2",
              "zInd": "1",
              "border": "",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/210",
              "row1": "1",
              "row2": "7",
              "col1": "8",
              "col2": "9",
              "zInd": "1",
              "border": "",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            }
          ],
          "phone": [
            {
              "img": "https://picsum.photos/300/200",
              "row1": "1",
              "row2": "4",
              "col1": "1",
              "col2": "5",
              "zInd": "1",
              "border": "",
              "scale": "1",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/207",
              "row1": "7",
              "row2": "9",
              "col1": "1",
              "col2": "3",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "0.9",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            },
            {
              "img": "https://picsum.photos/300/200",
              "row1": "8",
              "row2": "10",
              "col1": "3",
              "col2": "5",
              "zInd": "1",
              "border": "round-borderer",
              "scale": "0.9",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0",
              "opacity": "1"
            }
          ]
        },
        "container": {
          "desktop": [
            {
              "color": "#6a86ef",
              "border": "",
              "scale": "1",
              "zInd": "2",
              "opacity": "0.5",
              "row1": "1",
              "row2": "3",
              "col1": "1",
              "col2": "13",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0"
            },
            {
              "color": "#FF0000",
              "border": "round-borderer",
              "scale": "0.9",
              "zInd": "1",
              "opacity": "1",
              "row1": "3",
              "row2": "6",
              "col1": "2",
              "col2": "7",
              "tl": "15",
              "tr": "15",
              "bl": "15",
              "br": "15"
            },
            {
              "color": "#FF0000",
              "border": "round-borderer",
              "scale": "0.9",
              "zInd": "1",
              "opacity": "1",
              "row1": "11",
              "row2": "15",
              "col1": "2",
              "col2": "7",
              "tl": "15",
              "tr": "15",
              "bl": "15",
              "br": "15"
            }
          ],
          "tablet": [
            {
              "color": "#c0d7f9",
              "border": "",
              "scale": "1",
              "zInd": "1",
              "opacity": "1",
              "row1": "5",
              "row2": "7",
              "col1": "1",
              "col2": "5",
              "tl": "0",
              "tr": "50",
              "bl": "0",
              "br": "0"
            },
            {
              "color": "#c0d7f9",
              "border": "",
              "scale": "1",
              "zInd": "1",
              "opacity": "1",
              "row1": "7",
              "row2": "9",
              "col1": "4",
              "col2": "9",
              "tl": "0",
              "tr": "0",
              "bl": "52",
              "br": "0"
            }
          ],
          "phone": [
            {
              "color": "#000000",
              "border": "",
              "scale": "1",
              "zInd": "2",
              "opacity": "0.4",
              "row1": "1",
              "row2": "4",
              "col1": "1",
              "col2": "5",
              "tl": "0",
              "tr": "0",
              "bl": "0",
              "br": "0"
            }
          ]
        },
        "rows": {
          "desktop": "20",
          "tablet": "10",
          "phone": "15"
        }
    }
    

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const martId = new ObjectId(req.query.martid);

    const result = await db.collection("shops").updateOne(
      { _id: martId },
      {
        $set: {
          [`shopData.shopDetails.aboutData`]: data
        }
      }
    );

    client.close();

    res.status(200).json({ message: "Category updated" });
  }
}

export default handler
