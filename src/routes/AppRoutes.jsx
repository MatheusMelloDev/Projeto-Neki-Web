import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../screens/home';
import Login from '../screens/login';
import Signup from '../screens/signup';
import PageNotFound from '../screens/pageNotFound';
import { AuthProvider } from '../context/authContext'; 
import ProtectedRoute from '../routes/ProtectedRoute';
import Header from '../components/header';
import Footer from '../components/footer';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
