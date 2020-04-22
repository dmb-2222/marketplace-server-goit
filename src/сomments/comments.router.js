const { Router } = require("express");
const commentsRouter = Router();

const {
  createComments,
  validateCreateComments,
  getComments
} = require("./comments.controller");

commentsRouter.get("/", getComments);
commentsRouter.post("/", validateCreateComments, createComments);


module.exports = commentsRouter;
