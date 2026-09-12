const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const apartmentRoutes = require("./routes/apartmentRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// =========================================================
// Connect to MongoDB
// =========================================================

connectDB();

// =========================================================
// Middleware
// =========================================================

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// =========================================================
// Test Route
// =========================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Apartment Management System API is running",
  });
});

// =========================================================
// API Routes
// =========================================================

app.use("/api/auth", authRoutes);

app.use("/api/apartments", apartmentRoutes);

app.use("/api/tenants", tenantRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admins", adminRoutes);

// =========================================================
// Error Handler
// =========================================================

app.use(errorHandler);

// =========================================================
// Start Server
// =========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});