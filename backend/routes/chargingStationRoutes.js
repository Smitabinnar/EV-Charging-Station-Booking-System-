const express = require("express");

const router = express.Router();

console.log("Charging Station Router Loaded");

router.get("/", (req, res) => {
    res.json({
        message: "Charging Station Route Working"
    });
});

module.exports = router;