import React, { useState } from "react";
import {
  Calendar,
  Home,
  Info,
  HelpCircle,
  GraduationCap,
  Pill,
  Phone,
  Stethoscope,
  Building2,
  Users,
  BookOpen,
  ShieldPlus,
  Briefcase,
} from "lucide-react";

import BookingModal from "./BookingModal";
import "./Header.css";
import menuIcon from "../assets/menu-icon.svg";
import Logo from "../assets/logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="nav">
            <a href="/" className="header-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={Logo} alt="" className="header-logo-img" />
              <span className="header-logo-name">SDA Hospital</span>
            </a>

            <div className="nav-link">
              <a href="/" className="header-nav-link">Home</a>
              <a href="/about" className="header-nav-link">About</a>
              <a href="/services" className="header-nav-link">Services</a>
              <a href="/doctors" className="header-nav-link">Doctors</a>
              <a href="/blogs" className="header-nav-link">Blog</a>
              <a href="/hernia" className="header-nav-link">Hernia</a>
            </div>

            <nav className="header-nav">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="header-book-appointment-btn"
              >
                <div className="header-book-appointment-icon">
                  <Calendar size={18} />
                </div>
                <span>Book An Appointment</span>
              </button>

              <div
                className="header-menu-icon-container"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="header-menu-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <path
                      d="M25.6666 21.0058C25.6666 21.6475 25.1463 22.1667 24.5058 22.1667H15.1608C14.8529 22.1667 14.5577 22.0444 14.34 21.8267C14.1223 21.609 14 21.3137 14 21.0058C14 20.698 14.1223 20.4027 14.34 20.185C14.5577 19.9673 14.8529 19.845 15.1608 19.845H24.5058C25.1475 19.845 25.6666 20.3642 25.6666 21.0058ZM25.6666 14C25.6666 14.6417 25.1463 15.1608 24.5058 15.1608H3.49415C3.18627 15.1608 2.89101 15.0385 2.67331 14.8208C2.45561 14.6031 2.33331 14.3079 2.33331 14C2.33331 13.6921 2.45561 13.3969 2.67331 13.1792C2.89101 12.9615 3.18627 12.8392 3.49415 12.8392H24.5058C25.1475 12.8392 25.6666 13.3595 25.6666 14ZM24.5058 8.155C24.8137 8.155 25.1089 8.0327 25.3266 7.815C25.5443 7.5973 25.6666 7.30204 25.6666 6.99417C25.6666 6.68629 25.5443 6.39103 25.3266 6.17333C25.1089 5.95564 24.8137 5.83333 24.5058 5.83333H10.4941C10.3417 5.83333 10.1908 5.86336 10.0499 5.9217C9.90908 5.98003 9.78111 6.06554 9.67331 6.17333C9.56552 6.28113 9.48001 6.4091 9.42168 6.54994C9.36334 6.69077 9.33331 6.84172 9.33331 6.99417C9.33331 7.14661 9.36334 7.29756 9.42168 7.4384C9.48001 7.57924 9.56552 7.70721 9.67331 7.815C9.78111 7.92279 9.90908 8.0083 10.0499 8.06664C10.1908 8.12497 10.3417 8.155 10.4941 8.155H24.5058Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </nav>
          </div>

          <button
            className="header-mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img src={menuIcon} alt="Menu" className="header-mobile-menu-icon" />
          </button>
        </div>

        <div
          className={`slide-menu-overlay ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`slide-menu ${isMenuOpen ? "active" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="slide-menu-header">
              <a href="/" className="slide-menu-logo" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'left', display: 'block' }}>
                <h3>SDA Hospital</h3>
                <p>We Treat God Heals</p>
              </a>
              <button className="slide-menu-close" onClick={() => setIsMenuOpen(false)}>
                ✕
              </button>
            </div>

            <nav className="slide-menu-nav">
              <div className="slide-menu-section">
                <h4>Navigation</h4>

                <a href="/" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Home size={18} className="menu-icon" /> Home
                </a>

                <a href="/about" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Info size={18} className="menu-icon" /> About Us
                </a>

                <a href="/services" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Stethoscope size={18} className="menu-icon" /> Services
                </a>

                <a href="/departments" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Building2 size={18} className="menu-icon" /> Departments
                </a>

                <a href="/doctors" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Users size={18} className="menu-icon" /> Doctors
                </a>

                <a href="/blogs" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <BookOpen size={18} className="menu-icon" /> Blog
                </a>

                <a
                  href="/news"
                  className="slide-menu-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen size={18} className="menu-icon" /> News
                </a>

                <a
                  href="/hernia"
                  className="slide-menu-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShieldPlus size={18} className="menu-icon" />
                  Hernia
                </a>

                <a href="/doctor-login" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Users size={18} className="menu-icon" /> Doctor Login
                </a>

                <a href="/receptionist-login" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Users size={18} className="menu-icon" /> Reception Login
                </a>

                <a
                  href="https://gn406.whpservers.com/roundcube/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slide-menu-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users size={18} className="menu-icon" /> Staff Login
                </a>

                <a href="/hr-login" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Briefcase size={18} className="menu-icon" /> HR Login
                </a>

                <a href="#faq" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <HelpCircle size={18} className="menu-icon" /> FAQ
                </a>

                <a href="#academics" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <GraduationCap size={18} className="menu-icon" /> Academics
                </a>

                <a href="#pharmacy" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Pill size={18} className="menu-icon" /> Pharmacy Service
                </a>

                <a href="/contact" className="slide-menu-link" onClick={() => setIsMenuOpen(false)}>
                  <Phone size={18} className="menu-icon" /> Contact Us
                </a>
              </div>

              <div className="slide-menu-cta">
                <button
                  className="slide-menu-cta-button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsBookingOpen(true);
                  }}
                >
                  <Calendar size={20} />
                  Book Appointment
                </button>
              </div>

              <div className="slide-menu-section">
                <h4>Emergency</h4>
                <div className="emergency-info">
                  <div className="emergency-item">
                    <span className="emergency-icon">🚨</span>
                    <div>
                      <strong>Emergency</strong>
                      <p>+91 80-2536-0190</p>
                    </div>
                  </div>

                  <div className="emergency-item">
                    <span className="emergency-icon">🏥</span>
                    <div>
                      <strong>24/7 Support</strong>
                      <p>+91 80-2536-0190</p>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="slide-menu-footer">
              <p>&copy; 2026 SDA Hospital. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </header>
  );
};

export default Header;