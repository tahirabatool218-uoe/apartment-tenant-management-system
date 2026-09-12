const express = require("express");

const {
  createApartment,
  getApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
} = require("../controllers/apartmentController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// View apartments - all authenticated users
router.get(
  "/",
  protect,
  authorizeRoles("user", "admin", "superadmin"),
  getApartments
);

router.get(
  "/:id",
  protect,
  authorizeRoles("user", "admin", "superadmin"),
  getApartmentById
);

// Manage apartments - Admin and Super Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin", "superadmin"),
  createApartment
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  updateApartment
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  deleteApartment
);

module.exports = router;