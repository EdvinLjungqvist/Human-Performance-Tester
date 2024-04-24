const connection = require("../configs/database");
const StatusError = require("../utils/StatusError");

const createVerbalMemoryStats = (req, res, next) => {
    const sql = "INSERT INTO stats_verbal_memory (profile_id, score) VALUES (?, ?)";
    const profileID = req.profileID;
    const { score } = req.body;

    connection.query(sql, [profileID, score], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        res.status(200).end();
    });
};

const getVerbalMemoryStats = (req, res, next) => {
    const profileID = req.profileID;
    const sql = "SELECT id, score, timestamp FROM stats_verbal_memory WHERE profile_id = ? ORDER BY score DESC LIMIT 10";

    connection.query(sql, [profileID], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        res.json(result);
    });
};

const getVerbalMemoryStatsGlobal = (req, res, next) => {
    const sql = "SELECT id, profile_id, score, timestamp FROM stats_verbal_memory ORDER BY score DESC LIMIT 10";

    connection.query(sql, [], (err, result) => {
        if (err) {
            console.log(err)
            return next(new StatusError("Internal Server Error", 500));
        }
        res.json(result);
    })
}

const getStatsCount = (req, res, next) => {
    const sql = "SELECT COUNT(id) AS count FROM stats_verbal_memory";

    connection.query(sql, [], (err, result) => {
        if (err) {
            return next(new StatusError("Internal Server Error", 500));
        }
        res.json(result[0].count);
    });
};

module.exports = {
    createVerbalMemoryStats,
    getVerbalMemoryStats,
    getVerbalMemoryStatsGlobal,
    getStatsCount
};
