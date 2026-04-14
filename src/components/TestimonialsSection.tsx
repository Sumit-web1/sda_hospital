import React, { useState, useEffect } from 'react';
import './TestimonialsSection.css';
const GoogleLogo = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Prince Shelton',
      rating: 5.0,
      testimonial: 'I had an excellent experience at 7th Day Hospital. Dr. Alice was professional, attentive, and made me feel at ease with her clear explanations and genuine care. The receptionist was also welcoming, efficient, and very helpful. Highly recommend both the doctor and the staff for their outstanding service and supportive environment.'
    },
    {
      id: 2,
      name: 'Joy',
      rating: 5.0,
      testimonial: 'I recently visited the emergency department at Seventh Day Adventist Hospital and am truly grateful for the care I received. Special thanks to Sister Mamatha for her exceptional skill and calming presence during my IV insertion. The entire emergency team was professional, attentive, and made sure I was comfortable throughout. Thank you all for your dedicated care during a difficult time!'
    },
    {
      id: 3,
      name: 'Syedsaif Ali',
      rating: 5.0,
      testimonial: 'I am beyond grateful to Dr. Kalai Hema for the exceptional care and support I received throughout our pregnancy and during the delivery of my child. The professionalism, expertise, and compassionate approach made our entire journey comfortable and stress-free. The hospital staff was equally supportive and caring. Thank you for making this special moment in our lives so memorable and safe.'
    },
    {
      id: 4,
      name: 'Umesh',
      rating: 5.0,
      testimonial: 'We recently welcomed our baby at Seventh-day Adventist Hospital, and we had a truly wonderful experience. Our entire journey was guided by Dr. Pearlin Raj, who is one of the best doctors we\'ve ever come across. Her expertise, care, and dedication throughout the pregnancy and delivery process was exceptional. The hospital staff was equally supportive and professional. We couldn\'t have asked for better care during this special time.'
    },
    {
      id: 5,
      name: 'Srinivas Krishnappa',
      rating: 5.0,
      testimonial: 'I had visited this hospital for my wife health issue and Dr Arun advised to undergo surgery as this is a case of Hernia and we decided for the same. Ms. Sindhuja was very much helpful and soft spoken person, each and every staff person are very friendly and helpful. Even the doctor and nurse visit was frequent to check the patient. I really appreciate the total service.'
    },
    {
      id: 6,
      name: 'Jerline John',
      rating: 5.0,
      testimonial: 'My experience was very good in the hospital. The nurses and doctors took good care of the patient. Thanks to the hospital management for financially helping us. One of most affordable hospital with excellent care and compassionate staff. The support we received during our time of need was truly remarkable.'
    },
    {
      id: 7,
      name: 'Arbeen Taj',
      rating: 4.0,
      testimonial: 'We visited Dr. Pearlin and it was the best decision choosing SDM for my delivery. The doctor is true to her work. She may not promise for natural delivery until the last minute but she\'ll give her best for natural delivery without creating false hopes. Her honest approach and dedication to patient care is commendable.'
    },
    {
      id: 8,
      name: 'Sumera Sanober',
      rating: 5.0,
      testimonial: 'Thank u so much for the service. Dr. Mathew was kind, and he explained everything in easy way to understand. And also sister Ludiya was there till the discharge and helped us. Thank you for your good service. The care and attention we received from the entire team was exceptional.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalSlides = isMobile ? testimonials.length : testimonials.length - 2;

  // Auto-scroll functionality - slide one card at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Calculate transform based on device type
  const getTransform = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}%)`;
    } else {
      return `translateX(-${currentIndex * (100/3)}%)`;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`testimonial-star ${index < rating ? 'testimonial-star-filled' : 'testimonial-star-empty'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-background"></div>
      <div className="testimonials-container">
        {/* Section Header */}
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <span className="testimonials-badge-text">Testimonials</span>
          </div>
          <div className="testimonials-title-wrapper">
            <h2 className="testimonials-title">
              Our Patients always love us
            </h2>
            <div className="testimonials-rating-summary">
              <span className="rating-stars">★★★★☆</span>
              <span className="rating-text">Rated 4.8/5 on</span>
    <img src={GoogleLogo} alt="Google" className="google-logo" />
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="testimonials-slider">
          <div
            className="testimonials-track"
            style={{ transform: getTransform() }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                {/* Quote Icon */}
                <div className="testimonial-quote-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#4A90E2" fillOpacity="0.1"/>
                    <path d="M23.35 26v-4.87c0-3.76 2.46-6.31 5.92-6.99l.66 1.42c-1.6.6-2.63 2.4-2.63 3.86h2.64V26h-6.59zm-9.24 0v-4.87c0-3.76 2.47-6.31 5.93-6.99l.66 1.42c-1.6.6-2.64 2.4-2.64 3.86h2.64V26h-6.59z" fill="#4A90E2"/>
                  </svg>
                </div>

                {/* Testimonial Text */}
                <p className="testimonial-text">
                  {testimonial.testimonial}
                </p>

                {/* Patient Info and Rating */}
                <div className="testimonial-footer">
                  <div className="testimonial-patient-info">
                    <h4 className="testimonial-patient-name">{testimonial.name}</h4>
                  </div>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                    <span className="testimonial-rating-number">{testimonial.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="testimonials-navigation">
            <button className="testimonials-nav-btn prev" onClick={prevSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="testimonials-nav-btn next" onClick={nextSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="testimonials-dots">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
