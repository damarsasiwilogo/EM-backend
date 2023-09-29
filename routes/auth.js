const express = require("express");
const router = express.Router();

// auth routes declare
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

// auth routes
router.post("/regist", authController.handleRegister);
router.post("/", authController.handleLogin);
router.patch("/account", authMiddleware.validateToken);

module.exports = router;
