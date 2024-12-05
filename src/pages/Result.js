import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/App.css";
import { auth, db } from "../firebase-config";

const Result = () => {
  const location = useLocation();
  const { highestCategory } = location.state;
  const [colleges, setColleges] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([highestCategory]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const results = userDocSnap.data().testResults;
          const sortedResults = Object.entries(results)
            .sort(([, a], [, b]) => b - a)
            .map(([category, score]) => ({ category, score }));

          setAllResults(sortedResults);

          const highestCategoryColleges = await fetchCollegesForCategory(highestCategory);
          setColleges({ [highestCategory]: highestCategoryColleges });
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
    setExpandedCategories([]);
  };

  const handleShowLess = () => {
    setShowAllCategories(false);
    setExpandedCategories([highestCategory]);
  };

  return (
    <div>
      <div className="auth-container">
        <div className="fax-auth-form">
          <h1 className="Rezultat">Rezultati vašeg testa:</h1>
          {allResults.length > 0 && (
            <div>
              {allResults
                .filter(({ category }) => showAllCategories || category === highestCategory)
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
