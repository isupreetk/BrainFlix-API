const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

require("dotenv").config();

const port = process.env.PORT;
const api_URL = process.env.API_URL;
const image_destination = process.env.IMAGE_DESTINATION;

const videosJSON = fs.readFileSync("./data/videos.json");
let videosObj = JSON.parse(videosJSON);

router.get("/", (req, res) => {
  const videosEnvJSON = videosObj.map((video) => {
    const newVideo = { ...video };
    newVideo.image = `${api_URL}/images/${video.image}`;
    newVideo.video = `${api_URL}/videos/${video.video}`;

    return newVideo;
  });

  res.send(videosEnvJSON);
});

router.post("/", (req, res) => {
  const { videoTitle, videoDescription } = req.body;
  const { videoImage } = req.files;

  if (!videoImage) return res.status(400);

  videoImage.mv(image_destination + videoImage.name);

  res.status(200);

  const uploadedVideo = {
    id: uuid(),
    title: videoTitle,
    channel: "Mohan Muruge",
    image: `${videoImage.name}`,
    description: videoDescription,
    views: 0,
    likes: 0,
    duration: "01.10",
    video: `BrainStation_Sample_Video.mp4`,
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
    const selectedVideo = { ...selectedVideoJSON };

    selectedVideo.image = `${api_URL}/images/${selectedVideoJSON.image}`;
    selectedVideo.video = `${api_URL}/videos/${selectedVideoJSON.video}`;

    res.json(selectedVideo);
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

router.delete("/:id/comments/:commentId", (req, res) => {
  const { id, commentId } = req.params;

  const selectedVideoObj = videosObj.find((video) => {
    return video.id === id;
  });

  const selectedVideoCommentsObj = selectedVideoObj.comments;

  const selectedCommentObj = selectedVideoCommentsObj.find((comment) => {
    return comment.id === commentId;
  });

  let updatedSelectedVideoCommentsObj = selectedVideoCommentsObj.filter(
    (comment) => {
      return comment.id !== selectedCommentObj.id;
    }
  );

  selectedVideoObj.comments = updatedSelectedVideoCommentsObj;

  let updatedSelectedVideoString = JSON.stringify(selectedVideoObj);

  videosObj[{ id }] = selectedVideoObj;

  videosString = JSON.stringify(videosObj);
  fs.writeFileSync("./data/videos.json", videosString);
  res.json(videosString);
});

router.put("/:id/likes", (req, res) => {
  const { id } = req.params;

  const selectedVideoObj = videosObj.find((video) => {
    return video.id === id;
  });

  selectedVideoObj.likes = String(Number(selectedVideoObj.likes) + 1);

  videosObj[{ id }] = selectedVideoObj;
  videosString = JSON.stringify(videosObj);
  fs.writeFileSync("./data/videos.json", videosString);
  res.json(videosString);
});

module.exports = router;
