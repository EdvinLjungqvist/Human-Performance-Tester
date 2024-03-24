const connection = require("../configs/database");
const StatusError = require("../utils/StatusError");

const getProfile = (req, res, next) => {
    const profileID = req.profileID;
    const sql = "SELECT id, username, born, role, timestamp FROM profiles WHERE id = ?";

    connection.query(sql, [profileID], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        if (result.length === 0) {
            return next(new StatusError("Profile not found", 400));
        }
        res.json(result[0]);
    });
};

const getProfileCount = (req, res) => {
    const sql = "SELECT COUNT(id) as count FROM profiles";

    connection.query(sql, [], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        res.json(result[0].count);
    });
};

const deleteProfile = (req, res, next) => {
    const profileID = req.profileID;
    const sql = "DELETE FROM profiles WHERE id = ?";

    connection.query(sql, [profileID], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        res.status(204).end();
    });
};

module.exports = {
    getProfile,
    getProfileCount,
    deleteProfile
};
