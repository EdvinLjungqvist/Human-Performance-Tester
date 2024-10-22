const express = require("express");
const { verifyToken, validateUsername, validatePassword, validateBorn } = require("../middlewares/auth");
const { verifyUsername } = require("../middlewares/profile");
const { getProfile, getProfileByID, getProfileCount, deleteProfile, updateUsername, updatePassword, updateBorn } = require("../controllers/profile");

const router = express.Router();

router.get("/", verifyToken, getProfile);

router.delete("/", verifyToken, deleteProfile);

router.get("/count", getProfileCount);

router.get("/:id", getProfileByID);

router.post("/update-username", verifyToken, validateUsername, verifyUsername, updateUsername);

router.post("/update-password", verifyToken, validatePassword, updatePassword);

router.post("/update-born", verifyToken, validateBorn, updateBorn);

module.exports = router;
