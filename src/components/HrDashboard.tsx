import React from "react";
import AdminBookingManagement from "../components/AdminBookingManagement";
import { LogOut, Calendar } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import "./HrDashboard.css";

const HrDashboard = () => {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="hr-layout">
      <div className="hr-topbar">
        <div className="hr-brand">
          <Calendar size={22} />
          <span>HR Booking Panel</span>
        </div>

        <button className="hr-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="hr-content">
        <AdminBookingManagement />
      </div>
    </div>
  );
};

export default HrDashboard;
