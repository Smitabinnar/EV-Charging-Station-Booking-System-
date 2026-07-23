const db = require("../config/db");

const getAllUsers = (callback) => {
    const sql = "SELECT * FROM Users";
    db.query(sql, callback);
};

module.exports = {
    getAllUsers
};