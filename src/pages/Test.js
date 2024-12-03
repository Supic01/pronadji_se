import React, { useState } from "react";
import "../css/Navbar.css";

const categories = {
  matematika: [
    "Интересантно ми је на часу математике.",
    "Брзо се сналазим са сложеним бројевима.",
    "Уживам у решавању логичких загонетки и изазова."
  ],
  економија: [
    "Сатима могу да проучавам економске теме.",
    "Лако располажем и уживам у финансијском планирању.",
    "Интересују ме економске и политичке вести."
  ],
  уметност: [
    "Креативне ствари које видим око себе често умеју да ме инспиришу.",
    "Уживам у креативним активностима.",
    "Занима ме креирање визуелног садржаја."
  ],
  језици: [
    "Активно говорим барем један страни језик.",
    "Занимају ме стране културе и језици.",
    "Често читам и пишем на страним језицима."
  ],
  технологија: [
    "Волим да тестирам различите апликације на рачунару.",
    "Сви ми кажу да сам вешт са рачунарима и осталом технологијом.",
    "Занимају ме иновативна технолошка решења."
  ],
  медицина: [
    "Лечење људи је област која ме највише привлачи.",
    "Желим да помажем људима који имају различите проблеме.",
    "Често замишљам себе у белом лекарском мантилу."
  ]
};

const Test = () => {
  const [responses, setResponses] = useState({});

  const handleResponseChange = (category, index, value) => {
    setResponses((prev) => {
      const newResponses = { ...prev };
      if (!newResponses[category]) {
        newResponses[category] = [];
      }
      newResponses[category][index] = parseInt(value);
      return newResponses;
    });
  };

  const calculateConclusions = () => {
    const conclusions = {};
    for (const category in responses) {
      const scores = responses[category];
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      conclusions[category] = average.toFixed(2);
    }
    return conclusions;
  };

  const handleSubmit = () => {
    const conclusions = calculateConclusions();
    console.log("Резултати:", conclusions);
    alert("Резултати су приказани у конзоли!");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Анкета: Процените своја интересовања</h1>
      {Object.entries(categories).map(([category, questions], catIndex) => (
        <div key={catIndex} style={{ marginBottom: "20px" }}>
          <h2>{category}</h2>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question}</p>
              {[1, 2, 3, 4].map((value) => (
                <label key={value} style={{ marginRight: "10px" }}>
                  <input
                    type="radio"
                    name={`${category}-${index}`}
                    value={value}
                    onChange={(e) =>
                      handleResponseChange(category, index, e.target.value)
                    }
                  />
                  {value}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Пошаљи одговоре
      </button>
    </div>
  );
};

export default Test;
