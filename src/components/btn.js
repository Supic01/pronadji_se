import React from "react";
import "../css/Btn.css"; // Importuje CSS fajl

const Btn = ({ ime }) => {
  return (
    <div>
      <button className="btn">{ime}</button>
    </div>
  );
};

export default Btn;
