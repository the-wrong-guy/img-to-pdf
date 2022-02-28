const fs = require("fs");
const client = require("https");
const { v4: uuid } = require("uuid");
const axios = require("axios");
const dir = require("node-dir");
const PDFDocument = require("pdfkit");

doc = new PDFDocument({ size: "A4" });

const imgArr = [
  "https://upload.app.blueflamingokids.in/files/gwc/1e1ea74a-fb29-465a-a51c-1f5fae3e4489/UKG/f2dd22cc-d9e0-4fa3-90ee-d2dfcbad4504.png?token=FCwRwhDPXXbMH5c5Mpq7zjf6dx3mjg2KRRDgQhtDbhZdHkVxDn",
  "https://upload.app.blueflamingokids.in/files/gwc/cba150a1-cb57-440b-be55-7cc0ef692e26/UKG/ce1fc7f8-f38d-4bba-8393-f3d2111b5b6f.png?token=FCwRwhDPXXbMH5c5Mpq7zjf6dx3mjg2KRRDgQhtDbhZdHkVxDn",
  "https://upload.app.blueflamingokids.in/files/gwc/ed610416-41d8-40c3-84f9-881b439b95d4/UKG/be43c286-514a-4fc0-9731-36d37a6a52df.png?token=FCwRwhDPXXbMH5c5Mpq7zjf6dx3mjg2KRRDgQhtDbhZdHkVxDn",
  "https://upload.app.blueflamingokids.in/files/gwc/ca4b2d9c-665b-468f-845b-9fd6a2a07a34/UKG/646ff40a-808c-4e4c-a1ca-2ad43212ec56.png?token=FCwRwhDPXXbMH5c5Mpq7zjf6dx3mjg2KRRDgQhtDbhZdHkVxDn",
];

async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(`images/${filepath}`))
      .on("error", reject)
      .once("close", () => resolve(`images/${filepath}`));
  });
}

doc.pipe(fs.createWriteStream("output.pdf"));

Promise.all(imgArr.map((item) => downloadImage(item, `${uuid()}.png`)))
  .then((res) => {
    res.map((item) => {
      doc.image(item, {
        fit: [200, 200],
        align: "center",
      });
    });
    doc.end();
  })
  .catch(console.error);

// doc.addPage()
//    .image('./1.png', {
//    fit: [500,400],
//    align: 'center',
//    valign: 'center'
// });
