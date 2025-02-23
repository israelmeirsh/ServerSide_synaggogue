const mongoose = require('mongoose');


const AliaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Parasha:{
        type:String,
        required:true,
    },
    alia:{
        type:String,
        required: true
    },
    debt: {
        type: Number,
        default: 0
    },   
    invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Payments'
        },
    
})

mongoose.model = mongoose.model('alia',AliaSchema);