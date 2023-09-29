const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.post("/regist", authController.handleRegister);

router.post("/", authController.handleLogin);

router.patch("/account", authMiddleware.validateToken);

module.exports = router;
