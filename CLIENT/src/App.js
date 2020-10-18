import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
