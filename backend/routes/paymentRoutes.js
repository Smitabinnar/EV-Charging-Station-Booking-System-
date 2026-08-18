const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

// GET all payments
router.get("/", paymentController.getPayments);

// POST create payment
router.post("/", paymentController.createPayment);

module.exports = router;