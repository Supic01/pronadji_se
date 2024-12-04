import React from 'react';
import "../css/About.css"; // Dodaj CSS za stilizaciju
import LanaV from "../images/lanaV.png"
import Bojan from "../images/bojan.png"
import LanaM from "../images/lanaM.png"
import Zarko from "../images/zarko.png"

const About = () => {

  return (
    <div className="about-container">
      <h1>O nama</h1>
      <div className="image-container">
        <div className="image-item">
          <img src={Zarko} alt="Žarko Šupić" className="round-image" />
          <p>Žarko Šupić</p>
        </div>
        <div className="image-item">
          <img src={LanaM} alt="Lana Mišić" className="round-image" />
          <p>Lana Mišić</p>
        </div>
        <div className="image-item">
          <img src={Bojan} alt="Bojan Cakić" className="round-image" />
          <p>Bojan Cakić</p>
        </div>
        <div className="image-item">
          <img src={LanaV} alt="Lana Vukotić" className="round-image" />
          <p>Lana Vukotić</p>
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <p>
            Mi smo tim koji se trudi da stvori platformu koja pomaže učenicima da odaberu pravi fakultet za sebe.
            Naš cilj je da učinimo proces jednostavnim, informativnim i inspirativnim.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
