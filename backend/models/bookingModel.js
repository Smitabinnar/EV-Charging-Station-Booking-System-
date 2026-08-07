const db = require("../config/db");

// =======================
// Get all bookings with details
// =======================
const getAllBookings = (callback) => {

    const sql = `
        SELECT
            b.booking_id,

            u.user_id,
            u.full_name AS customer_name,
            u.email,

            v.vehicle_id,
            v.vehicle_number,
            v.vehicle_name,
            v.brand,

            cs.station_id,
            cs.station_name,
            cs.city,

            c.charger_id,
            c.charger_number,
            c.charger_type,
            c.connector_type,
            c.power_output,

            b.booking_date,
            b.start_time,
            b.end_time,
            b.booking_status,
            b.created_at

        FROM Bookings b

        JOIN Users u
            ON b.user_id = u.user_id

        JOIN Vehicles v
            ON b.vehicle_id = v.vehicle_id

        JOIN ChargingStations cs
            ON b.station_id = cs.station_id

        JOIN Chargers c
            ON b.charger_id = c.charger_id

        ORDER BY b.booking_id DESC
    `;

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
// Check Charger Availability
// =======================
const checkBookingConflict = (bookingData, callback) => {

    const sql = `
        SELECT *
        FROM Bookings
        WHERE charger_id = ?
        AND booking_date = ?
        AND booking_status != 'Cancelled'
        AND (
            start_time < ?
            AND end_time > ?
        )
    `;

    db.query(
        sql,
        [
            bookingData.charger_id,
            bookingData.booking_date,
            bookingData.end_time,
            bookingData.start_time
        ],
        callback
    );

};
// =======================
// Get My Bookings
// =======================
const getMyBookings = (userId, callback) => {

    const sql = `
        SELECT
            b.booking_id,

            u.full_name AS customer_name,

            v.vehicle_number,
            v.vehicle_name,

            cs.station_name,

            c.charger_number,

            b.booking_date,
            b.start_time,
            b.end_time,
            b.booking_status

        FROM Bookings b

        JOIN Users u
            ON b.user_id = u.user_id

        JOIN Vehicles v
            ON b.vehicle_id = v.vehicle_id

        JOIN ChargingStations cs
            ON b.station_id = cs.station_id

        JOIN Chargers c
            ON b.charger_id = c.charger_id

        WHERE b.user_id = ?

        ORDER BY b.booking_date DESC;
    `;

    db.query(sql, [userId], callback);

};

// =======================
// Export all functions
// =======================
module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    checkBookingConflict,
    getMyBookings
};