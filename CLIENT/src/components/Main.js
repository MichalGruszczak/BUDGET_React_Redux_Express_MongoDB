import React from "react";
import "./Main.scss";
import Monthly from "./Monthly";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Main = () => {
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route path="/" exact component={Monthly} />
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
