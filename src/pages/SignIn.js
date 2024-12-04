import React from "react";
import { Link } from "react-router-dom";
import Btn from "../components/btn.js";
import Input from "../components/input.js";

const SignIn = () => {
  return (
    <div>
      <div className="auth-container">
        <div className="auth-form">
          <h1 style={{ color: "#6a0dad" }}>App logo</h1>
          <Input placeholder={"Email"} />
          <Input placeholder={"Password"} />
          <Btn ime="Sign In" />
          <p style={{ color: "#6a0dad" }}>
            Nemate nalog?{" "}
            <strong>
              <Link to="/register">Registrujte se sada!</Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
