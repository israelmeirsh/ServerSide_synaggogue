const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildSchema = new Schema({
    nameOfbeit: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    nameOfRabai:{
        type:String,
        required:true,
    },
    phoneOfBeit:{
        type:String,
        required:true
    },
});

