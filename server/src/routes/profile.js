const express = require("express");
const { verifyToken, validateCredentials, validateUsername, validatePassword, validateBorn } = require("../middlewares/auth");
const { verifyUpdate, verifyUsername } = require("../middlewares/profile");
const { getProfile, updateProfile, getProfileByID, getProfileCount, deleteProfile, updateUsername, updatePassword, updateBorn } = require("../controllers/profile");

const router = express.Router();

router.get("/", verifyToken, getProfile);

router.get("/count", getProfileCount);

router.get("/:id", getProfileByID);

router.post("/update-username", verifyToken, validateUsername, verifyUsername, updateUsername);

router.post("/update-password", verifyToken, validatePassword, updatePassword);

router.post("/update-born", verifyToken, validateBorn, updateBorn);

router.delete("/", verifyToken, deleteProfile);

module.exports = router;
