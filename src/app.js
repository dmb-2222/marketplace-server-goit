const express = require("express");
const morgan = require("morgan");

const productsRouter = require("./routes/productsRouter/productsRouter");
const singUpRouter = require("./routes/signUpRouter/signUpRouter");
const userOrder = require("./routes/orderRouter/orderRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));

app.use("/products", productsRouter);
app.use("/users/:id", singUpRouter);
app.use("/users", singUpRouter);
app.use("/orders", userOrder);

module.exports = app;
