import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { subscribeToAllAppointments, initializeBlogCategories } from '../firebase/config';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminOverview from './AdminOverview';
import AdminUserManagement from './AdminUserManagement';
import AdminAppointmentManagement from './AdminAppointmentManagement';
import AdminContentManagement from './AdminContentManagement';
import AdminAnalytics from './AdminAnalytics';
import AdminSystemSettings from './AdminSystemSettings';
import AdminBookingManagement from './AdminBookingManagement';
import {
  BarChart3,
  Users,
  Calendar,
  FileText,
  Settings,
  Shield,
  TrendingUp
} from 'lucide-react';
import './AdminDashboard.css';

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

const AdminDashboard: React.FC = () => {
  const { currentAdmin, isAuthenticated, loading: authLoading } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/admin-login';
    }
  }, [isAuthenticated, authLoading]);

  // Subscribe to appointments data and initialize blog categories
  useEffect(() => {
    if (!isAuthenticated) return;

    initializeBlogCategories();

    const unsubscribe = subscribeToAllAppointments((appointmentsData) => {
      setAppointments(appointmentsData);
      setLastUpdated(new Date());
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [isAuthenticated]);

  // Loading screen while authentication is being checked
  if (authLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="auth-prompt">
            <Shield size={48} />
            <h2>Administrator Access Required</h2>
            <p>Please log in to access the admin dashboard.</p>
            <button
              className="login-redirect-btn"
              onClick={() => window.location.href = '/admin-login'}
            >
              Go to Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard statistics
  const stats = {
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    completedAppointments: appointments.filter(a => a.status === 'completed').length,
    totalDoctors: 37,
    totalReceptionists: 4,
    totalAdmins: 5,
    activeUsers: 46
  };

  // Navigation items including Booking
  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3, description: 'Key metrics and analytics' },
    { id: 'users', label: 'User Management', icon: Users, description: 'Manage doctors, receptionists, and admins' },
    { id: 'appointments', label: 'Appointment Management', icon: Calendar, description: 'View and manage all appointments' },
    { id: 'booking', label: 'Booking Management', icon: Calendar, description: 'View and manage bookings' },
    { id: 'content', label: 'Content Management', icon: FileText, description: 'Edit website content and information' },
    { id: 'analytics', label: 'Analytics & Reports', icon: TrendingUp, description: 'Detailed reports and insights' },
    { id: 'settings', label: 'System Settings', icon: Settings, description: 'Configure system preferences' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview': return <AdminOverview stats={stats} appointments={appointments} lastUpdated={lastUpdated} />;
      case 'users': return <AdminUserManagement />;
      case 'appointments': return <AdminAppointmentManagement appointments={appointments} loading={loading} />;
      case 'booking': return <AdminBookingManagement />;
      case 'content': return <AdminContentManagement />;
      case 'analytics': return <AdminAnalytics appointments={appointments} stats={stats} />;
      case 'settings': return <AdminSystemSettings />;
      default: return <AdminOverview stats={stats} appointments={appointments} lastUpdated={lastUpdated} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        navigationItems={navigationItems}
        currentAdmin={currentAdmin}
      />

      <div className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <AdminHeader
          currentAdmin={currentAdmin}
          activeSection={activeSection}
          navigationItems={navigationItems}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <main className="admin-content">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
