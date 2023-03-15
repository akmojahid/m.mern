const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("MongoDB Database is connected!");
  } catch (error) {
    console.log(error);
  }
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  termAgree: Boolean,
  token: String,
});

const User = mongoose.model("UserInfo", userSchema);

module.exports = { connectDB, userSchema, User };
