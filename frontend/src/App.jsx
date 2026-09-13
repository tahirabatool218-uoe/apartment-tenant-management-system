import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Apartments from "./pages/Apartments";
import Tenants from "./pages/Tenants";
import AdminManagement from "./pages/AdminManagement";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/apartments"
            element={<Apartments />}
          />

          <Route
            path="/tenants"
            element={<Tenants />}
          />

          <Route
            path="/admin-management"
            element={<AdminManagement />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;