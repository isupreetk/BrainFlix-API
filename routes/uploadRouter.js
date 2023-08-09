const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get on Upload Page");
});

router.post("/", (req, res) => {
  res.send("Post on Upload Page");
});

module.exports = router;
