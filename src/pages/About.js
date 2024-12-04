import React from 'react';
import "../css/About.css"; // Dodaj CSS za stilizaciju


const About = () => {
  return (
    <div className="about-container">
      <h1>O nama</h1>
      <p></p>
      <p>
        Mi smo tim koji se trudi da stvori platformu koja pomaže učenicima da odaberu pravi fakultet za sebe.
        Naš cilj je da učinimo proces jednostavnim, informativnim i inspirativnim.
      </p>
      <div className="image-container">
        <div className="image-item">
          <img src="../images/zarko.png" alt="Član tima 1" className="round-image" />
          <p>Član broj 1</p>
        </div>
        <div className="image-item">
          <img src="../images/lanaM.png" alt="Član tima 2" className="round-image" />
          <p>Član broj 2</p>
        </div>
        <div className="image-item">
          <img src="../images/bojan.png" alt="Član tima 3" className="round-image" />
          <p>Član broj 3</p>
        </div>
        <div className="image-item">
          <img src="../images/lanaV.png" className="round-image" />
          <p>Član broj 4</p>
        </div>
      </div>
    </div>
  );
};

export default About;
