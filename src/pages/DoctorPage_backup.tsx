import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowRight, Star, Award, Clock, MapPin, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDoctorImage } from '../utils/doctorImageMapping';
import './DoctorPage.css';

gsap.registerPlugin(ScrollTrigger);

const DoctorPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Doctors organized by departments
  const doctorsByDepartment = {
    'Administration': [
      {
        id: 1,
        name: 'Dr. Rajkumar Chavakula',
        specialty: 'Medical Director',
        experience: '20+ Years',
        rating: 4.9,
        reviews: 450,
        image: getDoctorImage('Dr. Rajkumar Chavakula'),
        education: 'MD, Medical Administration',
        location: 'Administration Department',
        phone: '+91 9901103439',
        email: 'rajkumar.chavakula@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Telugu'],
        specializations: ['Medical Administration', 'Healthcare Management', 'Clinical Operations'],
        about: 'As a Medical Director at Seventh Day Adventist Medical Centre hospital I am responsible for overseeing the medical and clinical operations of the hospital.'
      },
      {
        id: 2,
        name: 'Mr. Saji Varghese',
        specialty: 'Administrator',
        experience: '18+ Years',
        rating: 4.7,
        reviews: 320,
        image: getDoctorImage('Mr. Saji Varghese'),
        education: 'MBA Healthcare Management',
        location: 'Administration Department',
        phone: '+91 9901103439',
        email: 'saji.varghese@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Malayalam'],
        specializations: ['Healthcare Administration', 'Operations Management', 'Resource Coordination'],
        about: 'I am responsible for overseeing and coordinating the day-to-day operations of a business or organization and ensuring the efficient use of resources to meet the company\'s objectives.'
      },
      {
        id: 3,
        name: 'Mrs. T. Mary Grace',
        specialty: 'Nursing Superintendent',
        experience: '22+ Years',
        rating: 4.8,
        reviews: 380,
        image: getDoctorImage('Mrs. T. Mary Grace'),
        education: 'MSc Nursing',
        location: 'Nursing Department',
        phone: '+91 9901103439',
        email: 'mary.grace@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Tamil'],
        specializations: ['Nursing Administration', 'Patient Care Management', 'Staff Supervision'],
        about: 'A Nursing Superintendent, also known as a Director of Nursing, is a senior-level nursing professional who is responsible for the overall management and administration of the nursing department in a hospital'
      }
    ],
    'Internal Medicine': [
      {
        id: 10,
        name: 'Dr. N S Prakash',
        specialty: 'General Medicine',
        experience: '16+ Years',
        rating: 4.7,
        reviews: 290,
        image: getDoctorImage('Dr. N S Prakash'),
        education: 'MD General Medicine',
        location: 'General Medicine Department',
        phone: '+91 9901103439',
        email: 'ns.prakash@sdamc.com',
        availability: 'Mon - Fri, 8:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['Internal Medicine', 'Diabetes Care', 'Hypertension Management'],
        about: 'As a General Medicine doctor, we are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.'
      },
      {
        id: 11,
        name: 'Dr. Vandeman Wilson',
        specialty: 'General Medicine',
        experience: '18+ Years',
        rating: 4.7,
        reviews: 310,
        image: getDoctorImage('Dr. Vandeman Wilson'),
        education: 'MD General Medicine',
        location: 'General Medicine Department',
        phone: '+91 9901103439',
        email: 'vandeman.wilson@sdamc.com',
        availability: 'Mon - Fri, 8:00 AM - 5:00 PM',
        languages: ['English', 'Hindi'],
        specializations: ['Internal Medicine', 'Diabetes Care', 'Preventive Medicine'],
        about: 'As a General Medicine doctor, you are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.'
      },
      {
        id: 12,
        name: 'Dr. Zain Hussain',
        specialty: 'General Medicine',
        experience: '12+ Years',
        rating: 4.6,
        reviews: 250,
        image: getDoctorImage('Dr. Zain Hussain'),
        education: 'MD General Medicine',
        location: 'General Medicine Department',
        phone: '+91 9901103439',
        email: 'zain.hussain@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Urdu'],
        specializations: ['Internal Medicine', 'Emergency Medicine', 'Critical Care'],
        about: 'As a General Medicine doctor, you are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.'
      }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Cards animation
      gsap.fromTo(".doctor-card", 
        { opacity: 0, y: 100, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="doctor-page" ref={pageRef}>
      <Header />
      
      {/* Page Header */}
      <section className="page-header" ref={headerRef}>
        <div className="page-header-background">
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-container">
          <div className="page-header-content">
            <h1 className="page-header-title">Our Doctors</h1>
            <div className="page-header-breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item active">Doctors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <div className="doctors-container">
          {/* Section Header */}
          <div className="doctors-header">
            <div className="doctors-badge">
              <span className="doctors-badge-text">Meet Our Team</span>
            </div>
            <h2 className="doctors-title">
              Expert Medical Professionals
            </h2>
            <p className="doctors-subtitle">
              Our team of highly qualified doctors and specialists are dedicated to providing 
              exceptional healthcare with compassion and expertise.
            </p>
          </div>

          {/* Doctors by Department */}
          <div ref={cardsRef}>
            {Object.entries(doctorsByDepartment).map(([department, doctors]) => (
              <div key={department} className="department-section">
                <h3 className="department-title">{department}</h3>
                <div className="doctors-grid">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                      <div className="doctor-card-inner">
                        {/* Front of card */}
                        <div className="doctor-card-front">
                          <div className="doctor-image-container">
                            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                            <div className="doctor-overlay">
                              <div className="doctor-rating">
                                <Star className="star-icon" />
                                <span>{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="doctor-info">
                            <h3 className="doctor-name">{doctor.name}</h3>
                            <p className="doctor-specialty">{doctor.specialty}</p>
                            <div className="doctor-experience">
                              <Award className="experience-icon" />
                              <span>{doctor.experience} Experience</span>
                            </div>
                            <div className="doctor-reviews">
                              <span>{doctor.reviews} Reviews</span>
                            </div>
                          </div>
                        </div>

                        {/* Back of card */}
                        <div className="doctor-card-back">
                          <div className="doctor-details">
                            <h3 className="doctor-name">{doctor.name}</h3>
                            <p className="doctor-education">{doctor.education}</p>
                            
                            <div className="doctor-contact">
                              <div className="contact-item">
                                <MapPin className="contact-icon" />
                                <span>{doctor.location}</span>
                              </div>
                              <div className="contact-item">
                                <Clock className="contact-icon" />
                                <span>{doctor.availability}</span>
                              </div>
                              <div className="contact-item">
                                <Phone className="contact-icon" />
                                <span>{doctor.phone}</span>
                              </div>
                            </div>

                            <div className="doctor-specializations">
                              <h4>Specializations:</h4>
                              <div className="specialization-tags">
                                {doctor.specializations.map((spec, index) => (
                                  <span key={index} className="specialization-tag">{spec}</span>
                                ))}
                              </div>
                            </div>

                            <button className="book-appointment-btn">
                              <Calendar className="btn-icon" />
                              Book Appointment
                              <ArrowRight className="btn-arrow" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorPage;
