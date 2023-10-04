const express = require("express");
const router = express.Router();

const eventController = require("../controller/event");
const multerUpload = require("../lib/multer");

router.post(
  "/create",
  multerUpload.multerUpload.single("event_img"),
  eventController.handleCreateEvent
);
router.get("/getAjah", eventController.getAllEvents);
module.exports = router;
