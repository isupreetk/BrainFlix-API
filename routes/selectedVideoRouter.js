const express = require("express");
const router = express.Router();

const videosJSON = require("../data/videos.json");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  //   console.log(id);

  const selectedVideoJSON = videosJSON.find((video) => {
    return video.id === id;
  });

  if (!selectedVideoJSON) {
    res.status(404).send("NOT FOUND");
  } else {
    res.json(selectedVideoJSON);
  }
});

// router.post("/", (req, res) => {
//   res.send(videosJSON);
// });

module.exports = router;
