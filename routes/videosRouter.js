const express = require("express");
const router = express.Router();
const fs = require("fs");

const videosJSON = fs.readFileSync("./data/videos.json");

router.get("/", (req, res) => {
  res.send(videosJSON);
});

router.post("/", (req, res) => {
  res.send(videosJSON);
});

module.exports = router;
