const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS configuration for credentials enable

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//Main Base Routes
app.use("/api/auth", authRoutes);

//Error Handling Routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found!",
  });
});

module.exports = app;
