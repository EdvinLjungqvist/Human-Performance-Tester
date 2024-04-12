const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { getProfile, getProfileCount, deleteProfile } = require("../controllers/profile");

const router = express.Router();

router.get("/", verifyToken, getProfile);

router.delete("/", verifyToken, deleteProfile);

router.get("/count", getProfileCount);

module.exports = router;
