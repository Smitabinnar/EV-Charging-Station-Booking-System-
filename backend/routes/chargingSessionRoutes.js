const express = require("express");
const router = express.Router();

const chargingSessionController = require("../controllers/chargingSessionController");

// GET All Sessions
router.get("/", chargingSessionController.getAllSessions);

// GET Session By ID
router.get("/:id", chargingSessionController.getSessionById);

// POST Create Session
router.post("/", chargingSessionController.createSession);

// PUT Update Session
router.put("/:id", chargingSessionController.updateSession);

// DELETE Session
router.delete("/:id", chargingSessionController.deleteSession);

module.exports = router;