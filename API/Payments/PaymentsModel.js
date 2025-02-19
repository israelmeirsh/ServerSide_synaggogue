const mongoose = require('mongoose');


const PaymentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['card', 'cash']
    },
    paymentItem: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'alia'
        }],
        required: true,
    },
    donation: Number,
    totalPaid: {
        type: Number,
        required: true,
        default: 0,
        comment: "כמה שילם עד עכשיו"
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
            }
        },
        required: function () {
            return this.paymentMethod == 'card';
        }
    }
})

mongoose.model = mongoose.model('Payments', PaymentsSchema)