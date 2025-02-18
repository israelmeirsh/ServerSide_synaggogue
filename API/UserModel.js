const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// סכמה של משתמש במערכת
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    fatherName: {  
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {  
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{10}$/, "מספר טלפון חייב להכיל 10 ספרות"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// הצפנת סיסמה לפני שמירה
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10); 
    next();
});

// פונקציה להשוואת סיסמאות (לבדיקת התחברות)
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// פונקציה שמחזירה סיסמה רק למנהלים (לפי דרישה)
userSchema.methods.getPasswordForAdmin = function (isAdmin) {
    return isAdmin ? this.password : "גישה חסומה";
};

module.exports = mongoose.model('User', userSchema);
