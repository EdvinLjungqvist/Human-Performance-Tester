const express = require("express");
const { createVerbalMemoryStats, getVerbalMemoryStats, getVerbalMemoryStatsLeaderboard, getVerbalMemoryStatsAverage, getStatsCount } = require("../controllers/stats");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/verbal-memory", verifyToken, createVerbalMemoryStats);

router.get("/verbal-memory", verifyToken, getVerbalMemoryStats);

router.get("/verbal-memory/leaderboard", getVerbalMemoryStatsLeaderboard);

router.get("/verbal-memory/average", getVerbalMemoryStatsAverage);

router.get("/count", getStatsCount);

module.exports = router;
