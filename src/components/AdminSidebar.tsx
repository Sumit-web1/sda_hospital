import React from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Shield,
  User,
  Crown,
  Settings as SettingsIcon
} from 'lucide-react';
import Logo from '../assets/logo.png';
import type { AdminCredential } from '../data/adminCredentials';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  navigationItems: NavigationItem[];
  currentAdmin: AdminCredential | null;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  setActiveSection,
  collapsed,
  setCollapsed,
  navigationItems,
  currentAdmin
}) => {
  const { logout } = useAdminAuth();

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'super_admin':
        return <Crown size={16} className="level-icon super-admin" />;
      case 'admin':
        return <Shield size={16} className="level-icon admin" />;
      case 'manager':
        return <SettingsIcon size={16} className="level-icon manager" />;
      default:
        return <User size={16} className="level-icon" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'super_admin':
        return '#f59e0b';
      case 'admin':
        return '#3b82f6';
      case 'manager':
        return '#10b981'; 
      default:
        return '#64748b';
    }
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="logo-section">
          <img src={Logo} alt="SDA Medical Centre" className="sidebar-logo" />
          {!collapsed && (
            <div className="logo-text">
              <h1>SDAMC</h1>
              <span>Admin Portal</span>
            </div>
          )}
        </div>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Admin Profile */}
      <div className="admin-profile">
        <div className="profile-avatar">
          <Shield size={24} />
        </div>
        {!collapsed && (
          <div className="profile-info">
            <div className="profile-name">
              {currentAdmin?.name || 'Administrator'}
            </div>
            <div className="profile-role">
              <div className="role-badge" style={{ backgroundColor: getLevelColor(currentAdmin?.level || 'admin') }}>
                {getLevelIcon(currentAdmin?.level || 'admin')}
                <span>{currentAdmin?.role || 'Administrator'}</span>
              </div>
            </div>
            <div className="profile-department">
              {currentAdmin?.department || 'Administration'}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <div className="nav-title">Management</div>}
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
                title={collapsed ? item.label : ''}
              >
                <div className="nav-icon">
                  <IconComponent size={20} />
                </div>
                {!collapsed && (
                  <div className="nav-content">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                )}
                {isActive && <div className="nav-indicator" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={logout}
          title={collapsed ? 'Logout' : ''}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
        
        {!collapsed && (
          <div className="footer-info">
            <div className="version">v2.0.0</div>
            <div className="copyright">© 2024 SDAMC</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
