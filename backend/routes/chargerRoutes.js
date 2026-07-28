const express = require("express");
const router = express.Router();

const chargerController = require("../controllers/chargerController");

router.get("/", chargerController.getChargers);
router.get("/:id", chargerController.getChargerById);
router.post("/", chargerController.createCharger);
router.put("/:id", chargerController.updateCharger);
router.delete("/:id", chargerController.deleteCharger);

module.exports = router;