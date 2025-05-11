import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Edit } from "lucide-react";
import axios from "axios";
import "./BookAppointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  console.log(localStorage.getItem("user"))
  const [formData, setFormData] = useState({
    disease: "",
    date: "",
    time: "",
    location: "",
    vaccineType: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const diseases = ["COVID-19", "Influenza", "Hepatitis B", "Tetanus", "Measles"];
  const locations = ["Central Hospital", "City Medical Center", "Community Clinic", "Downtown Healthcare"];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  const vaccineTypes = {
    "COVID-19": ["Pfizer-BioNTech", "Moderna", "Johnson & Johnson"],
    "Influenza": ["Quadrivalent Flu Vaccine", "High-Dose Flu Vaccine"],
    "Hepatitis B": ["Recombinant Hepatitis B", "Heplisav-B"],
    "Tetanus": ["Tdap", "Td"],
    "Measles": ["MMR", "MMRV"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "disease" ? { vaccineType: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    if (!user || !user.email) {
      setMessage("User not found. Please log in again.");
      setLoading(false);
      return;
    }

    const bookingData = {
      email: user.email,
      diseaseType: formData.disease,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      vaccineType: formData.vaccineType,
      status: "upcoming"
    };
    console.log("Entry: ", bookingData)
    try {
      const response = await axios.post("http://localhost:3000/api/booking/addBooking", bookingData);
      setMessage("Booking successful!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="book-appointment-page">
      <div className="book-appointment-container">
        <div className="book-appointment-header">
          <h1 className="book-appointment-title">Book Appointment</h1>
          <p className="book-appointment-subtitle">Schedule your vaccination appointment</p>
        </div>

        <div className="appointment-form-wrapper">
          <div className="form-section">
            <h2 className="section-title">Vaccination Details</h2>
            <p className="section-description">Fill in the details below to book your vaccination appointment.</p>

            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-group">
                <label htmlFor="disease">Select Disease</label>
                <select id="disease" name="disease" value={formData.disease} onChange={handleChange} className="form-control">
                  <option value="">Choose</option>
                  {diseases.map((disease) => (
                    <option key={disease} value={disease}>
                      {disease}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Select Date</label>
                  <div className="date-input-container">
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="form-control" />
                    <span className="calendar-icon">
                      <Calendar size={18} />
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="time">Choose Time</label>
                  <select id="time" name="time" value={formData.time} onChange={handleChange} className="form-control">
                    <option value="">Select</option>
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <select id="location" name="location" value={formData.location} onChange={handleChange} className="form-control">
                    <option value="">Select</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="vaccineType">Vaccine Type</label>
                  <select
                    id="vaccineType"
                    name="vaccineType"
                    value={formData.vaccineType}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!formData.disease}
                  >
                    <option value="">Choose disease first</option>
                    {formData.disease &&
                      vaccineTypes[formData.disease]?.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="appointment-summary">
                <h3 className="summary-title">
                  <Edit size={18} /> Appointment Summary
                </h3>
                <div className="summary-item">
                  <Clock size={16} />
                  <div className="summary-text">
                    <span className="summary-label">Date & Time</span>
                    <span className="summary-value">{formData.date && formData.time ? `${formData.date}, ${formData.time}` : "Not selected"}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <MapPin size={16} />
                  <div className="summary-text">
                    <span className="summary-label">Location</span>
                    <span className="summary-value">{formData.location || "Not selected"}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <Edit size={16} />
                  <div className="summary-text">
                    <span className="summary-label">Vaccine</span>
                    <span className="summary-value">{formData.vaccineType || "Not selected"}</span>
                  </div>
                </div>
              </div>

              {message && <p className="message">{message}</p>}

              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={() => navigate("/dashboard")}>
                  Cancel
                </button>
                <button type="submit" className="btn-confirm" disabled={loading}>
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
