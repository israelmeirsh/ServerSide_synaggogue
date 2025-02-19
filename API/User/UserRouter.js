const express = require("express");
const { registerUser, loginUser, getAllUsers, getUserById, updateUserById } = require("./UserController");
const {verifyUser} = require('../middlewares/loginMiddlewares.js');
const router = express.Router();

// נתיב לרישום משתמש
router.post("/register", registerUser);

// // נתיב להתחברות
router.post("/login", loginUser);

// נתיב לשליפת כל המשתמשים (לבדיקה)
router.get("/", verifyUser,getAllUsers);

// // נתיב לשליפת משתמש לפי מזהה
// router.get("/:id", getUserById);

// // נתיב לעדכון משתמש לפי מזהה
// router.put("/:id", updateUserById);

module.exports = router;

