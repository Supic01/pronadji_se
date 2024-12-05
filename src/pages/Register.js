import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config.js";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

      alert("Account created successfully!");

      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="auth-container">
        <div className="auth-form">
          <h1 style={{ color: "#629d9a" }}>Register</h1>
          <div className="Input-container">
            <input
              className="Input"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <button className="btn" onClick={register}>
            Register
          </button>
          <p style={{ color: "#629d9a" }} className="mini-text">
            Imate nalog?{" "}
            <strong>
              <Link className="link-style" to="/signin">
                Ulogujte se!
              </Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
