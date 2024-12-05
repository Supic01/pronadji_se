import React, { useEffect } from "react";
import "../css/Home.css";

const Home = () => {
  const handleScroll = () => {
    const cards = document.querySelectorAll(".cardG");
    cards.forEach((card) => {
      const cardPosition = card.getBoundingClientRect();
      if (cardPosition.top < window.innerHeight && cardPosition.bottom >= 0) {
        if (!card.classList.contains("show")) {
          card.classList.add("show");
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="left-text">
          <h1>Pronađi se!</h1>
          <p>
            Izbor budućnosti nije lak. Često se osećamo izgubljeno pred
            mnogobrojnim mogućnostima, dok vreme neprestano prolazi. Ali, uz
            pravu podršku i korake, svaki put postaje jasniji.
          </p>
        </div>
      </div>
      <div className="cards-container">
        <div className="cardG">
          <h2>Pravni fakultet - FTN</h2>
          <p>
            Program osposobljava studente za rad u advokaturi i međunarodnim organizacijama, sa fokusom na informaciono društvo. 
            Kroz izborne predmete i praktična znanja, studenti stiču veštine za domaće i međunarodno pravo. 
            Više informacija na sajtu Pravnog fakulteta.
          </p>
          <a href="#!" className="card-link">
            Pročitaj više
          </a>
        </div>
        <div className="cardG">
          <h2>Prirodno-matematički fakultet</h2>
          <p>
            Prirodno-matematički fakultet u Novom Sadu organizuje akciju „Budi student na 1 dan“ za sve srednjoškolce koji žele da iskuse i dobiju uvid akademski život. 
            Akcija traje od 2. do 6.12. 
            Prijava je obavezna na sajtu:
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfs9xkiL1rF6JjpyyGNm70rp46kSEiplijq0xbB3dbEGgtKrg/closedform?pli=1" className="card-link">
            Pročitaj više
          </a>
        </div>
        <div className="cardG">
          <h2>Akademija umetnosti</h2>
          <p>
            Simfonijski orkestar Akademije umetnosti održava koncert 08.12 u novosadskog Sinagogi, u 20 časova. 
            Program se sastoji od kompozicija „Slovenska igra“, „Per Gint“, „Karmen“ i „Krcko Oraščić“, sa dirigentom profesorom Andrej Bursaćem.
          </p>
          <a href="#!" className="card-link">
            Pročitaj više
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
