import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Award,
  Users,
  X
} from 'lucide-react';
import './DoctorFinder.css';

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

interface DoctorFinderProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorFinder: React.FC<DoctorFinderProps> = ({ isOpen, onClose, onBookAppointment }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(true);

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
    if (isOpen) {
      loadDoctors();
    }
  }, [isOpen]);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchTerm, selectedDepartment, selectedSpecialty, sortBy]);

  const loadDoctors = async () => {
    setLoading(true);
    
    // Mock doctor data - in real app, this would come from API/Firebase
    const mockDoctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Smith Johnson',
        specialty: 'Heart Surgery',
        department: 'Cardiology',
        experience: 15,
        rating: 4.9,
        reviews: 234,
        education: 'MBBS, MD Cardiology, Harvard Medical School',
        languages: ['English', 'Hindi'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
        location: 'Main Hospital, Floor 3',
        consultationFee: 1500,
        image: '👨‍⚕️',
        about: 'Specialist in cardiac surgery with 15+ years of experience. Expert in minimally invasive heart procedures.',
        achievements: ['Best Cardiologist 2023', '500+ Successful Surgeries', 'Research Publications: 25']
      },
      {
        id: '2',
        name: 'Dr. Emily Davis',
        specialty: 'Heart Surgery',
        department: 'Cardiology',
        experience: 12,
        rating: 4.8,
        reviews: 189,
        education: 'MBBS, MD Cardiology, AIIMS Delhi',
        languages: ['English', 'Hindi', 'Bengali'],
        availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
        location: 'Main Hospital, Floor 3',
        consultationFee: 1200,
        image: '👩‍⚕️',
        about: 'Experienced cardiologist specializing in interventional cardiology and heart disease prevention.',
        achievements: ['Excellence Award 2022', '300+ Procedures', 'International Training']
      },
      {
        id: '3',
        name: 'Dr. Michael Brown',
        specialty: 'Brain Surgery',
        department: 'Neurology',
        experience: 18,
        rating: 4.9,
        reviews: 156,
        education: 'MBBS, MS Neurosurgery, Johns Hopkins',
        languages: ['English', 'Hindi'],
        availability: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
        location: 'Neuro Center, Floor 2',
        consultationFee: 2000,
        image: '👨‍⚕️',
        about: 'Leading neurosurgeon with expertise in brain tumor surgery and spinal procedures.',
        achievements: ['Top Neurosurgeon 2023', '400+ Brain Surgeries', 'Innovation Award']
      },
      {
        id: '4',
        name: 'Dr. Sarah Wilson',
        specialty: 'Brain Surgery',
        department: 'Neurology',
        experience: 10,
        rating: 4.7,
        reviews: 98,
        education: 'MBBS, MS Neurosurgery, PGI Chandigarh',
        languages: ['English', 'Hindi', 'Punjabi'],
        availability: ['Monday', 'Wednesday', 'Friday'],
        location: 'Neuro Center, Floor 2',
        consultationFee: 1800,
        image: '👩‍⚕️',
        about: 'Skilled neurosurgeon focusing on pediatric neurosurgery and epilepsy treatment.',
        achievements: ['Young Achiever 2022', '200+ Surgeries', 'Research Excellence']
      },
      {
        id: '5',
        name: 'Dr. David Miller',
        specialty: 'Joint Replacement',
        department: 'Orthopedics',
        experience: 14,
        rating: 4.8,
        reviews: 267,
        education: 'MBBS, MS Orthopedics, Mayo Clinic',
        languages: ['English', 'Hindi'],
        availability: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
        location: 'Orthopedic Wing, Floor 1',
        consultationFee: 1300,
        image: '👨‍⚕️',
        about: 'Expert orthopedic surgeon specializing in knee and hip replacement surgeries.',
        achievements: ['Best Orthopedist 2023', '600+ Joint Replacements', 'Minimally Invasive Expert']
      },
      {
        id: '6',
        name: 'Dr. Lisa Anderson',
        specialty: 'Joint Replacement',
        department: 'Orthopedics',
        experience: 8,
        rating: 4.6,
        reviews: 134,
        education: 'MBBS, MS Orthopedics, AIIMS Delhi',
        languages: ['English', 'Hindi', 'Tamil'],
        availability: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
        location: 'Orthopedic Wing, Floor 1',
        consultationFee: 1100,
        image: '👩‍⚕️',
        about: 'Orthopedic specialist with focus on sports injuries and arthroscopic procedures.',
        achievements: ['Sports Medicine Expert', '300+ Procedures', 'Fellowship Trained']
      },
      {
        id: '7',
        name: 'Dr. James Taylor',
        specialty: 'Child Care',
        department: 'Pediatrics',
        experience: 16,
        rating: 4.9,
        reviews: 312,
        education: 'MBBS, MD Pediatrics, Boston Children\'s Hospital',
        languages: ['English', 'Hindi', 'Spanish'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        location: 'Children\'s Wing, Floor 2',
        consultationFee: 1000,
        image: '👨‍⚕️',
        about: 'Pediatrician with extensive experience in child healthcare and development.',
        achievements: ['Child Care Excellence 2023', '5000+ Children Treated', 'Vaccination Expert']
      },
      {
        id: '8',
        name: 'Dr. Maria Garcia',
        specialty: 'Child Care',
        department: 'Pediatrics',
        experience: 11,
        rating: 4.8,
        reviews: 198,
        education: 'MBBS, MD Pediatrics, AIIMS Delhi',
        languages: ['English', 'Hindi', 'Marathi'],
        availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
        location: 'Children\'s Wing, Floor 2',
        consultationFee: 900,
        image: '👩‍⚕️',
        about: 'Caring pediatrician specializing in newborn care and childhood diseases.',
        achievements: ['Newborn Care Expert', '3000+ Deliveries', 'NICU Specialist']
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setDoctors(mockDoctors);
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < Math.floor(rating) ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="doctor-finder-overlay">
      <div className="doctor-finder-modal">
        {/* Header */}
        <div className="doctor-finder-header">
          <div className="header-content">
            <h2>Find Doctor</h2>
            <p>Search and book appointments with our expert doctors</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="search-filters-section">
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
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          <div className="results-header">
            <h3>
              {loading ? 'Loading...' : `${filteredDoctors.length} Doctors Found`}
            </h3>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span>Finding the best doctors for you...</span>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-card-header">
                    <div className="doctor-avatar">
                      {doctor.image}
                    </div>
                    <div className="doctor-basic-info">
                      <h4>{doctor.name}</h4>
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
                    <h5>Available Days:</h5>
                    <div className="availability-tags">
                      {doctor.availability.map(day => (
                        <span key={day} className="availability-tag">{day}</span>
                      ))}
                    </div>
                  </div>

                  <div className="doctor-actions">
                    <button 
                      className="book-appointment-btn"
                      onClick={() => onBookAppointment(doctor)}
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
    </div>
  );
};

export default DoctorFinder;
