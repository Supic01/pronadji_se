import React from "react";
import "../css/Home.css";
import Pozadina from "../images/kompas.png";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="left-text">
          <h1>Pronađi se</h1>
          <p>
            Izbor budućnosti nije lak. Često se osećamo izgubljeno pred 
            mnogobrojnim mogućnostima, dok vreme neumoljivo prolazi. Ali, uz pravu podršku i korake, svaki put postaje jasniji.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
