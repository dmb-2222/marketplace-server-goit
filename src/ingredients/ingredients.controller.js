const mongoose = require("mongoose");


const ingridientsModel = require("./ingredients.model");

const createIngridients = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const ingridients = await ingridientsModel.create({
      name,
      description,
    });

    return res.status(201).json({
      name: ingridients.name,
      description: ingridients.description,
    });
  } catch (err) {
    next(err);
  }
};

const newValueIngridients = new ingridientsModel({
  _id: new mongoose.Types.ObjectId(),
  ingredients: [
    { type: "ingredientId1", ref: "ingredients model name2" },
    { type: "ingredientId2", ref: "ingredients model name2" },
  ],
});
// const author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: 'Ian Fleming',
//   age: 50
// });

// author.save(function (err) {
//   if (err) return handleError(err);

//   const story1 = new Story({
//     title: 'Casino Royale',
//     author: author._id    // assign the _id from the person
//   });

//   story1.save(function (err) {
//     if (err) return handleError(err);
//     // that's it!
//   });
// });

module.exports = createIngridients;
