import React from "react";
import "../css/Footer.css";
import facebookIcon from "../images/facebook.png";
import instagramIcon from "../images/instagram.png";
import linkedinIcon from "../images/linkedin.png";
import logoImage from "../images/search.png";
import twitterIcon from "../images/twitter.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logoImage} alt="Logo" />
      </div>

      <div className="footer-text">
        <p>© 2024 Pronađi se. Sva prava zadržana.</p>
      </div>

      <div className="footer-social">
        <a target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" />
        </a>
        <a target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" />
        </a>
        <a target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>

        <a target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
