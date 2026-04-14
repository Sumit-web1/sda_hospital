import React, { useState } from 'react';
import { saveAppointment, type AppointmentData } from '../firebase/config';
import { X, User, MapPin, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import './NewAppointmentModal.css';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  symptoms: string;
}

// Department and doctor data from existing system
const departments = [
  'Cardiology', 'Dermatology', 'Emergency Medicine', 'Endocrinology', 'ENT',
  'Gastroenterology', 'General Medicine', 'General Surgery', 'Gynecology',
  'Nephrology', 'Neurology', 'Oncology', 'Ophthalmology', 'Orthopaedics',
  'Paediatric Surgery', 'Pathology', 'Pediatrics', 'Pharmacy Services',
  'Pulmonology', 'Radiation Oncologist', 'Radiology'
];

const doctors: { [key: string]: string[] } = {
  'Cardiology': ['Dr. Smith Johnson', 'Dr. Jennifer Martinez'],
  'Dermatology': ['Dr. Priya Sharma', 'Dr. Rajesh Kumar'],
  'Emergency Medicine': ['Dr. Sarah Wilson', 'Dr. Michael Brown'],
  'Endocrinology': ['Dr. Lisa Anderson', 'Dr. David Chen'],
  'ENT': ['Dr. Anil Kumar', 'Dr. Sunita Rao'],
  'Gastroenterology': ['Dr. Ramesh Gupta', 'Dr. Kavitha Nair'],
  'General Medicine': ['Dr. Suresh Babu', 'Dr. Meera Krishnan'],
  'General Surgery': ['Dr. Vikram Singh', 'Dr. Anita Desai'],
  'Gynecology': ['Dr. Lakshmi Devi', 'Dr. Pooja Agarwal'],
  'Nephrology': ['Dr. Ravi Shankar', 'Dr. Deepa Menon'],
  'Neurology': ['Dr. Ashok Reddy', 'Dr. Shalini Iyer'],
  'Oncology': ['Dr. Mohan Das', 'Dr. Rekha Pillai'],
  'Ophthalmology': ['Dr. Kiran Kumar', 'Dr. Nisha Patel'],
  'Orthopaedics': ['Dr. Pradeep Kumar', 'Dr. Vedaprakash'],
  'Paediatric Surgery': ['Dr. Ashok Rijhwani', 'Dr. Neehar Patil'],
  'Pathology': ['Dr. Julie Joseph'],
  'Pediatrics': ['Dr. Sunil Abraham Ninan', 'Dr. Mahendra Mehta', 'Dr. Sayeed Ahmed'],
  'Pharmacy Services': ['Mr. Daniel Evans'],
  'Pulmonology': ['Dr. Sivasankari R'],
  'Radiation Oncologist': ['Dr. Ninan Thomas'],
  'Radiology': ['Dr. Claudius Saldanha', 'Dr. David Narayan Rameswarapu']
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM'
];

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    timeSlot: '',
    symptoms: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset doctor when department changes
    if (name === 'department') {
      setFormData(prev => ({
        ...prev,
        doctor: ''
      }));
    }
  };

  const validateForm = () => {
    const required = ['patientName', 'age', 'gender', 'phone', 'department', 'doctor', 'date', 'timeSlot'];
    for (const field of required) {
      if (!formData[field as keyof FormData]) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 120) {
      setError('Please enter a valid age between 1 and 120');
      return false;
    }

    // Basic phone validation
    if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Please select a future date');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      setError('');
      setStep('review');
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');
    
    try {
      const appointmentData: AppointmentData = {
        patientName: formData.patientName,
        age: parseInt(formData.age),
        gender: formData.gender,
        department: formData.department,
        doctor: formData.doctor,
        date: formData.date,
        timeSlot: formData.timeSlot,
        symptoms: formData.symptoms,
        phone: formData.phone
      };
      
      const result = await saveAppointment(appointmentData);
      
      if (result.success) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          handleClose();
        }, 2000);
      } else {
        setError(result.error || 'Failed to book appointment. Please try again.');
      }
      
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      patientName: '',
      age: '',
      gender: '',
      phone: '',
      department: '',
      doctor: '',
      date: '',
      timeSlot: '',
      symptoms: ''
    });
    setError('');
    onClose();
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 days from today
    return maxDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="new-appointment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <h2 className="modal-title">
              {step === 'form' ? 'New Appointment' : 
               step === 'review' ? 'Review Appointment' : 
               'Appointment Confirmed'}
            </h2>
            <p className="modal-subtitle">
              {step === 'form' ? 'Enter patient details and appointment information' :
               step === 'review' ? 'Please review the appointment details' :
               'Appointment has been successfully created'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {step === 'form' && (
            <div className="appointment-form">
              <div className="form-section">
                <h3 className="section-title">
                  <User size={20} />
                  Patient Information
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="patientName">Full Name *</label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Enter age"
                      min="1"
                      max="120"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">
                  <MapPin size={20} />
                  Appointment Details
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="department">Department *</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="doctor">Doctor *</label>
                    <select
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleInputChange}
                      disabled={!formData.department}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {formData.department && doctors[formData.department]?.map(doc => (
                        <option key={doc} value={doc}>{doc}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Appointment Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="timeSlot">Time Slot *</label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">
                  <FileText size={20} />
                  Additional Information
                </h3>
                
                <div className="form-group">
                  <label htmlFor="symptoms">Symptoms / Reason for Visit</label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    placeholder="Describe symptoms or reason for the appointment (optional)"
                    rows={3}
                  />
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="button" className="btn-primary" onClick={handleNext}>
                  Review Appointment
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="appointment-review">
              <div className="review-section">
                <h4>Patient Information</h4>
                <div className="review-item">
                  <span>Name:</span>
                  <span>{formData.patientName}</span>
                </div>
                <div className="review-item">
                  <span>Age:</span>
                  <span>{formData.age} years</span>
                </div>
                <div className="review-item">
                  <span>Gender:</span>
                  <span>{formData.gender}</span>
                </div>
                <div className="review-item">
                  <span>Phone:</span>
                  <span>{formData.phone}</span>
                </div>
              </div>
              
              <div className="review-section">
                <h4>Appointment Details</h4>
                <div className="review-item">
                  <span>Department:</span>
                  <span>{formData.department}</span>
                </div>
                <div className="review-item">
                  <span>Doctor:</span>
                  <span>{formData.doctor}</span>
                </div>
                <div className="review-item">
                  <span>Date:</span>
                  <span>{new Date(formData.date).toLocaleDateString()}</span>
                </div>
                <div className="review-item">
                  <span>Time:</span>
                  <span>{formData.timeSlot}</span>
                </div>
                {formData.symptoms && (
                  <div className="review-item">
                    <span>Symptoms:</span>
                    <span>{formData.symptoms}</span>
                  </div>
                )}
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setStep('form')}>
                  Back to Edit
                </button>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleConfirmBooking}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Booking...
                    </>
                  ) : (
                    'Confirm Appointment'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="appointment-success">
              <div className="success-icon">
                <CheckCircle size={64} />
              </div>
              <h3>Appointment Confirmed!</h3>
              <p>The appointment has been successfully created and the patient will be notified.</p>
              <div className="success-details">
                <p><strong>{formData.patientName}</strong></p>
                <p>{formData.doctor} - {formData.department}</p>
                <p>{new Date(formData.date).toLocaleDateString()} at {formData.timeSlot}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
