import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Shield,
  Stethoscope,
  Crown,
  Settings
} from 'lucide-react';
import "./AdminUserManagement.css";

const AdminUserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sunil Abraham Ninan',
      email: 'sunil.ninan@sdamc.com',
      specialty: 'Pediatrician',
      department: 'Pediatrics Department',
      status: 'active',
      lastLogin: '2024-01-15 09:30 AM',
      appointmentsCount: 45
    },
    {
      id: 2,
      name: 'Dr. Rajkumar Chavakula',
      email: 'rajkumar.chavakula@sdamc.com',
      specialty: 'Medical Director',
      department: 'Administration Department',
      status: 'active',
      lastLogin: '2024-01-15 08:15 AM',
      appointmentsCount: 12
    }
  ];

  const receptionists = [
    {
      id: 1,
      name: 'Front Desk Reception',
      email: 'reception@sdamc.com',
      role: 'Senior Receptionist',
      department: 'Front Desk',
      status: 'active',
      lastLogin: '2024-01-15 07:00 AM',
      permissions: ['view_all_appointments', 'create_appointments', 'edit_appointments']
    }
  ];

  const admins = [
    {
      id: 1,
      name: 'System Administrator',
      email: 'admin@sdamc.com',
      role: 'Super Administrator',
      level: 'super_admin',
      department: 'IT Administration',
      status: 'active',
      lastLogin: '2024-01-15 10:45 AM'
    }
  ];

  const tabs = [
    { id: 'doctors', label: 'Doctors', icon: Stethoscope, count: doctors.length },
    { id: 'receptionists', label: 'Receptionists', icon: UserCheck, count: receptionists.length },
    { id: 'admins', label: 'Administrators', icon: Shield, count: admins.length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-green';
      case 'inactive': return 'status-red';
      case 'pending': return 'status-orange';
      default: return 'status-gray';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'super_admin': return <Crown size={16} />;
      case 'admin': return <Shield size={16} />;
      case 'manager': return <Settings size={16} />;
      default: return <UserCheck size={16} />;
    }
  };

  const renderUserTable = () => {
    let users: any[] = [];
    let columns: string[] = [];

    switch (activeTab) {
      case 'doctors':
        users = doctors;
        columns = ['Name', 'Specialty', 'Department', 'Appointments', 'Status', 'Last Login', 'Actions'];
        break;
      case 'receptionists':
        users = receptionists;
        columns = ['Name', 'Role', 'Department', 'Permissions', 'Status', 'Last Login', 'Actions'];
        break;
      case 'admins':
        users = admins;
        columns = ['Name', 'Role', 'Level', 'Department', 'Status', 'Last Login', 'Actions'];
        break;
    }

    return (
      <div className="adm-um-table-container">
        <div className="adm-um-table-wrapper">
          <table className="adm-um-main-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="adm-um-user-info">
                      <div className="adm-um-user-avatar">
                        {activeTab === 'doctors' && <Stethoscope size={16} />}
                        {activeTab === 'receptionists' && <UserCheck size={16} />}
                        {activeTab === 'admins' && getLevelIcon(user.level)}
                      </div>
                      <div className="adm-um-user-details">
                        <div className="adm-um-user-name">{user.name}</div>
                        <div className="adm-um-user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  
                  {activeTab === 'doctors' && (
                    <>
                      <td>{user.specialty}</td>
                      <td>{user.department}</td>
                      <td>
                        <span className="adm-um-appointment-count">{user.appointmentsCount}</span>
                      </td>
                    </>
                  )}
                  
                  {activeTab === 'receptionists' && (
                    <>
                      <td>{user.role}</td>
                      <td>{user.department}</td>
                      <td>
                        <div className="adm-um-permissions-list">
                          {user.permissions.slice(0, 2).map((perm: string) => (
                            <span key={perm} className="adm-um-permission-badge">
                              {perm.replace(/_/g, ' ')}
                            </span>
                          ))}
                          {user.permissions.length > 2 && (
                            <span className="adm-um-permission-more">
                              +{user.permissions.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                  
                  {activeTab === 'admins' && (
                    <>
                      <td>{user.role}</td>
                      <td>
                        <div className="adm-um-level-badge">
                          {getLevelIcon(user.level)}
                          <span>{user.level.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td>{user.department}</td>
                    </>
                  )}
                  
                  <td>
                    <span className={`adm-um-status-badge ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="adm-um-last-login-cell">{user.lastLogin}</td>
                  <td>
                    <div className="adm-um-action-group">
                      <button className="adm-um-action-btn adm-um-view" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="adm-um-action-btn adm-um-edit" title="Edit User">
                        <Edit size={16} />
                      </button>
                      <button className="adm-um-action-btn adm-um-delete" title="Delete User">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="adm-um-root">
      <div className="adm-um-header">
        <div className="adm-um-header-content">
          <h1 className="adm-um-header-title">User Management</h1>
          <p className="adm-um-header-subtitle">
            Manage doctors, receptionists, and administrators
          </p>
        </div>
        <div className="adm-um-header-actions">
          <button className="adm-um-add-btn">
            <Plus size={20} />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      <div className="adm-um-tabs-row">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`adm-um-tab-item ${activeTab === tab.id ? 'adm-um-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={20} />
              <span>{tab.label}</span>
              <span className="adm-um-tab-counter">{tab.count}</span>
            </button>
          );
        })}
      </div>

      <div className="adm-um-filters-row">
        <div className="adm-um-search-box">
          <Search size={18} className="adm-um-search-icon" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="adm-um-search-input"
          />
        </div>
        
        <div className="adm-um-filter-box">
          <Filter size={18} className="adm-um-filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="adm-um-filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {renderUserTable()}

      <div className="adm-um-pagination">
        <div className="adm-um-pagination-info">
          Showing 1-10 of {activeTab === 'doctors' ? doctors.length : activeTab === 'receptionists' ? receptionists.length : admins.length} {activeTab}
        </div>
        <div className="adm-um-pagination-ctrl">
          <button className="adm-um-pag-btn" disabled>Previous</button>
          <button className="adm-um-pag-btn adm-um-pag-active">1</button>
          <button className="adm-um-pag-btn" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;