<<<<<<< HEAD
import React, { useState } from 'react';
import Swal from 'sweetalert2';
=======
import React, { useState } from "react";
import Swal from "sweetalert2";
>>>>>>> 91becc3d2bcce49d5b9c66825a77d7ed023556e4
import "../css/Contact.css";
const Contact = () => {
  // Stanja za unos u formi
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    poruka: ""
  });

  // Funkcija za ažuriranje stanja prilikom unosa
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formToSend = { ...formData, access_key: "3888b2ec-b6b8-46b7-a572-ea9a0dbf2ad0" };
    const json = JSON.stringify(formToSend);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Poslato!",
        text: "Poruka uspešno poslata!",
        icon: "success"
      });

      // Resetovanje polja u formi
      setFormData({
        ime: "",
        email: "",
        poruka: ""
      });
    }
  };

  return (
    <section className='contact'>
      <form onSubmit={onSubmit}>
        <h2>Contact form</h2>
        <div className='input-box'>
          <label>Ime i prezime</label>
          <input
            type='text'
            className='field'
            placeholder='Unesite ime i prezime!'
            name='ime'
            value={formData.ime} // Vezivanje vrednosti sa stanjem
            onChange={handleChange} // Ažuriranje stanja na unos
            required
          />
        </div>
        <div className='input-box'>
          <label>Email adresa</label>
          <input
            type='email'
            className='field'
            placeholder='Unesite vaš email!'
            name='email'
            value={formData.email} // Vezivanje vrednosti sa stanjem
            onChange={handleChange} // Ažuriranje stanja na unos
            required
          />
        </div>
        <div className='input-box'>
          <label>Vaša poruka</label>
          <textarea
            name='poruka'
            className='field mess'
            placeholder='Unesite vašu poruku!'
            value={formData.poruka} // Vezivanje vrednosti sa stanjem
            onChange={handleChange} // Ažuriranje stanja na unos
            required
          ></textarea>
        </div>
        <button type='submit'>Pošalji poruku!</button>
      </form>
    </section>
  );
};

export default Contact;
