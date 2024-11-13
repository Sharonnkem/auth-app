import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import './EditProfile.css';

const EditProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const location = useLocation();
  const maskedEmail = location.state?.maskedEmail || 'unknown@example.com';

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Profile updated with:', { firstName, lastName, email, phoneNumber });
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Function to trigger hidden input click
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="edit-profile-page">
      {/* Profile Picture and Ellipsis Menu */}
      <div className="header">
        <div className="profile-section">
          <div className='mail'>{maskedEmail}</div>
          <FontAwesomeIcon icon={faEllipsisV} className="ellipsis-menu" />
        </div>
      </div>

      <div className='get'>
        <div className="profile-pic-container" onClick={triggerFileInput}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-pic" />
          ) : (
            <FontAwesomeIcon icon={faUserEdit} className="profile-pic"  />
          )}
          {/* Hidden file input */}
          <input 
            type="file" 
            id="fileInput"
            accept="image/*" 
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
          />
        </div>
      
        <form onSubmit={handleProfileUpdate} className="edit-profile-form">
          <div className="input-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter First Name"
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Email"
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          {/* Save Changes Button */}
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
