const Product = require("./products.model");

const createProduct = async (req, res, next) {
  
}

const updateProduct = async (req, res) => {
  const id = req.params.id;
  let body = "";
  try {
    const data = await req.on();
    console.log("data", data);

    // // function (data) {
    //   body = data + body;
    //   const productData = JSON.parse(body);
    //   console.log(productData);
    Product.findByIdAndUpdate(id, data, function (err, product) {
      if (err) res.status(400).json({ status: "no-success", err: err });
      res.status(200).json({ status: "success" });
      console.log("Обновленный объект", product);
    });
    // });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("ingredients");
    console.log("products", products);
    if (products) {
      res.status(200).json({ products: products });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { updateProduct, getProducts };
