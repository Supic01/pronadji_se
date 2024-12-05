import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import "../css/Panel.css";
import { auth, db } from "../firebase-config";
import editIcon from "../images/edit.png";
import searchIcon from "../images/search.png";
import profileIcon from "../images/user-profile.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPanelVisible, setIsPanelVisible] = useState(false); // Panel visibility
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [highestScore, setHighestScore] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Check login state and user data on page load
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    const storedUserData = localStorage.getItem("userData");
    const storedHighestScore = localStorage.getItem("highestScore");

    if (storedLoginState === "true") {
      setIsLoggedIn(true);
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      if (storedHighestScore) {
        setHighestScore(storedHighestScore);
      }
    }
  }, [setIsLoggedIn]);

  // Store user data in localStorage when it changes
  useEffect(() => {
    if (isLoggedIn && userData.username) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("highestScore", highestScore);
    }
  }, [isLoggedIn, userData, highestScore]);

  useEffect(() => {
    // Hide the navbar on specific routes
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              username: data.username,
              email: data.email,
            });
            setHighestScore(data.highestScore || null);
          } else {
            console.error("No such document!");
          }
        } else {
          console.error("No user is logged in!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewUsername(userData.username); // Pre-fill input with the current username
  };

  const handleUsernameChange = async (e) => {
    if (e.key === "Enter") {
      try {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, { username: newUsername });
        setUserData((prev) => ({
          ...prev,
          username: newUsername,
        }));
        setIsEditing(false);
        alert("Username updated successfully!");
      } catch (error) {
        console.error("Error updating username:", error);
        alert("Failed to update username. Please try again.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDoc = doc(db, "users", user.uid);
        await deleteDoc(userDoc);
        await user.delete();

        alert("Account deleted successfully!");

        // Reset login state and clear localStorage
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.removeItem("highestScore");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  const handleViewResults = () => {
    if (highestScore) {
      navigate("/result", { state: { highestCategory: highestScore } });
    } else {
      alert("You have not completed the test yet!");
    }
  };

  const togglePanel = () => {
    setIsPanelVisible((prev) => !prev);
  };

  // Function to check if the current link is active
  const isActive = (path) => (location.pathname === path ? "active" : "");

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
              <Link to="/" className={isActive("/")}>Naslovna</Link>
            </li>
            <li>
              <Link to="/about" className={isActive("/about")}>O nama</Link>
            </li>
            <li>
              <Link to="/test" className={isActive("/test")}>Test</Link>
            </li>
            <li>
              <Link to="/contact" className={isActive("/contact")}>Kontakt</Link>
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
              {isPanelVisible && (
                <div className="profile-panel">
                  <div className="profile-row">
                    {isEditing ? (
                      <input
                        type="text"
                        className="Input"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        onKeyDown={handleUsernameChange}
                        style={{ width: "200px", marginRight: "10px" }}
                      />
                    ) : (
                      <h2>{userData.username}</h2>
                    )}
                    <img
                      src={editIcon}
                      className="edit-icon"
                      alt="Edit Icon"
                      onClick={handleEditClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="profile-row">
                    <h3>{userData.email}</h3>
                  </div>
                  {highestScore && (
                    <div className="profile-column">
                      <h4>Vi ste obdareni za: {highestScore}</h4>
                      <button className="btn btn-view-results" onClick={handleViewResults}>
                        Prikaži moje rezultate
                      </button>
                    </div>
                  )}
                  <button className="btn-delete" onClick={handleDeleteAccount}>
                    <strong>Delete account</strong>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="logbtn">
              <Link className="link-style" style={{ color: "white" }} to="/signin">
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
