const express = require("express");
const { verifyToken, verifySignin, validateCredentials, verifySignup } = require("../middlewares/auth");
const { getAuth, signup, signin, signout } = require("../controllers/auth");

const router = express.Router();

router.get("/", verifyToken, getAuth);

router.post("/signup", validateCredentials, verifySignup, signup);

router.post("/signin", verifySignin, signin);

router.post("/signout", verifyToken, signout);

module.exports = router;
