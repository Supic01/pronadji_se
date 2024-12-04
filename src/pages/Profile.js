import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/App.css";
import EditIcon from "../images/edit.png";
import AccountIcon from "../images/user-profile.png";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(true);

  const location = useLocation();

  useEffect(() => {
    // Check if the user is on the Sign In or Register page
    if (location.pathname === "/profile") {
      setIsVisible(false); // Hide navbar
    } else {
      setIsVisible(true); // Show navbar
    }
  }, [location]); // Run effect when location changes

  return (
    <div>
      <div className="auth-container">
        <div className="auth-form">
          <img src={AccountIcon} className="appicon"></img>
          <div className="profile-row">
            <h2 style={{ color: "#826afb" }}>Lana Misic</h2>
            <img src={EditIcon} className="edit-icon"></img>
          </div>
          <div className="profile-row">
            <h3 style={{ color: "#826afb" }}>misicl@gmail.com</h3>
          </div>
          <div className="profile-column">
            <h4>Test result:</h4>
          </div>
          <button className="btn-delete">
            <strong>Delete account</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
