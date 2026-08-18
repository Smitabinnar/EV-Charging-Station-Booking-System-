const express = require("express");

const router = express.Router();

const chargingStationController = require("../controllers/chargingStationController");

// Get all charging stations
router.get("/", chargingStationController.getChargingStations);

// Get charging station by ID
router.get("/:id", chargingStationController.getChargingStationById);

// Create charging station
router.post("/", chargingStationController.createChargingStation);

// Update charging station
router.put("/:id", chargingStationController.updateChargingStation);

// Delete charging station
router.delete("/:id", chargingStationController.deleteChargingStation);

module.exports = router;