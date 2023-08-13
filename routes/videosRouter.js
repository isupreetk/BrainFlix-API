const express = require("express");
const router = express.Router();
const fs = require("fs");
// const { stringify } = require("querystring");
const { v4: uuid } = require("uuid");

require("dotenv").config();

const port = process.env.PORT;
const api_URL = process.env.API_URL;

const videosJSON = fs.readFileSync("./data/videos.json");
let videosObj = JSON.parse(videosJSON);

router.get("/", (req, res) => {
  res.send(videosJSON);
});

router.post("/", (req, res) => {
  const { videoTitle, videoDescription } = req.body;
  console.log(videoTitle, videoDescription);

  const uploadedVideo = {
    id: uuid(),
    title: videoTitle,
    channel: "Mohan Muruge",
    image: `${api_URL}/images/image0.jpeg`,
    description: videoDescription,
    views: 0,
    likes: 0,
    duration: "01.10",
    video: `${api_URL}/videos/BrainStation_Sample_Video.mp4`,
    timestamp: Date.now(),
    comments: [],
  };
  videosObj.push(uploadedVideo);
  const videosString = JSON.stringify(videosObj);
  fs.writeFileSync("./data/videos.json", videosString);

  res.send(uploadedVideo);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const selectedVideoJSON = videosObj.find((video) => {
    return video.id === id;
  });

  if (selectedVideoJSON) {
    res.json(selectedVideoJSON);
  } else {
    res.status(404).send("Video Not Found");
  }
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;

  const newComment = {
    id: uuid(),
    name: req.body.name,
    comment: req.body.comment,
    likes: 0,
    timestamp: Date.now(),
  };

  const selectedVideoObj = videosObj.find((video) => {
    return video.id === id;
  });

  const selectedVideoCommentsObj = selectedVideoObj.comments;

  selectedVideoCommentsObj.push(newComment);

  selectedVideoObj.comments = selectedVideoCommentsObj;

  videosObj[{ id }] = selectedVideoObj;

  videosString = JSON.stringify(videosObj);

  fs.writeFileSync("./data/videos.json", videosString);
  res.json(videosString);
});

module.exports = router;
