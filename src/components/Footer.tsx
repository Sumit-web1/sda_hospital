import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Clock,
  Facebook, Instagram,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import './Footer.css';
import FooterSlider from './Footerslider';
import AdventistLogo from '../assets/adventistlogo.png';
import AdventistHealth from '../assets/Adventisthealth.png';
import NABHLogo from '../assets/NABH.png';
import scanner from '../assets/scanner.png';

const Footer: React.FC = () => {
  const [isSliderVisible, setSliderVisible] = useState(false);

  return (
    <footer className="footer">
      <button
        className="footer-slider-button left"
        aria-label="Show Main Footer"
        onClick={() => setSliderVisible(false)}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="footer-slider-button right"
        aria-label="Show Form"
        onClick={() => setSliderVisible(true)}
      >
        <ChevronRight size={24} />
      </button>

      {/* Footer Slider */}
      <div className={`footer-content-slider ${isSliderVisible ? 'slide-active' : ''}`}>
        <div className="footer-panel">
          <div className="footer-container">
            <div className="footer-grid">

              {/* Hospital Info */}
              <div className="footer-section">
                <div className="footer-logo">
                  <div className="footer-logo-icon">
                    <span className="footer-logo-text">S</span>
                  </div>
                  <span className="footer-logo-name">SDAMC</span>
                </div>
                <p className="footer-description">
                  Seventh-day Adventist Medical Centre - Providing compassionate,
                  Christ-centered healthcare with excellence and integrity since 1991.
                </p>
                <div className="footer-social">
                  <a href="#" className="footer-social-link"><Facebook /></a>
                  <a href="#" className="footer-social-link"><Instagram /></a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="footer-heading">Quick Links</h3>
                <ul className="footer-links">
                  <li><a href="#home" className="footer-link">Home</a></li>
                  <li><a href="#services" className="footer-link">Services</a></li>
                  <li><a href="#doctors" className="footer-link">Doctors</a></li>
                  <li><a href="#about" className="footer-link">About Us</a></li>
                  <li><a href="#contact" className="footer-link">Contact</a></li>
                  <li><a href="#careers" className="footer-link">Careers</a></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="footer-heading">Medical Services</h3>
                <div className="footer-services-box">
                  <ul className="footer-links footer-services-grid">

                    <li><a href="#" className="footer-link">General Medicine</a></li>
                    <li><a href="#" className="footer-link">Obstetrics & Gynecology</a></li>
                    <li><a href="#" className="footer-link">General Surgery</a></li>
                    <li><a href="#" className="footer-link">Pediatrics</a></li>
                    <li><a href="#" className="footer-link">Pediatric Surgery</a></li>
                    <li><a href="#" className="footer-link">Orthopedics</a></li>
                    <li><a href="#" className="footer-link">Laparoscopy</a></li>
                    <li><a href="#" className="footer-link">Endoscopy</a></li>
                    <li><a href="#" className="footer-link">Nephrology</a></li>
                    <li><a href="#" className="footer-link">Dermatology</a></li>
                    <li><a href="#" className="footer-link">ENT</a></li>
                    <li><a href="#" className="footer-link">Ophthalmology</a></li>
                    <li><a href="#" className="footer-link">Lifestyle Medicine</a></li>
                    <li><a href="#" className="footer-link">Physiotherapy</a></li>
                    <li><a href="#" className="footer-link">Gastroenterology</a></li>
                    <li><a href="#" className="footer-link">Pulmonology</a></li>
                    <li><a href="#" className="footer-link">Dental</a></li>
                    <li><a href="#" className="footer-link">Radiology</a></li>
                    <li><a href="#" className="footer-link">Pathology</a></li>
                    <li><a href="#" className="footer-link">Pharmacy</a></li>
                    <li><a href="#" className="footer-link">Laboratory</a></li>
                    <li><a href="#" className="footer-link">Cardiology</a></li>
                    <li><a href="#" className="footer-link">Neurology</a></li>
                    <li><a href="#" className="footer-link">Gastrology</a></li>
                    <li><a href="#" className="footer-link">Urology</a></li>
                    <li><a href="#" className="footer-link">Psychiatry</a></li>
                    <li><a href="#" className="footer-link">Academic Training</a></li>
                  </ul>
                </div>

              </div>

              {/* More Information */}
              <div>
                <h3 className="footer-heading">More Information</h3>
                <ul className="footer-links">
                  <li><a href="#careers" className="footer-link">Careers</a></li>
                  <li><a href="#privacy" className="footer-link">Website Privacy Policy</a></li>
                  <li><a href="#legal" className="footer-link">Legal Statements and Policy</a></li>
                  <li><a href="#ask" className="footer-link">Ask A Question</a></li>
                  <li><a href="#direction" className="footer-link">Direction</a></li>
                  <li><a href="#sitemap" className="footer-link">Site Map</a></li>
                  <li>
                    <a
                      href="https://gn406.whpservers.com/roundcube/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      Staff Login
                    </a>
                  </li>

                  <li><a href="#blogs" className="footer-link">Blogs</a></li>
                  <li><a href="/booking" className="footer-link">Conference Hall</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="footer-heading">Contact Information</h3>
                <div className="footer-contact">
                  <div className="footer-contact-item">
                    <MapPin className="footer-contact-icon" />
                    <div>
                      <p className="footer-contact-text">
                        SDAMC Hospital<br />
                        8, spencer Rd, Cleveland Town<br />
                        Frazer Town, Bengaluru, Karnataka 56005
                      </p>
                    </div>
                  </div>
                  <div className="footer-contact-item">
                    <Phone className="footer-contact-icon" />
                    <div className="footer-contact-phones">
                      <p className="footer-contact-text">Emergency: +91 80-2536-0190</p>
                    </div>
                  </div>
                  <div className="footer-contact-item">
                    <Mail className="footer-contact-icon" />
                    <p className="footer-contact-text">info@sdahospital.com</p>
                  </div>
                  <div className="footer-contact-item">
                    <Clock className="footer-contact-icon" />
                    <div className="footer-contact-hours">
                      <p className="footer-contact-text">
                        Emergency: 24/7<br />
                        OPD: Mon-Fri 8:00 AM - 8:00 PM<br />
                        Sunday: 9:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">

              {/* Accreditation Logos */}
              <div className="footer-accreditation-logo">

                {/* Left Logos */}
                <div className="footer-accreditation-left-group">
                  <img src={AdventistLogo} alt="Adventist Accreditation Logo" />
                  <div className="footer-accreditation-group">
                    <img src={AdventistHealth} alt="Adventist Health Logo" />
                    <small>Medical Trust of Seventh Day Adventist Church</small>
                  </div>
                </div>

                {/* Right Logos */}
                <div className="footer-accreditation-right-group">
                  <img src={NABHLogo} alt="NABH Logo" />
                  <img src={scanner} alt="New Logo" />
                </div>

              </div>

              <div className="footer-bottom-content">
                <div className="footer-copyright">
                  © 2026 SDAMC Hospital. All rights reserved.
                </div>
                <div className="footer-legal">
                  <a href="#" className="footer-legal-link">Privacy Policy</a>
                  <a href="#" className="footer-legal-link">Terms of Service</a>
                  <a href="#" className="footer-legal-link">Patient Rights</a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Panel 2: Form Slider */}
        <div className="footer-panel">
          <FooterSlider />
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="footer-emergency">
        <div className="footer-emergency-container">
          <div className="footer-emergency-content">
            <Phone className="footer-emergency-icon" />
            <span className="footer-emergency-text">
              24/7 Emergency Hotline: +91 80-2536-0190
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
