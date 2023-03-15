const db = require("./model");
const db_uri =
  "mongodb+srv://akmojahid:017766512@cluster0.yzipuzi.mongodb.net/?retryWrites=true&w=majority";

exports.signupHandlr = async (req, res) => {
  db.connectDB(db_uri);
  const user = new db.User(req.body);
  const savedUser = await user.save();
  res.status(201).send(savedUser);

};
