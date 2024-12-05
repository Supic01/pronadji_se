import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/App.css";
import { auth, db } from "../firebase-config"; // Import auth and db

const Result = () => {
  const location = useLocation();
  const { highestCategory } = location.state; // Get the highest score category
  const [colleges, setColleges] = useState([]); // Faculties for the displayed category
  const [allResults, setAllResults] = useState([]); // All categories and their scores
  const [expandedCategories, setExpandedCategories] = useState([highestCategory]); // Categories currently expanded
  const [showAllCategories, setShowAllCategories] = useState(false); // Show all categories or not

  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const results = userDocSnap.data().testResults;
          const sortedResults = Object.entries(results)
            .sort(([, a], [, b]) => b - a) // Sort by scores descending
            .map(([category, score]) => ({ category, score }));

          setAllResults(sortedResults);

          // Fetch faculties for the highest-scoring category by default
          const highestCategoryColleges = await fetchCollegesForCategory(highestCategory);
          setColleges({ [highestCategory]: highestCategoryColleges });
        } else {
          console.error("User test results not found!");
        }
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchResults();
  }, [highestCategory]);

  const fetchCollegesForCategory = async (category) => {
    try {
      const docRef = doc(db, "Nauke", category);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().faculties || [];
      } else {
        console.error(`No such document for category: ${category}`);
      }
    } catch (error) {
      console.error(`Error fetching colleges for category: ${category}`, error);
    }
    return [];
  };

  const toggleCategory = async (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((cat) => cat !== category));
    } else {
      if (!colleges[category]) {
        const categoryColleges = await fetchCollegesForCategory(category);
        setColleges((prev) => ({ ...prev, [category]: categoryColleges }));
      }
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const handleShowAll = () => {
    setShowAllCategories(true);
    setExpandedCategories([]); // Ensure no categories are expanded initially
  };

  const handleShowLess = () => {
    setShowAllCategories(false);
    setExpandedCategories([highestCategory]); // Reset to only the highest category
  };

  return (
    <div>
      <div className="auth-container">
        <div className="fax-auth-form">
          <h1 className="Rezultat">Rezultati vašeg testa:</h1>
          {allResults.length > 0 && (
            <div>
              {allResults
                .filter(({ category }) => showAllCategories || category === highestCategory) // Show all or just the highest
                .map(({ category, score }) => (
                  <div key={category}>
                    <h2
                      className="fax-title"
                      onClick={() => toggleCategory(category)}
                      style={{
                        cursor: "pointer",
                        color: expandedCategories.includes(category) ? "#629d9a" : "white",
                      }}
                    >
                      {category} - {score}
                    </h2>
                    {expandedCategories.includes(category) &&
                      (colleges[category] || []).map((college, index) => (
                        <div key={index} className="fax-card">
                          <h3 className="fax-title">{college.fakultet}</h3>
                          <div className="fax-profile-row">
                            <p className="fax-text">{college.tekst}</p>
                            <a
                              href={college.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Posetite sajt fakulteta
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          )}
          {showAllCategories ? (
            <button className="btn" onClick={handleShowLess}>
              Pokaži manje podataka
            </button>
          ) : (
            <button className="btn" onClick={handleShowAll}>
              Pokaži više podataka
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
