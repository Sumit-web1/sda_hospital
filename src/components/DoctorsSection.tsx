import React from 'react';
import { getDoctorImage } from '../utils/doctorImageMapping';
import './DoctorsSection.css';

const DoctorsSection: React.FC = () => {
  const doctors = [
    {
      name: 'Dr. Rajkumar Chavakula',
      specialty: 'Medical Director',
      experience: '30+ Years',
      rating: 4.9,
      reviews: 450,
      education: 'MD, Medical Administration',
      image: getDoctorImage('Dr. Rajkumar Chavakula'),
      availability: 'Mon - Fri',
      location: 'Administration Department',
      description: 'Experienced medical director overseeing clinical operations and healthcare management with a focus on quality patient care.'
    },
    {
      name: 'Dr. Edwin Raj Talari',
      specialty: 'Paediatrics & Neonatology',
      experience: '15+ Years',
      rating: 4.8,
      reviews: 320,
      education: 'MBBS, DCH, Fellowship in Neonatology, MBA (Healthcare Management)',
      image: getDoctorImage('Dr. Edwin Raj Talari'),
      availability: 'Mon - Sat',
      location: 'Paediatrics & Neonatology Department',
      description: 'Experienced paediatric and neonatology specialist with strong expertise in NICU leadership, NABH accreditation, healthcare quality systems, and clinical process innovation. Skilled in patient safety, pharmacovigilance, and strategic hospital administration.'
    }
    ,
    {
      name: 'Dr. N S Prakash',
      specialty: 'General Medicine',
      experience: '14+ Years',
      rating: 4.7,
      reviews: 310,
      education: 'MD General Medicine',
      image: getDoctorImage('Dr. N S Prakash'),
      availability: 'Mon - Sat',
      location: 'General Medicine Department',
      description: 'Experienced physician providing comprehensive internal medicine care with expertise in diabetes and hypertension management.'
    }
  ];

  return (
    <section id="doctors" className="doctors-section">
      <div className="doctors-container">
        <div className="doctors-header">
          <div className="doctors-badge">
            <span className="doctors-badge-text">
              Our Doctors
            </span>
          </div>
          <h2 className="doctors-title">
            Meet our expert <span className="doctors-title-highlight">Doctor</span>
          </h2>
          <p className="doctors-description">
            Our dedicated team of experienced physicians and specialists are committed to providing exceptional healthcare with compassion, expertise, and personalized care for every patient.
          </p>
        </div>

        <div className="doctors-grid">
          {doctors.slice(0, 3).map((doctor, index) => (
            <div
              key={index}
              className="doctor-card"
            >
              <div className="doctor-image">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image-photo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="doctor-image-placeholder" style={{ display: 'none' }}>
                  <div className="doctor-image-icon">
                    <span>👨‍⚕️</span>
                  </div>
                </div>

                <div className="doctor-rating-badge">
                  <span className="doctor-rating-star">⭐</span>
                  <span className="doctor-rating-text">{doctor.rating}</span>
                </div>
              </div>

              <div className="doctor-info">
                <h3 className="doctor-name">
                  {doctor.name}
                </h3>
                <p className="doctor-specialty">
                  {doctor.specialty}
                </p>
                <p className="doctor-experience">
                  {doctor.experience} Experience
                </p>
                <p className="doctor-education">
                  {doctor.education}
                </p>

              </div>
            </div>
          ))}
        </div>

        <div className="doctors-view-all">
          <button
            className="doctors-view-all-btn"
            onClick={() => window.location.href = '/doctors'}
          >
            View All Doctors
          </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorsSection;
