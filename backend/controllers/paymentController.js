const paymentModel = require("../models/paymentModel");

// GET all payments
const getAllPayments = (req, res) => {
    paymentModel.getAllPayments((err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
};

// POST new payment
const createPayment = (req, res) => {
    paymentModel.createPayment(req.body, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Payment created successfully",
            paymentId: result.insertId
        });
    });
};

module.exports = {
    getAllPayments,
    createPayment
};