import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BookingModal from './BookingModal';
import './HeroSection.css';
import heroImg from '../assets/hero-img.png';
import capsuleImg from '../assets/capsule.png';

const HeroSection: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  return (
    <section className="hero-section">
      {/* Background Video */}
      <div className="hero-video-container">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://media.istockphoto.com/id/1461925135/video/4k-resolution-surgeons-using-vr-and-hud-holographic-in-a-modern-laboratory-looking-for.mp4?s=mp4-640x640-is&k=20&c=49tG5-8DLqRYNdTufNBTmz0nEGUmwZN470OfQP3A8eM="
            type="video/mp4"
          />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      {/* Background decorative elements */}
      <div className="hero-capsule">
        <img src={capsuleImg} alt="Capsule" />
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-content">
            

            {/* Main Heading */}
            <div className="hero-title-container">
              {/* Stats */}
            <div className="hero-stats">
              <div className="hero-avatars">
                <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Patient 1" className="hero-avatar" />
                <img src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" alt="Patient 2" className="hero-avatar" />
                <img src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" alt="Patient 3" className="hero-avatar" />
              </div>
              <div className="hero-stats-text">
                <div className="hero-stats-number">120<span>K+</span></div>
                <div className="hero-stats-label">Happy Patients</div>
              </div>
            </div>

              <h1 className="hero-title">
                Medical Expertise Guided by <span className="hero-title-faith">God’s</span> Grace
              </h1>
            </div>

            {/* Subtitle */}
            <div className="hero-subtitle-container">
            
              <p className="hero-subtitle-text">
                <div className="hero-subtitle-header">
                <span className="hero-subtitle-label">DELIVERING</span>
                <div className="hero-subtitle-line"></div>
              </div>
                PATIENT-CENTERED CARE WITH<br />
                MODERN MEDICAL EXPERTISE AND<br />
                CHRIST-CENTERED COMPASSION.
              </p>
            </div>

            {/* Search Bar */}
            <div className="hero-search-container">
              <div className="hero-search-bar">
                <Search className="hero-search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search For Doctors & Specialities..."
                  className="hero-search-input"
                />
                <button className="hero-search-button">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-buttons">
              <button
                className="hero-button hero-button-primary"
                onClick={() => window.location.href = '/find-doctor'}
              >
                <Search size={20} />
                <span>Find Doctor</span>
              </button>
              <button
                className="hero-button hero-button-secondary"
                onClick={() => window.location.href = '/services'}
              >
                <span>Our Services</span>
              </button>
            </div>
          </div>

          {/* Floating Bible Verse Card */}
              <div className="hero-bible-card">
                <div className="hero-bible-content">
                  <p className="hero-bible-verse">
                    I am the Lord<br />
                    who heals you.
                  </p>
                  <p className="hero-bible-reference">
                    Exodus 15:26
                  </p>
                </div>
                <div className="hero-bible-say">
                  Bible Say
                </div>
              </div>

          {/* Right Content - Image and Cards */}
          <div className="hero-image-container">
            {/* Main Image Container with Rounded Corners */}
            <div className="hero-image-wrapper">
              <div className="hero-image-frame">
                <img
                  src={heroImg}
                  alt="Doctor with elderly patients"
                  className="hero-image"
                />
              </div>

              

              {/* Floating Arrow */}
              {/* <div className="hero-arrow-button">
                <ArrowRight />
              </div> */}

              {/* Medical Specialties Tags - Positioned over the image */}
              <div className="hero-specialties">
                <div className="hero-specialties-row">
                  <span className="hero-specialty-tag hero-specialty-tag-1">
                    Cardiologist
                  </span>
                  <span className="hero-specialty-tag">
                    Neurologist
                  </span>
                  <span className="hero-specialty-tag">
                    Dermatologist
                  </span>
                </div>
                <div className="hero-specialties-row">
                  <span className="hero-specialty-tag">
                    Pediatrics
                  </span>
                  <span className="hero-specialty-tag">
                    Dental Care
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            {/* <div className="hero-decorative-2"></div> */}
          </div>
          
            <div className="hero-decorative-1"></div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
