const express = require("express");
const { verifyToken, validateCredentials } = require("../middlewares/auth");
const { verifyUpdate } = require("../middlewares/profile");
const { getProfile, updateProfile, getProfileByID, getProfileCount, deleteProfile } = require("../controllers/profile");

const router = express.Router();

router.get("/", verifyToken, getProfile);

router.get("/:id", getProfileByID);

router.post("/update", verifyToken, validateCredentials, verifyUpdate, updateProfile);

router.delete("/", verifyToken, deleteProfile);

router.get("/count", getProfileCount);

module.exports = router;
