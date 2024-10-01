const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

router.get("/user/:userId/:role", videoController.getVideosByUser);
router.get("/", videoController.getVideos);
router.post("/", videoController.addVideo);
router.put("/:id", videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
