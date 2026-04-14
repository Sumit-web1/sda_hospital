import React, { useState } from 'react';
import { saveAppointment, type AppointmentData } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import './BookingForm.css';

interface BookingFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  patientName: string;
  age: string;
  gender: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  symptoms: string;
}

const departments = [
  'Administrators',
  'Anaesthesia',
  'Cardiology',
  'General Laparoscopic Surgery',
  'General Medicine',
  'Intensive Care',
  'Laboratory Services',
  'Microbiology',
  'Nursing Superintendent',
  'Obstetrics and Gynaecology',
  'Ophthalmology',
  'Orthopaedics',
  'Paediatric Surgery',
  'Pathology',
  'Pediatrics',
  'Pharmacy Services',
  'Pulmonology',
  'Radiation Oncologist',
  'Radiology'
];

const doctors = {
  'Administrators': [
    'Dr. Rajkumar Chavakula',
    'Mr. Saji Varghese'
  ],
  'Anaesthesia': [
    'Dr. Jasavaroyan',
    'Dr. Margaret Thomas',
    'Dr. Akhila'
  ],
  'Cardiology': [
    'Dr. P. G. Ashok Kumar'
  ],
  'General Laparoscopic Surgery': [
    'Dr. K.G. Mathew',
    'Dr. Vijay Wadhwa',
    'Dr. Akshath'
  ],
  'General Medicine': [
    'Dr. N S Prakash',
    'Dr. Vandeman Wilson',
    'Dr. Zain Hussain'
  ],
  'Intensive Care': [
    'Dr. Christine. R Deepika'
  ],
  'Laboratory Services': [
    'Mr. Shantharaj S'
  ],
  'Microbiology': [
    'Dr. Saba Samreen'
  ],
  'Nursing Superintendent': [
    'Mrs. T. Mary Grace'
  ],
  'Obstetrics and Gynaecology': [
    'Dr. Lavona Ruth Pilli',
    'Dr. Femi Francis',
    'Dr. Aruna Prabhakar',
    'Dr. Kalai Hema K M',
    'Dr. Pearlin Raj'
  ],
  'Ophthalmology': [
    'Dr. Alice Joseph'
  ],
  'Orthopaedics': [
    'Dr. Pradeep Kumar',
    'Dr. Vedaprakash'
  ],
  'Paediatric Surgery': [
    'Dr. Ashok Rijhwani',
    'Dr. Neehar Patil'
  ],
  'Pathology': [
    'Dr. Julie Joseph'
  ],
  'Pediatrics': [
    'Dr. Sunil Abraham Ninan',
    'Dr. Mahendra Mehta',
    'Dr. Sayeed Ahmed',
    'Dr. Farhan Moosa',
    'Dr. Mohammad Gauhar'
  ],
  'Pharmacy Services': [
    'Mr. Daniel Evans'
  ],
  'Pulmonology': [
    'Dr. Sivasankari R'
  ],
  'Radiation Oncologist': [
    'Dr. Ninan Thomas'
  ],
  'Radiology': [
    'Dr. Claudius Saldanha',
    'Dr. David Narayan Rameswarapu'
  ]
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM'
];

const BookingForm: React.FC<BookingFormProps> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    age: '',
    gender: '',
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
    const required = ['patientName', 'age', 'gender', 'department', 'doctor', 'date', 'timeSlot'];
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
    
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Please select a future date');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStep('review');
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
        phone: user?.phoneNumber || ''
      };
      
      await saveAppointment(appointmentData);
      setStep('success');
      
      setTimeout(() => {
        onSuccess();
      }, 2000);
      
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Allow booking up to 30 days in advance
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="booking-overlay">
      <div className="booking-modal">
        <div className="booking-header">
          <h2>Book Appointment</h2>
          <button className="booking-close" onClick={onClose}>×</button>
        </div>

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-section">
              <h3>Patient Information</h3>
              
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
                    placeholder="Age"
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
              <h3>Appointment Details</h3>
              
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
                    {formData.department && doctors[formData.department as keyof typeof doctors]?.map(doc => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
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
              <div className="form-group">
                <label htmlFor="symptoms">Symptoms/Reason (Optional)</label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Describe your symptoms or reason for visit..."
                  rows={3}
                />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Review Appointment
              </button>
            </div>
          </form>
        )}

        {step === 'review' && (
          <div className="booking-review">
            <h3>Review Your Appointment</h3>
            
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

            {error && <div className="form-error">{error}</div>}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => setStep('form')} 
                className="btn-secondary"
              >
                Edit Details
              </button>
              <button 
                type="button" 
                onClick={handleConfirmBooking}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="booking-success">
            <div className="success-icon">✓</div>
            <h3>Appointment Booked Successfully!</h3>
            <p>Your appointment has been confirmed. You will receive a confirmation message shortly.</p>
            
            <div className="success-details">
              <div className="success-item">
                <strong>{formData.doctor}</strong>
              </div>
              <div className="success-item">
                {formData.department}
              </div>
              <div className="success-item">
                {new Date(formData.date).toLocaleDateString()} at {formData.timeSlot}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
