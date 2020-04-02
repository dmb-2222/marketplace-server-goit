const express = require("express");
const router = express.Router();
const fs = require("fs");
const { Schema, model, disconnect } = require("mongoose");
// const productsDB = JSON.parse(
//   fs.readFileSync(`__dirname/../src/db/products/all-products.json`)
// );

const productSchema = Schema({
  id: Number,
  sku: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  creatorId: Number,
  created: String,
  modified: String,
  categories: Array,
  likes: Number
});

const Product = model("Product", productSchema);

// add json-product to Mongo

// Product.insertMany(productsDB, function(error, docs) {
//   console.log(error);
//   console.log(docs);
// });

// К товару добавить поле likes: Number

// Product.updateMany({likes:0}, function(err, result){
//   if(err) return console.log(err);
//   console.log(result);
// });

router.put("/:id", function(req, res) {
  const id = req.params.id;
  let body = "";
  req.on("data", function(data) {
    body = data + body;
    const productData = JSON.parse(body);
    console.log(productData)
    Product.findByIdAndUpdate(id, productData, function(err, product) {
      // disconnect();
      if (err) res.status(400).json({ status: "no-success", err: err });
      res.status(200).json({ status: "success" });
      console.log("Обновленный объект", product);
    });
  });
});

module.exports = router;
