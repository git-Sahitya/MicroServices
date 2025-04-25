const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authMiddleWare = require("../middleware/authMiddleWare");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authMiddleWare.userAuth, userController.profile);
router.get("/logout", userController.logout);

module.exports = router;