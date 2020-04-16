// const express = require("express");
// const morgan = require("morgan");

// const productsRouter = require("./routes/productsRouter/productsRouter");
// const singUpRouter = require("./routes/signUpRouter/signUpRouter");
// const userOrder = require("./routes/orderRouter/orderRouter");

// const app = express();

// // cut error for front
// app.use((err, req, res, next) => {
//   console.log(err);

//   delete err.stack;
//   next(err);
// });


// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded());

// // app.use("/products", productsRouter);
// // app.use("/users/:id", singUpRouter);
// // app.use("/users", singUpRouter);
// // app.use("/orders", userOrder);

// module.exports = app;
