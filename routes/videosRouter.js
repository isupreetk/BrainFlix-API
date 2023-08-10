const express = require("express");
const router = express.Router();
const fs = require("fs");
// const { stringify } = require("querystring");
const { v4: uuid } = require("uuid");

const videosJSON = fs.readFileSync("./data/videos.json");
const videosObj = JSON.parse(videosJSON);

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
    image: "http://localhost:8080/images/image0.jpeg",
    description: videoDescription,
    views: 0,
    likes: 0,
    duration: "01.10",
    video: "https://project-2-api.herokuapp.com/stream",
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
  // console.log(req.body);
  const { id } = req.params;

  // const { comment } = req.body;
  // console.log(comment);
  const newComment = {
    name: req.body.name,
    comment: req.body.comment,
  };

  const selectedVideoObj = videosObj.find((video) => {
    return video.id === id;
  });

  console.log(selectedVideoObj);

  const selectedVideoCommentsObj = selectedVideoObj.comments;
  // console.log(selectedVideoCommentsObj);

  // const selectedVideoCommentsObj = selectedVideoObj.map((video) => {
  // return (: video.comments);
  // });

  // const selectedVideoCommentsJSON = JSON.stringify(selectedVideoCommentsObj);
  // console.log(selectedVideoCommentsJSON);

  const updatedSelectedVideoCommentsObj =
    // selectedVideoCommentsObj.push(
    //   // { ...comments, response.data }
    //   comment
    // );

    selectedVideoCommentsObj.push(newComment);
  console.log(selectedVideoCommentsObj);

  console.log(selectedVideoObj);

  fs.writeFileSync("./data/videos.json");

  // const selectedVideoObj = JSON.parse(selectedVideoJSON);

  // selectedVideoObj.comments.push([...selectedVideoObj.comments], response.data);
  // res.send(selectedVideoObj);
});

module.exports = router;
