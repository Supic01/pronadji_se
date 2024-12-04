import { signInWithEmailAndPassword } from "firebase/auth"; // For logging in
import { doc, getDoc } from "firebase/firestore"; // For fetching user info from Firestore
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { auth, db } from "../firebase-config.js"; // Include Firestore (db)

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const signin = async () => {
    if (!email || !password) {
      alert("Please fill out both email and password fields.");
      return;
    }

    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user information from Firestore
      const userDocRef = doc(db, "users", user.uid); // Assuming user data is stored by UID
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        alert(`Welcome back, ${userData.username}!`);
      } else {
        alert(
          "Login successful, but no additional user data found in Firestore."
        );
      }

      // Redirect to Home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="auth-container">
        <div className="auth-form">
          <h1 style={{ color: "#826afb" }}>App logo</h1>
          <div className="Input-container">
            <input
              className="Input"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Input-container">
            <input
              className="Input"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" onClick={signin}>
            Sign In
          </button>
          <p style={{ color: "#826afb" }}>
            Nemate nalog?{" "}
            <strong>
              <Link className="link-style" to="/register">
                Registrujte se sada!
              </Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
