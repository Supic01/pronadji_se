import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"; // Uključivanje CSS-a za navbar
import searchIcon from "../images/search.png";

const Navbar = () => {
  // State to control visibility of the navbar
  const [isVisible, setIsVisible] = useState(true);

  // Get the current location (current route)
  const location = useLocation();

  useEffect(() => {
    // Check if the user is on the Sign In or Register page
    if (location.pathname === "/signin" || location.pathname === "/register") {
      setIsVisible(false); // Hide navbar
    } else {
      setIsVisible(true); // Show navbar
    }
  }, [location]); // Run effect when location changes

  return (
    <>
      {isVisible && (
        <nav className="navbar">
          <div className="logo-container">
            <div className="icon">
              <img src={searchIcon} alt="Search Icon" className="icon" />
            </div>
            <div className="logo">PronađiSe</div>
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
            <li>
              <Link to="/profile">Profil Test</Link>
            </li>
          </ul>
          <button className="logbtn">
            <Link
              className="link-style"
              style={{ color: "white" }}
              to="/signin"
            >
              Prijavi se
            </Link>
          </button>
        </nav>
      )}
    </>
  );
};

export default Navbar;
