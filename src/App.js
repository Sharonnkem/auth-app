// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import OtpInputPage from './pages/OtpInputPage';
import OtpOutputPage from './pages/OtpOutputPage';
import LandingPage from './pages/LandingPage';
import EditProfilePage from './pages/EditProfilePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpInputPage />} />
        <Route path="/otpout" element={<OtpOutputPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
