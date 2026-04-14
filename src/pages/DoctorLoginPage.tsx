import React, { useState, useEffect } from 'react';
import { useDoctorAuth } from '../contexts/DoctorAuthContext';
import { Eye, EyeOff, Mail, Lock, Stethoscope, ArrowRight, AlertCircle } from 'lucide-react';
import './DoctorLoginPage.css';

const DoctorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, isAuthenticated, loading } = useDoctorAuth();

  // Redirect if already authenticated (but only after loading is complete)
  useEffect(() => {
    if (!loading && isAuthenticated) {
      window.location.href = '/doctor-dashboard';
    }
  }, [isAuthenticated, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    const success = await login(email, password, rememberMe);

    if (success) {
      // Redirect to dashboard
      window.location.href = '/doctor-dashboard';
    }

    setIsSubmitting(false);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  // Show loading screen while authentication is being checked
  if (loading) {
    return (
      <div className="doctor-login-page">
        <div className="login-background">
          <div className="login-bg-overlay"></div>
          <div className="login-bg-pattern"></div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-login-page">
      {/* Background */}
      <div className="login-background">
        <div className="login-bg-overlay"></div>
        <div className="login-bg-pattern"></div>
      </div>

      {/* Main Content */}
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="hospital-logo">
              <Stethoscope size={48} />
            </div>
            <h1 className="hospital-name">SDAMC</h1>
            <h2 className="portal-title">Doctor Portal</h2>
            <p className="portal-description">
              Secure access to your patient appointments and medical dashboard
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">📅</div>
                <span>Manage Appointments</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <span>Patient Records</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <span>Analytics Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <div className="login-header">
              <h3>Welcome Back</h3>
              <p>Sign in to access your doctor dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Remember me for 30 days</span>
                </label>
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !email || !password}
                className="login-button"
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="demo-section">
              <h4>Demo Login Credentials</h4>
              <p>Click any doctor below to auto-fill login credentials:</p>
              <div className="demo-doctors">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('rajkumar.chavakula@sdamc.com', 'Rajkumar3439')}
                  className="demo-doctor-btn"
                >
                  Dr. Rajkumar Chavakula (Medical Director)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('sunil.ninan@sdamc.com', 'Sunil3439')}
                  className="demo-doctor-btn"
                >
                  Dr. Sunil Abraham Ninan (Pediatrician)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('ashok.kumar@sdamc.com', 'Ashok3439')}
                  className="demo-doctor-btn"
                >
                  Dr. P. G. Ashok Kumar (Cardiologist)
                </button>
              </div>
            </div>

            <div className="login-footer">
              <p>
                Need help? Contact IT Support: 
                <a href="tel:+919901103439"> +91 9901103439</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoginPage;
