import React from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "App dark" : "App"}>
      <Router>
        <Navbar />
        <Main />
      </Router>
    </div>
  );
}

export default App;
