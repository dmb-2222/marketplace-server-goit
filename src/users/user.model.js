const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    alias: "login",
    // validate: () => this.email.includes("@"),
    unique: true,
  },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

async function updateToken(id, newToken) {
  return this.findByIdAndUpdate(id , { token: newToken }, { new: true });
};

userSchema.statics.updateToken = updateToken;

const userModel = mongoose.model("userSite", userSchema);
// (async () => {
//   await userModel.collection.dropAllIndexes();
// })();

module.exports = userModel;
