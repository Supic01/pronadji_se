import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config.js";

const SignIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    if (!email || !password) {
      alert("Please fill out both email and password fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        alert(`Welcome back, ${userData.username}!`);
      } else {
        alert(
          "Login successful, but no additional user data found in Firestore."
        );
      }

      setIsLoggedIn(true);
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
          <h1 style={{ color: "#629d9a" }}>Sign in</h1>
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
            Sign in
          </button>
          <p style={{ color: "#629d9a" }} className="mini-text">
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
