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

    const user = await db.User.create({
      name,
      email,
      termAgree,
      pass: hashedPass,
      token: jwt.sign({ user_id: this._id, email }, SECRET_KEY, {
        expiresIn: "2h",
      }),
    });

    res.status(201).json({
      succes: true,
      massage: "User registered succesfully!",
      user: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "User already exists!" });
    } else {
      res
        .status(400)
        .json({ message: "Error in creating user!", error: error });
      console.log(error);
    }
  }
};

exports.signinHandlr = async (req, res) => {
  db.connectDB(db_uri);
  try {
    const { email, pass } = req.body;
    if (!(email && pass)) {
      res.status(400).send("All input is required!");
    }
    const user = await db.User.findOne({ email: email });

    if (user && (await bcrypt.compare(pass, user.pass))) {
      const token = jwt.sign({ user_id: user._id, email }, SECRET_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      res.status(200).send(user);
    } else {
      res.status(401).send("Invalid Cradintiols!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something is wrong!");
  }
};
