const express = require("express");
const router = express.Router();
const fs = require("fs");

const videosJSON = fs.readFileSync("./data/videos.json");

router.get("/", (req, res) => {
  res.send(videosJSON);
});

router.post("/", (req, res) => {
  res.send("Post on Videos Page");
});

module.exports = router;

{
  /* <Route path="/videos" element={<HomePage />} />
<Route path="/videos/:id" element={<HomePage />} />
<Route path="/upload" element={<UploadPage />} />
<Route path="*" element={<NotFoundPage />} /> */
}
