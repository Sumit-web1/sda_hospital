import React, { useState, useEffect } from 'react';
import { setupRecaptcha, sendOTP, verifyOTP } from '../firebase/config';
import { RecaptchaVerifier } from 'firebase/auth';
import './PhoneAuth.css';

interface PhoneAuthProps {
  onAuthSuccess: () => void;
  onClose: () => void;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({ onAuthSuccess, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    // Setup reCAPTCHA
    try {
      const verifier = setupRecaptcha('recaptcha-container');
      setRecaptchaVerifier(verifier);
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
    }

    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !recaptchaVerifier) return;

    setLoading(true);
    setError('');

    try {
      // Format phone number (add +91 for India)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      
      const result = await sendOTP(formattedPhone, recaptchaVerifier);
      setConfirmationResult(result);
      setStep('otp');
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      setError(error.message || 'Failed to send OTP. Please try again.');
      
      // For demo purposes, allow proceeding without Firebase
      if (error.code === 'auth/configuration-not-found' || error.code === 'auth/invalid-api-key') {
        setStep('otp');
        setError('Demo mode: Enter any 6-digit code');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError('');

    try {
      if (confirmationResult) {
        await verifyOTP(confirmationResult, otp);
      } else {
        // Demo mode - accept any 6-digit code
        if (otp.length === 6) {
          console.log('Demo mode: OTP verified');
        } else {
          throw new Error('Please enter a 6-digit code');
        }
      }
      
      onAuthSuccess();
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits for Indian numbers
    if (digits.length <= 10) {
      return digits;
    }
    return digits.slice(0, 10);
  };

  return (
    <div className="phone-auth-overlay">
      <div className="phone-auth-modal">
        <div className="phone-auth-header">
          <h2>Login Required</h2>
          <button className="phone-auth-close" onClick={onClose}>×</button>
        </div>

        {step === 'phone' && (
          <form onSubmit={handleSendOTP} className="phone-auth-form">
            <div className="phone-auth-step">
              <h3>Enter Your Mobile Number</h3>
              <p>We'll send you a verification code</p>
              
              <div className="phone-input-group">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  required
                  className="phone-input"
                />
              </div>
              
              {error && <div className="auth-error">{error}</div>}
              
              <button 
                type="submit" 
                disabled={loading || phoneNumber.length !== 10}
                className="auth-button"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="phone-auth-form">
            <div className="phone-auth-step">
              <h3>Enter Verification Code</h3>
              <p>We've sent a 6-digit code to +91{phoneNumber}</p>
              
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                className="otp-input"
              />
              
              {error && <div className="auth-error">{error}</div>}
              
              <button 
                type="submit" 
                disabled={loading || otp.length !== 6}
                className="auth-button"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep('phone')}
                className="auth-button-secondary"
              >
                Change Number
              </button>
            </div>
          </form>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default PhoneAuth;
