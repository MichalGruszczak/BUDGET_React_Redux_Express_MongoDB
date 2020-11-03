import React, { Suspense } from "react";
import "./Main.scss";
import Monthly from "./Monthly";
import { Switch, Route } from "react-router-dom";

const Main = () => {
  const Savings = React.lazy(() => import("./Savings"));
  const Simulator = React.lazy(() => import("./Simulator"));
  return (
    <div className="main">
      <Switch>
        <Route path="/" exact component={Monthly} />
        <Suspense fallback={<span>LOADING ...</span>}>
          <Route path="/savings" component={Savings} />
          <Route path="/simulator" component={Simulator} />
        </Suspense>
      </Switch>
    </div>
  );
};

export default Main;
