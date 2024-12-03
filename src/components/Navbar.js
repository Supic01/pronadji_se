import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Pronadji Se</div>
      <ul>
        <li><Link to="/">Naslovna</Link></li>
        <li><Link to="/about">O nama</Link></li>
        <li><Link to="/test">Test</Link></li>
        <li><Link to="/contact">Kontakt</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
