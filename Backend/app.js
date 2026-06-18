const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Main Base Routes
app.use("/api/auth", authRoutes);

//Error Handling Routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found!",
  });
});

module.exports = app;
