import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import "./AboutSection.css";
import playIcon from "../assets/play-icon.png";

// Import live updates functions from Firebase config
import { subscribeToLiveUpdates } from "../firebase/config";

const AboutSection = () => {
  // State to store the live updates data from Firebase
  const [liveUpdates, setLiveUpdates] = useState(null);

  // Fetch data from Firebase when the component loads
  useEffect(() => {
    // This function sets up a real-time listener from Firebase
    const unsubscribe = subscribeToLiveUpdates((data) => {
      // When data is updated in the database, this function is called
      // and updates the state with the new data
      setLiveUpdates(data);
    });

    // Clean up the listener when the component unmounts to prevent memory leaks
    return () => unsubscribe();
  }, []); // The empty array ensures this effect runs only once

  // Dynamically create the stats array based on the fetched data
  // If liveUpdates data exists, use it; otherwise, show a default loading state
  const stats = liveUpdates
    ? [
        {
          number: `${liveUpdates.deliveriesLastDecade.toLocaleString()}+`,
          label: "DELIVERIES IN THE LAST DECADE",
        },
        {
          number: `${liveUpdates.normalDeliveryRate}%`,
          label: "NORMAL DELIVERY RATE",
        },
        {
          number: `${liveUpdates.medicalDepartments}+`,
          label: "MEDICAL DEPARTMENTS",
        },
        {
          number: `${liveUpdates.doctorsAndConsultants}+`,
          label: "DOCTORS & CONSULTANTS",
        },
        {
          number: `${liveUpdates.emergencyAndPharmacyHours}HRS`,
          label: "EMERGENCY & PHARMACY",
        },
      ]
    : [
        // Show a default or loading state for 5 items to prevent layout shift
        { number: "...", label: "Loading..." },
        { number: "...", label: "Loading..." },
        { number: "...", label: "Loading..." },
        { number: "...", label: "Loading..." },
        { number: "...", label: "Loading..." },
      ];

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Stats Section */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="about-stat-item">
              <div className="about-stat-number">{stat.number}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main About Content */}
        <div className="about-content">
          {/* Left Side - Video/Image */}
          <div className="about-video-container">
            {/* Main Video/Image Container */}
            <div className="about-video-wrapper">
              {/* Medical surgery background image */}
              <div className="about-video-background">
                <div className="about-video-overlay"></div>
                <div className="about-video-placeholder">
                  <div className="about-video-placeholder-content">
                    <div className="about-video-placeholder-icon">{/* Icon */}</div>
                    <p className="about-video-placeholder-text">
                      Medical Surgery Scene
                    </p>
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <div className="about-play-button">
                <button className="about-play-btn">
                  <img src={playIcon} alt="Play" className="about-play-icon" />
                </button>
              </div>
            </div>

            {/* Floating Emergency Card */}
            <div className="about-emergency-card">
              <div>
                <div className="about-emergency-header">
                  <div className="about-emergency-icon">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="about-emergency-badge">Emergency</span>
                </div>
                <br />
                <br />
                <div className="about-emergency-subtitle">
                  24/7 Emergency With Hotline Number
                </div>
              </div>
              <div className="about-emergency-title">
                We are always here to support your health
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="about-decorative-1"></div>
          </div>

          {/* Right Side - Content */}
          <div className="about-text-content">
            {/* About Us Badge */}
            <div className="about-badge">
              <span className="about-badge-text">About Us</span>
            </div>

            {/* Main Heading */}
            <div className="about-heading-container">
              <h2 className="about-heading">
                Our team of highly trained
                <span className="about-heading-highlight">medical</span>{" "}
                professionals is
                <br />
                here to provide the best possible care.
              </h2>
            </div>

            {/* Learn More Button */}
            <div className="about-learn-more">
              <button
                className="about-learn-btn"
                onClick={() => (window.location.href = "/about")}
              >
                <span>LEARN MORE</span>
                <div className="about-learn-icon">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;