import React from 'react';
import {
  Calendar,
  Users,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Stethoscope,
  Shield,
  BarChart3,
  PieChart
} from 'lucide-react';
import "./AdminOverview.css";

interface Stats {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalDoctors: number;
  totalReceptionists: number;
  totalAdmins: number;
  activeUsers: number;
}

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

interface AdminOverviewProps {
  stats: Stats;
  appointments: Appointment[];
  lastUpdated: Date | null;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({
  stats,
  appointments,
  lastUpdated
}) => {
  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  const thisWeekStartStr = thisWeekStart.toISOString().split('T')[0];

  const weeklyAppointments = appointments.filter(apt => apt.date >= thisWeekStartStr).length;
  const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled').length;

  const departmentStats = appointments.reduce((acc, apt) => {
    acc[apt.department] = (acc[apt.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topDepartments = Object.entries(departmentStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const recentAppointments = appointments
    .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt).getTime() - new Date(a.createdAt?.toDate?.() || a.createdAt).getTime())
    .slice(0, 8);

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'blue',
      description: 'All appointments'
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: Clock,
      color: 'green',
      description: 'Scheduled for today'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingAppointments,
      icon: AlertCircle,
      color: 'orange',
      description: 'Awaiting confirmation'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      color: 'purple',
      description: 'Doctors, staff & admins'
    }
  ];

  const userStats = [
    {
      title: 'Doctors',
      value: stats.totalDoctors,
      icon: Stethoscope,
      color: 'blue'
    },
    {
      title: 'Receptionists',
      value: stats.totalReceptionists,
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Administrators',
      value: stats.totalAdmins,
      icon: Shield,
      color: 'purple'
    }
  ];

  return (
    <div className="adm-ov-wrapper">
      {/* Header */}
      <div className="adm-ov-header-box">
        <div className="adm-ov-header-left">
          <h1 className="adm-ov-main-title">Dashboard Overview</h1>
          <p className="adm-ov-main-subtitle">Comprehensive hospital management system analytics</p>
        </div>
        <div className="adm-ov-header-right">
          <div className="adm-ov-update-tag">
            <Activity size={16} />
            <span>
              Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="adm-ov-top-grid">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className={`adm-ov-stat-tile adm-ov-tile-${stat.color}`}>
              <div className="adm-ov-stat-top">
                <div className="adm-ov-icon-wrapper">
                  <IconComponent size={24} />
                </div>
              </div>
              <div className="adm-ov-stat-bottom">
                <div className="adm-ov-val-text">{stat.value.toLocaleString()}</div>
                <div className="adm-ov-label-text">{stat.title}</div>
                <div className="adm-ov-desc-text">{stat.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Cards */}
      <div className="adm-ov-layout-grid">
        {/* User Card */}
        <div className="adm-ov-info-card">
          <div className="adm-ov-card-head">
            <h3>User Management</h3>
            <Users size={20} />
          </div>
          <div className="adm-ov-user-body">
            {userStats.map((user, index) => (
              <div key={index} className={`adm-ov-user-row adm-ov-user-${user.color}`}>
                <div className="adm-ov-user-icon-box">
                  <user.icon size={20} />
                </div>
                <div className="adm-ov-user-info">
                  <div className="adm-ov-user-val">{user.value}</div>
                  <div className="adm-ov-user-lab">{user.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dept Card */}
        <div className="adm-ov-info-card">
          <div className="adm-ov-card-head">
            <h3>Top Departments</h3>
            <PieChart size={20} />
          </div>
          <div className="adm-ov-dept-body">
            {topDepartments.map(([department, count], index) => (
              <div key={index} className="adm-ov-dept-row">
                <div className="adm-ov-dept-meta">
                  <span className="adm-ov-dept-name">{department}</span>
                  <span className="adm-ov-dept-count">{count} appts</span>
                </div>
                <div className="adm-ov-bar-bg">
                  <div 
                    className="adm-ov-bar-fill"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(departmentStats))) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Card */}
        <div className="adm-ov-info-card">
          <div className="adm-ov-card-head">
            <h3>Quick Metrics</h3>
            <BarChart3 size={20} />
          </div>
          <div className="adm-ov-metrics-body">
            <div className="adm-ov-met-box">
              <div className="adm-ov-met-lab">This Week</div>
              <div className="adm-ov-met-val">{weeklyAppointments}</div>
            </div>
            <div className="adm-ov-met-box">
              <div className="adm-ov-met-lab">Completed</div>
              <div className="adm-ov-met-val">{stats.completedAppointments}</div>
            </div>
            <div className="adm-ov-met-box">
              <div className="adm-ov-met-lab">Cancelled</div>
              <div className="adm-ov-met-val">{cancelledAppointments}</div>
            </div>
          </div>
        </div>

        {/* Activity Card */}
        <div className="adm-ov-info-card adm-ov-wide-card">
          <div className="adm-ov-card-head">
            <h3>Recent Appointments</h3>
            <Activity size={20} />
          </div>
          <div className="adm-ov-activity-body">
            {recentAppointments.length > 0 ? (
              recentAppointments.map((apt) => (
                <div key={apt.id} className="adm-ov-log-row">
                  <div className="adm-ov-log-icon"><Calendar size={16} /></div>
                  <div className="adm-ov-log-content">
                    <div className="adm-ov-log-name">{apt.patientName} - {apt.department}</div>
                    <div className="adm-ov-log-sub">{apt.doctor} • {apt.date} at {apt.timeSlot}</div>
                  </div>
                  <div className={`adm-ov-log-badge adm-ov-badge-${apt.status}`}>
                    {apt.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="adm-ov-empty-state">No recent activity</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;