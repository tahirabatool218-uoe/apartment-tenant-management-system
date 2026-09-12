import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Header from "../components/Header";

import {
  FiUserPlus,
  FiUsers,
  FiTrash2,
  FiMail,
  FiShield,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

import api from "../services/api";

import "./AdminManagement.css";

function AdminManagement() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [admins, setAdmins] = useState([]);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && user.role !== "superadmin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/admins",
        getConfig()
      );

      setAdmins(response.data.admins || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load admins. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "superadmin") {
      fetchAdmins();
    }
  }, [user]);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError(
        "Name, email and password are required."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post(
        "/admins",
        {
          name,
          email,
          password,
        },
        getConfig()
      );

      setSuccess(
        response.data.message ||
          "Admin created successfully."
      );

      setName("");
      setEmail("");
      setPassword("");

      await fetchAdmins();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create admin. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/admins/${adminId}`,
        getConfig()
      );

      setSuccess(
        response.data.message ||
          "Admin deleted successfully."
      );

      setAdmins((currentAdmins) =>
        currentAdmins.filter(
          (admin) => admin._id !== adminId
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete admin. Please try again."
      );
    }
  };

  if (!user || user.role !== "superadmin") {
    return null;
  }

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <Header
          title="Manage Admins"
          description="Create and manage administrator accounts."
        />

        {/* Admin Management Content */}
        <div className="dashboard-content">

          {/* Page Intro */}
          <section className="welcome-section">

            <div className="welcome-content">

              <span className="welcome-label">
                ADMINISTRATION
              </span>

              <h2>Admin Management</h2>

              <p>
                Manage administrator accounts and
                control access to the management system.
              </p>

            </div>

          </section>

          {/* Messages */}
          {error && (
            <div className="admin-message admin-error">
              {error}
            </div>
          )}

          {success && (
            <div className="admin-message admin-success">
              {success}
            </div>
          )}

          {/* Create Admin */}
          <section className="admin-management-grid">

            <div className="admin-form-card">

              <div className="admin-card-header">

                <div className="admin-card-icon">
                  <FiUserPlus />
                </div>

                <div>
                  <h3>Create New Admin</h3>

                  <p>
                    Add a new administrator account.
                  </p>
                </div>

              </div>

              <form
                className="admin-form"
                onSubmit={handleCreateAdmin}
              >

                <div className="form-group">

                  <label htmlFor="admin-name">
                    Full Name
                  </label>

                  <input
                    id="admin-name"
                    type="text"
                    placeholder="Enter admin name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="admin-email">
                    Email Address
                  </label>

                  <input
                    id="admin-email"
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="admin-password">
                    Password
                  </label>

                  <input
                    id="admin-password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    minLength={6}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="admin-submit-button"
                  disabled={submitting}
                >
                  <FiUserPlus />

                  <span>
                    {submitting
                      ? "Creating Admin..."
                      : "Create Admin"}
                  </span>
                </button>

              </form>

            </div>

            {/* Admin List */}
            <div className="admin-list-card">

              <div className="admin-card-header">

                <div className="admin-card-icon">
                  <FiUsers />
                </div>

                <div>
                  <h3>Existing Admins</h3>

                  <p>
                    Administrators with management access.
                  </p>
                </div>

              </div>

              {loading ? (

                <div className="admin-empty-state">

                  <div className="admin-empty-icon">
                    <FiUsers />
                  </div>

                  <h4>Loading admins...</h4>

                  <p>
                    Please wait while we load admin
                    accounts.
                  </p>

                </div>

              ) : admins.length > 0 ? (

                <div className="admin-list">

                  {admins.map((admin) => (

                    <div
                      className="admin-list-item"
                      key={admin._id}
                    >

                      <div className="admin-avatar">
                        {admin.name
                          ?.charAt(0)
                          .toUpperCase() || "A"}
                      </div>

                      <div className="admin-info">

                        <strong>
                          {admin.name}
                        </strong>

                        <span>
                          <FiMail />
                          {admin.email}
                        </span>

                      </div>

                      <div className="admin-actions">

                        <span className="admin-role">
                          <FiShield />
                          Admin
                        </span>

                        <button
                          type="button"
                          className="delete-admin-button"
                          onClick={() =>
                            handleDeleteAdmin(
                              admin._id
                            )
                          }
                          title="Delete Admin"
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="admin-empty-state">

                  <div className="admin-empty-icon">
                    <FiUsers />
                  </div>

                  <h4>No admins found</h4>

                  <p>
                    Create an admin account to give
                    management access.
                  </p>

                </div>

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminManagement;