import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"; // CSS for the navbar
import searchIcon from "../images/search.png";
import profileIcon from "../images/user-profile.png";

const Navbar = ({ isLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Hide the navbar on specific routes, including "/result"
    if (
      location.pathname === "/signin" ||
      location.pathname === "/register" ||
      location.pathname === "/profile" ||
      location.pathname === "/result" // Add "/result" to hide navbar on the result page
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location]);

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
            <Link to="/profile">
              <img className="user_icon" src={profileIcon} alt="Profile Icon" />
            </Link>
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
