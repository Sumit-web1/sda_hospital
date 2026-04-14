import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import { DoctorAuthProvider } from './contexts/DoctorAuthContext';
import { ReceptionistAuthProvider } from './contexts/ReceptionistAuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { HRAuthProvider } from './contexts/HRAuthContext';

import Header from './components/Header';
import EnhancedHeroSection from './components/EnhancedHeroSection';
import HeartBehindCareSection from './components/HeartBehindCareSection';
import AboutSection from './components/AboutSection';
import DepartmentsSection from './components/DepartmentsSection';
import ServicesSection from './components/ServicesSection';
import DoctorsSection from './components/DoctorsSection';
import BlogsSection from './components/BlogsSection';
import TestimonialsSection from './components/TestimonialsSection';
import LogoMarquee from './components/LogoMarquee';
import Footer from './components/Footer';

import DoctorDashboard from './components/DoctorDashboard';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import AdminDashboard from './components/AdminDashboard';
import HrDashboard from './pages/HrDashboard';

import FindDoctorPage from './pages/FindDoctorPage';
import AboutPage from './pages/AboutPage';
import DoctorPage from './pages/DoctorPage';
import ServicesPage from './pages/ServicesPage';
import DepartmentPage from './pages/DepartmentPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import BookingForm from './pages/BookingForm';
import HerniaPage from './pages/HerniaPage';
import NewsPage from './pages/NewsPage';
import ContactUs from './pages/ContactUs';

import DoctorLoginPage from './pages/DoctorLoginPage';
import ReceptionistLoginPage from './pages/ReceptionistLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import HRLoginPage from './pages/HRLoginPage';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/doctor-dashboard') {
      setCurrentPage('doctor-dashboard');
    } else if (path === '/doctor-login') {
      setCurrentPage('doctor-login');
    } else if (path === '/receptionist-dashboard') {
      setCurrentPage('receptionist-dashboard');
    } else if (path === '/receptionist-login') {
      setCurrentPage('receptionist-login');
    } else if (path === '/admin-dashboard') {
      setCurrentPage('admin-dashboard');
    } else if (path === '/admin-login') {
      setCurrentPage('admin-login');
    } else if (path === '/hr-login') {
      setCurrentPage('hr-login');
    } else if (path === '/hr-dashboard') {
      setCurrentPage('hr-dashboard');
    } else if (path === '/find-doctor') {
      setCurrentPage('find-doctor');
    } else if (path === '/about') {
      setCurrentPage('about');
    } else if (path === '/doctors') {
      setCurrentPage('doctors');
    } else if (path === '/services') {
      setCurrentPage('services');
    } else if (path === '/departments') {
      setCurrentPage('departments');
    } else if (path === '/blogs') {
      setCurrentPage('blogs');
    } else if (path.startsWith('/blog/')) {
      setCurrentPage('blog-post');
    } else if (path === '/news') {
      setCurrentPage('news');
    } else if (path === '/booking') {
      setCurrentPage('booking');
    } else if (path === '/hernia') {
      setCurrentPage('hernia');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    } else {
      setCurrentPage('home');
    }
  }, [location]); // 🔥 location change hote hi yeh dubara chalega

  return (
    <div style={{ minHeight: '100vh' }}>
      {currentPage === 'doctor-dashboard' ? (
        <DoctorDashboard />
      ) : currentPage === 'doctor-login' ? (
        <DoctorLoginPage />
      ) : currentPage === 'receptionist-dashboard' ? (
        <ReceptionistDashboard />
      ) : currentPage === 'receptionist-login' ? (
        <ReceptionistLoginPage />
      ) : currentPage === 'admin-dashboard' ? (
        <AdminDashboard />
      ) : currentPage === 'admin-login' ? (
        <AdminLoginPage />
      ) : currentPage === 'hr-login' ? (
        <HRLoginPage />
      ) : currentPage === 'hr-dashboard' ? (
        <HrDashboard />
      ) : currentPage === 'find-doctor' ? (
        <FindDoctorPage />
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : currentPage === 'doctors' ? (
        <DoctorPage />
      ) : currentPage === 'services' ? (
        <ServicesPage />
      ) : currentPage === 'departments' ? (
        <DepartmentPage />
      ) : currentPage === 'blogs' ? (
        <BlogListPage />
      ) : currentPage === 'blog-post' ? (
        <BlogPostPage />
      ) : currentPage === 'news' ? (
        <>
          <Header />
          <NewsPage />
          <Footer />
        </>
      ) : currentPage === 'booking' ? (
        <>
          <Header />
          <BookingForm />
          <Footer />
        </>
      ) : currentPage === 'hernia' ? (
        <>
          <Header />
          <HerniaPage />
          <Footer />
        </>
      ) : currentPage === 'contact' ? (
        <>
          <Header />
          <ContactUs />
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <EnhancedHeroSection />
          <AboutSection />
          <HeartBehindCareSection />
          <DepartmentsSection />
          <ServicesSection />
          <DoctorsSection />
          <BlogsSection />
          <TestimonialsSection />
          <LogoMarquee />
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DoctorAuthProvider>
        <ReceptionistAuthProvider>
          <AdminAuthProvider>
            <HRAuthProvider>
              <Router>
                <AppContent />
              </Router>
            </HRAuthProvider>
          </AdminAuthProvider>
        </ReceptionistAuthProvider>
      </DoctorAuthProvider>
    </AuthProvider>
  );
}

export default App;