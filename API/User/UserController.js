const User = require("./UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
// רישום משתמש חדש
exports.registerUser = async (req, res) => {
    try {
        const { firstName, fatherName, lastName, birthday, phone, password } = req.body;

        // יצירת משתמש חדש ושמירתו במסד הנתונים
        const newUser = new User({ firstName, fatherName, lastName, phone, birthday, password, Permission: 'user' });
        const savedUser = await newUser.save();

        res.status(201).json({ message: "משתמש נרשם בהצלחה!", user: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // התחברות משתמש
exports.loginUser = async (req, res) => {
    const { phone, password } = req.body;

    try {
       
        // בדיקה אם המשתמש קיים
        const user = await User.findOne({ phone });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Invalid phone or password " });
        }
        // יצירת טוקן (JWT)
        const token = jwt.sign({ userId: user._id, Permission: user.Permission },"mySecretKey", { expiresIn:"1h" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // עדכון משתמש
// exports.updateUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { firstName, fatherName, lastName, birthday, phone, password } = req.body;

//         // בדיקה אם המשתמש קיים
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(400).json({ message: "משתמש לא נמצא" });
//         }

//         // עדכון המשתמש במסד הנתונים
//         user.firstName = firstName;
//         user.fatherName = fatherName;
//         user.lastName = lastName;
//         user.phone = phone;
//         user.birthday = birthday;
//         user.password = password;
//         await user.save();

//         res.json({ message: "משתמש עודכן בהצלחה!", user });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(400).json({ message: "משתמש לא נמצא" });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// שליפת כל המשתמשים (לבדיקה)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

