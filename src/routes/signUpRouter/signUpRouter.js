const express = require("express");
const router = express.Router();
const fs = require("fs");
const shortid = require("shortid");

router.get("/:id", function(req, res) {
  const product = productsDB.find(el => Number(el.id) === req.params.id * 1);
  if (product) {
    res.status(200).json({
      status: "success",
      data: {
        product
      }
    });
  } else
    res.status(404).json({
      status: "no products",
      product: []
    });
});

router.post("/", function(req, res) {
  let allUsers = [];
  const fileHandler = async () => {
    return fs.readFileSync(
      "src/db/users/all-users.json",
      "utf8",
      (err, allDataUsers) => {
        if (err) throw err;
        allUsers = allDataUsers;
      }
    );
  };
  fileHandler().then(result => {
    console.log("result.......", result);
    
    let body = "";
    req.on("data", function(data) {
      body = data + body;
      const userData = JSON.parse(body);
      const parsedData = JSON.parse(result);
      userDataWithId = {
        id: shortid(),
        userData
      };
      console.log('userDataWithId',result)
      fs.writeFile(
        `src/db/users/all-users.json`,
        JSON.stringify([...parsedData, userDataWithId]),
        function(err) {
          if (err) return console.log("Not created", err);
          console.log("File is created successfully.");
          res.status(200).json({ status: "success", user: userDataWithId });
        }
      );
    });
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
