// src/components/Profile.jsx
import React from 'react';
import '../styles/profile.css';


const Profile = ({
  user,
  onEdit,
  onSave,
  isEditing,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  landmark,
  setLandmark,
  alternateNumber,
  setAlternateNumber,
}) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={user?.profilePicture || '/images/default-profile.jpg'} alt="Profile" />
      </div>
      <div className="profile-info">
        {isEditing ? (
          <>
            <div className="profile-field">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
              />
            </div>
            <div className="profile-field">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone Number"
              />
            </div>
            <div className="profile-field">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your Address"
              />
            </div>
            <div className="profile-field">
              <label>Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Landmark"
              />
            </div>
            <div className="profile-field">
              <label>Alternate Number</label>
              <input
                type="text"
                value={alternateNumber}
                onChange={(e) => setAlternateNumber(e.target.value)}
                placeholder="Alternate Number"
              />
            </div>
            <button onClick={onSave} className="save-button">Save</button>
          </>
        ) : (
          <>
            <h2>{name}</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Landmark:</strong> {landmark}</p>
            <p><strong>Alternate Number:</strong> {alternateNumber}</p>
            <button onClick={onEdit} className="edit-button">Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
