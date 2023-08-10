const express = require("express");
const router = express.Router();
const fs = require("fs");

const videosJSON = fs.readFileSync("./data/videos.json");

router.get("/", (req, res) => {
  res.send(videosJSON);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const videosObject = JSON.parse(videosJSON);
  const selectedVideoJSON = videosObject.find((video) => {
    return video.id === id;
  });

  if (selectedVideoJSON) {
    res.json(selectedVideoJSON);
  } else {
    res.status(404).send("Video Not Found");
  }
});

// router.post("/", (req, res) => {
//   res.send(videosJSON);
// });

module.exports = router;
