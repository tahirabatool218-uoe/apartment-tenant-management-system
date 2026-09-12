const express = require("express");

const {
  createAdmin,
  getAdmins,
  deleteAdmin,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Super Admin only
router.post(
  "/",
  protect,
  authorizeRoles("superadmin"),
  createAdmin
);

router.get(
  "/",
  protect,
  authorizeRoles("superadmin"),
  getAdmins
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("superadmin"),
  deleteAdmin
);

module.exports = router;