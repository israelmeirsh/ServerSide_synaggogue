const Payment = require('./PaymentsModel');

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('userId', 'firstName lastName');
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, paymentMethod, totalPaid, cardDetails } = req.body;
        const updatedPayment = await Payment.findByIdAndUpdate(id, { userId, paymentMethod, totalPaid, cardDetails }, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.json({ message: "Payment updated successfully!", updatedPayment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayment = await Payment.findByIdAndRemove(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.json({ message: "Payment deleted successfully!", deletedPayment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

