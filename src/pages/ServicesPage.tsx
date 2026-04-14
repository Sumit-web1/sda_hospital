import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import {
  Heart,
  Eye,
  Bone,
  Baby,
  Stethoscope,
  Activity,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Phone,
  Calendar,
  MapPin,
  ChevronDown
} from 'lucide-react';
import './ServicesPage.css';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
  category: string;
  availability: string;
  rating: number;
  reviews: number;
}

const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);


  const handleBookAppointment = () => {
    setIsBookingOpen(true);
  };

  const allServices: Service[] = [
    {
      id: 'lifestyle-medicine',
      title: 'Lifestyle Medicine',
      description: 'Focuses on addressing underlying causes of chronic diseases through lifestyle interventions.',
      icon: <Heart size={32} />,
      features: ['Nutrition Counseling', 'Physical Activity Plans', 'Stress Management'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 'physiotherapy',
      title: 'Physiotherapy',
      description: 'Helps patients recover from injuries, illnesses, and surgeries using various techniques.',
      icon: <Activity size={32} />,
      features: ['Injury Recovery', 'Post-Surgery Rehab', 'Pain Management'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 'ophthalmology',
      title: 'Ophthalmology',
      description: 'Caters to all eye and vision related problems, including regular check-ups for all ages.',
      icon: <Eye size={32} />,
      features: ['Vision Exams', 'Slit Lamp Examinations', 'Eye Surgery'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.9,
      reviews: 234
    },
    {
      id: 'ent',
      title: 'Ear, Nose and Throat',
      description: 'Specializes in treating conditions and diseases related to the ears, nose, and throat.',
      icon: <Stethoscope size={32} />,
      features: ['Hearing Tests', 'Throat Surgery', 'Sinus Treatment'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.6,
      reviews: 167
    },
    {
      id: 'general-medicine',
      title: 'General Medicine',
      description: 'Provides comprehensive care for adults with various medical ailments, offering a range of services.',
      icon: <Stethoscope size={32} />,
      features: ['Health Checkups', 'Chronic Disease Management', 'Preventive Care'],
      image: '/api/placeholder/400/300',
      category: 'primary',
      availability: '24/7',
      rating: 4.8,
      reviews: 312
    },
    {
      id: 'orthopedics',
      title: 'Orthopedics',
      description: 'Focuses on the diagnosis and rehabilitation of conditions of the musculoskeletal system.',
      icon: <Bone size={32} />,
      features: ['Joint Replacement', 'Fracture Care', 'Sports Medicine'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.7,
      reviews: 198
    },
    {
      id: 'paediatrics',
      title: 'Paediatrics',
      description: 'Provides expert care for newborns and children up to 15 years of age.',
      icon: <Baby size={32} />,
      features: ['Newborn Care', 'Child Health', 'Vaccinations'],
      image: '/api/placeholder/400/300',
      category: 'primary',
      availability: 'Mon-Sat',
      rating: 4.9,
      reviews: 278
    },
    {
      id: 'cardiology',
      title: 'Cardiology',
      description: 'Focuses on the diagnosis and treatment of diseases of the heart and cardiovascular system.',
      icon: <Heart size={32} />,
      features: ['Heart Diagnosis', 'ECG Services', 'Heart Surgery'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.9,
      reviews: 245
    },
    {
      id: 'obstetrics-gynaecology',
      title: 'Obstetrics & Gynaecology',
      description: 'Our flagship speciality, providing expert care to women for over 30 years.',
      icon: <Heart size={32} />,
      features: ['Pregnancy Care', 'Gynecological Surgery', 'Women\'s Health'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.8,
      reviews: 356
    },
    {
      id: 'laboratory',
      title: '24-Hour Laboratory',
      description: 'Medical testing and analysis performed on patient specimens to diagnose and monitor diseases.',
      icon: <Activity size={32} />,
      features: ['Blood Tests', 'Urine Analysis', '24/7 Service'],
      image: '/api/placeholder/400/300',
      category: 'diagnostic',
      availability: '24/7',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 'radiology',
      title: 'Radiology',
      description: 'Uses imaging techniques like X-rays, CT scans, and MRI to diagnose and treat diseases.',
      icon: <Activity size={32} />,
      features: ['X-rays', 'CT Scans', 'MRI & Ultrasound'],
      image: '/api/placeholder/400/300',
      category: 'diagnostic',
      availability: '24/7',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 'general-laparoscopic-surgery',
      title: 'General & Laparoscopic Surgery',
      description: 'Committed to providing compassionate and quality care for patients needing surgical intervention.',
      icon: <Activity size={32} />,
      features: ['Minimally Invasive Surgery', 'Emergency Surgery', 'Post-op Care'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.9,
      reviews: 167
    },
    {
      id: 'gastroenterology',
      title: 'Gastroenterology',
      description: 'Specializes in diagnosis and treatment of problems relating to the esophagus, stomach and intestines.',
      icon: <Activity size={32} />,
      features: ['Endoscopy', 'Digestive Disorders', 'Liver Care'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.7,
      reviews: 145
    },
    {
      id: 'dermatology',
      title: 'Dermatology',
      description: 'Deals with the diagnosis and treatment of skin, hair, and nail disorders.',
      icon: <Shield size={32} />,
      features: ['Skin Treatment', 'Hair Care', 'Cosmetic Procedures'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.6,
      reviews: 123
    },
    {
      id: 'anaesthesiology',
      title: 'Anaesthesiology',
      description: 'Involves the administration of anesthesia to patients undergoing surgical procedures.',
      icon: <Activity size={32} />,
      features: ['Surgical Anesthesia', 'Pain Management', 'Critical Care'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.8,
      reviews: 98
    },
    {
      id: 'pulmonology',
      title: 'Pulmonology',
      description: 'Focuses on the diagnosis and treatment of lung and respiratory system diseases.',
      icon: <Activity size={32} />,
      features: ['Lung Function Tests', 'Respiratory Care', 'Asthma Treatment'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 'nephrology',
      title: 'Nephrology',
      description: 'Focuses on the diagnosis, treatment, and management of diseases that affect the kidneys.',
      icon: <Activity size={32} />,
      features: ['Kidney Care', 'Dialysis', 'Transplant Support'],
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.8,
      reviews: 134
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: <Stethoscope size={20} /> },
    { id: 'specialty', name: 'Specialty Care', icon: <Heart size={20} /> },
    { id: 'primary', name: 'Primary Care', icon: <Shield size={20} /> },
    { id: 'diagnostic', name: 'Diagnostic Services', icon: <Activity size={20} /> }
  ];

  const filteredServices = selectedCategory === 'all'
    ? allServices
    : allServices.filter(service => service.category === selectedCategory);

  const handleLoadMore = () => {
    setSelectedCategory('all');
    setVisibleCount(allServices.length);
  };

  return (
    <div className="services-page">
      <Header />

      <section className="page-header">
        <div className="page-header-background">
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-container">
          <div className="page-header-content">
            <h1 className="page-header-title">Our Services</h1>
            <div className="page-header-breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item active">Services</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-main">
        <div className="container-custom">
          <div className="services-filter">
            <h2 className="services-section-title">Our Medical Services</h2>
            <div className="services-categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`services-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setVisibleCount(6);
                  }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="services-grid">
            {filteredServices.slice(0, visibleCount).map((service, index) => (
              <div
                key={service.id}
                className="service-card"
                style={{ animationDelay: `${(index % 6) * 0.1}s` }}
              >
                <div className="service-card-header">
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-availability">
                    <Clock size={14} />
                    <span>{service.availability}</span>
                  </div>
                </div>

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <div className="service-features">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="service-feature">
                        <CheckCircle size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="service-rating">
                    <div className="service-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(service.rating) ? 'filled' : ''}
                        />
                      ))}
                      <span className="service-rating-value">{service.rating}</span>
                    </div>
                    <span className="service-reviews">({service.reviews} reviews)</span>
                  </div>
                </div>

                <div className="service-actions">
                  <button
                    className="service-btn-secondary"
                    onClick={() => setIsCallPopupOpen(true)}
                  >
                    <Phone size={16} />
                    Call Now
                  </button>

                  <button
                    className="service-btn-primary"
                    onClick={handleBookAppointment}
                  >
                    <Calendar size={16} />
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredServices.length && (
            <div className="services-load-more-container">
              <button onClick={handleLoadMore} className="services-load-more-btn">
                <ChevronDown size={20} />
                <span>Load More Services</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="services-cta">
        <div className="container-custom">
          <div className="services-cta-content">
            <div className="services-cta-text">
              <h2>Need Immediate Medical Attention?</h2>
              <p>Our emergency department is open 24/7 with expert medical staff ready to help.</p>
            </div>
            <div className="services-cta-actions">
              <button className="services-cta-emergency">
                <Activity size={20} />
                Emergency: 911
              </button>
              <button className="services-cta-location">
                <MapPin size={20} />
                Find Location
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {isCallPopupOpen && (
        <div className="call-popup-overlay" onClick={() => setIsCallPopupOpen(false)}>
          <div className="call-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Call Us Now</h3>
            <p>Phone Number: <strong>+91 990 110 3439</strong></p>
            <button onClick={() => setIsCallPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}


      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default ServicesPage;