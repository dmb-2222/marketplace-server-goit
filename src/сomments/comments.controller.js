const commentsModel = require("./comments.model");
const Joi = require("joi");

const createComments = async (req, res, next) => {
  try {
    const { product, author, text, mark } = req.body;

    const comments = await commentsModel.create({
      product,
      author,
      text,
      mark,
    });

    return res.status(201).json({
      product: comments.product,
      author: comments.author,
      text: comments.text,
      mark: comments.mark,
    });
  } catch (err) {
    next(err);
  }
};
const validateCreateComments = (req, res, next) => {
  const validationRules = Joi.object({
    product: Joi.string().required(),
    author: Joi.string().required(),
    text: Joi.string().required(),
    mark: Joi.number().required().min(1).max(5),
  });
  const validationResult = Joi.validate(req.body, validationRules);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
};
const getComments = async (req, res) => {
  const { productId } = req.query;
  try {
    const data = await commentsModel.find({ product: productId });
    if (data.length !== 0) {
      return res.status(201).json({ status: "success", сomments: data });
    }
    return res.status(400).json({ status: "no success", сomments: [] });
    // commentsModel.find({ product: productId }, function (err, data) {
    //   console.log(data);
    //   if (data.length !== 0) {
    //     return res.status(201).json({ status: "success", сomments: data });
    //   }
    //   return res.status(400).json({ status: "no success", сomments: [] });
    // });
  } catch (err) {
    next(err);
  }
};
// module.exports = createComments;
// module.exports = validateCreateComments;
module.exports = { createComments, validateCreateComments, getComments };
