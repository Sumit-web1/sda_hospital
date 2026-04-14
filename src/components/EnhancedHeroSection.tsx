import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ArrowRight, Star, Users, Award, Building2, Stethoscope, Pill, Cross } from 'lucide-react';
import BookingModal from './BookingModal';
import './EnhancedHeroSection.css';

const EnhancedHeroSection: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Department tags
  const departments = [
    'Cardiology',
    'Neurology', 
    'Orthopedics',
    'Pediatrics',
    'Oncology',
    'Emergency Care'
  ];

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  const handleSearch = () => {
    // Navigate to find doctor page with search query
    if (searchQuery.trim()) {
      window.location.href = `/find-doctor?search=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = '/find-doctor';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="enhanced-hero-section">
      {/* Full-screen video background */}
      <div className="enhanced-hero-video-container">
        <video
          ref={videoRef}
          className="enhanced-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://media.istockphoto.com/id/1297574801/video/medical-science-laboratory-beautiful-black-scientist-looking-under-microscope-writes-down.mp4?s=mp4-640x640-is&k=20&c=hfoQCr3xo5lmokbVATCKrrJFP_SVnnGWsM2DgaCxdbE="
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Professional video overlay */}
        <div className="enhanced-hero-video-overlay"></div>
      </div>

      {/* Animated background elements */}
      <div className="enhanced-hero-bg-elements">
        <div className="enhanced-hero-bg-circle enhanced-hero-bg-circle-1"></div>
        <div className="enhanced-hero-bg-circle enhanced-hero-bg-circle-2"></div>
        <div className="enhanced-hero-bg-circle enhanced-hero-bg-circle-3"></div>
      </div>

      {/* Main content */}
      <div className="enhanced-hero-content-wrapper">
        <div className="enhanced-hero-container">
          
          {/* Left side - Main content */}
          <div className="enhanced-hero-left-content">
            {/* Hospital badge */}
            <div className="enhanced-hero-badge">
              <Building2 className="enhanced-hero-badge-icon" />
              <span>Seventh-Day Adventist Medical Centre</span>
            </div>

            {/* Main title */}
            <div className="enhanced-hero-title-section">
              <h1 className="enhanced-hero-title">
                <span className="enhanced-hero-title-line">Advanced Medical</span>
                <span className="enhanced-hero-title-line enhanced-hero-title-highlight">Excellence</span>
                <span className="enhanced-hero-title-line">Guided by Faith</span>
              </h1>
              <p className="enhanced-hero-subtitle">
                Experience world-class healthcare with compassionate care, cutting-edge technology, 
                and medical expertise rooted in Christian values.
              </p>
            </div>

            {/* Stats section */}
            {/* <div className="enhanced-hero-stats">
              <div className="enhanced-hero-stat-item">
                <Star className="enhanced-hero-stat-icon" size={20} />
                <div className="enhanced-hero-stat-number">25+</div>
                <div className="enhanced-hero-stat-label">Years Experience</div>
              </div>
              <div className="enhanced-hero-stat-item">
                <Users className="enhanced-hero-stat-icon" size={20} />
                <div className="enhanced-hero-stat-number">50+</div>
                <div className="enhanced-hero-stat-label">Expert Doctors</div>
              </div>
              <div className="enhanced-hero-stat-item">
                <Award className="enhanced-hero-stat-icon" size={20} />
                <div className="enhanced-hero-stat-number">100K+</div>
                <div className="enhanced-hero-stat-label">Happy Patients</div>
              </div>
            </div> */}

            {/* Action buttons */}
            <div className="enhanced-hero-actions">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="enhanced-hero-btn enhanced-hero-btn-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                <span>Book Appointment</span>
                {/* <ArrowRight size={20} /> */}
              </button>
              <button 
                onClick={() => window.location.href = '/find-doctor'}
                className="enhanced-hero-btn enhanced-hero-btn-secondary"
              >
                <Search size={20} />
                <span>Find Doctor</span>
              </button>
            </div>
          </div>

          {/* Right side - Search card */}
          <div className="enhanced-hero-right-content">
            <div className="enhanced-hero-search-card">
              <div className="enhanced-hero-search-header">
                <h3>Find Your Doctor</h3>
                <p>Search by name or specialty</p>
              </div>
              
              <div className="enhanced-hero-search-form">
                <div className="enhanced-hero-search-input-group">
                  <Search className="enhanced-hero-search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Search doctors, specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="enhanced-hero-search-input"
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className="enhanced-hero-search-submit"
                >
                  Search
                </button>
              </div>

              {/* Popular specialties */}
              <div className="enhanced-hero-popular-specialties">
                <p className="enhanced-hero-popular-title">Popular Specialties:</p>
                <div className="enhanced-hero-specialty-tags">
                  {departments.slice(0, 4).map((dept, index) => (
                    <button 
                      key={index} 
                      className="enhanced-hero-specialty-tag"
                      onClick={() => window.location.href = `/find-doctor?specialty=${dept}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="enhanced-hero-floating-elements">
            <div className="enhanced-hero-floating-card enhanced-hero-floating-card-1">
              <Cross className="enhanced-hero-floating-icon" size={20} />
              <div className="enhanced-hero-floating-text">24/7 Emergency Care</div>
            </div>
            <div className="enhanced-hero-floating-card enhanced-hero-floating-card-2">
              <Stethoscope className="enhanced-hero-floating-icon" size={20} />
              <div className="enhanced-hero-floating-text">Advanced Diagnostics</div>
            </div>
            <div className="enhanced-hero-floating-card enhanced-hero-floating-card-3">
              <Pill className="enhanced-hero-floating-icon" size={20} />
              <div className="enhanced-hero-floating-text">Modern Pharmacy</div>
            </div>
          </div>

          {/* Scroll indicator */}
          {/* <div className="enhanced-hero-scroll-indicator">
            <div className="enhanced-hero-scroll-text">Scroll to explore</div>
            <ChevronDown size={24} />
          </div> */}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
        />
      )}
    </section>
  );
};

export default EnhancedHeroSection;
