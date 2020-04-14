// const app = require("./app");
// const dotenv = require("dotenv");
// const { port } = require("../config");
// const mongoose = require("mongoose");

// dotenv.config();
// // const port = process.env.port
// const mongoDB= process.env.MONGO_DB_API_KYE

// const port = process.env.PORT || 3000

// void (async () => {
//   try {
//     await mongoose.connect(
//       `${mongoDB}`,
//       {
//         useCreateIndex: true,
//         useFindAndModify: false,
//       }
//     );
//     app.listen(port, () => {
//       console.log(`App running on port ${port}`);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// })();

const { port } = require("../config");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./users/user.router");

const MONGODB_URL= ''

module.exports = class Server {
  constructor() {
    this.server = null;
  }
  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initDatabase();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use("/users", userRouter);
  }
  async initDatabase() {
    await mongoose.connect()
  }
  startListening() {
    this.server.listen(port, () => {
      console.log("Start server port", port);
    });
  }
};
