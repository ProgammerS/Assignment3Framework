// fetch_router.js
const express = require("express");
const router = express.Router();

const Image = require("../models/image")
router.get("/all", (req, res) => {
  Image.find()
    .then((allImages) => {
      if (allImages.length === 0) {
        return res.status(404).json({ error: "No files found." });
      }
      const formattedImages = allImages.map((image) => ({
        filename: image.filename,
        contentType: image.contentType,
        imageBuffer: image.imageBuffer
          ? image.imageBuffer.toString("base64")
          : "",
      }));

      res.json(formattedImages);
    })
    .catch((error) => {
      console.error("Error fetching files:", error);
      res.status(500).json({ error: "Error fetching files." });
    });
});

module.exports = router;
