const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const { port } = require("../config");
const userRouter = require("./users/user.router");
const ingridientsRouter = require("./ingredients/ingredients.router");
const commentsRouter = require('./сomments/comments.router')
const productRouter =require('./products/products.router')

require("dotenv").config();

module.exports = class Server {
  constructor() {
    this.server = null;
  }
  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
    // this.server.use(express.urlencoded());
    this.server.use(morgan("dev"));
    this.server.use((err, req, res, next) => {
      console.log(err);
      delete err.stack;
      next(err);
    });
  }

  initRoutes() {
    this.server.use("/users", userRouter);
    this.server.use("/ingridients", ingridientsRouter);
    this.server.use('/comments', commentsRouter)
    this.server.use('/products', productRouter)
  }
  async initDatabase() {
    await mongoose.connect(process.env.MONGODB_URL, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  }
  startListening() {
    this.server.listen(port, () => {
      console.log("Start server port", port);
    });
  }
};
