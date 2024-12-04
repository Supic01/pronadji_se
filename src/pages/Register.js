﻿import React from "react";
import { Link } from "react-router-dom";
import Btn from "../components/btn.js";
import Input from "../components/input.js";

const Register = () => {
  return (
    <div>
      <div className="auth-container">
        <div className="auth-form">
          <h1 style={{ color: "#826afb" }}>App logo</h1>
          <Input placeholder={"Username"} />
          <Input placeholder={"Email"} />
          <Input placeholder={"Password"} />
          <Btn ime="Register" />
          <p style={{ color: "#826afb" }}>
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
