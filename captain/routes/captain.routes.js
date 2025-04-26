const express = require("express");
const router = express.Router();
const captainController = require("../controller/captain.controller");
const authMiddleWare = require("../middleware/authMiddleWare");

router.post("/register", captainController.register);
router.post("/login", captainController.login);
router.get("/profile", authMiddleWare.captainAuth , captainController.profile);
router.get("/logout", captainController.logout);
router.patch('/toggle-availability' , authMiddleWare.captainAuth , captainController.toggleAvailability)
router.get('/new-ride' ,  authMiddleWare.captainAuth , captainController.waitForNewRide)

module.exports = router;