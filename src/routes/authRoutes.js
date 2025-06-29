const express = require("express");
const { register, login, verifyEmail, getUserData, googleOAuthCallback } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.get("/get-my-info", authMiddleware, getUserData);
router.post("/google/callback", googleOAuthCallback);

module.exports = router;