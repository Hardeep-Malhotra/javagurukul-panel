require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const globalRouter = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

// ==============================
// Connect Database
// ==============================
connectDB();

const app = express();

// ==============================
// Middlewares
// ==============================
app.use(express.json());
app.use(cookieParser());

// ==============================
// CORS Configuration
// ==============================
const allowedOrigins = [
  "http://localhost:5173", // Local Development
  "https://javagurukul-panel-sigma.vercel.app", // Production Frontend
];

app.use(
  cors({
    origin(origin, callback) {
      // Postman ya server-to-server request
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==============================
// Routes
// ==============================
app.use(globalRouter);

// ==============================
// Joi Validation Error Handler
// ==============================
app.use((err, req, res, next) => {
  if (err.isJoi && err.details) {
    return res.status(400).json({
      success: false,
      errors: err.details.map((detail) => detail.message),
    });
  }

  next(err);
});

// ==============================
// Global Error Handler
// ==============================
app.use(errorHandler);

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});