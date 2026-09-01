const express = require("express");

const router = express.Router();

const chargingSessionController = require("../controllers/chargingSessionController");

// GET all charging sessions
router.get("/", chargingSessionController.getChargingSessions);

// GET charging session by ID
router.get("/:id", chargingSessionController.getChargingSessionById);

// POST create charging session
router.post("/", chargingSessionController.createChargingSession);

// PUT update charging session
router.put("/:id", chargingSessionController.updateChargingSession);

// DELETE charging session
router.delete("/:id", chargingSessionController.deleteChargingSession);

module.exports = router;