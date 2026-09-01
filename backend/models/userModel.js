const db = require("../config/db");

// =======================
// Get all users
// =======================
const getAllUsers = (callback) => {

    const sql = "SELECT * FROM Users";

    db.query(sql, callback);

};

// =======================
// Get user by ID
// =======================
const getUserById = (id, callback) => {

    const sql = "SELECT * FROM Users WHERE user_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Get user by Email
// =======================
const getUserByEmail = (email, callback) => {

    const sql = "SELECT * FROM Users WHERE email = ?";

    db.query(sql, [email], callback);

};

// =======================
// Create new user
// =======================
const createUser = (userData, callback) => {

    const sql = `
        INSERT INTO Users
        (full_name, email, phone, password)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userData.full_name,
            userData.email,
            userData.phone,
            userData.password
        ],
        callback
    );

};

// =======================
// Update user
// =======================
const updateUser = (id, userData, callback) => {

    const sql = `
        UPDATE Users
        SET
            full_name = ?,
            email = ?,
            phone = ?,
            password = ?
        WHERE user_id = ?
    `;

    db.query(
        sql,
        [
            userData.full_name,
            userData.email,
            userData.phone,
            userData.password,
            id
        ],
        callback
    );

};

// =======================
// Delete user
// =======================
const deleteUser = (id, callback) => {

    const sql = "DELETE FROM Users WHERE user_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Export all functions
// =======================
module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};