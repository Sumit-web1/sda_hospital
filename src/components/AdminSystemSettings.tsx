import React, { useState } from 'react';
import {
  Settings,
  Database,
  Shield,
  Bell,
  Globe,
  Clock,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import "./AdminSystemSettings.css";

const AdminSystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'SDA Medical Centre',
    siteDescription: 'Leading healthcare provider',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    appointmentDuration: 30,
    maxAppointmentsPerDay: 50,
    enableNotifications: true,
    enableSMS: true,
    enableEmail: true,
    maintenanceMode: false
  });

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appointments', label: 'Appointments', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System Control', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
  };

  const renderGeneralSettings = () => (
    <div className="adm-ss-mosaic-grid">
      <div className="adm-ss-form-card">
        <div className="adm-ss-card-head">
          <Settings size={18} />
          <h4>Branding</h4>
        </div>
        <div className="adm-ss-card-body">
          <div className="adm-ss-input-group">
            <label>Site Name</label>
            <input type="text" value={settings.siteName} onChange={(e) => handleSettingChange('siteName', e.target.value)} />
          </div>
          <div className="adm-ss-input-group">
            <label>Site Description</label>
            <textarea value={settings.siteDescription} onChange={(e) => handleSettingChange('siteDescription', e.target.value)} rows={2} />
          </div>
        </div>
      </div>

      <div className="adm-ss-form-card">
        <div className="adm-ss-card-head">
          <Globe size={18} />
          <h4>Localization</h4>
        </div>
        <div className="adm-ss-card-body">
          <div className="adm-ss-input-group">
            <label>Timezone</label>
            <select value={settings.timezone} onChange={(e) => handleSettingChange('timezone', e.target.value)}>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div className="adm-ss-input-group">
            <label>Date Format</label>
            <select value={settings.dateFormat} onChange={(e) => handleSettingChange('dateFormat', e.target.value)}>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointmentSettings = () => (
    <div className="adm-ss-mosaic-grid">
      <div className="adm-ss-form-card">
        <div className="adm-ss-card-head">
          <Clock size={18} />
          <h4>Configuration</h4>
        </div>
        <div className="adm-ss-card-body">
          <div className="adm-ss-input-group">
            <label>Default Duration (min)</label>
            <input type="number" value={settings.appointmentDuration} onChange={(e) => handleSettingChange('appointmentDuration', parseInt(e.target.value))} />
          </div>
          <div className="adm-ss-input-group">
            <label>Max Daily Cap</label>
            <input type="number" value={settings.maxAppointmentsPerDay} onChange={(e) => handleSettingChange('maxAppointmentsPerDay', parseInt(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="adm-ss-form-card adm-ss-card-highlight">
        <div className="adm-ss-card-head">
          <ArrowRight size={18} />
          <h4>Active Shift Hours</h4>
        </div>
        <div className="adm-ss-card-body adm-ss-time-grid">
          <div className="adm-ss-time-box">
            <span>Morning</span>
            <input type="time" defaultValue="09:00" /> <i>to</i> <input type="time" defaultValue="12:00" />
          </div>
          <div className="adm-ss-time-box">
            <span>Evening</span>
            <input type="time" defaultValue="14:00" /> <i>to</i> <input type="time" defaultValue="18:00" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="adm-ss-toggle-grid">
      {[
        { key: 'enableNotifications', label: 'Push Notifications', desc: 'Browser alerts' },
        { key: 'enableSMS', label: 'SMS Service', desc: 'Carrier messages' },
        { key: 'enableEmail', label: 'Email Dispatch', desc: 'SMTP protocols' }
      ].map((item) => (
        <div className="adm-ss-toggle-panel" key={item.key}>
          <div className="adm-ss-toggle-text">
            <h5>{item.label}</h5>
            <p>{item.desc}</p>
          </div>
          <label className="adm-ss-switch">
            <input type="checkbox" checked={(settings as any)[item.key]} onChange={(e) => handleSettingChange(item.key, e.target.checked)} />
            <span className="adm-ss-slider"></span>
          </label>
        </div>
      ))}
    </div>
  );

  const renderSystemSettings = () => (
    <div className="adm-ss-mosaic-grid">
      <div className="adm-ss-form-card adm-ss-danger-card">
        <div className="adm-ss-card-head">
          <AlertTriangle size={18} />
          <h4>Safety & Mode</h4>
        </div>
        <div className="adm-ss-card-body">
          <div className="adm-ss-toggle-panel simple">
            <label>Maintenance Mode</label>
            <label className="adm-ss-switch">
              <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)} />
              <span className="adm-ss-slider"></span>
            </label>
          </div>
          <p className="adm-ss-note">Public access will be restricted when active.</p>
        </div>
      </div>

      <div className="adm-ss-form-card">
        <div className="adm-ss-card-head">
          <Database size={18} />
          <h4>Live Status</h4>
        </div>
        <div className="adm-ss-card-body adm-ss-status-list">
          <div className="adm-ss-status-row"><CheckCircle size={14} className="ok" /> Database: Online</div>
          <div className="adm-ss-status-row"><CheckCircle size={14} className="ok" /> API Sync: Active</div>
          <div className="adm-ss-action-btns">
            <button className="adm-ss-btn-ghost"><RefreshCw size={14} /> Clear Cache</button>
            <button className="adm-ss-btn-ghost"><Database size={14} /> Backup</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="adm-ss-root">
      <div className="adm-ss-top-bar">
        <div className="adm-ss-title-area">
          <h1 className="adm-ss-h1">System Console</h1>
          <div className="adm-ss-badge">Build 2.0.4 - Live</div>
        </div>
        <button className="adm-ss-save-float" onClick={handleSaveSettings}>
          <Save size={18} /> <span>Save Profile</span>
        </button>
      </div>

      <nav className="adm-ss-tabs-nav">
        {settingsTabs.map((tab) => (
          <button key={tab.id} className={`adm-ss-tab-link ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <tab.icon size={16} /> <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="adm-ss-content-view">
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'appointments' && renderAppointmentSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'system' && renderSystemSettings()}
        {['security', 'database'].includes(activeTab) && (
          <div className="adm-ss-coming-card">
            <Shield size={40} />
            <h5>Advanced Security Console</h5>
            <p>This module requires higher clearance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSystemSettings;