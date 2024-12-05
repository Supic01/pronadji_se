import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";
import { auth, db } from "../firebase-config";
import EditIcon from "../images/edit.png";
import AccountIcon from "../images/user-profile.png";

const Profile = ({ setIsLoggedIn }) => {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [highestScore, setHighestScore] = useState(null); // Store highest score
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const navigate = useNavigate();

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
            setHighestScore(data.highestScore || null); // Fetch highest score
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

    fetchUserData();
  }, []);

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
        // Delete the user's document from Firestore
        const userDoc = doc(db, "users", user.uid);
        await deleteDoc(userDoc);

        // Delete the user's authentication account
        await user.delete();

        alert("Account deleted successfully!");

        // Reset the login state
        setIsLoggedIn(false);

        // Redirect to the home page
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

  return (
    <div className="auth-container">
      <div className="auth-form">
        <img src={AccountIcon} className="appicon" alt="Account Icon" />
        <div className="profile-row">
          {isEditing ? (
            <input
              type="text"
              className="Input"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              onKeyDown={handleUsernameChange} // Save on Enter
              style={{ width: "200px", marginRight: "10px" }}
            />
          ) : (
            <h2 style={{ color: "#000000" }}>{userData.username}</h2>
          )}
          <img
            src={EditIcon}
            className="edit-icon"
            alt="Edit Icon"
            onClick={handleEditClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="profile-row">
          <h3 style={{ color: "#000000" }}>{userData.email}</h3>
        </div>
        {highestScore && (
          <div className="profile-column">
            <h4>Vi ste obdareni za: {highestScore}</h4>
            <button className="btn" onClick={handleViewResults}>
              Prikaži moje rezultate
            </button>
          </div>
        )}
        <button className="btn-delete" onClick={handleDeleteAccount}>
          <strong>Delete account</strong>
        </button>
      </div>
    </div>
  );
};

export default Profile;
