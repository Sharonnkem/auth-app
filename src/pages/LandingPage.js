import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Retrieved token:', token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        const userId = decodedToken.uid;
        console.log('User ID:', userId);

        const fetchUserData = async () => {
          try {
            const response = await fetch(`https://authie.runasp.net/api/User/${userId}`);
            console.log('API Response:', response);

            if (!response.ok) {
              throw new Error(`Failed to fetch user data: ${response.status} - ${response.statusText}`);
            }

            const userData = await response.json();
            console.log('Fetched user data:', userData);  // Check the structure of the response

            // Check the structure and adjust the property names accordingly
            if (userData && userData.data) {
              setFirstName(userData.data.firstName || 'User');
              setEmail(userData.data.email || 'unknown@example.com');
              setProfilePicture(userData.data.profilePicture || null);
            } else {
              console.log('User data does not contain expected fields:', userData);
              // Optionally, set fallback values
              setFirstName('User');
              setEmail('unknown@example.com');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          } finally {
            setLoading(false);  // Set loading to false when done
          }
        };

        fetchUserData();
      } catch (error) {
        console.error('Error decoding token:', error);
        setLoading(false);
      }
    } else {
      console.log('No token found');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-page">
      <div className="header">
        <div className="profile-section">
          <div className="mail">{email}</div>
          <FontAwesomeIcon icon={faEllipsisV} className="ellipsis-menu" />
        </div>
      </div>

      <div>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-pic2" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} className="profile-pic1" />
        )}
      </div>

      <div>
        <h2>Welcome back, <strong>{firstname || 'User'}</strong>!</h2>
        <p>
          Thank you for taking the time to test our One-Time Password (OTP) functionality!
          <br />
          Your feedback is invaluable in helping us improve our system.
        </p>
      </div>

      <div className="center">
        <p>We’re excited to let you know that we've also added Account Management features:</p>
        <ol>
          <li>Upload a profile image to personalize your account</li>
          <li>Delete your account when needed</li>
        </ol>
      </div>

      <button onClick={() => navigate('/edit-profile', { state: { email } })}>Edit Profile</button>
    </div>
  );
};

export default LandingPage;
