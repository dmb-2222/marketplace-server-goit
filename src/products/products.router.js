const { Router } = require("express");
const productRouter = Router();

const {updateProduct, getProducts} = require("./products.controller");

productRouter.put("/:id", updateProduct);
productRouter.get('/all-products', getProducts)

module.exports = productRouter;
