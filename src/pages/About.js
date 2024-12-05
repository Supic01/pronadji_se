import React from 'react';
import "../css/About.css";
import LanaV from "../images/lanaV.png"
import Bojan from "../images/bojan.png"
import LanaM from "../images/lanaM.png"
import Zarko from "../images/zarko.png"

const About = () => {

  return (
    <div className="about-container">
      <div className="about-containerB">
          <h1>Ko smo mi</h1>
          <p>
          Mi smo učenici četvrtog razreda gimnazije i strastveni zaljubljenici u svet tehnologije i obrazovanja! Naša misija je kreirati platformu koja pomaže mladima da pronađu svoj put ka uspehu kroz prave izbore. 
          </p>
          <p>Lana Vukotić donosi savršenstvo u dizajnu i kreativnosti. Bojan Ćakić majstorski rešava kompleksne zadatke u backend razvoju, dok Žarko Šupić uvodi inovacije u svaki aspekt našeg rada. Lana Mišić svojim smirenim pristupom obezbeđuje kvalitet i strukturu. Zajedno činimo tim pun entuzijazma i posvećenosti, željni da ostavimo trag. Naša platforma je odraz naše energije i želje da inspirišemo mlade ljude ka odvažnim koracima. Gimnazijalci smo sa misijom!</p>
        </div>

      <div className="card-container">
        <div className="card">
          <div className="image-item left">
            <img src={Zarko} alt="Žarko Šupić" className="round-image" />
          </div>
          <div className="text-item">
            <p><strong>Žarko Supić</strong> profesionalac u:</p>
            <p>Eksperimentisanje sa novim JavaScript framework-ovima (React, Vue).</p>
            <p>Integracija modernih tehnologija poput AI-a u web aplikacije.</p>
            <p>Razvoj interaktivnih funkcionalnosti (npr. dinamični testovi za profesionalnu orijentaciju).</p>
            <p>Rad sa alatima za verzionisanje koda (Git, GitHub).</p>
       </div>
        </div>
      </div>

      <div className="card-container">
        <div className="card reverse">
          <div className="text-item">
          <p><strong>Lana Mišić</strong> profesionalac u:</p>
            <p>Frontend razvoj (React, Tailwind CSS).</p>
            <p>Testiranje i debugovanje koda kako bi sve radilo savršeno.</p>
            <p>Dokumentovanje projekta i pisanje vodiča za korisnike.</p>
            <p>Organizacija taskova i postavljanje prioriteta unutar tima.</p>
          </div>
          <div className="image-item right">
            <img src={LanaM} alt="Lana Mišić" className="round-image" />
          </div>
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <div className="image-item left">
            <img src={Bojan} alt="Bojan Cakić" className="round-image" />
          </div>
          <div className="text-item">
          <p><strong>Bojan Cakić</strong> profesionalac u:</p>
            <p>Backend razvoj (Node.js, Firebase).</p>
            <p>Rad sa bazama podataka i strukturiranje podataka (Firestore, SQL).</p>
            <p>Optimizacija performansi sajta i rešavanje kompleksnih logičkih problema.</p>
            <p>Automatizacija procesa i pravljenje API-ja.</p>
          </div>
        </div>
      </div>

      <div className="card-container">
        <div className="card reverse">
          <div className="text-item">
          <p><strong>Lana Vukotić</strong> profesionalac u:</p>
            <p>UI/UX dizajn i optimizacija korisničkog iskustva.</p>
            <p>Eksperimentisanje sa modernim CSS animacijama i responsive dizajnom.</p>
            <p>Osmišljavanje intuitivnih struktura za navigaciju.</p>
            <p>Rad na održivosti i prilagodljivosti sajta za različite uređaje.</p>
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
