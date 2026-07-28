const userModel = require("../models/userModel");

// =======================
// Get all users
// =======================
const getUsers = (req, res) => {

    userModel.getAllUsers((err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(200).json(results);

    });

};

// =======================
// Get user by ID
// =======================
const getUserById = (req, res) => {

    const id = req.params.id;

    userModel.getUserById(id, (err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(results[0]);

    });

};

// =======================
// Create user
// =======================
const createUser = (req, res) => {

    const userData = req.body;

    userModel.createUser(userData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });

    });

};

// =======================
// Update user
// =======================
const updateUser = (req, res) => {

    const id = req.params.id;
    const userData = req.body;

    userModel.updateUser(id, userData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully"
        });

    });

};

// =======================
// Delete user
// =======================
const deleteUser = (req, res) => {

    const id = req.params.id;

    userModel.deleteUser(id, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    });

};

// =======================
// Export Functions
// =======================
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};