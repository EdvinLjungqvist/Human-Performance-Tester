const connection = require("../config/database")
const { sign } = require("jsonwebtoken");
const { hash } = require("bcrypt");
const StatusError = require("../utils/StatusError");

const getAuth = (req, res) => {
    res.status(204).end();
};

const signup = (req, res, next) => {
    const { username, password, born } = req.body;

    hash(password, 10)
        .then(hash => {
            sql = "INSERT INTO profiles (username, password, born) VALUES (?, ?, ?)";

            connection.query(sql, [username, hash, born], (err, result) => {
                if (err) {
                    return next(new StatusError("Internal Server Error", 500));
                }
                res.status(200).end();
            });
        });
};

const signin = (req, res) => {
    const profileID = req.profileID;
    const token = sign({ profileID: profileID }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, {
        sameSite: "none",
        secure: true
    }).end();
};

const signout = (req, res) => {
    res.clearCookie("token").end();
};

module.exports = {
    getAuth,
    signup,
    signin,
    signout
};
