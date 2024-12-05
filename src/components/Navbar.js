import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
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
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [highestScore, setHighestScore] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login state and restore data from localStorage
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    const storedUserData = localStorage.getItem("userData");
    const storedHighestScore = localStorage.getItem("highestScore");

    if (storedLoginState === "true") {
      setIsLoggedIn(true);
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      if (storedHighestScore !== "null" && storedHighestScore !== null) {
        setHighestScore(storedHighestScore);
      }
    }
  }, [setIsLoggedIn]);

  // Real-time Firestore listener for user data
  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userDoc = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDoc, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({ username: data.username, email: data.email });
          const updatedHighestScore = data.highestScore || null;
          setHighestScore(updatedHighestScore);

          // Save data to localStorage
          localStorage.setItem("highestScore", updatedHighestScore);
          localStorage.setItem(
            "userData",
            JSON.stringify({ username: data.username, email: data.email })
          );
        } else {
          console.error("No such document!");
        }
        setIsLoading(false); // Stop loading
      });

      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewUsername(userData.username);
  };

  const handleUsernameChange = async (e) => {
    if (e.key === "Enter") {
      try {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, { username: newUsername });
        setUserData((prev) => ({ ...prev, username: newUsername }));
        setIsEditing(false);
        alert("Username updated successfully!");
      } catch (error) {
        console.error("Error updating username:", error);
        alert("Failed to update username. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    try {
      auth.signOut();
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      localStorage.removeItem("highestScore");
      navigate("/");
      alert("You have successfully logged out!");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
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

  const isActive = (path) => (location.pathname === path ? "active" : "");

  if (isLoading) return <div>Loading...</div>;

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
              <Link to="/" className={isActive("/")}>
                Naslovna
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive("/about")}>
                O nama
              </Link>
            </li>
            <li>
              <Link to="/test" className={isActive("/test")}>
                Test
              </Link>
            </li>
            <li>
              <Link to="/contact" className={isActive("/contact")}>
                Kontakt
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="profile-icon-container">
              <img
                className="user_icon"
                src={profileIcon}
                alt="Profile Icon"
                onClick={togglePanel}
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
                  <div className="profile-column">
                    <h4>
                      Vi ste obdareni za: {highestScore || "Nema podataka"}
                    </h4>
                    <button
                      className="btn btn-view-results"
                      onClick={handleViewResults}
                      disabled={!highestScore}
                    >
                      Prikaži moje rezultate
                    </button>
                  </div>
                  <button className="btn-logout" onClick={handleLogout}>
                    <strong>Log Out</strong>
                  </button>
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
