const db = require("../config/db");

// =======================
// Get All Charging Sessions
// =======================
const getAllChargingSessions = (callback) => {

    const sql = `
        SELECT *
        FROM ChargingSessions
    `;

    db.query(sql, callback);
};


// =======================
// Get Charging Session By ID
// =======================
const getChargingSessionById = (id, callback) => {

    const sql = `
        SELECT *
        FROM ChargingSessions
        WHERE session_id = ?
    `;

    db.query(sql, [id], callback);
};


// =======================
// Create Charging Session
// =======================
const createChargingSession = (session, callback) => {

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

    db.query(
        sql,
        [
            session.booking_id,
            session.session_start,
            session.session_end,
            session.energy_consumed,
            session.total_cost,
            session.session_status
        ],
        callback
    );
};


// =======================
// Update Charging Session
// =======================
const updateChargingSession = (id, session, callback) => {

    const sql = `
        UPDATE ChargingSessions
        SET
            booking_id = ?,
            session_start = ?,
            session_end = ?,
            energy_consumed = ?,
            total_cost = ?,
            session_status = ?
        WHERE session_id = ?
    `;

    db.query(
        sql,
        [
            session.booking_id,
            session.session_start,
            session.session_end,
            session.energy_consumed,
            session.total_cost,
            session.session_status,
            id
        ],
        callback
    );
};


// =======================
// Delete Charging Session
// =======================
const deleteChargingSession = (id, callback) => {

    const sql = `
        DELETE FROM ChargingSessions
        WHERE session_id = ?
    `;

    db.query(sql, [id], callback);
};


// =======================
// Export Functions
// =======================
module.exports = {
    getAllChargingSessions,
    getChargingSessionById,
    createChargingSession,
    updateChargingSession,
    deleteChargingSession
};