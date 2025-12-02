import React, { useState } from 'react';
import '../styles/profile.css'; // Assuming you have a CSS file for styling

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '', // Starts as blank
    email: '', // Starts as blank
    phone: '', // Starts as blank
    address: '', // Starts as blank
    landmark: '', // Starts as blank
    alternateNumber: '', // Starts as blank
  });

  // Handle changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle the editing mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save the updated profile data
  const handleSave = () => {
    setIsEditing(false);
    console.log('Updated Profile Data:', profileData);
    // Here you can add the backend API call to save the data
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-form">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your phone number"
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your address"
          />
        </div>

        {/* Landmark */}
        <div className="form-group">
          <label htmlFor="landmark">Landmark:</label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={profileData.landmark}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter a nearby landmark"
          />
        </div>

        {/* Alternate Phone Number */}
        <div className="form-group">
          <label htmlFor="alternateNumber">Alternate Phone Number:</label>
          <input
            type="text"
            id="alternateNumber"
            name="alternateNumber"
            value={profileData.alternateNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter an alternate phone number"
          />
        </div>

        {/* Edit/Save Buttons */}
        <div className="form-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
