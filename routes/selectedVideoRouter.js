const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get on selected video page");
});

router.post("/", (req, res) => {
  res.send("Post o selected video page");
});

module.exports = router;
