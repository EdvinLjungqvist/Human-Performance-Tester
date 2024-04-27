const express = require("express");
const { verifyToken, verifySignin, verifySignup, validateUsername, validatePassword, validateBorn } = require("../middlewares/auth");
const { getAuth, signup, signin, signout } = require("../controllers/auth");

const router = express.Router();

router.get("/", verifyToken, getAuth);

router.post("/signup", validateUsername, validatePassword, validateBorn, verifySignup, signup);

router.post("/signin", verifySignin, signin);

router.post("/signout", verifyToken, signout);

module.exports = router;
