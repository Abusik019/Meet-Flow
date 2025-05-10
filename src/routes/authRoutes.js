const express = require("express");
const { register, login, verifyEmail, getUserData } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.get("/get-my-info", authMiddleware, getUserData);

module.exports = router;