const paymentModel = require("../models/paymentModel");

// =======================
// Get All Payments
// =======================
exports.getPayments = (req, res) => {

    paymentModel.getAllPayments((err, results) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(200).json(results);

    });

};

// =======================
// Create Payment
// =======================
exports.createPayment = (req, res) => {

    const paymentData = req.body;

    paymentModel.createPayment(paymentData, (err, result) => {

        if (err) {
            console.log("Database Error:", err);
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Payment created successfully",
            paymentId: result.insertId
        });

    });

};