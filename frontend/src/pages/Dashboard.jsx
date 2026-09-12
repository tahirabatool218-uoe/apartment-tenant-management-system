import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  FiHome,
  FiGrid,
  FiUsers,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalApartments: 0,
    availableApartments: 0,
    occupiedApartments: 0,
    totalTenants: 0,
  });

  const [apartments, setApartments] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [statsLoading, setStatsLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch dashboard statistics
        const statsResponse = await api.get("/dashboard/stats", config);

        setStats(statsResponse.data.stats);

        // Fetch apartments
        const apartmentsResponse = await api.get("/apartments", config);

        const apartmentData = apartmentsResponse.data.apartments || [];

        setApartments(
          apartmentData
            .sort(
              (a, b) =>
                new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            )
            .slice(0, 3)
        );

        // Fetch tenants
        const tenantsResponse = await api.get("/tenants", config);

        const tenantData = tenantsResponse.data.tenants || [];

        setTenants(
          tenantData
            .sort(
              (a, b) =>
                new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            )
            .slice(0, 3)
        );
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setStatsLoading(false);
        setRecentLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const userName = user?.name || "Administrator";
  const firstName = userName.split(" ")[0];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <Header
          title="Dashboard"
          description="Manage your property and tenant information in one place."
        />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Welcome Banner */}
          <section className="welcome-section">
            <div className="welcome-content">
              <span className="welcome-label">PROPERTY OVERVIEW</span>

              <h2>Welcome back, {firstName}</h2>

              <p>
                Here's a quick overview of your apartment management system.
              </p>
            </div>

            <button
              type="button"
              className="add-apartment-button"
              onClick={() => navigate("/apartments")}
            >
              <FiPlus />
              <span>Add Apartment</span>
            </button>
          </section>

          {/* Statistics */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon apartments-icon">
                <FiGrid />
              </div>

              <div className="stat-content">
                <span>Total Apartments</span>

                <strong>
                  {statsLoading ? "..." : stats.totalApartments}
                </strong>

                <small>Registered apartments</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon available-icon">
                <FiHome />
              </div>

              <div className="stat-content">
                <span>Available</span>

                <strong>
                  {statsLoading ? "..." : stats.availableApartments}
                </strong>

                <small>Currently available</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon occupied-icon">
                <FiHome />
              </div>

              <div className="stat-content">
                <span>Occupied</span>

                <strong>
                  {statsLoading ? "..." : stats.occupiedApartments}
                </strong>

                <small>Currently occupied</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon tenants-icon">
                <FiUsers />
              </div>

              <div className="stat-content">
                <span>Total Tenants</span>

                <strong>
                  {statsLoading ? "..." : stats.totalTenants}
                </strong>

                <small>Registered tenants</small>
              </div>
            </div>
          </section>

          {/* Recent Sections */}
          <section className="recent-grid">
            {/* Recent Apartments */}
            <div className="recent-card">
              <div className="recent-header">
                <div>
                  <h3>Recent Apartments</h3>

                  <p>Recently added apartments</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/apartments")}
                >
                  <span>View All</span>
                  <FiArrowRight />
                </button>
              </div>

              {recentLoading ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FiGrid />
                  </div>

                  <h4>Loading apartments...</h4>

                  <p>Please wait while we load recent apartments.</p>
                </div>
              ) : apartments.length > 0 ? (
                <div className="recent-list">
                  {apartments.map((apartment) => (
                    <div className="recent-item" key={apartment._id}>
                      <div className="recent-item-icon">
                        <FiGrid />
                      </div>

                      <div className="recent-item-content">
                        <strong>
                          Apartment {apartment.apartmentNumber}
                        </strong>

                        <span>
                          {apartment.building} · Floor {apartment.floor}
                        </span>
                      </div>

                      <span
                        className={`recent-status ${
                          apartment.status === "Available"
                            ? "status-available"
                            : "status-occupied"
                        }`}
                      >
                        {apartment.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FiGrid />
                  </div>

                  <h4>No apartments yet</h4>

                  <p>
                    Add your first apartment to start managing your property.
                  </p>

                  <button
                    type="button"
                    className="empty-action"
                    onClick={() => navigate("/apartments")}
                  >
                    Add Apartment
                  </button>
                </div>
              )}
            </div>

            {/* Recent Tenants */}
            <div className="recent-card">
              <div className="recent-header">
                <div>
                  <h3>Recent Tenants</h3>

                  <p>Recently registered tenants</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/tenants")}
                >
                  <span>View All</span>
                  <FiArrowRight />
                </button>
              </div>

              {recentLoading ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FiUsers />
                  </div>

                  <h4>Loading tenants...</h4>

                  <p>Please wait while we load recent tenants.</p>
                </div>
              ) : tenants.length > 0 ? (
                <div className="recent-list">
                  {tenants.map((tenant) => (
                    <div className="recent-item" key={tenant._id}>
                      <div className="recent-item-icon">
                        <FiUsers />
                      </div>

                      <div className="recent-item-content">
                        <strong>{tenant.name}</strong>

                        <span>
                          Apartment{" "}
                          {tenant.apartment?.apartmentNumber || "N/A"}
                        </span>
                      </div>

                      <span className="recent-status status-occupied">
                        Occupied
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FiUsers />
                  </div>

                  <h4>No tenants yet</h4>

                  <p>
                    Tenant information will appear here once added.
                  </p>

                  <button
                    type="button"
                    className="empty-action"
                    onClick={() => navigate("/tenants")}
                  >
                    Manage Tenants
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;