const db = require("../config/db");

// Get All Sessions
exports.getAllSessions = (callback) => {
    db.query("SELECT * FROM ChargingSessions", callback);
};

// Get Session By ID
exports.getSessionById = (id, callback) => {
    db.query(
        "SELECT * FROM ChargingSessions WHERE session_id = ?",
        [id],
        callback
    );
};

// Create Session
exports.createSession = (data, callback) => {

    const sql = `
        INSERT INTO ChargingSessions
        (
            booking_id,
            session_start,
            session_end,
            energy_consumed,
            total_cost,
            session_status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.booking_id,
        data.session_start,
        data.session_end,
        data.energy_consumed,
        data.total_cost,
        data.session_status
    ], callback);
};

// Update Session
exports.updateSession = (id, data, callback) => {

    const sql = `
        UPDATE ChargingSessions
        SET
            booking_id=?,
            session_start=?,
            session_end=?,
            energy_consumed=?,
            total_cost=?,
            session_status=?
        WHERE session_id=?
    `;

    db.query(sql, [
        data.booking_id,
        data.session_start,
        data.session_end,
        data.energy_consumed,
        data.total_cost,
        data.session_status,
        id
    ], callback);
};

// Delete Session
exports.deleteSession = (id, callback) => {
    db.query(
        "DELETE FROM ChargingSessions WHERE session_id=?",
        [id],
        callback
    );
};