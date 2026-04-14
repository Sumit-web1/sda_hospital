import React, { useState } from 'react';
import './BookingForm.css';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';


const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const parseTimeRange = (timeString) => {
  let cleanString = timeString.replace("Custom: ", "").trim();
  let [startStr, endStr] = cleanString.split("-").map(s => s.trim());

  const to24Hour = (str) => {
    if (!str) return "00:00";
    if (!str.toLowerCase().includes('m')) return str;

    const [time, modifier] = str.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = modifier === 'AM' ? '00' : '12';
    } else if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  return {
    start: timeToMinutes(to24Hour(startStr)),
    end: timeToMinutes(to24Hour(endStr))
  };
};

const checkBookingAvailability = async (date, newTimeRange, room) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("date", "==", date),
      where("bookingFor", "==", room)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;

    const newTimes = parseTimeRange(newTimeRange);
    let isOverlap = false;

    querySnapshot.forEach((doc) => {
      const existingBooking = doc.data();
      if (existingBooking.status === "cancelled") return;

      const existingTimes = parseTimeRange(existingBooking.time);
      if (newTimes.start < existingTimes.end && newTimes.end > existingTimes.start) {
        isOverlap = true;
      }
    });

    return isOverlap;
  } catch (error) {
    console.error("Error checking availability:", error);
    return true;
  }
};

const saveBooking = async (bookingData) => {
  try {
    await addDoc(collection(db, "bookings"), {
      ...bookingData,
      status: "pending",
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving booking:", error);
    return { success: false };
  }
};


const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    idNo: '',
    reason: '',
    email: '',
    bookingFor: 'Conference Hall',
    date: '',
    time: '',
    customStart: '',
    customEnd: '',
    pax: '',
    participants: [],
    equipment: 'None',
    servingFood: 'no',
    description: '',
    housekeeping: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const RequiredStar = () => <span style={{ color: 'red', marginLeft: '4px' }}>*</span>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = value;
    setFormData({ ...formData, participants: newParticipants });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({
        fullName: '', idNo: '', reason: '', email: '',
        bookingFor: 'Conference Hall', date: '', time: '',
        customStart: '', customEnd: '', pax: '', participants: [],
        equipment: 'None', servingFood: 'no', description: '', housekeeping: ''
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalTime =
      formData.customStart && formData.customEnd
        ? `Custom: ${formData.customStart} - ${formData.customEnd}`
        : formData.time;

    if (!finalTime) {
      alert("Please select a time.");
      setIsSubmitting(false);
      return;
    }

    const isAlreadyBooked = await checkBookingAvailability(formData.date, finalTime, formData.bookingFor);

    if (isAlreadyBooked) {
      alert(`The ${formData.bookingFor} is ALREADY BOOKED for this time. Please choose another slot.`);
      setIsSubmitting(false);
      return;
    }

    const saveResult = await saveBooking({ ...formData, time: finalTime });

    if (saveResult.success) {
      // Use PHP endpoint
      await fetch("/api/new_booking_email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          time: finalTime,
        }),
      });

      // Show Success Modal instead of Alert
      setShowSuccessModal(true);

    } else {
      alert("Failed to submit booking. Please try again.");
    }

    setIsSubmitting(false);
  };

  const paxOptions = Array.from({ length: 160 }, (_, i) => i + 1);

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1>SDA Hospital Booking Form</h1>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">

          <div className="form-group">
            <label>Name: <RequiredStar /></label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label>ID No: <RequiredStar /></label>
            <input
              type="text"
              name="idNo"
              value={formData.idNo}
              onChange={handleChange}
              required
              placeholder="Employee/Staff ID"
            />
          </div>

          <div className="form-group">
            <label>Email: <RequiredStar /></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@sdahospital.com"
            />
          </div>

          <div className="form-group">
            <label>Reason for Booking: <RequiredStar /></label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder="e.g., Annual Meeting"
            />
          </div>

          <div className="form-group">
            <label>Booking For: <RequiredStar /></label>
            <select name="bookingFor" value={formData.bookingFor} onChange={handleChange} required>
              <option value="Conference Hall">Conference Hall</option>
              <option value="Board Room">Board Room</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date: <RequiredStar /></label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time: <RequiredStar /></label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required={!formData.customStart || !formData.customEnd}
            >
              <option value="">Select Time Slot</option>
              <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
              <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
              <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
              <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
              <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
              <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
              <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
            </select>

            <div style={{ marginTop: "10px" }}>
              <label>Or enter custom time:</label>
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <input
                  type="time"
                  name="customStart"
                  value={formData.customStart || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, customStart: e.target.value, time: "" })
                  }
                />
                <input
                  type="time"
                  name="customEnd"
                  value={formData.customEnd || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, customEnd: e.target.value, time: "" })
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Num of Pax (Max 160): <RequiredStar /></label>
            <select
              name="pax"
              value={formData.pax}
              onChange={handleChange}
              required
            >
              <option value="">Select Attendees</option>
              {paxOptions.map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {formData.pax && (
            <div className="form-group">
              <label>Participants (First 5 Required): <RequiredStar /></label>
              {Array.from({ length: Math.min(parseInt(formData.pax), 5) }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Participant ${index + 1} Name`}
                  value={formData.participants[index] || ''}
                  onChange={(e) => handleParticipantChange(index, e.target.value)}
                  style={{ marginTop: '5px' }}
                  required
                />
              ))}
            </div>
          )}

          <div className="form-group">
            <label>Equipment Required: <RequiredStar /></label>
            <select
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              required
            >
              <option value="None">None</option>
              <option value="Microphone">Microphone Only</option>
              <option value="Projector">Projector Only</option>
              <option value="Microphone & Projector">Both (Mic & Projector)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Are you serving food? <RequiredStar /></label>
            <div className="radio-group">
              <label><input type="radio" name="servingFood" value="yes" checked={formData.servingFood === "yes"} onChange={handleChange} required /> Yes</label>
              <label><input type="radio" name="servingFood" value="no" checked={formData.servingFood === "no"} onChange={handleChange} required /> No</label>
            </div>
          </div>

          <div className="form-group">
            <label>Housekeeping Instructions:</label>
            <textarea
              name="housekeeping"
              rows={2}
              value={formData.housekeeping}
              onChange={handleChange}
              placeholder="Special requests..."
            ></textarea>
          </div>

          <div className="form-group">
            <label>Description / Agenda: <RequiredStar /></label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Brief details..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </button>

        </form>
      </div>

      {showSuccessModal && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="popup-title">Booking Submitted!</h2>
            <p className="popup-message">
              Your booking request has been successfully submitted. Our team will review it shortly.
              <br/><br/>
              Once approved, you will receive a confirmation email with all details.
            </p>
            <button className="popup-btn" onClick={handleCloseModal}>Okay, Got it</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;