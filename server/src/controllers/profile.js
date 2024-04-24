const { hash } = require("bcrypt");
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

const getProfileByID = (req, res, next) => {
    const { id } = req.params;
    const sql = "SELECT id, username, born, role, timestamp FROM profiles WHERE id = ?";

    connection.query(sql, [id], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        if (result.length === 0) {
            return next(new StatusError("Profile not found", 400));
        }
        res.json(result[0]);
    });
};

const updateProfile = (req, res, next) => {
    const { username, password, born } = req.body;
    const profileID = req.profileID;

    hash(password, 10)
        .then(hash => {
            const sql = "UPDATE profiles SET username = ?, password = ?, born = ? WHERE id = ?"

            connection.query(sql, [username, hash, born, profileID], (err, result) => {
                if (err) {
                    return next(new StatusError("Internal Server Error", 500));
                }
                res.status(200).end();
            });
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
    getProfileByID,
    updateProfile,
    getProfileCount,
    deleteProfile
};
