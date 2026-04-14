import React, { useState, useEffect } from 'react';
import { subscribeToAllAppointments, updateAppointmentStatus } from '../firebase/config';
import { useReceptionistAuth } from '../contexts/ReceptionistAuthContext';
import NewAppointmentModal from './NewAppointmentModal';
import WalkInPatientModal from './WalkInPatientModal';
import DailyReportModal from './DailyReportModal';
import SendRemindersModal from './SendRemindersModal';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Activity,
  CheckCircle,
  AlertCircle,
  Search,
  Bell,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Send,
  UserPlus,
  FileText,
  Shield
} from 'lucide-react';
import Logo from '../assets/logo.png';
import './ReceptionistDashboard.css';

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

const ReceptionistDashboard: React.FC = () => {
  const { currentReceptionist, isAuthenticated, logout, hasPermission, loading: authLoading } = useReceptionistAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [activeTab, setActiveTab] = useState('today');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Modal states
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [showDailyReportModal, setShowDailyReportModal] = useState(false);
  const [showSendRemindersModal, setShowSendRemindersModal] = useState(false);

  // Redirect to login if not authenticated (but only after auth loading is complete)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/receptionist-login';
    }
  }, [isAuthenticated, authLoading]);

  // Set up real-time appointment listener
  useEffect(() => {
    if (!isAuthenticated || !hasPermission('view_all_appointments')) return;

    const setupRealTimeListener = () => {
      console.log('🔄 Setting up real-time appointment listener for receptionist...');
      setLoading(true);

      // Subscribe to real-time updates for ALL appointments
      const unsubscribe = subscribeToAllAppointments((newAppointments) => {
        console.log('📱 Real-time update received:', newAppointments.length, 'appointments');
        
        // Receptionist sees ALL appointments (no filtering by doctor)
        setAppointments(newAppointments);
        setLoading(false);
        setLastUpdated(new Date());

        // Show notification for new appointments
        if (newAppointments.length > appointments.length && appointments.length > 0) {
          showNotification('New appointment received!');
        }
      });

      return unsubscribe;
    };

    const unsubscribe = setupRealTimeListener();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated, hasPermission, appointments.length]);

  const showNotification = (message: string) => {
    // Simple notification system
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('SDA Hospital Reception', {
        body: message,
        icon: '/favicon.ico'
      });
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Filter appointments based on current filters
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = searchTerm === '' || 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || appointment.department === filterDepartment;
    const matchesDoctor = filterDoctor === 'all' || appointment.doctor === filterDoctor;

    const matchesDate = (() => {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      switch (activeTab) {
        case 'today':
          return appointment.date === today.toISOString().split('T')[0];
        case 'tomorrow':
          return appointment.date === tomorrow.toISOString().split('T')[0];
        case 'week':
          const weekFromNow = new Date(today);
          weekFromNow.setDate(today.getDate() + 7);
          return appointmentDate >= today && appointmentDate <= weekFromNow;
        case 'all':
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDepartment && matchesDoctor && matchesDate;
  });

  // Get unique departments and doctors for filter dropdowns
  const departments = [...new Set(appointments.map(apt => apt.department))].sort();
  const doctors = [...new Set(appointments.map(apt => apt.doctor))].sort();

  // Calculate statistics
  const stats = {
    total: appointments.length,
    today: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    if (!hasPermission('edit_appointments')) {
      alert('You do not have permission to update appointments.');
      return;
    }

    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      console.log('✅ Appointment status updated');
    } catch (error) {
      console.error('❌ Error updating appointment status:', error);
      alert('Failed to update appointment status. Please try again.');
    }
  };

  // Modal handlers
  const handleNewAppointmentSuccess = () => {
    console.log('✅ New appointment created successfully');
    // The real-time listener will automatically update the appointments list
  };

  const handleWalkInSuccess = () => {
    console.log('✅ Walk-in patient registered successfully');
    // The real-time listener will automatically update the appointments list
  };

  const handleOpenNewAppointment = () => {
    if (!hasPermission('create_appointments')) {
      alert('You do not have permission to create appointments.');
      return;
    }
    setShowNewAppointmentModal(true);
  };

  const handleOpenWalkIn = () => {
    if (!hasPermission('create_appointments')) {
      alert('You do not have permission to register walk-in patients.');
      return;
    }
    setShowWalkInModal(true);
  };

  const handleOpenDailyReport = () => {
    if (!hasPermission('generate_reports')) {
      alert('You do not have permission to generate reports.');
      return;
    }
    setShowDailyReportModal(true);
  };

  const handleOpenSendReminders = () => {
    if (!hasPermission('send_notifications')) {
      alert('You do not have permission to send notifications.');
      return;
    }
    setShowSendRemindersModal(true);
  };

  // Show loading screen while authentication is being checked
  if (authLoading) {
    return (
      <div className="receptionist-dashboard">
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

  return (
    <div className="receptionist-dashboard">
      {/* Background Elements */}
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
              <span>Reception Portal</span>
            </div>
          </div>
          <div className="dashboard-title">
            <h2>Reception Dashboard</h2>
            <span className="subtitle">Comprehensive Appointment Management</span>
          </div>
        </div>

        <div className="header-center">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search patients, doctors, or phone numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="header-btn notification-btn">
            <Bell size={20} />
            {stats.pending > 0 && <span className="notification-badge">{stats.pending}</span>}
          </button>
          
          <button className="header-btn settings-btn">
            <Settings size={20} />
          </button>

          <div className="receptionist-profile">
            <div className="receptionist-avatar">
              <Shield size={20} />
            </div>
            <div className="receptionist-info">
              <span className="receptionist-name">{currentReceptionist?.name || 'Receptionist'}</span>
              <span className="receptionist-role">{currentReceptionist?.role || 'Front Desk'}</span>
            </div>
          </div>
          
          <button className="header-btn logout-btn" onClick={logout}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card total-appointments">
            <div className="stat-icon">
              <Calendar size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Appointments</div>
            </div>
          </div>

          <div className="stat-card today-appointments">
            <div className="stat-icon">
              <Clock size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.today}</div>
              <div className="stat-label">Today's Appointments</div>
            </div>
          </div>

          <div className="stat-card pending-appointments">
            <div className="stat-icon">
              <AlertCircle size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending Confirmation</div>
            </div>
          </div>

          <div className="stat-card confirmed-appointments">
            <div className="stat-icon">
              <CheckCircle size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.confirmed}</div>
              <div className="stat-label">Confirmed</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {hasPermission('create_appointments') && (
            <>
              <button className="action-btn primary" onClick={handleOpenNewAppointment}>
                <Plus size={20} />
                New Appointment
              </button>
              <button className="action-btn secondary" onClick={handleOpenWalkIn}>
                <UserPlus size={20} />
                Walk-in Patient
              </button>
            </>
          )}
          {hasPermission('generate_reports') && (
            <button className="action-btn secondary" onClick={handleOpenDailyReport}>
              <FileText size={20} />
              Daily Report
            </button>
          )}
          {hasPermission('send_notifications') && (
            <button className="action-btn secondary" onClick={handleOpenSendReminders}>
              <Send size={20} />
              Send Reminders
            </button>
          )}
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeTab === 'today' ? 'active' : ''}`}
              onClick={() => setActiveTab('today')}
            >
              Today ({stats.today})
            </button>
            <button 
              className={`filter-tab ${activeTab === 'tomorrow' ? 'active' : ''}`}
              onClick={() => setActiveTab('tomorrow')}
            >
              Tomorrow
            </button>
            <button 
              className={`filter-tab ${activeTab === 'week' ? 'active' : ''}`}
              onClick={() => setActiveTab('week')}
            >
              This Week
            </button>
            <button 
              className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Appointments
            </button>
          </div>

          <div className="filter-controls">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select 
              value={filterDepartment} 
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select 
              value={filterDoctor} 
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Doctors</option>
              {doctors.map(doctor => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Appointments List */}
        <div className="appointments-section">
          <div className="section-header">
            <h2>Appointments ({filteredAppointments.length})</h2>
            {lastUpdated && (
              <span className="last-updated">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Loading appointments...</span>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} />
              <h3>No appointments found</h3>
              <p>No appointments match your current filters.</p>
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
                        <h3>{appointment.patientName}</h3>
                        <div className="patient-meta">
                          {appointment.age} years • {appointment.gender}
                        </div>
                      </div>
                    </div>
                    <div className={`status-badge ${appointment.status}`}>
                      {appointment.status}
                    </div>
                  </div>

                  <div className="appointment-body">
                    <div className="appointment-info">
                      <div className="info-item">
                        <MapPin size={16} />
                        <span>{appointment.department}</span>
                      </div>
                      <div className="info-item">
                        <User size={16} />
                        <span>{appointment.doctor}</span>
                      </div>
                      <div className="info-item">
                        <Calendar size={16} />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="info-item">
                        <Clock size={16} />
                        <span>{appointment.timeSlot}</span>
                      </div>
                      <div className="info-item">
                        <Phone size={16} />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>

                    {appointment.symptoms && (
                      <div className="symptoms">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </div>
                    )}
                  </div>

                  <div className="appointment-actions">
                    {hasPermission('edit_appointments') && (
                      <>
                        <button 
                          className="action-btn-sm confirm"
                          onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                          disabled={appointment.status === 'confirmed'}
                        >
                          <CheckCircle size={16} />
                          Confirm
                        </button>
                        <button 
                          className="action-btn-sm complete"
                          onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                          disabled={appointment.status === 'completed'}
                        >
                          <Activity size={16} />
                          Complete
                        </button>
                        <button className="action-btn-sm edit">
                          <Edit size={16} />
                          Edit
                        </button>
                      </>
                    )}
                    {hasPermission('send_notifications') && (
                      <button className="action-btn-sm notify">
                        <Send size={16} />
                        Remind
                      </button>
                    )}
                    {hasPermission('cancel_appointments') && (
                      <button 
                        className="action-btn-sm cancel"
                        onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                      >
                        <Trash2 size={16} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <NewAppointmentModal
        isOpen={showNewAppointmentModal}
        onClose={() => setShowNewAppointmentModal(false)}
        onSuccess={handleNewAppointmentSuccess}
      />

      <WalkInPatientModal
        isOpen={showWalkInModal}
        onClose={() => setShowWalkInModal(false)}
        onSuccess={handleWalkInSuccess}
        existingAppointments={appointments}
      />

      <DailyReportModal
        isOpen={showDailyReportModal}
        onClose={() => setShowDailyReportModal(false)}
        appointments={appointments}
      />

      <SendRemindersModal
        isOpen={showSendRemindersModal}
        onClose={() => setShowSendRemindersModal(false)}
        appointments={appointments}
      />
    </div>
  );
};

export default ReceptionistDashboard;
