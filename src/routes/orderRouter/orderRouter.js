const express = require("express");
const router = express.Router();
const { Schema, model } = require("mongoose");


const orderSchema = Schema({
  creator: String,
  productsList: [
    {
      product: String,
      formType: String,
      itemsCount: Number
    }
  ],
  deliveryType: String,
  deliveryAdress: String,
  sumToPay: Number,
  status: String
});
const Order = model("Order", orderSchema);

router.post("/", async function(req, res) {
  let body = "";
  req.on("data", function(data) {
    body = data + body;
    const orderData = JSON.parse(body);

    const order = new Order(orderData);

    order.save(err => {
      if (err) res.status(400).json({ status: "no-success", order: err });
      console.log("order successfully saved.");
      res.status(200).json({ status: "success", order: orderData });
    });
  });
});
// find order by id
router.get("/:id", function(req, res) {
  Order.findById(req.params.id, function(err, order) {
    if (err) {
      return res.status(400).json({ status: "no-success", err:err });
    }
    res.status(200).json({ status: "success", order: order });
  });
});

module.exports = router;
