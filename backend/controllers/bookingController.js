const bookingModel = require("../models/bookingModel");

// =======================
// Get All Bookings
// =======================
exports.getBookings = (req, res) => {

    bookingModel.getAllBookings((err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(200).json(result);
    });
};


// =======================
// Get Booking By ID
// =======================
exports.getBookingById = (req, res) => {

    bookingModel.getBookingById(req.params.id, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(result[0]);
    });
};


// =======================
// Create Booking
// =======================
exports.createBooking = (req, res) => {

    bookingModel.createBooking(req.body, (err, result) => {

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
// Update Booking
// =======================
exports.updateBooking = (req, res) => {

    bookingModel.updateBooking(
        req.params.id,
        req.body,
        (err, result) => {

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
        }
    );
};


// =======================
// Delete Booking
// =======================
exports.deleteBooking = (req, res) => {

    bookingModel.deleteBooking(req.params.id, (err, result) => {

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