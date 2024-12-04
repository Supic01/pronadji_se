import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"; // CSS for the navbar
import searchIcon from "../images/search.png";

const Navbar = ({ isLoggedIn }) => {
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
            {/* Omotano u Link komponentu kako bi klik vodio na početnu stranu */}
            <Link to="/" className="logo-link">
              <div className="icon">
                <img src={searchIcon} alt="Search Icon" className="icon" />
              </div>
              <div className="logo">Pronadji Se</div>
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
            <li>
              <Link to="/profile">Profil Test</Link>
            </li>
            <li>
              <Link to="/result">Rezultat Test</Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <img src="./images/bojan.png" alt="User Icon" className="user-icon" />
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
