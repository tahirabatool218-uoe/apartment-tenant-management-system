import { useNavigate, useLocation } from "react-router-dom";

import {
  FiHome,
  FiGrid,
  FiUsers,
  FiUserPlus,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "superadmin";

  const isSuperAdmin =
    user?.role === "superadmin";

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">

        <div className="sidebar-logo">
          A
        </div>

        <div className="sidebar-brand-text">
          <h2>Apartment</h2>
          <span>Management</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        <p className="nav-label">
          MAIN MENU
        </p>

        {/* Dashboard - Admin & Super Admin only */}
        {isAdmin && (
          <button
            type="button"
            className={`nav-item ${
              location.pathname === "/dashboard"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/dashboard")}
          >
            <FiHome />
            <span>Dashboard</span>
          </button>
        )}

        {/* Apartments - All logged-in users */}
        <button
          type="button"
          className={`nav-item ${
            location.pathname === "/apartments"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/apartments")}
        >
          <FiGrid />
          <span>Apartments</span>
        </button>

        {/* Tenants - Admin & Super Admin only */}
        {isAdmin && (
          <button
            type="button"
            className={`nav-item ${
              location.pathname === "/tenants"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/tenants")}
          >
            <FiUsers />
            <span>Tenants</span>
          </button>
        )}

        {/* Manage Admins - Super Admin only */}
        {isSuperAdmin && (
          <button
            type="button"
            className={`nav-item ${
              location.pathname === "/admin-management"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/admin-management")}
          >
            <FiUserPlus />
            <span>Manage Admins</span>
          </button>
        )}

      </nav>

      <div className="sidebar-bottom">

        <button
          type="button"
          className="logout-item"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;