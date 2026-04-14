import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Award,
  Users,
  ArrowLeft,
  Filter
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { getDoctorImage } from '../utils/doctorImageMapping';
import './FindDoctorPage.css';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: number;
  rating: number;
  reviews: number;
  education: string;
  languages: string[];
  availability: string[];
  location: string;
  consultationFee: number;
  image: string;
  about: string;
  achievements: string[];
}

const FindDoctorPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [_selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const departments = [
    'Cardiology',
    'Neurology', 
    'Orthopedics',
    'Pediatrics',
    'Gynecology',
    'General Medicine',
    'Emergency',
    'Dermatology',
    'Psychiatry',
    'Oncology'
  ];

  const specialties = [
    'Heart Surgery',
    'Brain Surgery',
    'Joint Replacement',
    'Child Care',
    'Women Health',
    'General Practice',
    'Emergency Care',
    'Skin Treatment',
    'Mental Health',
    'Cancer Treatment'
  ];

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchTerm, selectedDepartment, selectedSpecialty, sortBy]);

  const loadDoctors = async () => {
    setLoading(true);

    // Real doctors data from SDA Medical Centre
    const realDoctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Rajkumar Chavakula',
        specialty: 'Medical Director',
        department: 'Administration',
        experience: 20,
        rating: 4.9,
        reviews: 450,
        education: 'MD, Medical Administration',
        languages: ['English', 'Hindi', 'Telugu'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        location: 'Administration Department',
        consultationFee: 2000,
        image: getDoctorImage('Dr. Rajkumar Chavakula'),
        about: 'As a Medical Director at Seventh Day Adventist Medical Centre hospital I am responsible for overseeing the medical and clinical operations of the hospital.',
        achievements: ['Medical Administration Expert', 'Healthcare Management', 'Clinical Operations']
      },
      {
        id: '4',
        name: 'Dr. P. G. Ashok Kumar',
        specialty: 'Cardiologist',
        department: 'Cardiology',
        experience: 18,
        rating: 4.8,
        reviews: 380,
        education: 'MD, DM Cardiology',
        languages: ['English', 'Hindi', 'Kannada'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        location: 'Cardiology Department',
        consultationFee: 1800,
        image: getDoctorImage('Dr. P. G. Ashok Kumar'),
        about: 'As a cardiac doctor, also known as a cardiologist, my primary area of expertise is the diagnosis and treatment of heart conditions and diseases.',
        achievements: ['Heart Disease Expert', 'Cardiac Catheterization', 'Preventive Cardiology']
      },
      {
        id: '5',
        name: 'Dr. N S Prakash',
        specialty: 'General Medicine',
        department: 'General Medicine',
        experience: 16,
        rating: 4.7,
        reviews: 290,
        education: 'MD General Medicine',
        languages: ['English', 'Hindi', 'Kannada'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        location: 'General Medicine Department',
        consultationFee: 1000,
        image: getDoctorImage('Dr. N S Prakash'),
        about: 'As a General Medicine doctor, we are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.',
        achievements: ['Internal Medicine Expert', 'Diabetes Care', 'Hypertension Management']
      },
      {
        id: '6',
        name: 'Dr. Femi Francis',
        specialty: 'Obstetrician & Gynaecologist',
        department: 'Obstetrics & Gynaecology',
        experience: 14,
        rating: 4.7,
        reviews: 320,
        education: 'MD OBG',
        languages: ['English', 'Hindi', 'Malayalam'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        location: 'Obstetrics & Gynaecology Department',
        consultationFee: 1500,
        image: getDoctorImage('Dr. Femi Francis'),
        about: 'An Obstetrician and Gynaecologist (OB/GYN) is a medical doctor who specializes in the care of women during pregnancy, childbirth, and the postpartum period.',
        achievements: ['Pregnancy Care Expert', 'Gynecological Surgery', 'Women\'s Health Specialist']
      },
      {
        id: '7',
        name: 'Dr. Ashok Rijhwani',
        specialty: 'Paediatric Surgeon',
        department: 'Paediatric Surgery',
        experience: 20,
        rating: 4.8,
        reviews: 280,
        education: 'MS Pediatric Surgery',
        languages: ['English', 'Hindi', 'Gujarati'],
        availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        location: 'Paediatric Surgery Department',
        consultationFee: 2000,
        image: getDoctorImage('Dr. Ashok Rijhwani'),
        about: 'A pediatric surgeon is a medical doctor who specializes in the surgical treatment of infants, children, and adolescents.',
        achievements: ['Pediatric Surgery Expert', 'Neonatal Surgery', 'Minimally Invasive Surgery']
      },
      {
        id: '9',
        name: 'Dr. Zain Hussain',
        specialty: 'General Medicine',
        department: 'General Medicine',
        experience: 12,
        rating: 4.6,
        reviews: 250,
        education: 'MD General Medicine',
        languages: ['English', 'Hindi', 'Urdu'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        location: 'General Medicine Department',
        consultationFee: 1000,
        image: getDoctorImage('Dr. Zain Hussain'),
        about: 'As a General Medicine doctor, you are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.',
        achievements: ['Internal Medicine Expert', 'Emergency Medicine', 'Critical Care']
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setDoctors(realDoctors);
      setLoading(false);
    }, 1000);
  };

  const filterDoctors = () => {
    let filtered = [...doctors];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment) {
      filtered = filtered.filter(doctor => doctor.department === selectedDepartment);
    }

    // Specialty filter
    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee':
          return a.consultationFee - b.consultationFee;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('');
    setSelectedSpecialty('');
    setSortBy('rating');
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  const goBack = () => {
    window.history.back();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < Math.floor(rating) ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  return (
    <div className="find-doctor-page">
      <Header />
      
      <main className="find-doctor-main">
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <div className="page-navigation">
              <button className="back-button" onClick={goBack}>
                <ArrowLeft size={20} />
                Back
              </button>
              <button
                className="dashboard-link"
                onClick={() => window.location.href = '/doctor-dashboard'}
              >
                👨‍⚕️ Doctor Dashboard
              </button>
            </div>
            <div className="page-title">
              <h1>Find Doctor</h1>
              <p>Search and book appointments with our expert doctors</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="search-filters-section">
          <div className="container">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filters-row">
              <div className="filter-group">
                <label>Department</label>
                <select 
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Specialty</label>
                <select 
                  value={selectedSpecialty} 
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="fee">Lowest Fee</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              <button className="clear-filters-btn" onClick={clearFilters}>
                <Filter size={16} />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          <div className="container">
            <div className="results-header">
              <h2>
                {loading ? 'Loading...' : `${filteredDoctors.length} Doctors Found`}
              </h2>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <span>Finding the best doctors for you...</span>
              </div>
            ) : (
              <div className="doctors-grid">
                {filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="find-doctor-card">
                    <div className="doctor-card-header">
                      <div className="doctor-avatar">
                        {doctor.image.startsWith('http') ? (
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="doctor-avatar-image"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = '👨‍⚕️';
                            }}
                          />
                        ) : (
                          <span className="doctor-avatar-emoji">{doctor.image}</span>
                        )}
                      </div>
                      <div className="doctor-basic-info">
                        <h3>{doctor.name}</h3>
                        <p className="specialty">{doctor.specialty}</p>
                        <p className="department">{doctor.department}</p>
                      </div>
                      <div className="doctor-rating">
                        <div className="stars">
                          {renderStars(doctor.rating)}
                        </div>
                        <span className="rating-text">
                          {doctor.rating} ({doctor.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="doctor-details">
                      <div className="detail-item">
                        <Award size={16} />
                        <span>{doctor.experience} years experience</span>
                      </div>
                      <div className="detail-item">
                        <MapPin size={16} />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="detail-item">
                        <Users size={16} />
                        <span>Fee: ₹{doctor.consultationFee}</span>
                      </div>
                    </div>

                    <div className="doctor-about">
                      <p>{doctor.about}</p>
                    </div>

                    <div className="doctor-availability">
                      <h4>Available Days:</h4>
                      <div className="availability-tags">
                        {doctor.availability.map(day => (
                          <span key={day} className="availability-tag">{day}</span>
                        ))}
                      </div>
                    </div>

                    <div className="doctor-actions">
                      <button 
                        className="book-appointment-btn"
                        onClick={() => handleBookAppointment(doctor)}
                      >
                        <Calendar size={16} />
                        Book Appointment
                      </button>
                      <button className="view-profile-btn">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredDoctors.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No doctors found</h3>
                <p>Try adjusting your search criteria or filters</p>
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default FindDoctorPage;
