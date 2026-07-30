const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const verifyToken = require("../middleware/verifyToken");

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
router.post("/", verifyToken, bookingController.createBooking);

// =======================
// UPDATE Booking
// =======================
router.put("/:id", verifyToken, bookingController.updateBooking);

// =======================
// DELETE Booking
// =======================
router.delete("/:id", verifyToken, bookingController.deleteBooking);

module.exports = router;