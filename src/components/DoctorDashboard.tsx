import React, { useState, useEffect } from 'react';
import { subscribeToAllAppointments, updateAppointmentStatus, scheduleAutoCleanup } from '../firebase/config';
import { useDoctorAuth } from '../contexts/DoctorAuthContext';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Activity,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Bell,
  Settings,
  LogOut,

} from 'lucide-react';
import Logo from '../assets/logo.png';
import './DoctorDashboard.css';

interface Appointment {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  symptoms?: string;
  phone: string;
  status: string;
  createdAt: any;
}

const DoctorDashboard: React.FC = () => {
  const { currentDoctor, isAuthenticated, logout, loading: authLoading } = useDoctorAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('today');

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);


  const [isDateFiltering, setIsDateFiltering] = useState(false);

  // Redirect to login if not authenticated (but only after auth loading is complete)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/doctor-login';
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    setupRealTimeListener();

    // Initialize auto-cleanup for old appointments
    scheduleAutoCleanup();

    // Cleanup function
    return () => {
      // Unsubscribe will be handled by the listener itself
    };
  }, []);

  const setupRealTimeListener = () => {
    console.log('🔄 Setting up real-time appointment listener...');
    setLoading(true);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToAllAppointments((newAppointments) => {
      console.log('📱 Real-time update received:', newAppointments.length, 'appointments');

      // Filter appointments for the current doctor
      const doctorAppointments = currentDoctor
        ? newAppointments.filter(appointment =>
            appointment.doctor === currentDoctor.name
          )
        : [];

      setAppointments(doctorAppointments);
      setLoading(false);

      setLastUpdated(new Date());

      // Show notification for new appointments
      if (doctorAppointments.length > appointments.length && appointments.length > 0) {
        showNotification('New appointment received!');
      }
    });

    // Store unsubscribe function for cleanup
    return unsubscribe;
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);

      // Update local state immediately for better UX
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId
            ? { ...apt, status: newStatus }
            : apt
        )
      );

      showNotification(`Appointment ${newStatus} successfully!`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      showNotification('Failed to update appointment status', 'error');
    }
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    const today = new Date().toISOString().split('T')[0];

    // Enable date filtering when a specific date is selected
    if (newDate !== today) {
      setIsDateFiltering(true);
    } else {
      setIsDateFiltering(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset date filtering when switching tabs
    setIsDateFiltering(false);
    // Reset to today's date when switching tabs
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    // Simple notification - you can enhance this with a proper notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };



  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = appointment.date === selectedDate;

    const today = new Date().toISOString().split('T')[0];
    const appointmentDate = appointment.date;
    const isToday = appointmentDate === today;
    const isFuture = appointmentDate > today;

    // If date filtering is active (specific date selected), show appointments for that date
    if (isDateFiltering) {
      return matchesSearch && matchesStatus && matchesDate;
    }

    // Otherwise, use tab-based filtering
    if (activeTab === 'today') {
      // Today's Schedule: Show only today's appointments
      return matchesSearch && matchesStatus && isToday;
    } else if (activeTab === 'all') {
      // All Appointments: Show today + future appointments only
      return matchesSearch && matchesStatus && (isToday || isFuture);
    }

    return false;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const stats = {
    total: appointments.length,
    today: appointments.filter(a => a.date === selectedDate).length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length
  };

  // Show loading screen while authentication is being checked
  if (authLoading) {
    return (
      <div className="doctor-dashboard">
        <div className="dashboard-bg">
          <div className="bg-grid"></div>
          <div className="bg-glow"></div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="doctor-dashboard">
        <div className="dashboard-bg">
          <div className="bg-grid"></div>
          <div className="bg-glow"></div>
        </div>
        <div className="loading-container">
          <div className="auth-prompt">
            <h2>Authentication Required</h2>
            <p>Please log in to access the doctor dashboard.</p>
            <button
              className="login-redirect-btn"
              onClick={() => window.location.href = '/doctor-login'}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      {/* Sci-fi Background */}
      <div className="dashboard-bg">
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-section">
            <img src={Logo} alt="SDA Medical Centre" className="dashboard-logo-img" />
            <div className="logo-text">
              <h1>SDAMC</h1>
              <span>Doctor Portal</span>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="header-btn">
            <Bell size={20} />
            <span className="notification-badge">{stats.pending}</span>
          </button>
          <button className="header-btn">
            <Settings size={20} />
          </button>
          <div className="doctor-profile">
            <div className="doctor-avatar">
              <User size={20} />
            </div>
            {/* <div className="doctor-info">
              <span className="doctor-name">
                {authLoading ? 'Loading...' : (currentDoctor?.name || 'Dr. Medical Professional')}
              </span>
              <span className="doctor-dept">
                {authLoading ? 'Please wait...' : (currentDoctor?.specialty || currentDoctor?.department || 'Medical Department')}
              </span>
            </div> */}
          </div>
          <button className="header-btn logout-btn" onClick={logout}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Professional Greeting */}
        <div className="welcome-section">
          <h1 className="welcome-greeting">
            Hi, {currentDoctor?.name ? currentDoctor.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/, '') : 'Doctor'}
          </h1>
          <p className="welcome-subtitle">
            Welcome to your dashboard. Here's an overview of your appointments and activities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Appointments</div>
            </div>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+12%</span>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.today}</div>
              <div className="stat-label">Today's Appointments</div>
            </div>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+5%</span>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending Approvals</div>
            </div>
            <div className="stat-trend">
              <Activity size={16} />
              <span>Active</span>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed Today</div>
            </div>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+8%</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeTab === 'today' ? 'active' : ''}`}
              onClick={() => handleTabChange('today')}
            >
              <span>Today's Schedule</span>
            </button>
            <button
              className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              <span>All Appointments</span>
            </button>
          </div>

          <div className="filter-controls">
            <div className="date-picker">
              <Calendar size={16} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="status-filter">
              <Filter size={16} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="appointments-section">
          <div className="section-header">
            <div className="section-title-group">
              <h2>
                {isDateFiltering
                  ? `Appointments for ${new Date(selectedDate).toLocaleDateString()}`
                  : activeTab === 'today'
                    ? "Today's Appointments"
                    : "All Appointments (Today & Future)"
                }
              </h2>
              {lastUpdated && (
                <div className="last-updated">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
            <div className="appointment-count">
              {filteredAppointments.length} appointments
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span>Loading appointments...</span>
            </div>
          ) : (
            <div className="appointments-grid">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="patient-info">
                      <div className="patient-avatar">
                        <User size={20} />
                      </div>
                      <div className="patient-details">
                        <h3 className="patient-name">{appointment.patientName}</h3>
                        <span className="patient-meta">
                          {appointment.age} years • {appointment.gender}
                        </span>
                      </div>
                    </div>
                    <div className={`appointment-status ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span>{appointment.status}</span>
                    </div>
                  </div>

                  <div className="appointment-body">
                    <div className="appointment-detail">
                      <MapPin size={16} />
                      <span>{appointment.department}</span>
                    </div>
                    <div className="appointment-detail">
                      <User size={16} />
                      <span>{appointment.doctor}</span>
                    </div>
                    <div className="appointment-detail">
                      <Calendar size={16} />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="appointment-detail">
                      <Clock size={16} />
                      <span>{appointment.timeSlot}</span>
                    </div>
                    <div className="appointment-detail">
                      <Phone size={16} />
                      <span>{appointment.phone}</span>
                    </div>
                  </div>

                  {appointment.symptoms && (
                    <div className="appointment-symptoms">
                      <strong>Symptoms:</strong>
                      <p>{appointment.symptoms}</p>
                    </div>
                  )}

                  <div className="appointment-actions">
                    <button
                      className="action-btn approve-btn"
                      onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                      disabled={appointment.status === 'confirmed' || appointment.status === 'completed' || appointment.status === 'cancelled'}
                    >
                      <CheckCircle size={16} />
                      {appointment.status === 'confirmed' ? 'Approved' : 'Approve'}
                    </button>
                    <button
                      className="action-btn complete-btn"
                      onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                      disabled={appointment.status === 'completed' || appointment.status === 'cancelled' || appointment.status === 'pending'}
                    >
                      <CheckCircle size={16} />
                      {appointment.status === 'completed' ? 'Completed' : 'Complete'}
                    </button>
                    <button
                      className="action-btn cancel-btn"
                      onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                      disabled={appointment.status === 'completed' || appointment.status === 'cancelled'}
                    >
                      <AlertCircle size={16} />
                      {appointment.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredAppointments.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No appointments found</h3>
              <p>No appointments match your current filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
