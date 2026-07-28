const chargerModel = require("../models/chargerModel");

// Get All Chargers
exports.getChargers = (req, res) => {
    chargerModel.getAllChargers((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// Get Charger by ID
exports.getChargerById = (req, res) => {
    chargerModel.getChargerById(req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);

        if(result.length==0){
            return res.status(404).json({
                message:"Charger not found"
            });
        }

        res.json(result[0]);
    });
};

// Create Charger
exports.createCharger = (req, res) => {
    chargerModel.createCharger(req.body, (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
            message:"Charger Added Successfully",
            chargerId:result.insertId
        });
    });
};

// Update Charger
exports.updateCharger = (req, res) => {
    chargerModel.updateCharger(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);

        if(result.affectedRows==0){
            return res.status(404).json({
                message:"Charger not found"
            });
        }

        res.json({
            message:"Charger Updated Successfully"
        });
    });
};

// Delete Charger
exports.deleteCharger = (req, res) => {
    chargerModel.deleteCharger(req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);

        if(result.affectedRows==0){
            return res.status(404).json({
                message:"Charger not found"
            });
        }

        res.json({
            message:"Charger Deleted Successfully"
        });
    });
};