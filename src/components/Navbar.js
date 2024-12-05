import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"; // CSS for the navbar
import "../css/Panel.css"; // Optional, for styling the panel
import editIcon from "../images/edit.png";
import searchIcon from "../images/search.png";
import profileIcon from "../images/user-profile.png";

const Navbar = ({ isLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPanelVisible, setIsPanelVisible] = useState(false); // State for controlling panel visibility
  const location = useLocation();

  useEffect(() => {
    // Hide the navbar on specific routes, including "/result"
    if (
      location.pathname === "/signin" ||
      location.pathname === "/register" ||
      location.pathname === "/profile" ||
      location.pathname === "/result"
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location]);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible); // Toggle the panel visibility
  };

  return (
    <>
      {isVisible && (
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <div className="icon">
                <img src={searchIcon} alt="Search Icon" className="icon" />
              </div>
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/">Naslovna</Link>
            </li>
            <li>
              <Link to="/about">O nama</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="profile-icon-container">
              <img
                className="user_icon"
                src={profileIcon}
                alt="Profile Icon"
                onClick={togglePanel} // Toggle the profile panel visibility
              />
              <div
                className={`profile-panel ${isPanelVisible ? "visible" : ""}`}
              >
                <div className="profile-row">
                  <h2>Lana Misic</h2>
                  <img className="edit-icon" src={editIcon} alt="Edit" />
                </div>
                <div className="profile-row">
                  <h3>misicl@gmail.com</h3>
                </div>
                <button className="btn-delete">
                  <strong>Delete account</strong>
                </button>
              </div>
            </div>
          ) : (
            <button className="logbtn">
              <Link
                className="link-style"
                style={{ color: "white" }}
                to="/signin"
              >
                Prijavi se
              </Link>
            </button>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
