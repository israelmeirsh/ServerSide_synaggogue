const express = require("express");
const { getAllAliot, getAliaById, updateAliaById, deleteAliaById, createAlia } = require("./AliaController");
const router = express.Router();

// נתיב לשליפת כל העליות
router.get("/", getAllAliot);

// נתיב לשליפת עליה לפי מזהה
router.get("/:id", getAliaById);

// נתיב לעדכון עליה לפי מזהה
router.put("/:id", updateAliaById);

// נתיב למחיקת עליה לפי מזהה
router.delete("/:id", deleteAliaById);

// נתיב ליצירת עליה חדשה
router.post("/", createAlia);

module.exports = router;
