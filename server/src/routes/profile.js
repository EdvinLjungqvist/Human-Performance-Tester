const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { getProfile, getProfileCount, deleteProfile } = require("../controllers/profile");

const router = express.Router();

router.get("/", verifyToken, getProfile);

router.get("/count", getProfileCount);

router.delete("/", verifyToken, deleteProfile);

module.exports = router;
