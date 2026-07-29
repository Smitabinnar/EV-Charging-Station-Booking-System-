const chargingSessionModel = require("../models/chargingSessionModel");

// Get All Sessions
exports.getAllSessions = (req, res) => {

    chargingSessionModel.getAllSessions((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });

};

// Get Session By ID
exports.getSessionById = (req, res) => {

    chargingSessionModel.getSessionById(
        req.params.id,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

};

// Create Session
exports.createSession = (req, res) => {

    chargingSessionModel.createSession(
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Charging Session created successfully",
                sessionId: result.insertId
            });

        }
    );

};

// Update Session
exports.updateSession = (req, res) => {

    chargingSessionModel.updateSession(
        req.params.id,
        req.body,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Charging Session updated successfully"
            });

        }
    );

};

// Delete Session
exports.deleteSession = (req, res) => {

    chargingSessionModel.deleteSession(
        req.params.id,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Charging Session deleted successfully"
            });

        }
    );

};