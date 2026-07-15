require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const http = require("http");
const { Server } = require("socket.io");

const globalRouter = require("./routes/index");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const setupMeetingSocket = require("./socket/meetingSocket");

// ==============================
// Connect Database
// ==============================
connectDB();

const app = express();

// ==============================
// Create HTTP Server
// ==============================
const server = http.createServer(app);

// ==============================
// Socket.io Configuration
// ==============================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Initialize Socket
setupMeetingSocket(io);

// ==============================
// Middlewares
// ==============================
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

// ==============================
// Routes
// ==============================
app.use(globalRouter);

// ==============================
// Global Joi Error Handler
// ==============================
app.use((err, req, res, next) => {
  if (err.isJoi && err.details) {
    const errorMessages = err.details.map((detail) => detail.message);

    return res.status(400).json({
      success: false,
      errors: errorMessages,
    });
  }

  console.error("🚨 GLOBAL ERROR LOG:", err.message);

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.use(errorHandler);

// ==============================
// Server Listen
// ==============================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
