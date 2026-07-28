const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

// =======================
// GET All Vehicles
// =======================
router.get("/", vehicleController.getVehicles);

// =======================
// GET Vehicle By ID
// =======================
router.get("/:id", vehicleController.getVehicleById);

// =======================
// CREATE Vehicle
// =======================
router.post("/", vehicleController.createVehicle);

// =======================
// UPDATE Vehicle
// =======================
router.put("/:id", vehicleController.updateVehicle);

// =======================
// DELETE Vehicle
// =======================
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;