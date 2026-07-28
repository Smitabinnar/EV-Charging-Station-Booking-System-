const bookingModel = require("../models/bookingModel");

// =======================
// Get all bookings
// =======================
const getBookings = (req, res) => {

    bookingModel.getAllBookings((err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(200).json(results);

    });

};

// =======================
// Get booking by ID
// =======================
const getBookingById = (req, res) => {

    const id = req.params.id;

    bookingModel.getBookingById(id, (err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(results[0]);

    });

};

// =======================
// Create booking
// =======================
const createBooking = (req, res) => {

    const bookingData = req.body;

    bookingModel.createBooking(bookingData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Booking created successfully",
            bookingId: result.insertId
        });

    });

};

// =======================
// Update booking
// =======================
const updateBooking = (req, res) => {

    const id = req.params.id;
    const bookingData = req.body;

    bookingModel.updateBooking(id, bookingData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking updated successfully"
        });

    });

};

// =======================
// Delete booking
// =======================
const deleteBooking = (req, res) => {

    const id = req.params.id;

    bookingModel.deleteBooking(id, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking deleted successfully"
        });

    });

};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};