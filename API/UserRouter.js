const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("./UserController");

const router = express.Router();

// נתיב לרישום משתמש
router.post("/register", registerUser);

// נתיב להתחברות
router.post("/login", loginUser);

// נתיב לשליפת כל המשתמשים (לבדיקה)
router.get("/", getAllUsers);

module.exports = router;
