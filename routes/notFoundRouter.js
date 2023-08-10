const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Page Not Found");
});

// router.post("/", (req, res) => {
//   res.send("Post on not found page");
// });

module.exports = router;
