const express = require("express");
const router = express.Router();
const fs = require("fs");
const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: String,
  telephone: String,
  password: String,
  email: String,
  favoriteProducts: Array,
  viewedProducts: Array,
  orders: Array
});

const User = model("Users", userSchema);

// User.findByIdAndUpdate(
//   "5e8384e1da23b32d0ca24192",
//   { orders:[444, 4444] , favoriteProducts: ["cucumber", "carrot"] },
//   function(err, user) {
//     disconnect();
//     if (err) return console.log(err);
//     console.log(user.orders);
//   }
// );
// Добавить роут PUT user/:id который в body шлет одно из полей
// выше с новым значением. После получения запроса пользователь в базе должен обновится.
// В ответ бекенд отправляет
//  {
//   "status": "success",
//   "product": <updated-user>
//  }
router.put("/:id", function(req, res) {
  let body = "";
  req.on("data", function(data) {
    body = data + body;
    const productData = JSON.parse(body);

    console.log(Object.keys(productData));
    Object.keys(productData).forEach(num => {
      User.findById(req.params.id, function(err, user) {
        if (err) {
          return res.status(200).json({ status: err });
        }

        User.findByIdAndUpdate(
          req.params.id,
          {
            [num]: [...user[num], productData[num]]
          },
          function(err, user) {;
            if (err) return console.log(err);
          }
        );
        res.status(200).json({ status: "success", product: productData[num] });
      });
    });
  });
});

// add new user to json
router.post("/", async function(req, res) {
  let body = "";
  req.on("data", function(data) {
    body = data + body;
    const userData = JSON.parse(body);
    (userData.favoriteProducts = []),
      (userData.viewedProducts = []),
      (userData.orders = []);

    const user = new User(userData);

    user.save(err => {
      if (err) throw err;
      console.log("user successfully saved.");
    });
    res.status(200).json({ status: "success", user: userData });
  });
});

router.post("/create-file", function(req, res) {
  let body = "";
  let username = "";
  req.on("data", function(data) {
    body = body + data;
    username = JSON.parse(body).username;
    // isFile exist
    fs.stat(`__dirname/../src/db/users/${username}.json`, function(err, stat) {
      if (err == null) {
        console.log("File exists");
        res.status(400).json({ status: "this user added to DB" });
      } else if (err.code == "ENOENT") {
        // file does not exist
        fs.writeFile(`src/db/users/${username}.json`, `${body}`, function(err) {
          if (err) return console.log("Not created", err);
          console.log("File is created successfully.");
          const userData = require(`../../db/users/${username}.json`);
          res.status(200).json({ status: "success", user: userData });
        });

        console.log("File nooooot exists");
      } else {
        console.log("Some other error: ", err.code);
      }
    });
  });
});

module.exports = router;
