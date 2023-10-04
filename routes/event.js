const express = require("express");
const router = express.Router();

const eventController = require("../controller/event");
const authMiddleware = require("../middleware/auth");
const multerUpload = require("../lib/multer");

router.post(
  "/create",
  authMiddleware.validateToken,
  multerUpload.multerUpload.single("event_img"),
  eventController.handleCreateEvent
);

router.get("/", eventController.getAllEvents);
router.get("/:eventId", eventController.getEventId);
router.delete(
  "/:eventId",
  authMiddleware.validateToken,
  eventController.destroyEvent
);

module.exports = router;
