const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const videosRouter = require("./routes/videosRouter");
// const notFoundRouter = require("./routes/notFoundRouter");

require("dotenv").config();

const port = process.env.PORT;

app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.json());

app.use("/videos", videosRouter);
// app.use("*", notFoundRouter);

app.get("/", (req, res) => {
  res.send("Connected to server");
});

app.post("/", (req, res) => {
  res.send("Response received from server");
});

app.listen(port, (req, res) => {
  console.log(`Connected on port: ${port}`);
});
