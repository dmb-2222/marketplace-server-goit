const { Router } = require("express");
const userRouter = Router();

const UserController = require('./user.controller')

userRouter.get("/", UserController.getUserWorld);

module.exports = userRouter;