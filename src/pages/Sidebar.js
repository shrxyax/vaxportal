import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; // Icons for Light/Dark mode
import "./Sidebar.css"; // Import styles

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Load Dark Mode state from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  // Effect to apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  // Sign Out Function
  const handleSignOut = () => {
    localStorage.clear(); // Clear all stored data (user session, dark mode, etc.)
    navigate("/"); // Redirect to HomePage
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* VaxPortal Logo */}
      <div className="sidebar-header">
        <h2>VaxPortal</h2>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <div className="sidebar-user">
          <p>Welcome back,</p>
          <h3>{JSON.parse(localStorage.getItem("user")).fullName}</h3>
        </div>

        <ul className="sidebar-menu">
          <li><Link to="/dashboard">📋 Dashboard</Link></li>
          <li><Link to="/appointments">📅 Appointments</Link></li>
          <li><Link to="/certificates">📜 Certificates</Link></li>
          <li><Link to="/settings">⚙️ Settings</Link></li>
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Dark Mode Toggle Button */}
        <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          {darkMode ? " Light Mode" : " Dark Mode"}
        </button>

        {/*<button className="live-chat-btn">💬 Live Chat Support</button> */}
        <button className="signout-btn" onClick={handleSignOut}>🔴 Sign Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
