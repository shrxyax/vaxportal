"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, MapPin, Bell, ChevronRight, Syringe } from "lucide-react"
import Sidebar from "./Sidebar"
import VaccinationStatusChart from "./VaccinationStatusChart"
import "./DashboardPage.css"

const DashboardPage = () => {
  const currentTime = new Date()
  const hours = currentTime.getHours()

  let greeting = "Good Morning"
  if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon"
  } else if (hours >= 17) {
    greeting = "Good Evening"
  }

  // Animation effect for elements when page loads
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in")
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible")
      }, 100 * index)
    })
  }, [])

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <div className="header fade-in">
          <div className="header-left">
            <h1 className="greeting">{greeting}</h1>
            <p className="subtext">Welcome to your vaccination dashboard</p>
          </div>
          <div className="header-buttons">
            <button className="outline-button pulse">
              <Link to="/settings" style={{ textDecoration: "none" }}>
              <span>Notifications</span>
              </Link>
            </button>
            <Link to="/appointments/book" style={{ textDecoration: "none", color: "inherit" }}> 
              <button className="primary-button">
                <Calendar className="icon" />
                <span>Book Appointment</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="grid-container">
          {/* Appointment Box */}
          <div className="card appointment-card fade-in">
            <div className="card-header">
              <h3 className="card-title">Upcoming Appointment</h3>
              <div className="card-badge">Next</div>
            </div>
            <div className="card-content">
              <div className="appointment-info">
                <div className="icon-circle">
                  <Syringe className="icon" />
                </div>
                <div>
                  <h3>COVID-19 Booster</h3>
                  <p>Central Hospital</p>
                </div>
              </div>
              <div className="appointment-details">
                <p>
                  <Calendar className="icon" /> April 13, 2025
                </p>
                <p>
                  <Clock className="icon" /> 10:00 AM
                </p>
              </div>
              <Link to="/appointments">
                <button className="full-width-button">View Details</button>
              </Link>
            </div>
          </div>

          {/* Vaccination Status Chart */}
          <div className="card chart-card fade-in">
            <div className="card-header">
              <h3 className="card-title">Vaccination Status</h3>
            </div>
            <div className="card-content chart-wrapper">
              <VaccinationStatusChart />
            </div>
          </div>

          {/* Nearby Centers */}
          <div className="card centers-card fade-in">
            <div className="card-header">
              <h3 className="card-title">Nearby Centers</h3>
            </div>
            <div className="card-content">
              <div className="center-list">
                <div className="center-info">
                  <div className="icon-circle">
                    <MapPin className="icon" />
                  </div>
                  <div>
                    <h3>Central Hospital</h3>
                    <p>0.8 miles away</p>
                  </div>
                </div>

                <div className="center-info">
                  <div className="icon-circle">
                    <MapPin className="icon" />
                  </div>
                  <div>
                    <h3>City Medical Center</h3>
                    <p>1.2 miles away</p>
                  </div>
                </div>
              </div>

              <Link to="/centers">
                <button className="full-width-button">View All Centers</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="announcements-container fade-in">
          <div className="section-header">
            <h3 className="section-title">Announcements</h3>
          </div>
          <div className="announcements-grid">
            <div className="announcement-box">
              <div className="announcement-icon">
                <Bell className="icon" />
              </div>
              <div className="announcement-content">
                <h3>New Vaccine Available</h3>
                <p>The updated Influenza vaccine for 2025 is now available.</p>
                <Link to="/vaccines/influenza">
                  <button className="link-button">
                    Learn More <ChevronRight className="icon" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="announcement-box">
              <div className="announcement-icon">
                <Bell className="icon" />
              </div>
              <div className="announcement-content">
                <h3>Policy Update</h3>
                <p>New vaccination policy for international travel.</p>
                <Link to="/policies">
                  <button className="link-button">
                    Learn More <ChevronRight className="icon" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage