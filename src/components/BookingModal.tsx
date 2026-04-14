import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PhoneAuth from './PhoneAuth';
import BookingForm from './BookingForm';
import './BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Auto-check authentication when modal opens
  React.useEffect(() => {
    if (isOpen) {
      if (!isAuthenticated) {
        setShowAuth(true);
        setShowBookingForm(false);
      } else {
        setShowAuth(false);
        setShowBookingForm(true);
      }
    }
  }, [isOpen, isAuthenticated]);

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    onClose();
  };

  const handleClose = () => {
    setShowAuth(false);
    setShowBookingForm(false);
    onClose();
  };

  if (!isOpen) return null;

  // Show phone authentication modal
  if (showAuth) {
    return (
      <PhoneAuth
        onAuthSuccess={handleAuthSuccess}
        onClose={handleClose}
      />
    );
  }

  // Show booking form after authentication
  if (showBookingForm) {
    return (
      <BookingForm
        onClose={handleClose}
        onSuccess={handleBookingSuccess}
      />
    );
  }

  // This should not be reached since we directly show auth or booking form
  return null;
};

export default BookingModal;
