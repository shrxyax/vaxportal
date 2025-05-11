import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./HomePage.css"
import { Calendar, Award, MapPin, ChevronRight, Shield, ArrowRight } from "lucide-react"
import vaccination from "./images/image.png.jpg"

const HomePage = () => {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const vaccinesRef = useRef(null)

  useEffect(() => {
    // Animate elements when they come into view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe sections
    if (heroRef.current) observer.observe(heroRef.current)
    if (featuresRef.current) observer.observe(featuresRef.current)
    if (vaccinesRef.current) observer.observe(vaccinesRef.current)

    // Observe all feature and vaccine cards
    document.querySelectorAll(".feature-card, .vaccine-card").forEach((card) => {
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  // Staggered animation for cards
  useEffect(() => {
    const featureCards = document.querySelectorAll(".feature-card")
    const vaccineCards = document.querySelectorAll(".vaccine-card")

    featureCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`
    })

    vaccineCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <div className="home-container">
      {/* Animated background */}
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      {/* Navigation */}
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <Shield size={24} />
          </div>
          <span className="logo-text">VaxPortal</span>
        </div>
        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
            <span className="btn-shine"></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="badge">
            <span>Trusted by 1M+ users</span>
          </div>
          <h1 className="hero-title">
            Get Vaccinated, <br />
            <span className="highlight">Stay Protected</span>
          </h1>
          <p className="hero-description">
            Book your vaccination appointments easily, manage your records, and stay up-to-date with the latest vaccine
            information.
          </p>
          <div className="hero-buttons">
            <button className="book-btn" onClick={() => navigate("/login")}>
              Book Appointment
              <ArrowRight size={18} />
            </button>
            <button className="view-btn" onClick={() => navigate("/login")}>
              View Vaccines
            </button>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Centers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">10M+</span>
              <span className="stat-label">Vaccinations</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-container">
            <div className="floating-card card-1">
              <Calendar size={16} />
              <span>Easy Booking</span>
            </div>
            <div className="floating-card card-2">
              <Award size={16} />
              <span>Certified</span>
            </div>
            <img src={vaccination} alt="Vaccination illustration" className="main-image" />
            <div className="image-dots"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <h2 className="section-title">Why Choose Our Vaccination Portal?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Calendar size={24} />
            </div>
            <h3 className="feature-title">Easy Scheduling</h3>
            <p className="feature-description">Book, reschedule, or cancel your appointments with just a few clicks.</p>
            <div className="feature-number">01</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Award size={24} />
            </div>
            <h3 className="feature-title">Digital Certificates</h3>
            <p className="feature-description">
              Get your vaccination certificates digitally and download them anytime.
            </p>
            <div className="feature-number">02</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MapPin size={24} />
            </div>
            <h3 className="feature-title">Nearby Centers</h3>
            <p className="feature-description">Find vaccination centers near you with real-time availability.</p>
            <div className="feature-number">03</div>
          </div>
        </div>
      </section>

      {/* Available Vaccines Section */}
      <section className="vaccines-section" ref={vaccinesRef}>
        <h2 className="section-title">Available Vaccines</h2>

        <div className="vaccines-grid">
          <div className="vaccine-card" onClick={() => navigate("/login")}>
            <div className="vaccine-info">
              <div className="vaccine-badge">Popular</div>
              <h3 className="vaccine-title">COVID-19</h3>
              <p className="vaccine-description">Learn more about COVID-19 vaccine</p>
            </div>
            <div className="vaccine-arrow-container">
              <ChevronRight size={20} className="vaccine-arrow" />
            </div>
          </div>

          <div className="vaccine-card" onClick={() => navigate("/login")}>
            <div className="vaccine-info">
              <div className="vaccine-badge">Seasonal</div>
              <h3 className="vaccine-title">Influenza</h3>
              <p className="vaccine-description">Learn more about Influenza vaccine</p>
            </div>
            <div className="vaccine-arrow-container">
              <ChevronRight size={20} className="vaccine-arrow" />
            </div>
          </div>

          <div className="vaccine-card" onClick={() => navigate("/login")}>
            <div className="vaccine-info">
              <div className="vaccine-badge">Essential</div>
              <h3 className="vaccine-title">Hepatitis B</h3>
              <p className="vaccine-description">Learn more about Hepatitis B vaccine</p>
            </div>
            <div className="vaccine-arrow-container">
              <ChevronRight size={20} className="vaccine-arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>©️ 2025 VaxPortal. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage;