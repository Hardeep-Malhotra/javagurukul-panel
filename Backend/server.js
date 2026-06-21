require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalRouter = require("./routes/index");
const connectDB = require("./config/db");

// Connect DataBase
connectDB();

const app = express();

// Middlewares
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

// ✅ Main Base Routes
app.use(globalRouter);

//Central Global Error Handling Middleware

app.use((err, req, res, next) => {
  // 1. if any  Joi Validation Error occur
  if (err.isJoi && err.details) {
    const errorMessages = err.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      errors: errorMessages,
    });
  }

  // 2. if Nodemailer/Database other any  Server Error occur (Status: 500)
  console.error("🚨 GLOBAL ERROR LOG:", err.message);
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
