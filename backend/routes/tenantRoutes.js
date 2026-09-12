const express = require("express");

const {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
} = require("../controllers/tenantController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Tenant management - Admin and Super Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin", "superadmin"),
  createTenant
);

router.get(
  "/",
  protect,
  authorizeRoles("admin", "superadmin"),
  getTenants
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  getTenantById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  updateTenant
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "superadmin"),
  deleteTenant
);

module.exports = router;