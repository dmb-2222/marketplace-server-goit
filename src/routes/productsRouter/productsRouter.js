const express = require("express");
const router = express.Router();
const fs = require("fs");
// const productsDB = require("../../db/products/all-products.json");
const productsDB = JSON.parse(
  fs.readFileSync(`__dirname/../src/db/products/all-products.json`)
);

router.get("/:id", function(req, res) {
  const product = productsDB.find(el => Number(el.id) === req.params.id * 1);
  if (product) {
    res.status(200).json({
      status: "success",
      data: {
        product
      }
    });
  } else
    res.status(404).json({
      status: "no products",
      product: []
    });
});

router.get("/", function(req, res) {
  const idsArr = req.query.ids.slice().split(",");
  const result = [];
  console.log("idsArr", idsArr);
  idsArr.forEach(el => {
    productsDB.forEach(productDB => {
      if (productDB.id * 1 === el * 1) result.push(productDB);
    });
  });
  res.status(404).json({
    status: "no products",
    products: result
  });
});

module.exports = router;
