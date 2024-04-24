const connection = require("../configs/database");
const StatusError = require("../utils/StatusError");

const verifyUpdate = (req, res, next) => {
    const { username } = req.body;
    const sql = "SELECT id FROM profiles WHERE username = ?";

    connection.query(sql, [username], (error, result) => {
        if (error) {
            return next(StatusError("Internal Server Error", 500));
        }
        if (result.length > 0 && result[0].id !== req.profileID) {
            return next(new StatusError("Username is already taken", 400));
        }
        next();
    });
};


module.exports = {
    verifyUpdate
};
