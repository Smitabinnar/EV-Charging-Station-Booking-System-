const express = require("express");

const router = express.Router();

const bookingController = require("../controllers/bookingController");

// =======================
// GET All Bookings
// =======================
router.get("/", bookingController.getBookings);

// =======================
// GET Booking By ID
// =======================
router.get("/:id", bookingController.getBookingById);

// =======================
// CREATE Booking
// =======================
router.post("/", bookingController.createBooking);

// =======================
// UPDATE Booking
// =======================
router.put("/:id", bookingController.updateBooking);

// =======================
// DELETE Booking
// =======================
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;