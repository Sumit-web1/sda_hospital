import React, { useState } from 'react';
import { saveAppointment, type AppointmentData } from '../firebase/config';
import { X, UserPlus, MapPin, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import './WalkInPatientModal.css';

interface WalkInPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingAppointments: any[];
}

interface FormData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  department: string;
  doctor: string;
  symptoms: string;
  priority: 'normal' | 'urgent' | 'emergency';
}

// Department and doctor data
const departments = [
  'Emergency Medicine', 'General Medicine', 'Cardiology', 'Dermatology', 'ENT',
  'Gastroenterology', 'General Surgery', 'Gynecology', 'Nephrology', 'Neurology',
  'Oncology', 'Ophthalmology', 'Orthopaedics', 'Pediatrics', 'Pulmonology'
];

const doctors: { [key: string]: string[] } = {
  'Emergency Medicine': ['Dr. Sarah Wilson', 'Dr. Michael Brown'],
  'General Medicine': ['Dr. Suresh Babu', 'Dr. Meera Krishnan'],
  'Cardiology': ['Dr. Smith Johnson', 'Dr. Jennifer Martinez'],
  'Dermatology': ['Dr. Priya Sharma', 'Dr. Rajesh Kumar'],
  'ENT': ['Dr. Anil Kumar', 'Dr. Sunita Rao'],
  'Gastroenterology': ['Dr. Ramesh Gupta', 'Dr. Kavitha Nair'],
  'General Surgery': ['Dr. Vikram Singh', 'Dr. Anita Desai'],
  'Gynecology': ['Dr. Lakshmi Devi', 'Dr. Pooja Agarwal'],
  'Nephrology': ['Dr. Ravi Shankar', 'Dr. Deepa Menon'],
  'Neurology': ['Dr. Ashok Reddy', 'Dr. Shalini Iyer'],
  'Oncology': ['Dr. Mohan Das', 'Dr. Rekha Pillai'],
  'Ophthalmology': ['Dr. Kiran Kumar', 'Dr. Nisha Patel'],
  'Orthopaedics': ['Dr. Pradeep Kumar', 'Dr. Vedaprakash'],
  'Pediatrics': ['Dr. Sunil Abraham Ninan', 'Dr. Mahendra Mehta'],
  'Pulmonology': ['Dr. Sivasankari R']
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM'
];

