import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import BookingModal from './BookingModal';
import './ApolloHeroSection.css';

const ApolloHeroSection: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Action buttons as shown in Apollo design
  const actionButtons = [
    { title: 'Book Appointment', icon: '📅' },
    { title: 'Find Hospital', icon: '🏥' },
    { title: 'Book Health Check', icon: '🩺' },
    { title: 'Get Expert Opinion', icon: '👨‍⚕️' }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  const handleSearch = () => {
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
    <section className="apollo-hero-section">
      {/* Background Video */}
      <div className="apollo-hero-background">
        <video
          ref={videoRef}
          className="apollo-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hospital-hero.mp4" type="video/mp4" />
          {/* Fallback image */}
          <div className="apollo-hero-fallback">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Medical facility background" 
            />
          </div>
        </video>
        <div className="apollo-hero-overlay"></div>
      </div>

      {/* Main content */}
      <div className="apollo-hero-content">
        <div className="apollo-hero-container">
          
          {/* Central Search Section - Apollo Style */}
          <div className="apollo-search-section">
            <div className="apollo-search-container">
              <input
                type="text"
                placeholder="Search For Doctors & Specialities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="apollo-search-input"
              />
              <button 
                onClick={handleSearch}
                className="apollo-search-button"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Action Buttons - Apollo Style */}
          <div className="apollo-action-buttons">
            {actionButtons.map((button, index) => (
              <button 
                key={index} 
                className="apollo-action-btn"
                onClick={() => {
                  if (button.title === 'Book Appointment') {
                    setIsBookingOpen(true);
                  }
                }}
              >
                <span className="apollo-btn-icon">{button.icon}</span>
                <span className="apollo-btn-text">{button.title}</span>
                <ArrowRight size={16} className="apollo-btn-arrow" />
              </button>
            ))}
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

export default ApolloHeroSection;
