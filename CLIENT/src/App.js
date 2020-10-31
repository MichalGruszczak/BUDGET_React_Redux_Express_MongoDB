import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Main />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
