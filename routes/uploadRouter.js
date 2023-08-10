const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

const videosJSON = fs.readFileSync("./data/videos.json");
const videosObject = JSON.parse(videosJSON);

router.get("/", (req, res) => {
  res.send("Get on Upload Page");
});

router.post("/", (req, res) => {
  const { videoTitle, videoDescription } = req.body;
  console.log(videoTitle, videoDescription);

  const uploadedVideo = {
    id: uuid(),
    title: videoTitle,
    channel: "Mohan Muruge",
    image: "http://localhost:8080/images/image0.jpeg",
    description: videoDescription,
    views: 0,
    likes: 0,
    duration: "01.10",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  videosObject.push(uploadedVideo);
  const videosString = JSON.stringify(videosObject);
  fs.writeFileSync("./data/videos.json", videosString);

  res.send(uploadedVideo);
});

module.exports = router;
