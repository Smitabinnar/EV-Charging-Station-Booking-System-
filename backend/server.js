const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Home Route
// ==========================
app.get("/", (req, res) => {
    res.send("🚗 EV Charging Station Booking Backend is Running ⚡");
});

// ==========================
// Get All Users
// ==========================
app.get("/users", (req, res) => {

    const sql = "SELECT * FROM Users";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json(result);

    });

});

// ==========================
// Register New User
// ==========================
app.post("/users", (req, res) => {

    const { full_name, email, phone, password } = req.body;

    const sql = `
        INSERT INTO Users (full_name, email, phone, password)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [full_name, email, phone, password], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to register user",
                error: err
            });
        }

        res.status(201).json({
            message: "User registered successfully!",
            user_id: result.insertId
        });

    });

});

// ==========================
// Get All Vehicles
// ==========================
app.get("/vehicles", (req, res) => {

    const sql = "SELECT * FROM Vehicles";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json(result);

    });

});

// ==========================
// Get All Charging Stations
// ==========================
app.get("/stations", (req, res) => {

    const sql = "SELECT * FROM ChargingStations";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json(result);

    });

});

// ==========================
// Get All Chargers
// ==========================
app.get("/chargers", (req, res) => {

    const sql = "SELECT * FROM Chargers";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json(result);

    });

});

// ==========================
// Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});