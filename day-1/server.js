const cors = require("cors");
const express = require("express");
const app = express();
let pv = 0;
//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/signup", (req, res) => [
  res.send("This is an example of speech synthesis in express"),
]);

app.post("/signup", (req, res) => {
  const body = req.body;
  body.succes = true;
  res.send(body);
  console.log(req.body);
});

app.listen(3000, console.log("Server running on port 3000\n"));
