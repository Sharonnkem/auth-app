// SignUpPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
   

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    try {
      const response = await fetch('https://authie.runasp.net/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }

      console.log('Signed up successfully:', userData);
      navigate('/otpout');
    } catch (error) {
      
      console.error('Sign up failed:', error);
      setErrorMessage(error.message);
    }
    // Navigate to OtpOutputPage and pass the email
  navigate('/otpout', { state: { email } });
  
  };

  return (
    <div className="sign-up-page">
      <h2>Create an account</h2>
      <form onSubmit={handleSignupSubmit}>
        
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter First Name"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter Last Name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter your phone number"
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?&nbsp;<Link to="/">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
