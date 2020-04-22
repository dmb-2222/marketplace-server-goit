const mongoose = require("mongoose");
const { Schema } = mongoose;

const userIngridients = new Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
  }
});

const ingridientsModel = mongoose.model("Ingridients", userIngridients);

module.exports = ingridientsModel;
