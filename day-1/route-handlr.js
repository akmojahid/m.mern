require("dotenv").config();
const db = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//local variables
const db_uri = process.env.DB_URI;
const SECRET_KEY = process.env.SECRET_KEY;

exports.signupHandlr = async (req, res) => {
  db.connectDB(db_uri);

  try {
    const { name, email, termAgree, pass } = req.body;
  
    const hashedPass = await bcrypt.hash(pass, 10);
  
    const user = new db.User({ name, email, termAgree, pass: hashedPass });
  
    const savedUser = await user.save();
  
    const token = jwt.sign({ user_id: user._id, email }, SECRET_KEY, {
      expiresIn: "2h",
    });
    savedUser.token = token;
    res.status(201).send(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "User already exists!" });
    } else {
      res.status(400).json({ message: "Error creating user!", error: error });
    }
  }
};

// exports.signupHandlr = async (req, res) => {
//   db.connectDB(db_uri);
//   try {
//     const { name, email, termAgree } = req.body;
//     const pass = await bcrypt.hash(req.body.pass, 10);
//     const user = new db.User.create({ name, email, pass, termAgree });

//     const token = jwt.sign({ user_id: user._id, email }, SECRET_KEY, {
//       expiresIn: "2h",
//     });
//     user.token = token;

//     const savedUser = await user.save();
//     res.status(201).send(savedUser);
//   } catch (error) {
//     res.status(400).json({ massage: "User Already Exist!", error: error });
//   }
// };
