const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const apartmentRoutes = require("./routes/apartmentRoutes");

const tenantRoutes = require("./routes/tenantRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB

connectDB();

// Middleware

app.use(cors());

app.use(express.json());

// Test route

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Apartment Management System API is running",
  });
});

// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/apartments", apartmentRoutes);

app.use("/api/tenants", tenantRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admins", adminRoutes);

// Error handler

app.use(errorHandler);

// Port

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});