const express = require("express");
const router = express.Router();
const fs = require("fs");
const productsDB = JSON.parse(
  fs.readFileSync(`__dirname/../src/db/products/all-products.json`)
);
// const path = require('path')

// const notes = '../../db/users/Ivan.json'
// console.log(path.normalize(notes));
// path.dirname(notes) // /users/flavio
// path.basename(notes) // notes.txt
// path.extname(notes) // .txt

router.post("/", function(req, res) {
  let body = "";
  const newOrder = [];
  req.on("data", function(data) {
    body = data + body;
    const userOrder = JSON.parse(body);
    // console.log("userOrder", userOrder);
    const userId = userOrder.user;
    userOrder.products.forEach(el => {
      productsDB.forEach(product => {
        if (product.id * 1 === el * 1) newOrder.push(product);
      });
    });

    if (newOrder.length === 0) {
      res.status(200).json({ status: "failed", order: null });
    } else res.status(200).json({ status: "success", order: { id: userId, user: "id", products: newOrder, deliveryType: "deliveryType", deliveryAdress: "deliveryAdress" } });
    //created new order
    (async () => {
      await fs.mkdirSync(
        `__dirname/../src/db/users/${userId}/orders`,
        { recursive: true },
        err => {
          if (err) throw err;
        }
      );

      fs.writeFile(
        `__dirname/../src/db/users/${userId}/orders/${userId}.json`,
        `${body}`,
        function(err) {
          if (err) return console.log("Not created", err);
        }
      );
    })();
  });
});
module.exports = router;
