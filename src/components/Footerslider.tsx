import React from 'react';
import './FooterSlider.css';

const FooterSlider: React.FC = () => {
  return (
    <div className="footer-slider-container">
      <div className="form-section">
        <h2 className="main-heading">Get A Call Back From Our Health Advisor Now</h2>
        <p className="sub-heading">Enter your details, and our advisor will call you back shortly!</p>
        <form className="contact-form">
          <input type="text" placeholder="Enter Your Name" className="name-input" />
          <div className="phone-input-wrapper">
            <span className="country-flag">🇮🇳</span>
            <input type="tel" placeholder="081234 56789" className="phone-input" />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <p className="consent-text">By submitting, you consent to receive calls, WhatsApp & SMS.</p>
      </div>
      <div className="image-section">
        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" alt="Health Advisor" className="advisor-image" />
      </div>
    </div>
  );
};

export default FooterSlider;