import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Calendar,
  Users,
  Clock,
  Download
} from 'lucide-react';
import "./AdminAnalytics.css";


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

interface AdminAnalyticsProps {
  appointments: Appointment[];
  stats: Stats;
}

const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ appointments, stats }) => {
  // Calculate analytics data
  const departmentStats = appointments.reduce((acc, apt) => {
    acc[apt.department] = (acc[apt.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = [
    { month: 'Jan', appointments: 45, revenue: 12500 },
    { month: 'Feb', appointments: 52, revenue: 14200 },
    { month: 'Mar', appointments: 48, revenue: 13100 },
    { month: 'Apr', appointments: 61, revenue: 16800 },
    { month: 'May', appointments: 55, revenue: 15200 },
    { month: 'Jun', appointments: 67, revenue: 18500 }
  ];

  const analyticsCards = [
    {
      title: 'Monthly Growth',
      value: '+23%',
      icon: TrendingUp,
      color: 'green',
      description: 'Compared to last month'
    },
    {
      title: 'Average Daily',
      value: '12.5',
      icon: Calendar,
      color: 'blue',
      description: 'Appointments per day'
    },
    {
      title: 'Peak Hours',
      value: '10-12 AM',
      icon: Clock,
      color: 'orange',
      description: 'Busiest time slot'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      icon: Activity,
      color: 'purple',
      description: 'Appointments completed'
    }
  ];

  return (
    <div className="admin-analytics">
      {/* Header */}
      <div className="section-header">
<div className="analytics-header-content">
  <h1 className="analytics-title">Analytics & Reports</h1>
  <p className="analytics-subtitle">Comprehensive insights and performance metrics</p>
</div>
<div className="analytics-header-actions">
  <button className="export-report-btn">
    <Download size={20} />
    <span>Export Report</span>
  </button>
</div>
      </div>

      {/* Analytics Cards */}
      <div className="analytics-cards">
        {analyticsCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={`analytics-card ${card.color}`}>
              <div className="card-icon">
                <IconComponent size={24} />
              </div>
              <div className="card-content">
                <div className="card-value">{card.value}</div>
                <div className="card-title">{card.title}</div>
                <div className="card-description">{card.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Monthly Trends */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Monthly Appointment Trends</h3>
            <BarChart3 size={20} />
          </div>
          <div className="chart-content">
            <div className="chart-placeholder">
              <BarChart3 size={64} />
              <h4>Interactive Charts Coming Soon</h4>
              <p>Advanced analytics with Chart.js integration</p>
              <div className="mock-data">
                {monthlyData.map((data, index) => (
                  <div key={index} className="data-point">
                    <span className="month">{data.month}</span>
                    <span className="value">{data.appointments} appointments</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Department Distribution</h3>
            <PieChart size={20} />
          </div>
          <div className="chart-content">
            <div className="chart-placeholder">
              <PieChart size={64} />
              <h4>Department Analytics</h4>
              <p>Visual breakdown by department</p>
              <div className="department-list">
                {Object.entries(departmentStats)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([dept, count]) => (
                    <div key={dept} className="dept-item">
                      <span className="dept-name">{dept}</span>
                      <span className="dept-count">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Performance Dashboard</h3>
            <Activity size={20} />
          </div>
          <div className="chart-content">
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-label">Total Appointments</div>
                <div className="metric-value">{stats.totalAppointments}</div>
                <div className="metric-change positive">+12% from last month</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Active Doctors</div>
                <div className="metric-value">{stats.totalDoctors}</div>
                <div className="metric-change neutral">No change</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Completion Rate</div>
                <div className="metric-value">94.2%</div>
                <div className="metric-change positive">+2.1% improvement</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Average Wait Time</div>
                <div className="metric-value">15 min</div>
                <div className="metric-change positive">-3 min improvement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="reports-section">
        <h3>Available Reports</h3>
        <div className="reports-grid">
          <div className="report-card">
            <div className="report-icon">
              <Calendar size={24} />
            </div>
            <div className="report-content">
              <h4>Daily Report</h4>
              <p>Daily appointment summary and statistics</p>
              <button className="btn-outline">Generate</button>
            </div>
          </div>
          
          <div className="report-card">
            <div className="report-icon">
              <Users size={24} />
            </div>
            <div className="report-content">
              <h4>Doctor Performance</h4>
              <p>Individual doctor statistics and metrics</p>
              <button className="btn-outline">Generate</button>
            </div>
          </div>
          
          <div className="report-card">
            <div className="report-icon">
              <BarChart3 size={24} />
            </div>
            <div className="report-content">
              <h4>Monthly Analytics</h4>
              <p>Comprehensive monthly performance report</p>
              <button className="btn-outline">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
