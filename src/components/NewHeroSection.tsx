import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ArrowRight, Star, Users, Award } from 'lucide-react';
import BookingModal from './BookingModal';
import './NewHeroSection.css';


const NewHeroSection: React.FC = () => {
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
    <section className="new-hero-section">
      {/* Full-screen video background */}
      <div className="new-hero-video-container">
        <video
          ref={videoRef}
          className="new-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Using a medical/hospital stock video */}
          <source
            src="https://media.istockphoto.com/id/1297574801/video/medical-science-laboratory-beautiful-black-scientist-looking-under-microscope-writes-down.mp4?s=mp4-640x640-is&k=20&c=hfoQCr3xo5lmokbVATCKrrJFP_SVnnGWsM2DgaCxdbE="
            type="video/mp4"
          />
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="new-hero-video-overlay"></div>
      </div>



      {/* Main content */}
      <div className="new-hero-content-wrapper">
        <div className="new-hero-container">
          {/* Main title */}
          <div className="new-hero-title-section">
            <h1 className="new-hero-title">
              Medical Expertise Guided by God’s Grace
            </h1>
            <p className="new-hero-subtitle">
              Excellence in Healthcare • Compassionate Care • Advanced Medical Technology
            </p>
          </div>

          {/* Search section */}
          <div className="new-hero-search-section">
            <div className="new-hero-search-container">
              <h2 className="new-hero-search-title">Search Our Doctors</h2>
              <div className="new-hero-search-box">
                <input
                  type="text"
                  placeholder="Find Doctor"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="new-hero-search-input"
                />
                <button 
                  onClick={handleSearch}
                  className="new-hero-search-button"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Department tags */}
          <div className="new-hero-departments">
            {departments.map((dept, index) => (
              <span key={index} className="new-hero-department-tag">
                {dept}
              </span>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="new-hero-scroll-indicator">
            <ChevronDown size={24} />
          </div>
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

export default NewHeroSection;
