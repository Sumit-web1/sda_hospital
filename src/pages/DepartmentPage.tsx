import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Heart, 
  Brain, 
  Eye, 
  Bone, 
  Baby, 
  Stethoscope,
  Activity,
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  Award
} from 'lucide-react';

import './DepartmentPage.css';

interface Department {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  doctors: number;
  image: string;
  category: string;
  availability: string;
  rating: number;
  patients: string;
}

const DepartmentPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const departments: Department[] = [
    // --- CORE DEPARTMENTS ---
    {
      id: 'emergency',
      title: 'Emergency Department',
      description: 'Round-the-clock emergency medical services with rapid response and critical care facilities.',
      icon: <Activity size={32} />,
      services: ['Trauma Care', 'Critical Care', 'Ambulance Service', 'Life Support'],
      doctors: 12,
      image: '/api/placeholder/400/300',
      category: 'emergency',
      availability: '24/7',
      rating: 4.9,
      patients: '5000+'
    },
    {
      id: 'general-medicine',
      title: 'General Medicine',
      description: 'Primary healthcare services for adults with comprehensive medical care and health management.',
      icon: <Stethoscope size={32} />,
      services: ['Health Checkups', 'Chronic Disease Management', 'Preventive Care', 'Internal Medicine'],
      doctors: 15,
      image: '/api/placeholder/400/300',
      category: 'primary',
      availability: '24/7',
      rating: 4.7,
      patients: '4000+'
    },
    {
      id: 'obstetrics-gynecology',
      title: 'OBG (Obstetrics & Gynecology)',
      description: 'Comprehensive women\'s health services including pregnancy care and gynecological treatments.',
      icon: <Heart size={32} />,
      services: ['Pregnancy Care', 'Gynecological Surgery', 'Family Planning', 'Maternity Services'],
      doctors: 9,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.8,
      patients: '1800+'
    },
    {
      id: 'pediatrics',
      title: 'Paediatrics Department',
      description: 'Specialized healthcare for infants, children, and adolescents with child-friendly environment.',
      icon: <Baby size={32} />,
      services: ['Well-child Visits', 'Vaccinations', 'Growth Monitoring', 'Pediatric Surgery'],
      doctors: 7,
      image: '/api/placeholder/400/300',
      category: 'primary',
      availability: 'Mon-Sat',
      rating: 4.9,
      patients: '3000+'
    },
    {
      id: 'neonatology',
      title: 'Neonatology',
      description: 'Expert care for newborn infants, especially those born prematurely or with medical conditions.',
      icon: <Baby size={32} />,
      services: ['NICU Care', 'Preterm Support', 'Neonatal Screening', 'Intensive Monitoring'],
      doctors: 5,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.9,
      patients: '850+'
    },

    // --- SURGICAL & SPECIALTY ---
    {
      id: 'surgery',
      title: 'General Surgery',
      description: 'Advanced surgical care using minimally invasive and traditional techniques for various conditions.',
      icon: <Stethoscope size={32} />,
      services: ['Laparoscopy', 'Hernia Repair', 'Abdominal Surgery', 'Trauma Surgery'],
      doctors: 8,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.8,
      patients: '2100+'
    },
    {
      id: 'cardiology',
      title: 'Cardiology Department',
      description: 'Comprehensive cardiac care with state-of-the-art facilities for heart disease diagnosis and prevention.',
      icon: <Heart size={32} />,
      services: ['ECG & Echo', 'Cardiac Surgery', 'Heart Monitoring', 'Angioplasty'],
      doctors: 8,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.9,
      patients: '2000+'
    },
    {
      id: 'neurology',
      title: 'Neurology Department',
      description: 'Advanced neurological care for brain, spine, and nervous system disorders with expert specialists.',
      icon: <Brain size={32} />,
      services: ['Brain Imaging', 'Stroke Care', 'Epilepsy Treatment', 'Neurosurgery'],
      doctors: 6,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.8,
      patients: '1500+'
    },
    {
      id: 'orthopedics',
      title: 'Orthopaedics Department',
      description: 'Complete bone and joint care with minimally invasive procedures and rehabilitation services.',
      icon: <Bone size={32} />,
      services: ['Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Arthroscopy'],
      doctors: 10,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.8,
      patients: '2500+'
    },

    // --- DIAGNOSTICS & ALLIED ---
    {
      id: 'radiology',
      title: 'Radiology Department',
      description: 'Modern diagnostic imaging including MRI, CT scans, and X-rays for accurate medical assessment.',
      icon: <Activity size={32} />,
      services: ['MRI / CT Scan', 'X-Ray & Ultrasound', 'Mammography', 'Interventional Radiology'],
      doctors: 6,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.7,
      patients: '6000+'
    },
    {
      id: 'pathology',
      title: 'Pathology Lab',
      description: 'Precise laboratory investigations and diagnostic tests for disease detection and monitoring.',
      icon: <Shield size={32} />,
      services: ['Biochemistry', 'Hematology', 'Microbiology', 'Histopathology'],
      doctors: 4,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.9,
      patients: '10000+'
    },
    {
      id: 'microbiology',
      title: 'Microbiology',
      description: 'Diagnosis of infectious diseases through advanced microbial analysis and research.',
      icon: <Shield size={32} />,
      services: ['Bacterial Cultures', 'Viral Testing', 'Fungal Diagnostics', 'Antibiotic Sensitivity'],
      doctors: 3,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.7,
      patients: '1200+'
    },

    // --- ORGANS & SYSTEMS ---
    {
      id: 'ophthalmology',
      title: 'Ophthalmology Department',
      description: 'Complete eye care services from routine examinations to advanced surgical procedures.',
      icon: <Eye size={32} />,
      services: ['Eye Exams', 'Cataract Surgery', 'Retinal Care', 'Vision Correction'],
      doctors: 5,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.7,
      patients: '1200+'
    },
    {
      id: 'dental',
      title: 'Dental Department',
      description: 'Comprehensive dental care including preventive, restorative, and cosmetic dentistry.',
      icon: <CheckCircle size={32} />,
      services: ['Orthodontics', 'Dental Implants', 'Root Canal', 'Oral Hygiene'],
      doctors: 4,
      image: '/api/placeholder/400/300',
      category: 'primary',
      availability: 'Mon-Sat',
      rating: 4.6,
      patients: '2200+'
    },
    {
      id: 'ent',
      title: 'ENT Department',
      description: 'Specialized treatment for disorders of the Ear, Nose, Throat, and Head and Neck.',
      icon: <Users size={32} />,
      services: ['Audiology', 'Sinus Treatment', 'Sleep Apnea', 'Tonsillectomy'],
      doctors: 4,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.8,
      patients: '1800+'
    },
    {
      id: 'pulmonology',
      title: 'Pulmonology',
      description: 'Expert care for lung-related diseases and respiratory health management.',
      icon: <Activity size={32} />,
      services: ['Asthma Clinic', 'COPD Management', 'PFT Lab', 'Sleep Medicine'],
      doctors: 4,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.7,
      patients: '1400+'
    },
    {
      id: 'urology',
      title: 'Urology',
      description: 'Comprehensive care for urinary tract conditions and male reproductive health.',
      icon: <Stethoscope size={32} />,
      services: ['Kidney Stones', 'Uro-Oncology', 'Prostate Care', 'Urodynamics'],
      doctors: 5,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.8,
      patients: '1600+'
    },
    {
      id: 'nephrology',
      title: 'Nephrology',
      description: 'Diagnosis and treatment of kidney diseases including dialysis and renal care.',
      icon: <Activity size={32} />,
      services: ['Dialysis Unit', 'Renal Biopsy', 'Hypertension Care', 'Kidney Transplant'],
      doctors: 4,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.9,
      patients: '1100+'
    },
    {
      id: 'gastroenterology',
      title: 'Gastroenterology',
      description: 'Treatment of digestive system, liver, gallbladder, and pancreatic disorders.',
      icon: <Activity size={32} />,
      services: ['Endoscopy', 'Colonoscopy', 'Liver Clinic', 'ERCP'],
      doctors: 5,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.8,
      patients: '1900+'
    },

    // --- OTHERS ---
    {
      id: 'anesthesiology',
      title: 'Anesthesiology',
      description: 'Pain management and anesthetic support for all surgical and diagnostic procedures.',
      icon: <Shield size={32} />,
      services: ['Pain Clinic', 'Critical Care', 'General Anesthesia', 'Regional Blocks'],
      doctors: 6,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: '24/7',
      rating: 4.8,
      patients: '4500+'
    },
    {
      id: 'psychiatry',
      title: 'Psychiatry',
      description: 'Mental health services focusing on diagnosis, treatment, and prevention of disorders.',
      icon: <Brain size={32} />,
      services: ['Counseling', 'De-addiction', 'Geriatric Psychiatry', 'CBT'],
      doctors: 3,
      image: '/api/placeholder/400/300',
      category: 'specialty',
      availability: 'Mon-Sat',
      rating: 4.9,
      patients: '1300+'
    },
    {
      id: 'academic-training',
      title: 'Academic Training',
      description: 'Center for medical excellence, research programs, and professional medical education.',
      icon: <Award size={32} />,
      services: ['Medical Research', 'DNB Programs', 'Nursing Education', 'Fellowships'],
      doctors: 20,
      image: '/api/placeholder/400/300',
      category: 'primary',
      availability: 'Mon-Fri',
      rating: 5.0,
      patients: '500+ Students'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Departments', icon: <Stethoscope size={20} /> },
    { id: 'specialty', name: 'Specialty Care', icon: <Heart size={20} /> },
    { id: 'primary', name: 'Primary Care', icon: <Shield size={20} /> },
    { id: 'emergency', name: 'Emergency Care', icon: <Activity size={20} /> }
  ];

  const filteredDepartments = selectedCategory === 'all' 
    ? departments 
    : departments.filter(dept => dept.category === selectedCategory);

  const stats = [
    { icon: <Users size={24} />, value: '150+', label: 'Expert Doctors' },
    { icon: <Heart size={24} />, value: '21', label: 'Departments' },
    { icon: <Clock size={24} />, value: '24/7', label: 'Emergency Care' },
    { icon: <Award size={24} />, value: '30+', label: 'Years Experience' }
  ];

  return (
    <div className="department-page">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-background">
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-container">
          <div className="page-header-content">
            <h1 className="page-header-title">Our Departments</h1>
            <div className="page-header-breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item active">Departments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="department-stats">
        <div className="container-custom">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-main">
        <div className="container-custom">
          <div className="departments-filter">
            <h2 className="departments-section-title">Medical Departments</h2>
            <p className="departments-section-subtitle">
              Explore our comprehensive range of medical departments, each staffed with expert physicians and equipped with state-of-the-art facilities.
            </p>
            <div className="departments-categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`departments-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="departments-grid">
            {filteredDepartments.map((department, index) => (
              <div 
                key={department.id} 
                className="department-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="department-card-header">
                  <div className="department-icon">{department.icon}</div>
                  <div className="department-availability">
                    <Clock size={14} />
                    <span>{department.availability}</span>
                  </div>
                </div>
                
                <div className="department-content">
                  <h3 className="department-title">{department.title}</h3>
                  <p className="department-description">{department.description}</p>
                  
                  <div className="department-services">
                    <h4>Key Services:</h4>
                    {department.services.map((service, idx) => (
                      <div key={idx} className="department-service">
                        <CheckCircle size={16} />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="department-stats-row">
                    <div className="department-stat">
                      <Users size={16} />
                      <span>{department.doctors} Doctors</span>
                    </div>
                    <div className="department-stat">
                      <Heart size={16} />
                      <span>{department.patients} Patients</span>
                    </div>
                    <div className="department-rating">
                      <div className="department-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.floor(department.rating) ? 'filled' : ''} 
                          />
                        ))}
                        <span className="department-rating-value">{department.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="department-actions">
                  <button className="department-btn-secondary">
                    <Phone size={16} />
                    Contact
                  </button>
                  <button className="department-btn-primary">
                    <Calendar size={16} />
                    Book Appointment
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="departments-cta">
        <div className="container-custom">
          <div className="departments-cta-content">
            <div className="departments-cta-text">
              <h2>Need Medical Consultation?</h2>
              <p>Our expert doctors are available across all departments to provide you with the best medical care.</p>
            </div>
            <div className="departments-cta-actions">
              <button className="departments-cta-emergency">
                <Activity size={20} />
                Emergency: +91 9901103439
              </button>
              <button className="departments-cta-appointment">
                <Calendar size={20} />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DepartmentPage;