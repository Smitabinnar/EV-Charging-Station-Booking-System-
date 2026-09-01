const db = require("../config/db");

// =======================
// Get all charging stations
// =======================
const getAllChargingStations = (callback) => {

    const sql = "SELECT * FROM ChargingStations";

    db.query(sql, callback);

};

// =======================
// Get charging station by ID
// =======================
const getChargingStationById = (id, callback) => {

    const sql = "SELECT * FROM ChargingStations WHERE station_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Create charging station
// =======================
const createChargingStation = (stationData, callback) => {

    const sql = `
        INSERT INTO ChargingStations
        (
            station_name,
            address,
            city,
            state,
            pincode,
            latitude,
            longitude,
            contact_number,
            opening_time,
            closing_time,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            stationData.station_name,
            stationData.address,
            stationData.city,
            stationData.state,
            stationData.pincode,
            stationData.latitude,
            stationData.longitude,
            stationData.contact_number,
            stationData.opening_time,
            stationData.closing_time,
            stationData.status
        ],
        callback
    );

};

// =======================
// Update charging station
// =======================
const updateChargingStation = (id, stationData, callback) => {

    const sql = `
        UPDATE ChargingStations
        SET
            station_name = ?,
            address = ?,
            city = ?,
            state = ?,
            pincode = ?,
            latitude = ?,
            longitude = ?,
            contact_number = ?,
            opening_time = ?,
            closing_time = ?,
            status = ?
        WHERE station_id = ?
    `;

    db.query(
        sql,
        [
            stationData.station_name,
            stationData.address,
            stationData.city,
            stationData.state,
            stationData.pincode,
            stationData.latitude,
            stationData.longitude,
            stationData.contact_number,
            stationData.opening_time,
            stationData.closing_time,
            stationData.status,
            id
        ],
        callback
    );

};

// =======================
// Delete charging station
// =======================
const deleteChargingStation = (id, callback) => {

    const sql = "DELETE FROM ChargingStations WHERE station_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Export all functions
// =======================
module.exports = {
    getAllChargingStations,
    getChargingStationById,
    createChargingStation,
    updateChargingStation,
    deleteChargingStation
};