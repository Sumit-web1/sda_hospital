import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, Mail, Phone, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';
import './SendRemindersModal.css';
import './SendRemindersModal.css';
import './SendRemindersModal.css';

interface SendRemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: any[];
}

interface ReminderTemplate {
  id: string;
  name: string;
  type: 'sms' | 'email';
  subject?: string;
  message: string;
}

interface ReminderStatus {
  appointmentId: string;
  status: 'pending' | 'sent' | 'failed';
  error?: string;
}

const reminderTemplates: ReminderTemplate[] = [
  {
    id: 'sms-reminder',
    name: 'SMS Appointment Reminder',
    type: 'sms',
    message: 'Dear {patientName}, this is a reminder for your appointment with {doctor} at {department} on {date} at {time}. Please arrive 15 minutes early. SDA Medical Centre'
  },
  {
    id: 'email-reminder',
    name: 'Email Appointment Reminder',
    type: 'email',
    subject: 'Appointment Reminder - SDA Medical Centre',
    message: 'Dear {patientName},\n\nThis is a friendly reminder about your upcoming appointment:\n\nDoctor: {doctor}\nDepartment: {department}\nDate: {date}\nTime: {time}\n\nPlease arrive 15 minutes before your scheduled time. If you need to reschedule, please contact us at +91 9901103439.\n\nThank you,\nSDA Medical Centre'
  },
  {
    id: 'sms-urgent',
    name: 'SMS Urgent Reminder',
    type: 'sms',
    message: 'URGENT: {patientName}, your appointment with {doctor} is TODAY at {time}. Please confirm your attendance by calling +91 9901103439. SDA Medical Centre'
  }
];

