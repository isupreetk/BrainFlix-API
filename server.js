const express = require("express");
const app = express();
const cors = require("cors");
const videosRouter = require("./routes/videosRouter");
const selectedVideosRouter = require("./routes/selectedVideoRouter");
const uploadRouter = require("./routes/uploadRouter");
const notFoundRouter = require("./routes/notFoundRouter");

require("dotenv").config();

const port = process.env.PORT;

app.use(cors());
app.use("/videos", videosRouter);
app.use("/videos/:id", selectedVideosRouter);
app.use("/upload", uploadRouter);
app.use("*", notFoundRouter);

app.get("/", (req, res) => {
  res.send("Connected to server");
});

app.post("/", (req, res) => {
  res.send("Response received from server");
});

app.listen(port, (req, res) => {
  console.log(`Connected on port: ${port}`);
});