const WalkInPatientModal: React.FC<WalkInPatientModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  existingAppointments 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [assignedTimeSlot, setAssignedTimeSlot] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    department: '',
    doctor: '',
    symptoms: '',
    priority: 'normal'
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

  const findNextAvailableSlot = (_department: string, doctor: string): string => {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Get today's appointments for the selected doctor
    const todayAppointments = existingAppointments.filter(apt => 
      apt.date === today && 
      apt.doctor === doctor &&
      apt.status !== 'cancelled'
    );

    const bookedSlots = todayAppointments.map(apt => apt.timeSlot);

    // Find the next available slot based on current time and priority
    for (const slot of timeSlots) {
      if (bookedSlots.includes(slot)) continue;

      const [time, period] = slot.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      const slotHour = period === 'PM' && hours !== 12 ? hours + 12 : 
                      period === 'AM' && hours === 12 ? 0 : hours;

      // For urgent/emergency cases, allow immediate booking
      if (formData.priority === 'urgent' || formData.priority === 'emergency') {
        return slot;
      }

      // For normal cases, only suggest future slots
      if (slotHour > currentHour || (slotHour === currentHour && minutes > currentMinute)) {
        return slot;
      }
    }

    // If no slots available today, suggest first slot tomorrow
    return timeSlots[0];
  };

  const validateForm = () => {
    const required = ['patientName', 'age', 'gender', 'phone', 'department', 'doctor'];
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
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      // Find next available time slot
      const nextSlot = findNextAvailableSlot(formData.department, formData.doctor);
      setAssignedTimeSlot(nextSlot);

      // Determine appointment date (today for urgent/emergency, today or tomorrow for normal)
      const appointmentDate = new Date();
      if (formData.priority === 'normal' && nextSlot === timeSlots[0]) {
        // If we had to assign first slot of next day
        appointmentDate.setDate(appointmentDate.getDate() + 1);
      }

      const appointmentData: AppointmentData = {
        patientName: formData.patientName,
        age: parseInt(formData.age),
        gender: formData.gender,
        department: formData.department,
        doctor: formData.doctor,
        date: appointmentDate.toISOString().split('T')[0],
        timeSlot: nextSlot,
        symptoms: formData.symptoms || `Walk-in patient - ${formData.priority} priority`,
        phone: formData.phone
      };
      
      const result = await saveAppointment(appointmentData);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          handleClose();
        }, 3000);
      } else {
        setError(result.error || 'Failed to register walk-in patient. Please try again.');
      }
      
    } catch (error: any) {
      console.error('Error registering walk-in patient:', error);
      setError('Failed to register walk-in patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      patientName: '',
      age: '',
      gender: '',
      phone: '',
      department: '',
      doctor: '',
      symptoms: '',
      priority: 'normal'
    });
    setError('');
    setSuccess(false);
    setAssignedTimeSlot('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="walk-in-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <h2 className="modal-title">
              {success ? 'Walk-in Patient Registered' : 'Walk-in Patient Registration'}
            </h2>
            <p className="modal-subtitle">
              {success ? 'Patient has been successfully registered' : 'Quick registration for patients present at the hospital'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {!success ? (
            <div className="walk-in-form">
              {/* Priority Selection */}
              <div className="priority-section">
                <h3 className="section-title">
                  <AlertTriangle size={20} />
                  Priority Level
                </h3>
                <div className="priority-options">
                  <label className={`priority-option ${formData.priority === 'normal' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="priority"
                      value="normal"
                      checked={formData.priority === 'normal'}
                      onChange={handleInputChange}
                    />
                    <div className="priority-content">
                      <div className="priority-indicator normal"></div>
                      <div>
                        <strong>Normal</strong>
                        <p>Regular consultation</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className={`priority-option ${formData.priority === 'urgent' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="priority"
                      value="urgent"
                      checked={formData.priority === 'urgent'}
                      onChange={handleInputChange}
                    />
                    <div className="priority-content">
                      <div className="priority-indicator urgent"></div>
                      <div>
                        <strong>Urgent</strong>
                        <p>Needs prompt attention</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className={`priority-option ${formData.priority === 'emergency' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="priority"
                      value="emergency"
                      checked={formData.priority === 'emergency'}
                      onChange={handleInputChange}
                    />
                    <div className="priority-content">
                      <div className="priority-indicator emergency"></div>
                      <div>
                        <strong>Emergency</strong>
                        <p>Immediate medical attention</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Patient Information */}
              <div className="form-section">
                <h3 className="section-title">
                  <UserPlus size={20} />
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

              {/* Department and Doctor */}
              <div className="form-section">
                <h3 className="section-title">
                  <MapPin size={20} />
                  Department & Doctor
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
              </div>

              {/* Symptoms */}
              <div className="form-section">
                <h3 className="section-title">
                  <AlertCircle size={20} />
                  Symptoms / Reason for Visit
                </h3>
                
                <div className="form-group">
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    placeholder="Describe symptoms or reason for the visit"
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
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Registering...
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      Register Walk-in Patient
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="walk-in-success">
              <div className="success-icon">
                <CheckCircle size={64} />
              </div>
              <h3>Walk-in Patient Registered!</h3>
              <p>The patient has been successfully registered and assigned an appointment slot.</p>
              
              <div className="success-details">
                <div className="detail-item">
                  <strong>Patient:</strong> {formData.patientName}
                </div>
                <div className="detail-item">
                  <strong>Doctor:</strong> {formData.doctor}
                </div>
                <div className="detail-item">
                  <strong>Department:</strong> {formData.department}
                </div>
                <div className="detail-item">
                  <strong>Assigned Time:</strong> {assignedTimeSlot}
                </div>
                <div className="detail-item">
                  <strong>Priority:</strong> 
                  <span className={`priority-badge ${formData.priority}`}>
                    {formData.priority.toUpperCase()}
                  </span>
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> 
                  <span className="status-badge confirmed">CONFIRMED</span>
                </div>
              </div>

              <div className="next-steps">
                <h4>Next Steps:</h4>
                <ul>
                  <li>Patient should wait in the {formData.department} waiting area</li>
                  <li>Appointment is confirmed for {assignedTimeSlot}</li>
                  <li>Doctor will be notified of the walk-in patient</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalkInPatientModal;
