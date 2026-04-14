import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Users, 
  Briefcase 
} from 'lucide-react';
import Logo from '../assets/logo.png';
import './HRLoginPage.css';

import { useHRAuth } from '../contexts/HRAuthContext';

const HRLoginPage: React.FC = () => {
  const { login, hrUser, loading } = useHRAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hrUser && !loading) {
      navigate('/hr-dashboard', { replace: true });
    }
  }, [hrUser, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await login(email, password, rememberMe);
      
      navigate('/hr-dashboard', { replace: true });
      
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Login failed. Please check your credentials.");
      }
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-auth-wrapper">
        <div className="global-loader-ring"></div>
      </div>
    );
  }

  return (
    <div className="hr-auth-wrapper">
      <div className="auth-bg-layer">
        <div className="auth-pattern-fx"></div>
      </div>

      <div className="auth-content-box">
        <div className="auth-glass-panel">
          <div className="panel-header-row">
            <div className="brand-container">
              <img src={Logo} alt="SDA Medical Centre" className="brand-img" />
              <div className="brand-label">
                <h1>SDAMC</h1>
                <span>HR Management</span>
              </div>
            </div>
            <div className="role-pill hr-pill">
              <Users size={16} />
              <span>HR Access</span>
            </div>
          </div>

          <div className="auth-heading-section">
            <h2>HR Portal</h2>
            <p>Personnel and Recruitment Management</p>
          </div>

          {error && (
            <div className="auth-alert-box">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-entry-form">
            <div className="entry-group">
              <label htmlFor="email">Work Email</label>
              <div className="field-control">
                <Mail size={20} className="field-icon-symbol" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hr.manager@sdahospital.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="entry-group">
              <label htmlFor="password">Password</label>
              <div className="field-control">
                <Lock size={20} className="field-icon-symbol" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="pass-visibility-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="entry-options">
              <label className="remember-check-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="custom-tick"></span>
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              className="action-submit-btn hr-btn"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <div className="btn-load-circle"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Briefcase size={20} />
                  Access HR Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="panel-footer-section">
            <p>© 2026 SDA Medical Centre. HR System v1.1.0</p>
            <div className="nav-link-group">
              <a href="/">Main Site</a>
              <span className="divider">•</span>
              <a href="/admin-login">Admin</a>
              <span className="divider">•</span>
              <a href="/help">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRLoginPage;