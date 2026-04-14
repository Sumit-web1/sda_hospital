import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Shield,
  Settings
} from 'lucide-react';
import Logo from '../assets/logo.png';
import './AdminLoginPage.css';

const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated, loading, error } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      window.location.href = '/admin-dashboard';
    }
  }, [isAuthenticated, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    await login(email, password, rememberMe);
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="admin-auth-wrapper">
        <div className="auth-content-box">
          <div className="global-loader-ring"></div>
          <p className="loading-text">Loading secure environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-auth-wrapper">
      <div className="auth-bg-layer">
        <div className="auth-pattern-fx"></div>
        <div className="auth-overlay-tint"></div>
      </div>

      <div className="auth-content-box">
        <div className="auth-glass-panel">
          <div className="panel-header-row">
            <div className="brand-container">
              <img src={Logo} alt="SDA Medical Centre" className="brand-img" />
              <div className="brand-label">
                <h1>SDAMC</h1>
                <span>Admin Portal</span>
              </div>
            </div>
            <div className="role-pill">
              <Shield size={16} />
              <span>Admin Access</span>
            </div>
          </div>

          <div className="auth-heading-section">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access the dashboard.</p>
          </div>

          {error && (
            <div className="auth-alert-box">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-entry-form">
            <div className="entry-group">
              <label htmlFor="email">Email Address</label>
              <div className="field-control">
                <Mail size={20} className="field-icon-symbol" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sdamc.com"
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
                  aria-label="Toggle password visibility"
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
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="action-submit-btn"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <div className="btn-load-circle"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Settings size={20} />
                  Login to Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="panel-footer-section">
            <p>© 2026 SDA Medical Centre. System v1.0.2</p>
            <div className="nav-link-group">
              <a href="/admin-dashboard">admin</a>
              <span className="divider">•</span>
              <a href="/doctor-login">Doctor</a>
              <span className="divider">•</span>
              <a href="/receptionist-login">Reception</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;