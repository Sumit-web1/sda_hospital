import React, { useState, useEffect } from 'react';
import { useReceptionistAuth } from '../contexts/ReceptionistAuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import './ReceptionistLoginPage.css';

const ReceptionistLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, isAuthenticated, loading } = useReceptionistAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      window.location.href = '/receptionist-dashboard';
    }
  }, [isAuthenticated, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    const success = await login(email, password, rememberMe);
    if (success) window.location.href = '/receptionist-dashboard';
    setIsSubmitting(false);
  };

  return (
    <div className="rlp-page-wrapper">
      <div className="rlp-main-card">
        <div className="rlp-brand-side">
          <div className="rlp-brand-content">
            <div className="rlp-logo-box">
              <Shield size={48} />
            </div>
            <h1 className="rlp-hospital-name">SDAMC</h1>
            <h2 className="rlp-portal-tag">Reception Portal</h2>
            <p className="rlp-description">
              Comprehensive appointment management and patient care coordination
            </p>
          </div>
        </div>

        <div className="rlp-form-side">
          <div className="rlp-form-inner">
            <div className="rlp-header">
              <h3>Reception Access</h3>
              <p>Sign in to manage patient care</p>
            </div>

            <form onSubmit={handleSubmit} className="rlp-form">
              <div className="rlp-input-group">
                <label>Email Address</label>
                <div className="rlp-input-field">
                  <Mail className="rlp-icon" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="rlp-input-group">
                <label>Password</label>
                <div className="rlp-input-field">
                  <Lock className="rlp-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="rlp-password-toggle"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <label className="rlp-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              {error && (
                <div className="rlp-error-box">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !email || !password}
                className="rlp-submit-btn"
              >
                {isSubmitting ? "Signing in..." : (
                  <>Sign In <ArrowRight size={20} /></>
                )}
              </button>
            </form>

            <div className="rlp-footer">
              <p>Need help? IT Support: <a href="tel:+919901103439">+91 9901103439</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistLoginPage;