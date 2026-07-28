const db = require("../config/db");

const getAllPayments = (callback) => {
    db.query("SELECT * FROM Payments", callback);
};

const createPayment = (payment, callback) => {
    const sql = `
        INSERT INTO Payments
        (
            booking_id,
            amount,
            payment_method,
            payment_status
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            payment.booking_id,
            payment.amount,
            payment.payment_method,
            payment.payment_status
        ],
        callback
    );
};

module.exports = {
    getAllPayments,
    createPayment
};