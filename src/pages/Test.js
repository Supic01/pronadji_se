import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Test.css";
import { auth, db } from "../firebase-config";

// Categories with questions
const categories = {
  Matematika: [
    "Uživam u rešavanju zadataka koji zahtevaju logično razmišljanje.",
    "Privlače me brojevi i analitički zadaci.",
    "Voleo/la bih da radim na problemima koji imaju tačna rešenja.",
    "Cenim aktivnosti koje uključuju preciznost i pažljivo planiranje.",
    "Dobro se snalazim u situacijama koje zahtevaju proračune.",
    "Uživam u strukturiranom načinu razmišljanja.",
  ],
  Ekonomija: [
    "Privlače me teme vezane za poslovanje i finansije.",
    "Volim da pratim kako se razvijaju društvene i privredne promene.",
    "Uživo bih diskutovao/la o trendovima i događajima u svetu.",
    "Lako razumem odnose između resursa i njihovog korišćenja.",
    "Zanima me način na koji funkcionišu različiti sistemi u društvu.",
    "Uvek tražim dublje razumevanje finansijskih odluka.",
  ],
  Umetnost: [
    "Volim da stvaram i izražavam svoje ideje kroz boje i oblike.",
    "Inspiraciju nalazim u stvarima koje me okružuju.",
    "Rado osmišljavam nove i kreativne projekte.",
    "Privlače me vizuelne i estetske dimenzije u svakodnevnom životu.",
    "Uživam u aktivnostima koje uključuju dizajn ili stvaranje.",
    "Često se izražavam kroz kreativne aktivnosti.",
  ],
  Jezici: [
    "Lako mi je da naučim nove reči i izraze.",
    "Uživam u razumevanju kako se ljudi izražavaju u različitim kulturama.",
    "Voleo/la bih da komuniciram sa ljudima širom sveta.",
    "Zainteresovan/a sam za razumevanje i pisanje tekstova na drugim jezicima.",
    "Čitanje i istraživanje novih načina izražavanja me motiviše.",
    "Privlače me razlike u načinima govora i komunikacije.",
  ],
  Tehnologija: [
    "Često istražujem nove aplikacije i alate na internetu.",
    "Uvek tražim načine da unapredim veštine korišćenja uređaja.",
    "Zanima me kako funkcionišu uređaji i digitalni sistemi.",
    "Privlače me inovativne ideje u modernim rešenjima.",
    "Uživam u otkrivanju praktičnih načina primene novih tehnologija.",
    "Često istražujem tehničke teme i digitalne trendove.",
  ],
  Medicina: [
    "Privlače me teme vezane za zdravlje i dobrobit ljudi.",
    "Često istražujem kako da pomognem drugima u teškim situacijama.",
    "Zanimaju me procesi koji poboljšavaju kvalitet života.",
    "Uvek sam spreman/na da učim o načinima pomaganja ljudima.",
    "Fasciniran/a sam načinom na koji funkcioniše ljudsko telo.",
    "Uživam u temama vezanim za istraživanje i inovacije u zdravstvu.",
  ],
  Arhitektura: [
    "Volim da zamišljam i kreiram prostore koji su funkcionalni i estetski.",
    "Interesuje me kako prostor utiče na ponašanje i raspoloženje ljudi.",
    "Uživam u istraživanju novih materijala i tehnologija za gradnju.",
    "Privlače me izazovi vezani za dizajniranje prostora sa specifičnim funkcijama.",
    "Zanima me uloga arhitekture u očuvanju kulturnog nasleđa i zaštiti prirode.",
    "Rado razmišljam o tome kako arhitektura može unaprediti društvenu povezanost.",
  ],
  Psihologija: [
    "Uživam u razumevanju ljudskog ponašanja i reakcija.",
    "Interesuje me kako emocije utiču na naše odluke i ponašanje.",
    "Rado istražujem načine za poboljšanje međuljudskih odnosa.",
    "Privlače me problemi u vezi sa mentalnim zdravljem i emocionalnim blagostanjem.",
    "Zanima me kako društveni faktori oblikuju mišljenje i ponašanje.",
    "Uvek želim da naučim više o tome kako ljudi reaguju na stresne situacije.",
  ],
};

// Function to shuffle questions
const shuffleQuestions = (categories) => {
  const mixedQuestions = [];
  for (const [category, questions] of Object.entries(categories)) {
    questions.forEach((question) => {
      mixedQuestions.push({ category, question });
    });
  }
  return mixedQuestions.sort(() => Math.random() - 0.5);
};

const Test = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState(null); // Store results for displaying
  const navigate = useNavigate();

  useEffect(() => {
    // Shuffle questions on load
    const mixed = shuffleQuestions(categories);
    setShuffledQuestions(mixed);
  }, []);

  const handleResponseChange = (index, value) => {
    setResponses((prev) => ({
      ...prev,
      [index]: parseInt(value),
    }));
  };

  const calculateConclusions = () => {
    const scores = {};
    for (const questionIndex in responses) {
      const { category } = shuffledQuestions[questionIndex];
      if (!scores[category]) {
        scores[category] = [];
      }
      scores[category].push(responses[questionIndex]);
    }

    const conclusions = {};
    for (const category in scores) {
      const average =
        scores[category].reduce((a, b) => a + b, 0) / scores[category].length;
      conclusions[category] = average.toFixed(2);
    }
    return conclusions;
  };

  const handleSubmit = async () => {
    const unansweredQuestions = shuffledQuestions.filter(
      (_, index) => !responses[index]
    );
    if (unansweredQuestions.length > 0) {
      alert("Morate odgovoriti na sva pitanja pre nego što pošaljete.");
      return;
    }
  
    const conclusions = calculateConclusions();
  
    // Find the category with the highest score
    const highestCategory = Object.keys(conclusions).reduce((a, b) =>
      conclusions[a] > conclusions[b] ? a : b
    );
  
    // Capitalize the first letter to match Firestore document names
    const formattedCategory =
      highestCategory.charAt(0).toUpperCase() + highestCategory.slice(1);
  
    try {
      const user = auth.currentUser;
  
      if (user) {
        const userDoc = doc(db, "users", user.uid);
  
        // Save test results to Firestore
        await updateDoc(userDoc, {
          testResults: conclusions, // Save all scores
          highestScore: formattedCategory, // Save the highest score category
        });
  
        console.log("Test results saved successfully!");
      } else {
        console.error("No user is logged in!");
      }
  
      // Navigate to Result.js
      navigate("/result", { state: { highestCategory: formattedCategory } });
    } catch (error) {
      console.error("Error saving test results:", error);
      alert("Failed to save test results. Please try again.");
    }
  };
  

  return (
    <div className="test-container">
      <h1 className="title-container">Test profesionalne orijentacije</h1>
      {shuffledQuestions.map(({ question }, index) => (
        <div key={index} className="question-container">
          <p>{question}</p>
          <div className="radio-group">
            {[1, 2, 3, 4].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={value}
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="submit-button">
        Pošalji odgovore
      </button>
    </div>
  );
};

export default Test;
