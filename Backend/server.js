require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import pehle se hai, sahi hai
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

// Connect DataBase
connectDB();

const app = express();

// ✅ FIXED: Middlewares ke andar CORS daalna compulsory hai taaki frontend hit kar sake
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Main Base Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
