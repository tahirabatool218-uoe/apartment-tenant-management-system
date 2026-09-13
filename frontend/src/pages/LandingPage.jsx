import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiHome,
  FiUsers,
  FiShield,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div
          className="landing-logo"
          onClick={() => navigate("/")}
        >
          <div className="landing-logo-icon">A</div>
          <span>Apartment Management</span>
        </div>

        <nav className="landing-nav">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="landing-header-actions">
          <button
            className="landing-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="landing-register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="landing-hero" id="home">
          <div className="hero-content">
            <span className="hero-tag">
              <FiCheckCircle />
              Smart Property Management
            </span>

            <h1>
              Manage Your Apartments.
              <span> Simplify Your Property.</span>
            </h1>

            <p>
              A simple and secure platform to manage apartments,
              tenants, rent information, and property operations
              in one place.
            </p>

            <div className="hero-actions">
              <button
                className="hero-primary-btn"
                onClick={() => navigate("/register")}
              >
                Get Started
                <FiArrowRight />
              </button>

              <button
                className="hero-secondary-btn"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>

            <div className="hero-trust">
              <FiShield />
              Secure access with role-based permissions
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <div className="visual-top">
                <div>
                  <span className="visual-label">
                    Property Overview
                  </span>
                  <h3>Apartment Dashboard</h3>
                </div>

                <div className="visual-menu">•••</div>
              </div>

              <div className="visual-stats">
                <div className="visual-stat-card">
                  <div className="visual-stat-icon blue">
                    <FiHome />
                  </div>
                  <span>Total Apartments</span>
                  <strong>120</strong>
                </div>

                <div className="visual-stat-card">
                  <div className="visual-stat-icon green">
                    <FiUsers />
                  </div>
                  <span>Active Tenants</span>
                  <strong>86</strong>
                </div>
              </div>

              <div className="visual-chart">
                <div className="chart-heading">
                  <span>Property Activity</span>
                  <small>Overview</small>
                </div>

                <div className="chart-bars">
                  <span style={{ height: "42%" }}></span>
                  <span style={{ height: "65%" }}></span>
                  <span style={{ height: "50%" }}></span>
                  <span style={{ height: "78%" }}></span>
                  <span style={{ height: "60%" }}></span>
                  <span style={{ height: "88%" }}></span>
                  <span style={{ height: "72%" }}></span>
                </div>

                <div className="chart-days">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              <div className="visual-bottom-card">
                <div className="bottom-card-icon">
                  <FiBarChart2 />
                </div>
                <div>
                  <strong>Easy Management</strong>
                  <span>All your property data in one place</span>
                </div>
                <FiCheckCircle className="bottom-check" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="landing-features" id="features">
          <div className="section-heading">
            <span>FEATURES</span>
            <h2>Everything you need to manage your property</h2>
            <p>
              Manage your apartments and tenants through one
              organized and easy-to-use platform.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiHome />
              </div>
              <h3>Apartment Management</h3>
              <p>
                Add, update, view, and manage apartment
                information and availability.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiUsers />
              </div>
              <h3>Tenant Management</h3>
              <p>
                Keep tenant information organized and manage
                apartment occupancy efficiently.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiShield />
              </div>
              <h3>Secure Access</h3>
              <p>
                JWT authentication and role-based permissions
                protect your property data.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiBarChart2 />
              </div>
              <h3>Clear Dashboard</h3>
              <p>
                View important property information through a
                clean and organized dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* About / CTA Section */}
        <section className="landing-about" id="about">
          <div>
            <span className="about-tag">BUILT FOR SIMPLICITY</span>
            <h2>
              A better way to manage your property.
            </h2>
            <p>
              Apartment Management brings your property
              operations together in one secure platform,
              making everyday management easier and more
              organized.
            </p>
          </div>

          <button
            className="about-btn"
            onClick={() => navigate("/register")}
          >
            Create Your Account
            <FiArrowRight />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-logo">
          <div className="landing-logo-icon">A</div>
          <span>Apartment Management</span>
        </div>

        <p>© 2026 Apartment Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;