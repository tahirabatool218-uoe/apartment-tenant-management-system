import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

import "./Header.css";

function Header({ title, description }) {
  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const userName = user?.name || "Administrator";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="dashboard-header">

      {/* Header Information */}
      <div className="header-left">
        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      {/* Profile Section */}
      <div className="profile-wrapper" ref={profileRef}>

        <button
          type="button"
          className={`profile-button ${
            profileOpen ? "profile-active" : ""
          }`}
          onClick={() => setProfileOpen((previous) => !previous)}
          aria-expanded={profileOpen}
        >
          <div className="profile-avatar">
            {userInitial}
          </div>

          <div className="profile-info">
            <strong>{userName}</strong>
            <span>Administrator</span>
          </div>

          <FiChevronDown
            className={`profile-chevron ${
              profileOpen ? "open" : ""
            }`}
          />
        </button>

        {profileOpen && (
          <div className="profile-dropdown">

            {/* Dropdown User Info */}
            <div className="dropdown-user">

              <div className="dropdown-avatar">
                {userInitial}
              </div>

              <div className="dropdown-user-details">
                <strong>{userName}</strong>

                <span>
                  {user?.email || "Administrator account"}
                </span>

                <small>
                  Administrator
                </small>
              </div>

            </div>

            <div className="dropdown-divider"></div>

            {/* Profile Item */}
            <div className="dropdown-profile-item">
              <div className="dropdown-item-icon">
                <FiUser />
              </div>

              <div>
                <strong>Account</strong>
                <span>Administrator account</span>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            {/* Logout */}
            <button
              type="button"
              className="dropdown-logout"
              onClick={handleLogout}
            >
              <div className="logout-icon">
                <FiLogOut />
              </div>

              <span>Sign Out</span>
            </button>

          </div>
        )}

      </div>

    </header>
  );
}

export default Header;