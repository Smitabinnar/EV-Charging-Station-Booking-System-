const db = require("../config/db");

// =======================
// Get all bookings
// =======================
const getAllBookings = (callback) => {

    const sql = "SELECT * FROM Bookings";

    db.query(sql, callback);

};

// =======================
// Get booking by ID
// =======================
const getBookingById = (id, callback) => {

    const sql = "SELECT * FROM Bookings WHERE booking_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Create booking
// =======================
const createBooking = (bookingData, callback) => {

    const sql = `
        INSERT INTO Bookings
        (
            user_id,
            vehicle_id,
            station_id,
            charger_id,
            booking_date,
            start_time,
            end_time,
            booking_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            bookingData.user_id,
            bookingData.vehicle_id,
            bookingData.station_id,
            bookingData.charger_id,
            bookingData.booking_date,
            bookingData.start_time,
            bookingData.end_time,
            bookingData.booking_status
        ],
        callback
    );

};

// =======================
// Update booking
// =======================
const updateBooking = (id, bookingData, callback) => {

    const sql = `
        UPDATE Bookings
        SET
            user_id = ?,
            vehicle_id = ?,
            station_id = ?,
            charger_id = ?,
            booking_date = ?,
            start_time = ?,
            end_time = ?,
            booking_status = ?
        WHERE booking_id = ?
    `;

    db.query(
        sql,
        [
            bookingData.user_id,
            bookingData.vehicle_id,
            bookingData.station_id,
            bookingData.charger_id,
            bookingData.booking_date,
            bookingData.start_time,
            bookingData.end_time,
            bookingData.booking_status,
            id
        ],
        callback
    );

};

// =======================
// Delete booking
// =======================
const deleteBooking = (id, callback) => {

    const sql = "DELETE FROM Bookings WHERE booking_id = ?";

    db.query(sql, [id], callback);

};

// =======================
// Export all functions
// =======================
module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};