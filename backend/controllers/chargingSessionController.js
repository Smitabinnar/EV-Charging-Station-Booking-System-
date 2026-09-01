const chargingSessionModel = require("../models/chargingSessionModel");

// =======================
// Get All Charging Sessions
// =======================
exports.getChargingSessions = (req, res) => {

    chargingSessionModel.getAllChargingSessions((err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};


// =======================
// Get Charging Session By ID
// =======================
exports.getChargingSessionById = (req, res) => {

    const id = req.params.id;

    chargingSessionModel.getChargingSessionById(id, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Charging Session not found"
            });
        }

        res.status(200).json(result[0]);

    });

};


// =======================
// Create Charging Session
// =======================
exports.createChargingSession = (req, res) => {

    const sessionData = req.body;

    chargingSessionModel.createChargingSession(
        sessionData,
        (err, result) => {

            if (err) {
                console.log("Database Error:", err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Charging Session created successfully",
                sessionId: result.insertId
            });

        }
    );

};


// =======================
// Update Charging Session
// =======================
exports.updateChargingSession = (req, res) => {

    const id = req.params.id;
    const sessionData = req.body;

    chargingSessionModel.updateChargingSession(
        id,
        sessionData,
        (err, result) => {

            if (err) {
                console.log("Database Error:", err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Charging Session not found"
                });
            }

            res.status(200).json({
                message: "Charging Session updated successfully"
            });

        }
    );

};


// =======================
// Delete Charging Session
// =======================
exports.deleteChargingSession = (req, res) => {

    const id = req.params.id;

    chargingSessionModel.deleteChargingSession(
        id,
        (err, result) => {

            if (err) {
                console.log("Database Error:", err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Charging Session not found"
                });
            }

            res.status(200).json({
                message: "Charging Session deleted successfully"
            });

        }
    );

};