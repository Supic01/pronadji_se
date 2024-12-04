import React from "react";
import "../css/Input.css"; // Importuj CSS fajl za stilizaciju

const Input = ({ placeholder }) => {
  return (
    <div className="input-container">
      <input type="text" className="custom-input" placeholder={placeholder} />
    </div>
  );
};

export default Input;
