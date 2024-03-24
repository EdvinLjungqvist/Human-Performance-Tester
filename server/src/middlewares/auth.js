const connection = require("../configs/database");
const { verify } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const StatusError = require("../utils/StatusError");

const SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            return next(new StatusError("Invalid token", 401));
        }
        req.profileID = decoded.profileID;
        next();
    });
};

const verifySignup = (req, res, next) => {
    const { username } = req.body;
    const sql = "SELECT * FROM profiles WHERE username = ?";

    connection.query(sql, [username], (error, result) => {
        if (error) {
            return next(StatusError("Internal Server Error", 500));
        }
        if (result.length > 0) {
            return next(new StatusError("Username is already taken", 400));
        }
        next()
    });
};

const verifySignin = (req, res, next) => {
    const { username, password } = req.body;
    const sql = "SELECT id, password FROM profiles WHERE username = ?";

    connection.query(sql, [username], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        if (result.length === 0) {
            return next(new StatusError("Wrong username or password", 400));
        }
        const profile = result[0];

        compare(password, profile.password)
            .then(result => {
                if (!result) {
                    return next(new StatusError("Wrong username or password", 400));
                }
                req.profileID = profile.id;
                next();
            })
            .catch(() => {
                next(new StatusError("Internal Server Error", 500));
            });
    });
};

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const minUsernameLength = 3;
const maxUsernameLength = 16;
const minPasswordLength = 6;
const maxPasswordLength = 128;

const validateCredentials = (req, res, next) => {
    const { username, password, born } = req.body;

    if (!(username.length >= minUsernameLength && username.length <= maxUsernameLength)) {
        return next(new StatusError(`Username must contain between ${minUsernameLength} to ${maxUsernameLength} characters`, 400));
    }
    if (!usernameRegex.test(username)) {
        return next(new StatusError("Username can only contain letters, numbers, and underscores", 400));
    }
    if (!(password.length >= minPasswordLength && password.length <= maxPasswordLength)) {
        return next(new StatusError(`Password must contain between ${minPasswordLength} to ${maxPasswordLength} characters`, 400));
    }
    if (born > new Date().getFullYear()) {
        return next(new StatusError("Born year cannot be higher than current year"));
    }
    next();
};


module.exports = {
    verifyToken,
    verifySignup,
    verifySignin,
    validateCredentials
};
