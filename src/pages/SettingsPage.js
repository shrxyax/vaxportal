import React, { useState } from "react";
import "./Settings.css"; // Import the CSS file

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">Manage your account settings and preferences</p>

      {/* Tabs */}
      <div className="tabs">
        {["profile", "password", "notifications", "privacy"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "password" && <PasswordSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "privacy" && <PrivacySettings />}
      </div>
    </div>
  );
}

const ProfileSettings = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async () => {
    setMessage("");

    if (!fullName || !phone) {
      setMessage("Both Full Name and Phone Number are required.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      setMessage("User email not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email, // Get email from localStorage
          newFullName: fullName,
          newPhone: phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setMessage("Profile updated successfully!");
      alert("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Profile Information</h2>
      <p className="card-subtitle">Update your personal information and contact details</p>
      {message && <p className="message">{message}</p>}

      <label>Full Name</label>
      <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />

      <label>Phone Number</label>
      <input type="text" placeholder="+1 (555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button className="update-button" onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};


// ✅ Password Change Functionality
const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    setMessage("");

    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("user")).email, // Replace with the logged-in user's email
          oldPassword: currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      setMessage("Password updated successfully!");
      alert("Password reset successfully")
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Change Password</h2>
      <p className="card-subtitle">Update your password to keep your account secure</p>
      {message && <p className="message">{message}</p>}
      
      <label>Current Password</label>
      <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      
      <label>New Password</label>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <p className="password-note">Password must be at least 8 characters long</p>

      <label>Confirm New Password</label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      
      <button className="update-button" onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

const NotificationSettings = () => (
  <div className="card">
    <h2 className="card-title">Notification Settings</h2>
    <p className="card-subtitle">Manage your notification preferences</p>
    
    <div className="toggle-container">
      <label htmlFor="appointmentReminders">Appointment Reminders</label>
      <input type="checkbox" id="appointmentReminders" className="toggle-switch" />
    </div>

    <div className="toggle-container">
      <label htmlFor="vaccinationUpdates">Vaccination Updates</label>
      <input type="checkbox" id="vaccinationUpdates" className="toggle-switch" />
    </div>

    <div className="toggle-container">
      <label htmlFor="healthAlerts">Health Alerts</label>
      <input type="checkbox" id="healthAlerts" className="toggle-switch" />
    </div>

    <button className="update-button">Save Changes</button>
  </div>
);

const PrivacySettings = () => (
  <div className="card">
    <h2 className="card-title">Privacy Settings</h2>
    <p className="card-subtitle">Control your privacy preferences</p>
    
    <div className="toggle-container">
      <label htmlFor="dataSharing">Data Sharing</label>
      <input type="checkbox" id="dataSharing" className="toggle-switch" />
    </div>

    <div className="toggle-container">
      <label htmlFor="profileVisibility">Public Profile Visibility</label>
      <input type="checkbox" id="profileVisibility" className="toggle-switch" />
    </div>

    <button className="update-button">Save Changes</button>
  </div>
);
