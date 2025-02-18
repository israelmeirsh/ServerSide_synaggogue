const express = require("express");
const { registerUser, loginUser, getAllUsers, getUserById, updateUserById } = require("./UserController");

const router = express.Router();

// נתיב לרישום משתמש
router.post("/register", registerUser);

// // נתיב להתחברות
router.post("/login", loginUser);

// נתיב לשליפת כל המשתמשים (לבדיקה)
router.get("/", getAllUsers);

// // נתיב לשליפת משתמש לפי מזהה
// router.get("/:id", getUserById);

// // נתיב לעדכון משתמש לפי מזהה
// router.put("/:id", updateUserById);

module.exports = router;

