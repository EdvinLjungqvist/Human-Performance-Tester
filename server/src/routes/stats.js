const express = require("express");
const { createVerbalMemoryStats, getVerbalMemoryStats, getVerbalMemoryStatsGlobal, getStatsCount } = require("../controllers/stats");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/verbal-memory", verifyToken, createVerbalMemoryStats);

router.get("/verbal-memory", verifyToken, getVerbalMemoryStats);

router.get("/verbal-memory/global", getVerbalMemoryStatsGlobal)

router.get("/count", getStatsCount);

module.exports = router;
