import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Kontakt</h1>
      <form>
        <label>Ime:</label>
        <input type="text" placeholder="Unesite vaše ime" />
        <label>Email:</label>
        <input type="email" placeholder="Unesite vaš email" />
        <label>Poruka:</label>
        <textarea placeholder="Unesite vašu poruku"></textarea>
        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
};

export default Contact;
