const express = require("express");
const morgan = require("morgan");
const productsRouter = require("./routes/productsRouter/productsRouter");
const singUpRouter = require('./routes/signUpRouter/signUpRouter')

const app = express();
// app.get('/', function (req, res) {
//     res.send('Hello World!');
//   });
app.use(morgan("dev"));
// app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", singUpRouter);

module.exports = app;
