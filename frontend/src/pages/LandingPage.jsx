import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiChevronDown,
  FiHome,
  FiMenu,
  FiShield,
  FiUsers,
  FiX,
  FiLayers,
  FiTrendingUp,
} from "react-icons/fi";

import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (sectionId) => {
    setMenuOpen(false);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="landing-page">

      {/* =====================================================
          Navbar
      ===================================================== */}

      <header className="landing-navbar">

        <div
          className="landing-logo"
          onClick={() => handleNavigation("home")}
        >
          <div className="logo-mark">
            <FiHome />
          </div>

          <div className="logo-text">
            <strong>EstateFlow</strong>
            <span>Property Management</span>
          </div>
        </div>

        <nav
          className={`landing-nav ${
            menuOpen ? "landing-nav-open" : ""
          }`}
        >
          <button
            type="button"
            className="nav-link active"
            onClick={() => handleNavigation("home")}
          >
            Home
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={() => handleNavigation("about")}
          >
            About
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={() => handleNavigation("features")}
          >
            Features
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={() => handleNavigation("workflow")}
          >
            How It Works
          </button>

          <div className="mobile-nav-actions">
            <button
              type="button"
              className="mobile-login-button"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

            <button
              type="button"
              className="mobile-register-button"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-login"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            type="button"
            className="navbar-register"
            onClick={() => navigate("/register")}
          >
            Get Started
            <FiArrowRight />
          </button>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

      </header>

      {/* =====================================================
          Hero Section
      ===================================================== */}

      <main>

        <section
          id="home"
          className="landing-hero"
        >
          <div className="hero-background-shape hero-shape-one" />
          <div className="hero-background-shape hero-shape-two" />

          <div className="hero-content">

            <div className="hero-label">
              <span className="hero-label-dot" />
              Smart property management, simplified
            </div>

            <h1>
              Manage your properties.
              <span> Grow your business.</span>
            </h1>

            <p className="hero-description">
              A modern platform to manage apartments, tenants,
              rent information, and property operations from one
              secure and organized dashboard.
            </p>

            <div className="hero-buttons">

              <button
                type="button"
                className="hero-primary-button"
                onClick={() => navigate("/register")}
              >
                Start Managing
                <FiArrowRight />
              </button>

              <button
                type="button"
                className="hero-outline-button"
                onClick={() => handleNavigation("features")}
              >
                Explore Features
                <FiChevronDown />
              </button>

            </div>

            <div className="hero-benefits">

              <div className="hero-benefit">
                <FiCheckCircle />
                <span>Secure access</span>
              </div>

              <div className="hero-benefit">
                <FiCheckCircle />
                <span>Role-based control</span>
              </div>

              <div className="hero-benefit">
                <FiCheckCircle />
                <span>Easy management</span>
              </div>

            </div>

          </div>

          {/* Dashboard Preview */}

          <div className="hero-dashboard-area">

            <div className="dashboard-orbit orbit-one" />
            <div className="dashboard-orbit orbit-two" />

            <div className="dashboard-window">

              <div className="dashboard-window-header">

                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="window-title">
                  EstateFlow Dashboard
                </span>

                <div className="window-user">
                  <span>TB</span>
                </div>

              </div>

              <div className="dashboard-window-body">

                <aside className="mock-sidebar">

                  <div className="mock-sidebar-logo">
                    <div className="mock-logo-icon">
                      <FiHome />
                    </div>

                    <span>EstateFlow</span>
                  </div>

                  <div className="mock-sidebar-menu">

                    <div className="mock-menu-item active">
                      <FiBarChart2 />
                      <span>Dashboard</span>
                    </div>

                    <div className="mock-menu-item">
                      <FiHome />
                      <span>Apartments</span>
                    </div>

                    <div className="mock-menu-item">
                      <FiUsers />
                      <span>Tenants</span>
                    </div>

                    <div className="mock-menu-item">
                      <FiShield />
                      <span>Security</span>
                    </div>

                  </div>

                </aside>

                <div className="mock-main-content">

                  <div className="mock-main-heading">
                    <div>
                      <span>Overview</span>
                      <h3>Good morning, Admin</h3>
                    </div>

                    <div className="mock-date">
                      This month
                    </div>
                  </div>

                  <div className="mock-stat-grid">

                    <div className="mock-stat-card">
                      <div className="mock-stat-top">
                        <span>Total Apartments</span>
                        <FiHome />
                      </div>

                      <strong>248</strong>

                      <small>
                        <FiTrendingUp />
                        12.5% this month
                      </small>
                    </div>

                    <div className="mock-stat-card">
                      <div className="mock-stat-top">
                        <span>Active Tenants</span>
                        <FiUsers />
                      </div>

                      <strong>186</strong>

                      <small>
                        <FiTrendingUp />
                        8.2% this month
                      </small>
                    </div>

                  </div>

                  <div className="mock-lower-grid">

                    <div className="mock-chart-card">

                      <div className="mock-card-heading">
                        <strong>Occupancy Overview</strong>
                        <span>2026</span>
                      </div>

                      <div className="mock-chart">
                        <div className="mock-chart-line line-one" />
                        <div className="mock-chart-line line-two" />

                        <div className="mock-bars">
                          <span style={{ height: "38%" }} />
                          <span style={{ height: "55%" }} />
                          <span style={{ height: "45%" }} />
                          <span style={{ height: "70%" }} />
                          <span style={{ height: "62%" }} />
                          <span style={{ height: "84%" }} />
                          <span style={{ height: "76%" }} />
                        </div>
                      </div>

                      <div className="mock-chart-labels">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                      </div>

                    </div>

                    <div className="mock-activity-card">

                      <div className="mock-card-heading">
                        <strong>Recent Activity</strong>
                        <span>View all</span>
                      </div>

                      <div className="mock-activity">
                        <div className="activity-icon purple">
                          <FiHome />
                        </div>

                        <div>
                          <strong>Apartment updated</strong>
                          <span>Unit A-204</span>
                        </div>
                      </div>

                      <div className="mock-activity">
                        <div className="activity-icon green">
                          <FiUsers />
                        </div>

                        <div>
                          <strong>New tenant added</strong>
                          <span>Today, 10:42 AM</span>
                        </div>
                      </div>

                      <div className="mock-activity">
                        <div className="activity-icon orange">
                          <FiCheckCircle />
                        </div>

                        <div>
                          <strong>Rent status updated</strong>
                          <span>Yesterday</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="floating-info-card floating-card-top">
              <div className="floating-info-icon green">
                <FiCheckCircle />
              </div>

              <div>
                <strong>All systems organized</strong>
                <span>Everything under control</span>
              </div>
            </div>

            <div className="floating-info-card floating-card-bottom">
              <div className="floating-info-icon purple">
                <FiTrendingUp />
              </div>

              <div>
                <strong>24.8% growth</strong>
                <span>Property performance</span>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            Stats Section
        ===================================================== */}

        <section className="landing-stats">

          <div className="stat-item">
            <strong>100%</strong>
            <span>Organized workflow</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>24/7</strong>
            <span>System accessibility</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>3+</strong>
            <span>Management modules</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>1</strong>
            <span>Unified dashboard</span>
          </div>

        </section>

        {/* =====================================================
            About Section
        ===================================================== */}

        <section
          id="about"
          className="landing-about"
        >

          <div className="about-visual">

            <div className="about-main-card">

              <div className="about-card-header">
                <div className="about-card-icon">
                  <FiLayers />
                </div>

                <div>
                  <span>Management overview</span>
                  <strong>Everything connected</strong>
                </div>
              </div>

              <div className="about-progress-item">
                <div className="about-progress-label">
                  <span>Apartment management</span>
                  <strong>92%</strong>
                </div>

                <div className="about-progress-track">
                  <div
                    className="about-progress-fill"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>

              <div className="about-progress-item">
                <div className="about-progress-label">
                  <span>Tenant records</span>
                  <strong>86%</strong>
                </div>

                <div className="about-progress-track">
                  <div
                    className="about-progress-fill blue"
                    style={{ width: "86%" }}
                  />
                </div>
              </div>

              <div className="about-progress-item">
                <div className="about-progress-label">
                  <span>Property operations</span>
                  <strong>78%</strong>
                </div>

                <div className="about-progress-track">
                  <div
                    className="about-progress-fill green"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>

              <div className="about-mini-summary">
                <div>
                  <span>Monthly activity</span>
                  <strong>+18.6%</strong>
                </div>

                <FiTrendingUp />
              </div>

            </div>

            <div className="about-floating-badge">
              <FiShield />
              <span>Secure & Reliable</span>
            </div>

          </div>

          <div className="about-content">

            <span className="section-tag">
              Built for modern property teams
            </span>

            <h2>
              Less paperwork.
              <span> More control.</span>
            </h2>

            <p>
              EstateFlow brings your property operations into one
              clean and reliable workspace. Manage apartment details,
              organize tenant information, and monitor your property
              activities without unnecessary complexity.
            </p>

            <div className="about-list">

              <div className="about-list-item">
                <div>
                  <FiCheckCircle />
                </div>

                <span>
                  Centralized apartment and tenant information
                </span>
              </div>

              <div className="about-list-item">
                <div>
                  <FiCheckCircle />
                </div>

                <span>
                  Secure role-based access for every user
                </span>
              </div>

              <div className="about-list-item">
                <div>
                  <FiCheckCircle />
                </div>

                <span>
                  Simple workflows designed for daily operations
                </span>
              </div>

            </div>

            <button
              type="button"
              className="about-button"
              onClick={() => handleNavigation("features")}
            >
              Discover the platform
              <FiArrowRight />
            </button>

          </div>

        </section>

        {/* =====================================================
            Features Section
        ===================================================== */}

        <section
          id="features"
          className="landing-features-section"
        >

          <div className="section-heading">

            <span className="section-tag">
              Powerful features
            </span>

            <h2>
              Everything you need to
              <span> manage with confidence.</span>
            </h2>

            <p>
              Designed to make property management more organized,
              transparent, and efficient.
            </p>

          </div>

          <div className="landing-features">

            <div className="feature-card">
              <div className="feature-card-number">01</div>

              <div className="feature-icon purple">
                <FiHome />
              </div>

              <h3>Apartment Management</h3>

              <p>
                Add, update, search, and manage apartment details,
                availability, rent, and occupancy information.
              </p>

              <button
                type="button"
                onClick={() => navigate("/apartments")}
              >
                Explore module
                <FiArrowRight />
              </button>
            </div>

            <div className="feature-card">
              <div className="feature-card-number">02</div>

              <div className="feature-icon blue">
                <FiUsers />
              </div>

              <h3>Tenant Management</h3>

              <p>
                Keep tenant records organized and access important
                information through a centralized system.
              </p>

              <button
                type="button"
                onClick={() => navigate("/tenants")}
              >
                Explore module
                <FiArrowRight />
              </button>
            </div>

            <div className="feature-card">
              <div className="feature-card-number">03</div>

              <div className="feature-icon green">
                <FiShield />
              </div>

              <h3>Secure Access</h3>

              <p>
                Protect your platform with authentication and
                role-based permissions for different users.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
              >
                Sign in securely
                <FiArrowRight />
              </button>
            </div>

            <div className="feature-card">
              <div className="feature-card-number">04</div>

              <div className="feature-icon orange">
                <FiBarChart2 />
              </div>

              <h3>Dashboard Insights</h3>

              <p>
                Get a clear overview of your property operations
                through useful statistics and organized information.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
              >
                View dashboard
                <FiArrowRight />
              </button>
            </div>

          </div>

        </section>

        {/* =====================================================
            Workflow Section
        ===================================================== */}

        <section
          id="workflow"
          className="landing-workflow"
        >

          <div className="section-heading">

            <span className="section-tag">
              Simple process
            </span>

            <h2>
              Get started in
              <span> three easy steps.</span>
            </h2>

            <p>
              A straightforward workflow that keeps your property
              management process moving.
            </p>

          </div>

          <div className="workflow-steps">

            <div className="workflow-step">
              <div className="workflow-step-top">
                <div className="workflow-number">01</div>
                <div className="workflow-line" />
              </div>

              <h3>Create your account</h3>

              <p>
                Register securely and access the platform according
                to your assigned role.
              </p>
            </div>

            <div className="workflow-step">
              <div className="workflow-step-top">
                <div className="workflow-number">02</div>
                <div className="workflow-line" />
              </div>

              <h3>Manage your data</h3>

              <p>
                Add apartments, manage tenant information, and
                organize your property records.
              </p>
            </div>

            <div className="workflow-step">
              <div className="workflow-step-top">
                <div className="workflow-number">03</div>
              </div>

              <h3>Monitor operations</h3>

              <p>
                Use the dashboard to view important information
                and keep daily operations under control.
              </p>
            </div>

          </div>

        </section>

        {/* =====================================================
            CTA Section
        ===================================================== */}

        <section className="landing-cta">

          <div className="cta-content">

            <div className="cta-icon">
              <FiHome />
            </div>

            <span className="section-tag light">
              Ready to get organized?
            </span>

            <h2>
              Take control of your
              <span> property management.</span>
            </h2>

            <p>
              Start using a smarter, cleaner, and more reliable
              way to manage your property operations.
            </p>

            <div className="cta-buttons">

              <button
                type="button"
                className="cta-primary-button"
                onClick={() => navigate("/register")}
              >
                Create an account
                <FiArrowRight />
              </button>

              <button
                type="button"
                className="cta-secondary-button"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          Footer
      ===================================================== */}

      <footer className="landing-footer">

        <div className="footer-brand">
          <div className="logo-mark small">
            <FiHome />
          </div>

          <div>
            <strong>EstateFlow</strong>
            <span>Property Management</span>
          </div>
        </div>

        <p>
          © 2026 EstateFlow. All rights reserved.
        </p>

        <div className="footer-links">
          <button
            type="button"
            onClick={() => handleNavigation("about")}
          >
            About
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("features")}
          >
            Features
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>

      </footer>

    </div>
  );
}

export default LandingPage;