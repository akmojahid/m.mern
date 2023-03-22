const cors = require("cors");
const express = require("express");
const routes = require("./route-handlr");
const app = express();

//Middleware goes here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes goes here
app.get("/", (req, res) => {
  res.send("WELLCOME!");
});

app.get("/signup", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", routes.signupHandlr);

const port = process.env.PORT || 3000;
app.listen(port, console.log("Server running Localhost:3000.."));
