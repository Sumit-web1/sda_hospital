import React from 'react';
import { Check } from 'lucide-react';
import './HeartBehindCareSection.css';


const HeartBehindCareSection: React.FC = () => {
  const features = [
    "Provide care with love and compassion",
    "Use modern technology with faith",
    "Follow Christ's example in healing",
    "Focus on every patient's needs",
    "Offer affordable medical services",
    "Support the health of our community"
  ];

  return (
    <section className="heart-behind-care-section">
      <div className="heart-behind-care-container">
        <div className="heart-behind-care-content">
          {/* Left Content */}
          <div className="heart-behind-care-text">
            <h2 className="heart-behind-care-title">
              The Heart Behind<br />
              Our <span className="heart-behind-care-highlight">Care</span>
            </h2>
            
            <p className="heart-behind-care-description">
              At SDAMC, our goal is more than just providing medical care. We 
              aim to heal the body, uplift the spirit, and serve every individual with 
              Christ-like compassion. Our commitment is to combine cutting-
              edge healthcare with unwavering faith to bring hope and healing to 
              our community.
            </p>

            <div className="heart-behind-care-features">
              {features.map((feature, index) => (
                <div key={index} className="heart-behind-care-feature">
                  <div className="heart-behind-care-check">
                    <Check size={16} />
                  </div>
                  <span className="heart-behind-care-feature-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Doctor Image */}
          <div className="heart-behind-care-image">
            <div className="heart-behind-care-doctor">
              {/* <img src={DoctorImg} alt="Doctor & Patient" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeartBehindCareSection;
