const express = require("express");
const { createVerbalMemoryStats, getVerbalMemoryStats, getAllVerbalMemoryStats } = require("../controllers/stats");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/verbal-memory", verifyToken, createVerbalMemoryStats);

router.get("/verbal-memory", verifyToken, getVerbalMemoryStats);

router.get("/verbal-memory/all", verifyToken, getAllVerbalMemoryStats);

module.exports = router;
