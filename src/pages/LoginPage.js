// LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://authie.runasp.net/api/Auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log in');
      }

      // If login is successful, navigate to the OTP page and pass the email
      console.log('Logged in successfully:', email);
      navigate('/otp', { state: { email } }); 
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?&nbsp; <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
