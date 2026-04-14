import React from "react";
import { Navigate } from "react-router-dom";
import AdminBookingManagement from "../components/AdminBookingManagement";
import { LogOut, Calendar } from "lucide-react";
import { useHRAuth } from "../contexts/HRAuthContext"; 
import "./HrDashboard.css";

const HrDashboard = () => {
  const { hrUser, logout, loading } = useHRAuth(); 

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="global-loader-ring"></div>;
  }

  if (!hrUser) {
    return <Navigate to="/hr-login" replace />;
  }

  return (
    <div className="hr-layout">
      {/* Top Bar */}
      <div className="hr-topbar">
        <div className="hr-brand">
          <Calendar size={22} />
          <span>HR Booking Panel</span>
        </div>

        <div className="hr-user-info" style={{ marginRight: '15px', color: '#667' }}>
           Welcome, <strong>{hrUser.name}</strong>
        </div>

        <button className="hr-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="hr-content">
        <AdminBookingManagement />
      </div>
    </div>
  );
};

export default HrDashboard;