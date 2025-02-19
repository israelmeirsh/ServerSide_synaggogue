
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./API/User/UserRouter.js");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // מאפשר לעבוד עם JSON בבקשות

// חיבור למסד הנתונים
mongoose.connect("mongodb://127.0.0.1:27017/myDB", {
})
.then(() => console.log("✅ מחובר ל-MongoDB"))
.catch(err => console.error("❌ שגיאה בחיבור:", err));

// שימוש בנתיבים
app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 השרת פועל על פורט ${PORT}`));
