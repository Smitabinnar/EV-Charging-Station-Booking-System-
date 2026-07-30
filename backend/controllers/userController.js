const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
// Create user (Register)
// =======================
const createUser = async (req, res) => {

    try {

        const userData = req.body;

        // Hash Password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Replace plain password with hashed password
        userData.password = hashedPassword;

        userModel.createUser(userData, (err, result) => {

            if (err) {
                console.log("Database Error:", err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "User registered successfully",
                userId: result.insertId
            });

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error while creating user"
        });

    }

};

// =======================
// Login User
// =======================
const loginUser = (req, res) => {

    const { email, password } = req.body;

    console.log("Email entered:", email);
    console.log("Password entered:", password);

    userModel.getUserByEmail(email, async (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        console.log("Database Result:", results);

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const user = results[0];

        console.log("Stored Hash:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user
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
    loginUser,
    updateUser,
    deleteUser
};