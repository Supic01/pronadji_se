import React from "react";
import "../css/App.css";
import EditIcon from "../images/edit.png";
import AccountIcon from "../images/user-profile.png";

const Profile = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <img src={AccountIcon} className="appicon" alt="Account Icon" />
        <div className="profile-row">
          <h2 style={{ color: "#000000" }}>Lana Misic</h2>
          <img src={EditIcon} className="edit-icon" alt="Edit Icon" />
        </div>
        <div className="profile-row">
          <h3 style={{ color: "#000000" }}>misicl@gmail.com</h3>
        </div>
        <div className="profile-column">
          <h4>Test result:</h4>
        </div>
        <button className="btn-delete">
          <strong>Delete account</strong>
        </button>
      </div>
    </div>
  );
};

export default Profile;
