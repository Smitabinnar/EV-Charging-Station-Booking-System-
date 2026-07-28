const chargingStationModel = require("../models/chargingStationModel");

// =======================
// Get all charging stations
// =======================
const getChargingStations = (req, res) => {

    chargingStationModel.getAllChargingStations((err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(200).json(results);

    });

};

// =======================
// Get charging station by ID
// =======================
const getChargingStationById = (req, res) => {

    const id = req.params.id;

    chargingStationModel.getChargingStationById(id, (err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Charging Station not found"
            });
        }

        res.status(200).json(results[0]);

    });

};

// =======================
// Create charging station
// =======================
const createChargingStation = (req, res) => {

    const stationData = req.body;

    chargingStationModel.createChargingStation(stationData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Charging Station created successfully",
            stationId: result.insertId
        });

    });

};

// =======================
// Update charging station
// =======================
const updateChargingStation = (req, res) => {

    const id = req.params.id;
    const stationData = req.body;

    chargingStationModel.updateChargingStation(id, stationData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Charging Station not found"
            });
        }

        res.status(200).json({
            message: "Charging Station updated successfully"
        });

    });

};

// =======================
// Delete charging station
// =======================
const deleteChargingStation = (req, res) => {

    const id = req.params.id;

    chargingStationModel.deleteChargingStation(id, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Charging Station not found"
            });
        }

        res.status(200).json({
            message: "Charging Station deleted successfully"
        });

    });

};

module.exports = {
    getChargingStations,
    getChargingStationById,
    createChargingStation,
    updateChargingStation,
    deleteChargingStation
};