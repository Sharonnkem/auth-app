import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import './OtpInput.css';

const OtpInputPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || 'unknown@example.com';

  const maskedEmail = email;

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
  
    try {
      const response = await fetch('https://authie.runasp.net/api/Auth/confirm-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpString }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to verify OTP');
      }
  
      const data = await response.json();
      console.log('API response data:', data);  
  
      const token = data.data;  
  
      if (token) {
        localStorage.setItem('authToken', token);
        console.log('OTP verified and token saved:', token);
      } else {
        console.error('No token found in the response');
      }
  
      navigate('/landing', { state: { maskedEmail } });
  
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrorMessage(error.message);
    }
  };
  

  const handleResendOtp = async () => {
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
        throw new Error(errorData.message || 'Failed to resend OTP');
      }

      console.log('OTP resent to:', email);
    } catch (error) {
      console.error('OTP resend failed:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="otp-page">
      <h2>Verify OTP</h2>
      <p>To continue with this demo, verify the OTP sent to <strong>{maskedEmail}</strong></p>
      <form onSubmit={handleOtpSubmit}>
        <div className="otp-inputs">
          {otp.map((value, index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                maxLength="1"
                id={`otp-input-${index}`}
                className="otp-box"
              />
              {index === 2 && <div className="dash-icon"> <FontAwesomeIcon icon={faMinus}  /> </div>}
            </React.Fragment>
          ))}
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <span>Not your email?&nbsp;<Link to="#" onClick={(e) => { e.preventDefault(); handleResendOtp(); }}>
    Click to resend
  </Link></span>
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpInputPage;
