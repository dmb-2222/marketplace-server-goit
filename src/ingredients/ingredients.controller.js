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

module.exports = createIngridients;
