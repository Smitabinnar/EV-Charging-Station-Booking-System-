const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

// GET all vehicles
router.get("/", vehicleController.getAllVehicles);

// GET vehicle by ID
router.get("/:id", vehicleController.getVehicleById);

// POST create vehicle
router.post("/", vehicleController.createVehicle);

// PUT update vehicle
router.put("/:id", vehicleController.updateVehicle);

// DELETE vehicle
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;