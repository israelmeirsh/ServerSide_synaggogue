const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    Comment: {
        type: String,
        required: false
    },
    donationDate: {
        type: Date,
        default: Date.now
    },
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Payments'
    },

});

module.exports = mongoose.model('Donation', donationSchema);
