import React from 'react';
import "../css/About.css"; // Dodaj CSS za stilizaciju
import LanaV from "../images/lanaV.png"
import Bojan from "../images/bojan.png"
import LanaM from "../images/lanaM.png"
import Zarko from "../images/zarko.png"

const About = () => {

  return (
    <div className="about-container">
      {/* Kartica sa tekstom */}
      <div className="about-containerB">
          <h1>Ko smo mi</h1>
          <p>
            Dobrodošli na našu platformu! Ovdje možete saznati sve o mogućnostima studiranja na različitim fakultetima. Naša misija je pomoći studentima da izaberu pravi put ka svojoj budućnosti. Naša platforma nudi sve potrebne informacije o fakultetima, programima i mogućnostima karijere. Verujemo da je obrazovanje temelj svakog uspeha, a naš cilj je učiniti ovaj proces što lakšim i pristupačnijim. Pridružite nam se na ovom putovanju i pronađite fakultet koji vam odgovara. Pružamo vam alate i resurse koji će vam pomoći da donosite informisane odluke o vašem obrazovanju. Sa nama ćete biti spremni za sledeći korak u vašem obrazovanju. Krenite zajedno sa nama ka boljoj budućnosti!
          </p>
        </div>

      {/* Prva kartica (slika levo, tekst desno) */}
      <div className="card-container">
        <div className="card">
          <div className="image-item left">
            <img src={Zarko} alt="Žarko Šupić" className="round-image" />
          </div>
          <div className="text-item">
            <p>Ovo je random tekst sa desne strane slike. Može biti bilo koji tekst koji želite.</p>
          </div>
        </div>
      </div>

      {/* Druga kartica (slika desno, tekst levo) */}
      <div className="card-container">
        <div className="card reverse">
          <div className="text-item">
            <p>Ovo je random tekst sa leve strane slike. Možete promeniti sadržaj prema potrebama.</p>
          </div>
          <div className="image-item right">
            <img src={LanaM} alt="Lana Mišić" className="round-image" />
          </div>
        </div>
      </div>

      {/* Treća kartica (slika levo, tekst desno) */}
      <div className="card-container">
        <div className="card">
          <div className="image-item left">
            <img src={Bojan} alt="Bojan Cakić" className="round-image" />
          </div>
          <div className="text-item">
            <p>Ovo je još jedan random tekst sa desne strane slike. Svaka kartica može imati jedinstven sadržaj.</p>
          </div>
        </div>
      </div>

      {/* Četvrta kartica (slika desno, tekst levo) */}
      <div className="card-container">
        <div className="card reverse">
          <div className="text-item">
            <p>Ovo je još jedan primer teksta sa leve strane, dok je slika sa desne strane. Flexbox je koristan za ovakve rasporede.</p>
          </div>
          <div className="image-item right">
            <img src={LanaV} alt="Lana Vukotić" className="round-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
