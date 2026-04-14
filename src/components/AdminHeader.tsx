import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Shield,
  ChevronDown,
  LogOut,
  UserCircle,
  Activity
} from 'lucide-react';
import type { AdminCredential } from '../data/adminCredentials';
import "./AdminHeader.css";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface AdminHeaderProps {
  currentAdmin: AdminCredential | null;
  activeSection: string;
  navigationItems: NavigationItem[];
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentAdmin,
  activeSection,
  navigationItems
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeItem = navigationItems.find(item => item.id === activeSection);

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Booked',
      message: 'Patient John Doe booked an appointment with Dr. Smith',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'system',
      title: 'System Update Available',
      message: 'A new system update is available for installation',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'user',
      title: 'New Doctor Registration',
      message: 'Dr. Jane Wilson has registered and needs approval',
      time: '2 hours ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="adm-hd-root">
      <div className="adm-hd-left">
        <div className="adm-hd-breadcrumb">
          <div className="adm-hd-crumb-item">
            <Shield size={16} />
            <span>Admin</span>
          </div>
          <div className="adm-hd-crumb-sep">/</div>
          <div className="adm-hd-crumb-item is-active">
            {activeItem && (
              <>
                <activeItem.icon size={16} />
                <span>{activeItem.label}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Center Section */}
      <div className="adm-hd-center">
        <div className="adm-hd-search-box">
          <Search size={18} className="adm-hd-search-icon" />
          <input
            type="text"
            placeholder="Search resources..."
            className="adm-hd-search-input"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="adm-hd-right">
        {/* Notifications */}
        <div className="adm-hd-notif-wrapper">
          <button
            className={`adm-hd-icon-btn ${showNotifications ? 'is-active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="adm-hd-notif-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="adm-hd-notif-dropdown">
              <div className="adm-hd-dropdown-header">
                <h3>Notifications</h3>
                <span className="adm-hd-count-tag">{unreadCount} unread</span>
              </div>
              <div className="adm-hd-notif-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`adm-hd-notif-item ${notification.unread ? 'is-unread' : ''}`}
                  >
                    <div className={`adm-hd-notif-type-icon adm-hd-type-${notification.type}`}>
                      {notification.type === 'appointment' && <Activity size={16} />}
                      {notification.type === 'system' && <Settings size={16} />}
                      {notification.type === 'user' && <User size={16} />}
                    </div>
                    <div className="adm-hd-notif-body">
                      <div className="adm-hd-notif-title">{notification.title}</div>
                      <div className="adm-hd-notif-msg">{notification.message}</div>
                      <div className="adm-hd-notif-time">{notification.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="adm-hd-dropdown-footer">
                <button className="adm-hd-view-all">View All Activity</button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button className="adm-hd-icon-btn">
          <Settings size={20} />
        </button>

        {/* Profile Menu */}
        <div className="adm-hd-profile-wrapper">
          <button
            className={`adm-hd-profile-trigger ${showProfileMenu ? 'is-open' : ''}`}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="adm-hd-avatar">
              <Shield size={18} />
            </div>
            <div className="adm-hd-profile-meta">
              <span className="adm-hd-user-name">
                {currentAdmin?.name?.split(' ')[0] || 'Admin'}
              </span>
              <span className="adm-hd-user-role">{currentAdmin?.role || 'Administrator'}</span>
            </div>
            <ChevronDown size={14} className="adm-hd-chevron" />
          </button>

          {showProfileMenu && (
            <div className="adm-hd-profile-dropdown">
              <div className="adm-hd-profile-header">
                <div className="adm-hd-avatar is-large">
                  <Shield size={24} />
                </div>
                <div className="adm-hd-profile-details">
                  <div className="adm-hd-full-name">{currentAdmin?.name}</div>
                  <div className="adm-hd-full-email">{currentAdmin?.email}</div>
                  <div className="adm-hd-badge">{currentAdmin?.role}</div>
                </div>
              </div>
              
              <div className="adm-hd-menu-list">
                <button className="adm-hd-menu-btn">
                  <UserCircle size={16} />
                  <span>Profile Settings</span>
                </button>
                <button className="adm-hd-menu-btn">
                  <Settings size={16} />
                  <span>Account Settings</span>
                </button>
                <button className="adm-hd-menu-btn">
                  <Activity size={16} />
                  <span>Activity Log</span>
                </button>
                <div className="adm-hd-menu-divider"></div>
                <button className="adm-hd-menu-btn is-logout">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Overlay */}
      {(showProfileMenu || showNotifications) && (
        <div
          className="adm-hd-overlay"
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default AdminHeader;