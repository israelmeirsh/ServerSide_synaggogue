const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        unique: [true, "מספר טלפון כבר רשום במערכת"],
        trim: true,
        match: [/^\d{10}$/, "מספר טלפון חייב להכיל 10 ספרות"]
    },
    birthday: {
        type: Date,
        required: true
    },
    Permission:{
        type: String,
        enum: ['user', 'gabay','manager','admin'],
        required: true
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
    debt: {
        type: Number,
        default: 0
    },
    donation: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    totalPaid: {
        type: Number,
        default: 0,
        comment: "כמה שילם עד עכשיו"
    }
});

// הצפנת סיסמה לפני שמירה
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// פונקציה להשוואת סיסמאות (לבדיקת התחברות)
userSchema.methods.comparePassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (err) {
        throw new Error("השוואת הסיסמה נכשלה");
    }
};

// פונקציה שמחזירה סיסמה רק למנהלים (לפי דרישה)
userSchema.methods.getPasswordForAdmin = function(isAdmin) {
    return isAdmin ? this.password : "גישה חסומה";
};

module.exports = mongoose.model('User', userSchema);
