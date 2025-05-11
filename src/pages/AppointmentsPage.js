import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Edit, X } from 'lucide-react';
import './Appointment.css';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [rescheduleData, setRescheduleData] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.email) {
          console.error("User not found in localStorage.");
          setAppointments([]);
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/api/booking/bookings?email=${user.email}`);
        const data = await response.json();
        
        if (response.ok) {
          setAppointments(data);
        } else {
          console.error("Error fetching appointments:", data.message);
          setAppointments([]);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setAppointments([]);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/booking/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
      } else {
        console.error("Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const handleRescheduleClick = (appointment) => {
    setRescheduleData({ id: appointment._id, newDate: appointment.date, newTime: appointment.time });
  };

  const handleRescheduleConfirm = async () => {
    if (!rescheduleData) return;

    try {
      const response = await fetch(`http://localhost:3000/api/booking/bookings/${rescheduleData.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: rescheduleData.newDate.split("T")[0],
          time: rescheduleData.newTime
        }),
      });

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === rescheduleData.id
              ? { ...appointment, date: rescheduleData.newDate, time: rescheduleData.newTime }
              : appointment
          )
        );
        setRescheduleData(null); // Close dialog
      } else {
        console.error("Failed to reschedule appointment");
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    appointment.status === activeTab &&
    (searchQuery === '' || 
     appointment.diseaseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
     appointment.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        <div className="appointments-header">
          <div>
            <h1 className="appointments-title">Appointments</h1>
            <p className="appointments-subtitle">Manage your vaccination appointments</p>
          </div>
          <Link to="/appointments/book" className="book-new-btn">
            <span className="plus-icon">+</span> Book New Appointment
          </Link>
        </div>

        <div className="search-container">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search appointments..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          
        </div>

        {loading ? (
          <p>Loading appointments...</p>
        ) : (
          <div className="appointments-list">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appointment => (
                <div key={appointment._id} className="appointment-card">
                  <div className="appointment-left">
                    <div className="vaccine-icon">
                      <Edit size={20} />
                    </div>
                    <div className="appointment-details">
                      <h3 className="vaccine-name">{appointment.diseaseType}</h3>
                      <p className="vaccine-brand">{appointment.vaccineType}</p>
                      <div className="appointment-info">
                        <div className="info-item">
                          <Calendar size={16} />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="info-item">
                          <Clock size={16} />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="info-item">
                          <MapPin size={16} />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="appointment-right">
                    <div className="status-badge">
                      <span className="status-dot"></span>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                    <div className="action-buttons">
                      <button className="reschedule-btn" onClick={() => handleRescheduleClick(appointment)}>
                        Reschedule
                      </button>
                      <button className="cancel-btn" onClick={() => handleCancel(appointment._id)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                <p>No {activeTab} appointments found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleData && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setRescheduleData(null)}>
              <X size={20} />
            </button>
            <h2>Reschedule Appointment</h2>
            <label>Date:</label>
            <input 
              type="date" 
              value={rescheduleData.newDate} 
              onChange={(e) => setRescheduleData(prev => ({ ...prev, newDate: e.target.value }))} 
            />
            <label>Time:</label>
            <input 
              type="time" 
              value={rescheduleData.newTime} 
              onChange={(e) => setRescheduleData(prev => ({ ...prev, newTime: e.target.value }))} 
            />
            <button className="confirm-btn" onClick={handleRescheduleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
