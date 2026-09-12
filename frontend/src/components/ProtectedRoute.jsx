import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, token, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Normal users can only access Apartments
  if (
    user?.role === "user" &&
    location.pathname !== "/apartments"
  ) {
    return <Navigate to="/apartments" replace />;
  }

  // Admins cannot access Super Admin's Admin Management page
  if (
    user?.role === "admin" &&
    location.pathname === "/admin-management"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // Super Admin has access to all protected pages
  return <Outlet />;
}

export default ProtectedRoute;