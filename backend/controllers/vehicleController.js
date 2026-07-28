const vehicleModel = require("../models/vehicleModel");

console.log(vehicleModel);

// =======================
// Get all vehicles
// =======================
const getVehicles = (req, res) => {

    vehicleModel.getAllVehicles((err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(200).json(results);

    });

};

// =======================
// Get vehicle by ID
// =======================
const getVehicleById = (req, res) => {

    const id = req.params.id;

    vehicleModel.getVehicleById(id, (err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json(results[0]);

    });

};

// =======================
// Create vehicle
// =======================
const createVehicle = (req, res) => {

    const vehicleData = req.body;

    vehicleModel.createVehicle(vehicleData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Vehicle created successfully",
            vehicleId: result.insertId
        });

    });

};

// =======================
// Update vehicle
// =======================
const updateVehicle = (req, res) => {

    const id = req.params.id;
    const vehicleData = req.body;

    vehicleModel.updateVehicle(id, vehicleData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle updated successfully"
        });

    });

};

// =======================
// Delete vehicle
// =======================
const deleteVehicle = (req, res) => {

    const id = req.params.id;

    vehicleModel.deleteVehicle(id, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle deleted successfully"
        });

    });

};

module.exports = {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};