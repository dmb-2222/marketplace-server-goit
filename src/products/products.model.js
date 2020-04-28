const { Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const productSchema = Schema({
  ingredientsId: { type: mongoose.Types.ObjectId, required: true },
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
  likes: Number,
});

productSchema.virtual("ingredients", {
  ref: "ingredients",
  localField: "ingredientsId",
  foreignField: "_id",
  justOne: true,
});

const Product = model("Product", productSchema);
module.exports = Product;
