const { Router } = require("express");
const ingredientsRouter = Router();

const createIngridients = require("./ingredients.controller");

ingredientsRouter.post(
  "/",
  createIngridients
);

module.exports = ingredientsRouter;