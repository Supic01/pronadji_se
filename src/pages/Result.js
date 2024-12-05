import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/App.css";
import { db } from "../firebase-config"; // Adjust your Firebase config path

const Result = () => {
  const location = useLocation();
  const { highestCategory } = location.state; // Get the category with the highest score
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        console.log("Fetching data for category:", highestCategory);
        const docRef = doc(db, "Nauke", highestCategory);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const faculties = docSnap.data().faculties;
          console.log("Fetched faculties:", faculties); // Log fetched data
          setColleges(faculties); // Set faculties to state
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchColleges();
  }, [highestCategory]);
  

  return (
    <div>
      <div className="auth-container">
        <div className="fax-auth-form">
          <h1>Rezultati vašeg testa su:</h1>
          <h1>{highestCategory}</h1>
          {colleges.map((college, index) => (
            <div key={index} className="fax-card">
              <h2 className="fax-title">{college.fakultet}</h2>
              <div className="fax-profile-row">
                <p className="fax-text">{college.tekst}</p>
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Posetite sajt fakulteta
                </a>
                <img
                  src={college.imageUrl}
                  alt={college.fakultet}
                  className="fax-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Result;
