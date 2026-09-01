const db = require("../config/db");

// Get All Chargers
exports.getAllChargers = (callback) => {
    db.query("SELECT * FROM Chargers", callback);
};

// Get Charger By ID
exports.getChargerById = (id, callback) => {
    db.query(
        "SELECT * FROM Chargers WHERE charger_id=?",
        [id],
        callback
    );
};


// Create Charger
exports.createCharger = (charger, callback) => {

    const sql = `
    INSERT INTO Chargers
    (
        station_id,
        charger_number,
        charger_type,
        connector_type,
        power_output,
        status
    )
    VALUES(?,?,?,?,?,?)
    `;

    db.query(sql,[
        charger.station_id,
        charger.charger_number,
        charger.charger_type,
        charger.connector_type,
        charger.power_output,
        charger.status
    ],callback);
};

// Update Charger
exports.updateCharger = (id, charger, callback) => {

    const sql = `
    UPDATE Chargers
    SET
        station_id=?,
        charger_number=?,
        charger_type=?,
        connector_type=?,
        power_output=?,
        status=?
    WHERE charger_id=?
    `;

    db.query(sql,[
        charger.station_id,
        charger.charger_number,
        charger.charger_type,
        charger.connector_type,
        charger.power_output,
        charger.status,
        id
    ],callback);
};

// Delete Charger
exports.deleteCharger = (id, callback) => {

    db.query(
        "DELETE FROM Chargers WHERE charger_id=?",
        [id],
        callback
    );
};

// Update Charger Status
exports.updateChargerStatus = (chargerId, status, callback) => {

    const sql = `
        UPDATE Chargers
        SET status = ?
        WHERE charger_id = ?
    `;

    db.query(sql, [status, chargerId], callback);

};