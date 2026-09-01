const db = require("../config/db");

// =======================
// Get all vehicles
// =======================
const getAllVehicles = (callback) => {

    const sql = "SELECT * FROM Vehicles";

    db.query(sql, callback);

};

// =======================
// Get vehicle by ID
// =======================
const getVehicleById = (id, callback) => {

    const sql = "SELECT * FROM Vehicles WHERE vehicle_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Create vehicle
// =======================
const createVehicle = (vehicleData, callback) => {

    const sql = `
        INSERT INTO Vehicles
        (user_id, vehicle_number, vehicle_name, brand, battery_capacity, vehicle_type)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            vehicleData.user_id,
            vehicleData.vehicle_number,
            vehicleData.vehicle_name,
            vehicleData.brand,
            vehicleData.battery_capacity,
            vehicleData.vehicle_type
        ],
        callback
    );

};

// =======================
// Update vehicle
// =======================
const updateVehicle = (id, vehicleData, callback) => {

    const sql = `
        UPDATE Vehicles
        SET
            user_id = ?,
            vehicle_number = ?,
            vehicle_name = ?,
            brand = ?,
            battery_capacity = ?,
            vehicle_type = ?
        WHERE vehicle_id = ?
    `;

    db.query(
        sql,
        [
            vehicleData.user_id,
            vehicleData.vehicle_number,
            vehicleData.vehicle_name,
            vehicleData.brand,
            vehicleData.battery_capacity,
            vehicleData.vehicle_type,
            id
        ],
        callback
    );

};

// =======================
// Delete vehicle
// =======================
const deleteVehicle = (id, callback) => {

    const sql = "DELETE FROM Vehicles WHERE vehicle_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Export all functions
// =======================
module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};