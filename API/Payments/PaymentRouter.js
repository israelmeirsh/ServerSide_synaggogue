const express = require("express");
const { createPayment, getPayments, updatePaymentById, deletePaymentById } = require("./PaymentController");
const router = express.Router();

// Route to create a new payment
router.post("/", createPayment);

// Route to get all payments
router.get("/", getPayments);

// Route to update a payment by ID
router.put("/:id", updatePaymentById);

// Route to delete a payment by ID
router.delete("/:id", deletePaymentById);

module.exports = router;
