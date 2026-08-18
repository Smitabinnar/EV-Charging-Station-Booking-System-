const db = require("../config/db");

// =======================
// Get All Bookings
// =======================
exports.getAllBookings = (callback) => {

    const sql = `
        SELECT *
        FROM Bookings
        ORDER BY booking_id DESC
    `;

    db.query(sql, callback);
};


// =======================
// Get Booking By ID
// =======================
exports.getBookingById = (id, callback) => {

    const sql = `
        SELECT *
        FROM Bookings
        WHERE booking_id = ?
    `;

    db.query(sql, [id], callback);
};


// =======================
// Create Booking
// =======================
exports.createBooking = (booking, callback) => {

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
            booking.user_id,
            booking.vehicle_id,
            booking.station_id,
            booking.charger_id,
            booking.booking_date,
            booking.start_time,
            booking.end_time,
            booking.booking_status || "Pending"
        ],
        callback
    );
};


// =======================
// Update Booking
// =======================
exports.updateBooking = (id, booking, callback) => {

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
            booking.user_id,
            booking.vehicle_id,
            booking.station_id,
            booking.charger_id,
            booking.booking_date,
            booking.start_time,
            booking.end_time,
            booking.booking_status,
            id
        ],
        callback
    );
};


// =======================
// Delete Booking
// =======================
exports.deleteBooking = (id, callback) => {

    const sql = `
        DELETE FROM Bookings
        WHERE booking_id = ?
    `;

    db.query(sql, [id], callback);
};