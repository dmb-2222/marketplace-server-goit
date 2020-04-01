const app = require("./app");
const { port } = require("../config");
const mongoose = require("mongoose");

void (async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user:userAdmin123@cluster0-nisx7.mongodb.net/test?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useFindAndModify: false
      }
    );
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
