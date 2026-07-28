const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("HOME");
});

app.get("/charging-stations", (req, res) => {
    res.send("Charging Stations OK");
});

app.listen(5000, () => {
    console.log("Server running on 5000");
});