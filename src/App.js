import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./css/App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Result from "./pages/Result";
import SignIn from "./pages/SignIn";
import Test from "./pages/Test";
  
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/signin"
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
