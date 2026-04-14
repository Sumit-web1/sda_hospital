import React, { useState, useEffect } from 'react';
import { X, FileText, Download, Calendar, BarChart3, Users, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import './DailyReportModal.css';
import './DailyReportModal.css';

interface DailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: any[];
}

interface ReportStats {
  total: number;
  confirmed: number;
  completed: number;
  pending: number;
  cancelled: number;
  noShow: number;
}

interface DepartmentStats {
  [key: string]: {
    total: number;
    confirmed: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
}

const DailyReportModal: React.FC<DailyReportModalProps> = ({ isOpen, onClose, appointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [stats, setStats] = useState<ReportStats>({
    total: 0,
    confirmed: 0,
    completed: 0,
    pending: 0,
    cancelled: 0,
    noShow: 0
  });
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      generateReport();
    }
  }, [selectedDate, appointments, isOpen]);

  const generateReport = () => {
    setLoading(true);
    
    // Filter appointments for selected date
    const dayAppointments = appointments.filter(apt => apt.date === selectedDate);
    
    // Calculate overall statistics
    const newStats: ReportStats = {
      total: dayAppointments.length,
      confirmed: dayAppointments.filter(apt => apt.status === 'confirmed').length,
      completed: dayAppointments.filter(apt => apt.status === 'completed').length,
      pending: dayAppointments.filter(apt => apt.status === 'pending').length,
      cancelled: dayAppointments.filter(apt => apt.status === 'cancelled').length,
      noShow: dayAppointments.filter(apt => apt.status === 'no-show').length
    };

    // Calculate department-wise statistics
    const deptStats: DepartmentStats = {};
    dayAppointments.forEach(apt => {
      if (!deptStats[apt.department]) {
        deptStats[apt.department] = {
          total: 0,
          confirmed: 0,
          completed: 0,
          pending: 0,
          cancelled: 0
        };
      }
      deptStats[apt.department].total++;
      deptStats[apt.department][apt.status as keyof typeof deptStats[typeof apt.department]]++;
    });

    // Sort appointments by time slot
    const sortedAppointments = dayAppointments.sort((a, b) => {
      const timeA = convertTimeToMinutes(a.timeSlot);
      const timeB = convertTimeToMinutes(b.timeSlot);
      return timeA - timeB;
    });

    setReportData(sortedAppointments);
    setStats(newStats);
    setDepartmentStats(deptStats);
    setLoading(false);
  };

  const convertTimeToMinutes = (timeSlot: string): number => {
    const [time, period] = timeSlot.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = minutes;
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += (hours + 12) * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes += 0;
    } else {
      totalMinutes += hours * 60;
    }
    
    return totalMinutes;
  };

  const exportToPDF = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = generatePrintableReport();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Daily Appointment Report - ${new Date(selectedDate).toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #10b981; padding-bottom: 20px; }
            .hospital-name { font-size: 24px; font-weight: bold; color: #10b981; margin-bottom: 5px; }
            .report-title { font-size: 18px; margin-bottom: 5px; }
            .report-date { color: #666; }
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
            .stat-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; text-align: center; }
            .stat-number { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .stat-label { font-size: 12px; color: #666; text-transform: uppercase; }
            .section { margin: 30px 0; }
            .section-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #10b981; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f8f9fa; font-weight: bold; }
            .status { padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
            .status.confirmed { background: #d4edda; color: #155724; }
            .status.completed { background: #cce5ff; color: #004085; }
            .status.pending { background: #fff3cd; color: #856404; }
            .status.cancelled { background: #f8d7da; color: #721c24; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Auto-print after a short delay
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const generatePrintableReport = (): string => {
    const departmentEntries = Object.entries(departmentStats);
    
    return `
      <div class="header">
        <div class="hospital-name">SDA Medical Centre</div>
        <div class="report-title">Daily Appointment Report</div>
        <div class="report-date">${new Date(selectedDate).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">${stats.total}</div>
          <div class="stat-label">Total Appointments</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.confirmed}</div>
          <div class="stat-label">Confirmed</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.completed}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.pending}</div>
          <div class="stat-label">Pending</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.cancelled}</div>
          <div class="stat-label">Cancelled</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Department-wise Summary</div>
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Total</th>
              <th>Confirmed</th>
              <th>Completed</th>
              <th>Pending</th>
              <th>Cancelled</th>
            </tr>
          </thead>
          <tbody>
            ${departmentEntries.map(([dept, data]) => `
              <tr>
                <td><strong>${dept}</strong></td>
                <td>${data.total}</td>
                <td>${data.confirmed}</td>
                <td>${data.completed}</td>
                <td>${data.pending}</td>
                <td>${data.cancelled}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Detailed Appointment List</div>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Age/Gender</th>
              <th>Department</th>
              <th>Doctor</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${reportData.map(apt => `
              <tr>
                <td><strong>${apt.timeSlot}</strong></td>
                <td>${apt.patientName}</td>
                <td>${apt.age}/${apt.gender}</td>
                <td>${apt.department}</td>
                <td>${apt.doctor}</td>
                <td>${apt.phone}</td>
                <td><span class="status ${apt.status}">${apt.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>Generated on ${new Date().toLocaleString()} | SDA Medical Centre - Reception Department</p>
        <p>This report contains confidential patient information. Handle with care.</p>
      </div>
    `;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} className="status-icon confirmed" />;
      case 'completed': return <CheckCircle size={16} className="status-icon completed" />;
      case 'pending': return <Clock size={16} className="status-icon pending" />;
      case 'cancelled': return <XCircle size={16} className="status-icon cancelled" />;
      default: return <AlertCircle size={16} className="status-icon" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="daily-report-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <h2 className="modal-title">
              <FileText size={24} />
              Daily Appointment Report
            </h2>
            <p className="modal-subtitle">
              Comprehensive summary of appointments and statistics
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {/* Date Selection */}
          <div className="date-selection">
            <label htmlFor="reportDate">Select Date:</label>
            <input
              type="date"
              id="reportDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Generating report...</span>
            </div>
          ) : (
            <>
              {/* Statistics Overview */}
              <div className="report-stats">
                <h3>
                  <BarChart3 size={20} />
                  Statistics Overview
                </h3>
                <div className="stats-grid">
                  <div className="stat-card total">
                    <div className="stat-number">{stats.total}</div>
                    <div className="stat-label">Total Appointments</div>
                  </div>
                  <div className="stat-card confirmed">
                    <div className="stat-number">{stats.confirmed}</div>
                    <div className="stat-label">Confirmed</div>
                  </div>
                  <div className="stat-card completed">
                    <div className="stat-number">{stats.completed}</div>
                    <div className="stat-label">Completed</div>
                  </div>
                  <div className="stat-card pending">
                    <div className="stat-number">{stats.pending}</div>
                    <div className="stat-label">Pending</div>
                  </div>
                  <div className="stat-card cancelled">
                    <div className="stat-number">{stats.cancelled}</div>
                    <div className="stat-label">Cancelled</div>
                  </div>
                </div>
              </div>

              {/* Department Summary */}
              {Object.keys(departmentStats).length > 0 && (
                <div className="department-summary">
                  <h3>
                    <Users size={20} />
                    Department-wise Summary
                  </h3>
                  <div className="department-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Total</th>
                          <th>Confirmed</th>
                          <th>Completed</th>
                          <th>Pending</th>
                          <th>Cancelled</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(departmentStats).map(([dept, data]) => (
                          <tr key={dept}>
                            <td className="department-name">{dept}</td>
                            <td>{data.total}</td>
                            <td>{data.confirmed}</td>
                            <td>{data.completed}</td>
                            <td>{data.pending}</td>
                            <td>{data.cancelled}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Detailed Appointment List */}
              <div className="appointment-list">
                <h3>
                  <Calendar size={20} />
                  Detailed Appointment List ({reportData.length})
                </h3>
                {reportData.length === 0 ? (
                  <div className="empty-state">
                    <Calendar size={48} />
                    <p>No appointments found for {new Date(selectedDate).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <div className="appointments-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Patient</th>
                          <th>Age/Gender</th>
                          <th>Department</th>
                          <th>Doctor</th>
                          <th>Phone</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((apt) => (
                          <tr key={apt.id}>
                            <td className="time-slot">{apt.timeSlot}</td>
                            <td className="patient-name">{apt.patientName}</td>
                            <td>{apt.age}/{apt.gender}</td>
                            <td>{apt.department}</td>
                            <td>{apt.doctor}</td>
                            <td>{apt.phone}</td>
                            <td>
                              <div className="status-cell">
                                {getStatusIcon(apt.status)}
                                <span className={`status-text ${apt.status}`}>
                                  {apt.status}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Export Actions */}
              <div className="export-actions">
                <button className="btn-secondary" onClick={onClose}>
                  Close Report
                </button>
                <button className="btn-primary" onClick={exportToPDF}>
                  <Download size={20} />
                  Export to PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyReportModal;
