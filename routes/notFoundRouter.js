const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get on not found page");
});

router.post("/", (req, res) => {
  res.send("Post on not found page");
});

module.exports = router;
