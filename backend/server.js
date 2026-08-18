const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ===============================
// Database Connection
// ===============================
const db = require("./config/db");

// ===============================
// Import Routes
// ===============================
const userRoutes = require("./routes/userRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const chargingStationRoutes = require("./routes/chargingStationRoutes");
const chargerRoutes = require("./routes/chargerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const chargingSessionRoutes = require("./routes/chargingSessionRoutes");

// ===============================
// Create Express App
// ===============================
const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
    res.send("EV Charging Station Booking Backend is Running 🚗⚡");
});

// ===============================
// API Routes
// ===============================
app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/charging-stations", chargingStationRoutes);
app.use("/chargers", chargerRoutes);
app.use("/bookings", bookingRoutes);
app.use("/payments", paymentRoutes);
app.use("/charging-sessions", chargingSessionRoutes);

// ===============================
// Handle Invalid Routes
// ===============================
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});