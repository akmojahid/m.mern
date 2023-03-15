const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const db = require("./model");
const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/signup", (req, res) => [res.send("Hello world")]);

app.post("/signup", async (req, res) => {
  db.connectDB();
  const data = db.User(req.body).save();
  res.status(201);
  res.send(data);
});

app.listen(3000, console.log("Server running on port 3000\n"));