const SendRemindersModal: React.FC<SendRemindersModalProps> = ({ isOpen, onClose, appointments }) => {
  const [selectedFilter, setSelectedFilter] = useState<'today' | 'tomorrow' | 'upcoming'>('today');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('sms-reminder');
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [sending, setSending] = useState(false);
  const [reminderStatuses, setReminderStatuses] = useState<ReminderStatus[]>([]);
  const [showResults, setShowResults] = useState(false);

  const filteredAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Only show confirmed and pending appointments
    if (!['confirmed', 'pending'].includes(apt.status)) return false;

    switch (selectedFilter) {
      case 'today':
        return apt.date === today.toISOString().split('T')[0];
      case 'tomorrow':
        return apt.date === tomorrow.toISOString().split('T')[0];
      case 'upcoming':
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        return appointmentDate >= today && appointmentDate <= weekFromNow;
      default:
        return false;
    }
  });

  useEffect(() => {
    // Auto-select all appointments when filter changes
    setSelectedAppointments(filteredAppointments.map(apt => apt.id));
  }, [selectedFilter, filteredAppointments]);

  const handleAppointmentToggle = (appointmentId: string) => {
    setSelectedAppointments(prev => 
      prev.includes(appointmentId)
        ? prev.filter(id => id !== appointmentId)
        : [...prev, appointmentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAppointments.length === filteredAppointments.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(filteredAppointments.map(apt => apt.id));
    }
  };

  const formatMessage = (template: string, appointment: any): string => {
    return template
      .replace('{patientName}', appointment.patientName)
      .replace('{doctor}', appointment.doctor)
      .replace('{department}', appointment.department)
      .replace('{date}', new Date(appointment.date).toLocaleDateString())
      .replace('{time}', appointment.timeSlot);
  };

  const simulateReminderSending = async (appointmentIds: string[]): Promise<ReminderStatus[]> => {
    const statuses: ReminderStatus[] = [];
    
    for (const id of appointmentIds) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      // Simulate success/failure (90% success rate)
      const success = Math.random() > 0.1;
      
      statuses.push({
        appointmentId: id,
        status: success ? 'sent' : 'failed',
        error: success ? undefined : 'Network error or invalid phone number'
      });
    }
    
    return statuses;
  };

  const handleSendReminders = async () => {
    if (selectedAppointments.length === 0) return;

    setSending(true);
    setReminderStatuses([]);
    
    try {
      // Initialize all as pending
      const initialStatuses = selectedAppointments.map(id => ({
        appointmentId: id,
        status: 'pending' as const
      }));
      setReminderStatuses(initialStatuses);

      // Simulate sending reminders
      const results = await simulateReminderSending(selectedAppointments);
      setReminderStatuses(results);
      setShowResults(true);
      
    } catch (error) {
      console.error('Error sending reminders:', error);
    } finally {
      setSending(false);
    }
  };

  const getSelectedTemplate = (): ReminderTemplate => {
    return reminderTemplates.find(t => t.id === selectedTemplate) || reminderTemplates[0];
  };

  const getPreviewMessage = (): string => {
    if (useCustomMessage) return customMessage;
    
    const template = getSelectedTemplate();
    const sampleAppointment = filteredAppointments[0];
    
    if (!sampleAppointment) return template.message;
    
    return formatMessage(template.message, sampleAppointment);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle size={16} className="status-icon success" />;
      case 'failed': return <AlertCircle size={16} className="status-icon error" />;
      case 'pending': return <Clock size={16} className="status-icon pending" />;
      default: return null;
    }
  };

  const handleClose = () => {
    setSelectedAppointments([]);
    setReminderStatuses([]);
    setShowResults(false);
    setUseCustomMessage(false);
    setCustomMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="send-reminders-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <h2 className="modal-title">
              <Send size={24} />
              Send Appointment Reminders
            </h2>
            <p className="modal-subtitle">
              Send bulk reminders to patients about their upcoming appointments
            </p>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {!showResults ? (
            <>
              {/* Filter Selection */}
              <div className="filter-section">
                <h3>Select Appointments</h3>
                <div className="filter-tabs">
                  <button 
                    className={`filter-tab ${selectedFilter === 'today' ? 'active' : ''}`}
                    onClick={() => setSelectedFilter('today')}
                  >
                    Today ({appointments.filter(a => a.date === new Date().toISOString().split('T')[0] && ['confirmed', 'pending'].includes(a.status)).length})
                  </button>
                  <button 
                    className={`filter-tab ${selectedFilter === 'tomorrow' ? 'active' : ''}`}
                    onClick={() => setSelectedFilter('tomorrow')}
                  >
                    Tomorrow
                  </button>
                  <button 
                    className={`filter-tab ${selectedFilter === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setSelectedFilter('upcoming')}
                  >
                    This Week
                  </button>
                </div>
              </div>

              {/* Appointment Selection */}
              <div className="appointment-selection">
                <div className="selection-header">
                  <h4>
                    <Users size={20} />
                    Appointments ({filteredAppointments.length})
                  </h4>
                  <button 
                    className="select-all-btn"
                    onClick={handleSelectAll}
                  >
                    {selectedAppointments.length === filteredAppointments.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                {filteredAppointments.length === 0 ? (
                  <div className="empty-state">
                    <Users size={48} />
                    <p>No appointments found for the selected period</p>
                  </div>
                ) : (
                  <div className="appointments-list">
                    {filteredAppointments.map(apt => (
                      <label key={apt.id} className="appointment-item">
                        <input
                          type="checkbox"
                          checked={selectedAppointments.includes(apt.id)}
                          onChange={() => handleAppointmentToggle(apt.id)}
                        />
                        <div className="appointment-details">
                          <div className="patient-info">
                            <strong>{apt.patientName}</strong>
                            <span className="phone">{apt.phone}</span>
                          </div>
                          <div className="appointment-info">
                            <span>{apt.doctor} - {apt.department}</span>
                            <span>{new Date(apt.date).toLocaleDateString()} at {apt.timeSlot}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Template Selection */}
              <div className="template-section">
                <h3>
                  <MessageSquare size={20} />
                  Message Template
                </h3>
                
                <div className="template-options">
                  {reminderTemplates.map(template => (
                    <label key={template.id} className="template-option">
                      <input
                        type="radio"
                        name="template"
                        value={template.id}
                        checked={selectedTemplate === template.id && !useCustomMessage}
                        onChange={() => {
                          setSelectedTemplate(template.id);
                          setUseCustomMessage(false);
                        }}
                      />
                      <div className="template-content">
                        <div className="template-header">
                          {template.type === 'sms' ? <Phone size={16} /> : <Mail size={16} />}
                          <strong>{template.name}</strong>
                        </div>
                        <p>{template.message.substring(0, 100)}...</p>
                      </div>
                    </label>
                  ))}
                  
                  <label className="template-option">
                    <input
                      type="radio"
                      name="template"
                      checked={useCustomMessage}
                      onChange={() => setUseCustomMessage(true)}
                    />
                    <div className="template-content">
                      <div className="template-header">
                        <MessageSquare size={16} />
                        <strong>Custom Message</strong>
                      </div>
                      <p>Write your own custom reminder message</p>
                    </div>
                  </label>
                </div>

                {useCustomMessage && (
                  <div className="custom-message">
                    <label htmlFor="customMessage">Custom Message</label>
                    <textarea
                      id="customMessage"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Enter your custom reminder message..."
                      rows={4}
                    />
                    <p className="template-help">
                      Use placeholders: {'{patientName}'}, {'{doctor}'}, {'{department}'}, {'{date}'}, {'{time}'}
                    </p>
                  </div>
                )}
              </div>

              {/* Message Preview */}
              <div className="message-preview">
                <h4>Message Preview</h4>
                <div className="preview-content">
                  {getSelectedTemplate().type === 'email' && (
                    <div className="email-subject">
                      <strong>Subject:</strong> {getSelectedTemplate().subject}
                    </div>
                  )}
                  <div className="preview-message">
                    {getPreviewMessage()}
                  </div>
                </div>
              </div>

              {/* Send Actions */}
              <div className="send-actions">
                <button className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSendReminders}
                  disabled={selectedAppointments.length === 0 || sending}
                >
                  {sending ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending Reminders...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send {selectedAppointments.length} Reminder{selectedAppointments.length !== 1 ? 's' : ''}
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Results View */
            <div className="results-section">
              <div className="results-header">
                <h3>
                  <CheckCircle size={24} />
                  Reminder Results
                </h3>
                <div className="results-summary">
                  <span className="success-count">
                    {reminderStatuses.filter(s => s.status === 'sent').length} Sent
                  </span>
                  <span className="failed-count">
                    {reminderStatuses.filter(s => s.status === 'failed').length} Failed
                  </span>
                </div>
              </div>

              <div className="results-list">
                {reminderStatuses.map(status => {
                  const appointment = appointments.find(apt => apt.id === status.appointmentId);
                  if (!appointment) return null;

                  return (
                    <div key={status.appointmentId} className="result-item">
                      <div className="result-status">
                        {getStatusIcon(status.status)}
                      </div>
                      <div className="result-details">
                        <div className="patient-name">{appointment.patientName}</div>
                        <div className="appointment-details">
                          {appointment.doctor} - {new Date(appointment.date).toLocaleDateString()} at {appointment.timeSlot}
                        </div>
                        {status.error && (
                          <div className="error-details">{status.error}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="results-actions">
                <button className="btn-primary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendRemindersModal;
