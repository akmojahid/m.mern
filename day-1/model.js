const mongoose = require("mongoose");

//establilsh database connections:

async function connectDB(uri) {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log(`Database is connected!`);
  } catch (error) {
    console.log(error);
  }
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  termsAgree: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { connectDB, User };
