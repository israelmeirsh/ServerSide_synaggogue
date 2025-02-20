const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    donationDate: {
        type: Date,
        default: Date.now
    },
    cardDetails: {
        type: {
            cardNumber: {
                type: String,
                required: function () {
                    return this.paymentMethod === 'card'
                }
            },
            cardExpiration: {
                type: Date,
                required: function () {
                    return this.paymentMethod === 'card'
                }
            },
            cvv: {
                type: String,
                required: function () {
                    return this.paymentMethod === 'card'
                }
            },
        },
        required: function () {
            return this.paymentMethod == 'card';
        }
    }
});

module.exports = mongoose.model('Donation', donationSchema);
