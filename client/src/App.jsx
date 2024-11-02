// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PrivateRoute from './components/PrivateRoute';
import axiosInstance from './services/axiosInstance';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import DashboardPage from './pages/DashboardPage';
import BlogDashboard from './pages/BlogDashboard';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import FaqPage from './pages/FaqPage';
import ContactUsPage from './pages/ContactUsPage';
import DoctorsPage from './pages/DoctorsPage';
import ServicesPage from './pages/ServicesPage';
import Error404Page from './pages/404Page';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import Error403Page from './pages/403Page';
import Error500Page from './pages/500Page';
import './styles/index.css';
import './i18n';

const App = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    document.body.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<PrivateRoute element={<DashboardPage />} requiredRoles={['admin']} />} />
        <Route path="/blog-dashboard/*" element={<PrivateRoute element={<BlogDashboard />} requiredRoles={['admin', 'editor', 'author']} />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/blog/*" element={<BlogPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/unauthorized" element={<Error403Page />} />
        <Route path="/server-error" element={<Error500Page />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
};

export default App;
