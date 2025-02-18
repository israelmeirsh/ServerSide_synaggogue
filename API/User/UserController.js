const User = require("./UserModel");
const jwt = require("jsonwebtoken");

// רישום משתמש חדש
exports.registerUser = async (req, res) => {
    try {
        const { firstName, fatherName, lastName,birthday ,phone, password } = req.body;

        // בדיקה אם המשתמש כבר קיים לפי מספר טלפון
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: "מספר הטלפון כבר רשום במערכת" });
        }

        // יצירת משתמש חדש ושמירתו במסד הנתונים
        const newUser = new User({ firstName, fatherName, lastName, phone, birthday,password });
        const savedUser = await newUser.save();

        res.status(201).json({ message: "משתמש נרשם בהצלחה!", user: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// התחברות משתמש
exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // בדיקה אם המשתמש קיים
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: "משתמש לא נמצא" });
        }

        // בדיקת סיסמה
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "סיסמה שגויה" });
        }

        // יצירת טוקן (JWT)
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "mySecretKey", { expiresIn: "7d" });

        res.json({ message: "התחברות מוצלחת!", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// עדכון משתמש
exports.updeateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, fatherName, lastName, birthday,phone, password } = req.body;

        // בדיקה אם המשתמש קיים
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "משתמש לא נמצא" });
        }

        // עדכון המשתמש במסד הנתונים
        user.firstName = firstName;
        user.fatherName = fatherName;
        user.lastName = lastName;
        user.phone = phone;
        user.birthday = birthday;
        user.password = password;
        await user.save();

        res.json({ message: "משתמש עודכן בהצלחה!", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
} 
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "משתמש לא נמצא" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// שליפת כל המשתמשים (לבדיקה)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
