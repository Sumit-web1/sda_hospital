import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Search,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import "./AdminAppointmentManagement.css";

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

interface AdminAppointmentManagementProps {
  appointments: Appointment[];
  loading: boolean;
}

const AdminAppointmentManagement: React.FC<AdminAppointmentManagementProps> = ({
  appointments,
  loading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([]);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || appointment.department === filterDepartment;
    const matchesDate = !filterDate || appointment.date === filterDate;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
  });

  const departments = [...new Set(appointments.map(apt => apt.department))].sort();

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="adm-am-status-icon adm-am-completed" />;
      case 'confirmed':
        return <CheckCircle size={16} className="adm-am-status-icon adm-am-confirmed" />;
      case 'pending':
        return <Clock size={16} className="adm-am-status-icon adm-am-pending" />;
      case 'cancelled':
        return <XCircle size={16} className="adm-am-status-icon adm-am-cancelled" />;
      default:
        return <AlertCircle size={16} className="adm-am-status-icon" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'adm-am-green';
      case 'confirmed': return 'adm-am-blue';
      case 'pending': return 'adm-am-orange';
      case 'cancelled': return 'adm-am-red';
      default: return 'adm-am-gray';
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAppointments(filteredAppointments.map(apt => apt.id));
    } else {
      setSelectedAppointments([]);
    }
  };

  const handleSelectAppointment = (appointmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedAppointments([...selectedAppointments, appointmentId]);
    } else {
      setSelectedAppointments(selectedAppointments.filter(id => id !== appointmentId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for appointments:`, selectedAppointments);
  };

  const handleExport = () => {
    console.log('Exporting appointments data...');
  };

  if (loading) {
    return (
      <div className="adm-am-root">
        <div className="adm-am-loading-container">
          <div className="adm-am-loading-spinner"></div>
          <span>Loading appointments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-am-root">
      {/* Header */}
      <div className="adm-am-section-header">
        <div className="adm-am-header-content">
          <h1 className="adm-am-header-title">Appointment Management</h1>
          <p className="adm-am-header-subtitle">
            Manage all hospital appointments across departments
          </p>
        </div>

        <div className="adm-am-header-actions">
          <button className="adm-am-export-data-btn" onClick={handleExport}>
            <Download size={20} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="adm-am-stats-grid">
        <div className="adm-am-stat-card adm-am-total">
          <div className="adm-am-stat-icon-box">
            <Calendar size={24} />
          </div>
          <div className="adm-am-stat-text">
            <div className="adm-am-stat-number">{stats.total}</div>
            <div className="adm-am-stat-label">Total Appointments</div>
          </div>
        </div>
        
        <div className="adm-am-stat-card adm-am-pending">
          <div className="adm-am-stat-icon-box">
            <Clock size={24} />
          </div>
          <div className="adm-am-stat-text">
            <div className="adm-am-stat-number">{stats.pending}</div>
            <div className="adm-am-stat-label">Pending</div>
          </div>
        </div>
        
        <div className="adm-am-stat-card adm-am-confirmed">
          <div className="adm-am-stat-icon-box">
            <CheckCircle size={24} />
          </div>
          <div className="adm-am-stat-text">
            <div className="adm-am-stat-number">{stats.confirmed}</div>
            <div className="adm-am-stat-label">Confirmed</div>
          </div>
        </div>
        
        <div className="adm-am-stat-card adm-am-completed">
          <div className="adm-am-stat-icon-box">
            <CheckCircle size={24} />
          </div>
          <div className="adm-am-stat-text">
            <div className="adm-am-stat-number">{stats.completed}</div>
            <div className="adm-am-stat-label">Completed</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="adm-am-filters-container">
        <div className="adm-am-search-container">
          <Search size={18} className="adm-am-search-icon" />
          <input
            type="text"
            placeholder="Search patients, doctors, departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="adm-am-search-input"
          />
        </div>
        
        <div className="adm-am-filter-group">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="adm-am-filter-select"
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
            className="adm-am-filter-select"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="adm-am-filter-date"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAppointments.length > 0 && (
        <div className="adm-am-bulk-actions">
          <span className="adm-am-selected-count">
            {selectedAppointments.length} appointment(s) selected
          </span>
          <div className="adm-am-bulk-buttons">
            <button className="adm-am-bulk-btn adm-am-bulk-confirm" onClick={() => handleBulkAction('confirm')}>
              Confirm Selected
            </button>
            <button className="adm-am-bulk-btn adm-am-bulk-cancel" onClick={() => handleBulkAction('cancel')}>
              Cancel Selected
            </button>
            <button className="adm-am-bulk-btn adm-am-bulk-delete" onClick={() => handleBulkAction('delete')}>
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="adm-am-table-container">
        <div className="adm-am-table-wrapper">
          <table className="adm-am-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedAppointments.length === filteredAppointments.length && filteredAppointments.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedAppointments.includes(appointment.id)}
                      onChange={(e) => handleSelectAppointment(appointment.id, e.target.checked)}
                    />
                  </td>
                  <td>
                    <div className="adm-am-patient-info">
                      <div className="adm-am-patient-avatar">
                        <User size={16} />
                      </div>
                      <div className="adm-am-patient-details">
                        <div className="adm-am-patient-name">{appointment.patientName}</div>
                        <div className="adm-am-patient-meta">
                          {appointment.age} years, {appointment.gender}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="adm-am-doctor-name">{appointment.doctor}</td>
                  <td className="adm-am-department-name">{appointment.department}</td>
                  <td>
                    <div className="adm-am-datetime-info">
                      <div className="adm-am-appointment-date">{appointment.date}</div>
                      <div className="adm-am-appointment-time">{appointment.timeSlot}</div>
                    </div>
                  </td>
                  <td>
                    <div className={`adm-am-status-badge ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span>{appointment.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="adm-am-contact-info">
                      <Phone size={14} />
                      <span>{appointment.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="adm-am-action-buttons">
                      <button className="adm-am-action-btn adm-am-view" title="View Details"><Eye size={16} /></button>
                      <button className="adm-am-action-btn adm-am-edit" title="Edit Appointment"><Edit size={16} /></button>
                      <button className="adm-am-action-btn adm-am-delete" title="Delete Appointment"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="adm-am-pagination">
        <div className="adm-am-pagination-info">
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </div>
        <div className="adm-am-pagination-controls">
          <button className="adm-am-pagination-btn" disabled>Previous</button>
          <button className="adm-am-pagination-btn adm-am-pagination-active">1</button>
          <button className="adm-am-pagination-btn" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointmentManagement;