import React, { useEffect, useState } from 'react';
import { Loader, Trash2, Printer, Calendar, Clock, CalendarDays, List } from 'lucide-react';
import { collection, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import './AdminBookingManagement.css';

interface Booking {
  id: string;
  fullName: string;
  idNo: string;
  email: string;
  reason: string;
  bookingFor: string;
  date: string;
  time: string;
  pax: string;
  participants?: string[];
  equipment: string;
  servingFood: string;
  description: string;
  housekeeping: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: any;
}

const AdminBookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'upcoming' | 'monthly'>('all');

  const fetchBookings = async () => {
    try {
      const bookingsRef = collection(db, 'bookings');
      
      const q = query(bookingsRef, orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Booking),
      }));

      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    } 
  };

  const getFilteredBookings = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const todayStr = `${year}-${month}-${day}`;
    const currentMonthPrefix = `${year}-${month}`;

    return bookings.filter((b) => {
      if (!b.date) return false;

      if (activeTab === 'today') {
        return b.date === todayStr;
      }
      if (activeTab === 'upcoming') {
        return b.date > todayStr;
      }
      if (activeTab === 'monthly') {
        return b.date.startsWith(currentMonthPrefix);
      }
      return true;
    });
  };

  const filteredData = getFilteredBookings();
const handleApprove = async (booking: Booking) => {
  if (!window.confirm("Approve this booking?")) return;

  try {
    await updateDoc(doc(db, "bookings", booking.id), {
      status: "confirmed",
    });

    // Use PHP endpoint
    await fetch("/api/send_email.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: booking.fullName,
        email: booking.email,
        bookingFor: booking.bookingFor,
        date: booking.date,
        time: booking.time,
        pax: booking.pax,
      }),
    });

    setBookings(prev =>
      prev.map(b =>
        b.id === booking.id ? { ...b, status: "confirmed" } : b
      )
    );

    alert("Booking Approved & Email Sent!");
  } catch (error) {
    console.error("Error approving booking:", error);
    alert("Error approving booking.");
  }
};



  const handleCancel = async (id: string) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await updateDoc(doc(db, "bookings", id), { status: "cancelled" });
      setBookings(prev => prev.map(b => (b.id === id ? { ...b, status: "cancelled" } : b)));
      alert("Booking Cancelled!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete permanently?")) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handlePrint = (booking: Booking) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Print</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td { padding: 8px; border-bottom: 1px solid #ddd; }
            .label { font-weight: bold; width: 200px; }
          </style>
        </head>
        <body>
          <h2>Booking Details</h2>
          <table>
            <tr><td class="label">Full Name</td><td>${booking.fullName}</td></tr>
            <tr><td class="label">ID No</td><td>${booking.idNo}</td></tr>
            <tr><td class="label">Email</td><td>${booking.email}</td></tr>
            <tr><td class="label">Reason</td><td>${booking.reason}</td></tr>
            <tr><td class="label">Venue</td><td>${booking.bookingFor}</td></tr>
            <tr><td class="label">Date</td><td>${booking.date}</td></tr>
            <tr><td class="label">Time</td><td>${booking.time}</td></tr>
            <tr><td class="label">Pax</td><td>${booking.pax}</td></tr>
            <tr><td class="label">Participants</td><td>${booking.participants?.join(', ') || "-"}</td></tr>
            <tr><td class="label">Equipment</td><td>${booking.equipment}</td></tr>
            <tr><td class="label">Serving Food</td><td>${booking.servingFood}</td></tr>
            <tr><td class="label">Description</td><td>${booking.description || "-"}</td></tr>
            <tr><td class="label">Housekeeping</td><td>${booking.housekeeping || "-"}</td></tr>
            <tr><td class="label">Status</td><td>${booking.status}</td></tr>
          </table>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="booking-management-container">
      
      <div className="admin-header-row">
        <h2>Dashboard</h2>
        
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            <List size={14} /> All
          </button>
          <button 
            className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`} 
            onClick={() => setActiveTab('today')}
          >
            <Clock size={14} /> Today
          </button>
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} 
            onClick={() => setActiveTab('upcoming')}
          >
            <Calendar size={14} /> Upcoming
          </button>
          <button 
            className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`} 
            onClick={() => setActiveTab('monthly')}
          >
            <CalendarDays size={14} /> Monthly
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Loader className="animate-spin" /> Loading...
        </div>
      ) : filteredData.length === 0 ? (
        <div className="empty-state">
          <p>No bookings found for <strong>{activeTab === 'all' ? 'all time' : activeTab}</strong>.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Full Name</th><th>ID No</th><th>Email</th><th>Reason</th><th>Venue</th><th>Date</th>
                <th>Time</th><th>Pax</th><th>Participants</th><th>Equipment</th><th>Food?</th><th>Description</th><th>Housekeeping</th>
                <th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(b => (
                <tr key={b.id}>
                  <td>{b.fullName}</td><td>{b.idNo}</td><td>{b.email}</td><td>{b.reason}</td>
                  <td>{b.bookingFor}</td><td style={{ whiteSpace: 'nowrap' }}>{b.date}</td><td style={{ whiteSpace: 'nowrap' }}>{b.time}</td>
                  <td>{b.pax}</td><td>{b.participants?.join(', ') || '-'}</td><td>{b.equipment}</td><td>{b.servingFood === 'yes' ? 'Yes' : 'No'}</td>
                  <td className="long-text">{b.description || '-'}</td><td className="long-text">{b.housekeeping || '-'}</td>
                  
                  <td>
                    <span className={`status ${b.status || 'pending'}`}>
                      {b.status || 'pending'}
                    </span>
                  </td>

                  <td className="actions-cell">
                    {b.status === "pending" && (
                      <button className="approve-btn" onClick={() => handleApprove(b)}>
  Approve
</button>

                    )}
                    {b.status !== "cancelled" && (
                      <button className="cancel-btn" onClick={() => handleCancel(b.id)}>Cancel</button>
                    )}
                    <button className="delete-btn" onClick={() => handleDelete(b.id)}><Trash2 size={16} /></button>
                    <button className="print-btn" onClick={() => handlePrint(b)}><Printer size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookingManagement;